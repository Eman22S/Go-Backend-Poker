import React, { useState,useEffect } from "react";

import md5 from "md5";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";

import Loading from "../fragments/Loading";
import Copyright from "../fragments/Copyright";
import TextFieldx from "../fragments/TextFieldx";

import { useSnackBarContext } from "../../contexts/snackbar";
import { useStore } from "../../contexts/store";
import useGrpcClient from "../../contexts/grpc_client";
import get_device_info from "../../utils/device_utils";
import { set_local_admin_token , set_is_admin } from "../../utils/auth_utils";
import useLocalStorage from "../utils/hooks";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
import { DEV_IMAGE_URL } from "../../utils/image_utils";

const useStyles = makeStyles((theme) => ({
  main: {
    paddingTop: theme.spacing(4),
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  logo: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(1),
    width: "40%",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    padding: theme.spacing(0, 2),
  },
  card_header: {
    paddingBottom: 0,
  },
  card_content: {
    paddingBottom: theme.spacing(1),
    paddingTop: theme.spacing(1),
  },
  card: {
    border: "1px solid rgba(255, 255, 255, 0.12)",
  },
  background: {
    backgroundColor: theme.palette.background.default,
    minHeight: '100vh',
    backgroundImage: `url(${theme.backgroundImg.image})`,
    backgroundRepeat:  theme.backgroundImg.repeat  
  },
}));

const styles = {
  card_content: {
    paddingBottom: 16,
    paddingTop: 8,
  },
};


export default function SignIn(props) {
  const classes = useStyles();
  const theme = useTheme();
  const showSnackBar = useSnackBarContext();
  const [, updateStore] = useStore();
  const grpc_client = useGrpcClient();
  const [, setLocalUser] = useLocalStorage("admin_user");

  const nunet_logo =
    theme.palette.type === "dark" ? "/login_icon_1.png" : "/login_icon_1.png";

  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("testtest");
  const [logo, setLogo] = useState(null);
  const [loginBtnLoading, setLoginBtnLoading] = useState(false);

  
 
  const changeUsing = (valueSetter, validator = (value) => {}) => (event) => {
    const { type, checked } = event.target;
    if (type === "checkbox") {
      valueSetter(checked);
    } else {
      let value = event.target.value.trim();
      valueSetter(value);
      validator(value);
    }
  };
  function getLogo(){
    grpc_client.getUiSettings(
      "logo",
      (response)=>{
        let result = response.getResult();
        console.log("result "+result)
        if(result){
          let temp_img_src = DEV_IMAGE_URL + result.replace("./","/");
          setLogo(temp_img_src)
        }
      },
      on_error
    );
  }
  const on_error = (custom_msg) => {
    console.log(custom_msg);
    if (custom_msg) {
        showSnackBar(custom_msg);
    }
  }

  useEffect(() => {
    getLogo();
    //eslint-disable-next-line
    }, [])


  function login() {
    if (!username) {
      showSnackBar("Username can not be empty.");
      return;
    }
    if (!password) {
      showSnackBar("Password can not be empty.");
      return;
    }

    setLoginBtnLoading(true);

    let device_id = get_device_info();

    grpc_client.adminLogin(
      username,
      password,
      device_id,
      on_login_response,
      (custom_msg) => {
        setLoginBtnLoading(false);
        custom_msg && showSnackBar(custom_msg);
      }
    );
  }

  function on_login_response(response) {
    let token = response.getAccessToken();
    let user_id = response.getUserId();
    let login_data = response.getLoginData();
    let is_admin = response.getIsAdmin();
    let login_data_decoded = JSON.parse(login_data);
    let username = login_data_decoded.admin_username;

    console.log("token "+token);
    if (token && login_data) {
        set_local_admin_token(token);
        set_is_admin(is_admin);
        updateStore("admin_user", () => ({
          admin_id: user_id,
          admin_md5: md5(user_id),
          admin_username: username,
        })); // reset user
        setLocalUser({ admin_id: user_id, admin_md5: md5(user_id), admin_username: username });
        updateStore("player", () => null); // clear player

        // remove if error snackbar was shown
        showSnackBar("");

        // go to start page
        props.history.push("/admin");
    } else {
      setLoginBtnLoading(false);
      showSnackBar("Server not responding. Please, try again.");
    }
  }

  function onKeyPress(event) {
    if (event.key === "Enter") {
      login();
    }
  }

  return (
    <div className={classes.background}>
      <Container component="main" maxWidth="xs" className={classes.main}>
        <div className={classes.paper}>
          <img src={logo?logo: nunet_logo} alt="Logo" className={classes.logo} />
          <form className={classes.form} noValidate>
            <Box py={1}>
              <Card>
                <CardHeader
                  className={classes.card_header}
                  title={
                    <Box align="center" pt={2}>
                      <Typography variant="h6">Administrator</Typography>
                      <Typography variant="caption">Login with Username or Email</Typography>
                    </Box>
                  }
                />
                <CardContent style={styles.card_content}>
                  <TextFieldx
                    value={username}
                    onChange={changeUsing(setUsername)}
                    onKeyPress={onKeyPress}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Username"
                    name="email"
                    autoComplete="username"
                    autoFocus
                    my={1.5}
                  />
                  <TextFieldx
                    value={password}
                    onChange={changeUsing(setPassword)}
                    onKeyPress={onKeyPress}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    my={1.5}
                  />
                  <Box mt={3} mb={1}>
                    <Button
                      type="button"
                      fullWidth
                      variant="contained"
                      color="primary"
                      onClick={login}
                      disabled={loginBtnLoading}
                      endIcon={loginBtnLoading ? <Loading size={20} /> : null}
                    >
                      Sign In
                    </Button>
                  </Box>
                  <Box mt={2}>
                    <Typography align="center">
                      <Link component={RouterLink} to="/lobby">
                        Back to Lobby
                      </Link>
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </form>
        </div>
        <Box mt={2}>
          <Copyright />
        </Box>
      </Container>
    </div>
  );
}
