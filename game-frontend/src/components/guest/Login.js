import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";

import md5 from "md5";

import { makeStyles, useTheme, withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
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
import { set_local_token , set_is_admin } from "../../utils/auth_utils";
import useLocalStorage from "../utils/hooks";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Grid from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Typographyx from "../fragments/Typographyx";
import { useForm } from "react-hook-form";
import  IconButton from "@material-ui/core/IconButton";
import  TextField from "@material-ui/core/TextField";
import CloseIcon from '@material-ui/icons/Close'; 
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

const dialogStyles = (theme) => ({
  root: {
      margin: 0,
      padding: theme.spacing(2),
  },
  closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(dialogStyles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
          <Typography variant="h6">{children}</Typography>
          {onClose ? (
              <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                  <CloseIcon />
              </IconButton>
          ) : null}
      </MuiDialogTitle>
  );
});

/**
 * get user location from browser using the html geolocation api 
 * @param {function} callback : a callback function that accepts two parameters - first : error object, second: geolocation object  
*/
const getLocation = (callback) => {
  if(navigator && navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      callback(null, position);
    }, 
    (error) => {
      callback(error);
    });
  } else {
    let errorObj = new Error("Geolocation is not supported in this browser!");
    errorObj.code = 0;
    callback(errorObj);
  }
}

export default function SignIn(props) {
  const classes = useStyles();
  const theme = useTheme();
  const showSnackBar = useSnackBarContext();
  const [, updateStore] = useStore();
  const grpc_client = useGrpcClient();
  const [, setLocalUser] = useLocalStorage("user");

  const { register, handleSubmit, errors } = useForm();

  const nunet_logo =
    theme.palette.type === "dark" ? "/login_icon_1.png" : "/login_icon_1.png";

  const [username, setUsername] = useState("test9");
  const [password, setPassword] = useState("user.password");
  const [logo, setLogo] = useState(null);
  const [loginBtnLoading, setLoginBtnLoading] = useState(false);

  const [tosUpdates, setTOSUpdates] = useState(null); 
  const [open, setOpen] = React.useState(false);
  const [agree, setAgree] = useState(false);
  const [loginRespose, setLoginRespose] = useState(null); 
  const [openSecurityQ, setOpenSecurityQ] = React.useState(false);
  const [securityQuestions, setSecurityQuestions] = React.useState(null);

  const handleClose = () => {
    if(agree) {
      let {token, is_admin, username, user_id} = loginRespose;
      set_local_token(token);
      set_is_admin(is_admin);
      updateStore("user", () => ({
        id: user_id,
        md5: md5(user_id),
        username: username,
      })); // reset user
      setLocalUser({ id: user_id, md5: md5(user_id), username: username });
      updateStore("player", () => null); // clear player

      // remove if error snackbar was shown
      showSnackBar("");
      setOpen(false);
      grpc_client.acceptTOS(
        ()=>{},
        (custom_msg) => {
          custom_msg && showSnackBar(custom_msg);
        }
      );
      props.history.push("/gamestart");
    } else {
      showSnackBar("You must agree to the terms to continue.");
    }
  };

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

    // setLoginBtnLoading(true);

    let device_id = get_device_info();

    grpc_client.login(
      username,
      password,
      device_id,
      JSON.stringify(geolocationData),
      on_login_response,
      (custom_msg) => {
        setLoginBtnLoading(false);
        custom_msg && showSnackBar(custom_msg);
        if(custom_msg === 'Mulitfactor is required.') {
          grpc_client.fetchSecurityQuestions({username}, (response) => {
            setSecurityQuestions(JSON.parse(response.getQuestions()));
            setOpenSecurityQ(true)
          })
        }
      }
    );
  }

  function on_login_response(response) {
    let token = response.getAccessToken();
    let user_id = response.getUserId();
    let login_data = response.getLoginData();
    let is_admin = response.getIsAdmin();
    let login_data_decoded = JSON.parse(login_data);
    let username = login_data_decoded.username;

    if (token && login_data) {
      if(!login_data_decoded.has_agreed_to_tos) {
          //accept new terms
          setLoginRespose({
            token,
            is_admin,
            user_id,
            username
          })
          setTOSUpdates(login_data_decoded.tos_updates);
          setOpen(true);
      } else {
        set_local_token(token);
        set_is_admin(is_admin);
        updateStore("user", () => ({
          id: user_id,
          md5: md5(user_id),
          username: username,
        })); // reset user
        setLocalUser({ id: user_id, md5: md5(user_id), username: username, is_suspended: login_data_decoded.is_suspended, has_pending_investigation: login_data_decoded.has_pending_investigation, last_login: login_data_decoded.last_login_datetime });
        updateStore("player", () => null); // clear player

        // remove if error snackbar was shown
        showSnackBar("");

        // go to start page
        props.history.push("/gamestart");

      }
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

  const [ geolocationData, setGeolocationData ] = useState({data: {
    location: {
      result: {
        latitude: 36.1699,//position?.coords?.latitude,
        longitude: -115.1398//position?.coords?.longitude
      },
    },
      device: {
        result: {
          platform: 'web',
        }
      },
      version: {
        result: {
          version:'25_0'
        }
      }
    }
})

  // get location from browser {there is error.code to check the type of the error}
  useEffect(()=> {
    getLocation((error, position) => {
      let data = {
        data: {
          location: {
            result: {
              latitude: 36.1699,//position?.coords?.latitude,
              longitude: -115.1398//position?.coords?.longitude
            },
          },
            device: {
              result: {
                platform: 'web',
              }
            },
            version: {
              result: {
                version:'25_0'
              }
            }
          }
      }
      if(error) {
        let error_message = "Unable to get location!"
        switch (error.code) {
          case 0:
            error_message += " Your browser is not supported."
            break;
          case error.PERMISSION_DENIED:
              error_message += " Please make sure to allow the location permission. Location is needed for verification purposes."
              break;
          case error.POSITION_UNAVAILABLE:
              error_message += " Your location is not currently unavailable."
              break;
          case error.TIMEOUT:
              error_message += " Timed out while trying to get your location"
              break;
          default:
            break;
        }
        showSnackBar(error_message, "error", 2000);
       }
      setGeolocationData(data);
    });
  },[showSnackBar])

  const handleSecurityQLogin = (data) => {
    const answers = Object.keys(data)
    .map(key => {
      return {
        questionId: key.substr(7),
        answer: data[key],
      };
    })
    .sort((a, b) => {
      return parseInt(a.questionId) - parseInt(b.questionId);
    });
    console.log(answers);
    grpc_client.validateSecurityQuestionsForLogin( 
      username,
      JSON.stringify(answers),
      '',
      JSON.stringify(geolocationData),
      on_login_response,
      (custom_msg) => {
        setLoginBtnLoading(false);
        custom_msg && showSnackBar(custom_msg);
      })
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
                      <Typography>Login with Username</Typography>
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

                  <Typography align="center">
                    <Link component={RouterLink} to="/forgot" variant="caption">
                      Forgot password?
                    </Link>
                  </Typography>

                  <Box pt={2}>
                    <Typography align="center">
                      Don't have an account?
                      <br />
                      <Link component={RouterLink} to="/signup" variant="body1">
                        Create Account
                      </Link>
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </form>
        </div>

        {
          tosUpdates && (
            <Dialog
              aria-labelledby="simple-dialog-title"
              scroll="paper"
              fullWidth={true}
              maxWidth='md'
              open={open}
              PaperProps={{ style: { alignItems: "center" } }}
              >
                <MuiDialogTitle id="simple-dialog-title" disableTypography={true}>
                  <Typographyx
                    variant="h6"
                    style={{ color: "#fff", textTransform: "inherit" }}
                    >
                      We have updated our {Object.values(tosUpdates).map(val => val.title).join(", ")}
                  </Typographyx>
                </MuiDialogTitle>
                <DialogContent>
                  {Object.values(tosUpdates).map( (tos, idx) => {
                    return (
                      <React.Fragment key={tos.title+idx}>
                        <div dangerouslySetInnerHTML={{__html: tos.introtext}}/>
                        <div dangerouslySetInnerHTML={{__html: tos.fulltext}}/>
                      </React.Fragment>
                    );})}
                </DialogContent>
                <DialogContent style={{overflowY:"visible"}}>
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            value="allowExtraEmails"
                            label="Start"
                            color="primary"
                            name="agree"
                            checked={agree}
                            onChange={(e) => setAgree(e.target.checked)}
                          />
                        }
                        label={
                          <Typography variant="caption" style={{ color: "white" }}>
                            I agree with the {Object.values(tosUpdates).map(val => val.title).join(", ")}
                          </Typography>
                        }
                        style={{ width: "initial" }} // need to override some bootstrap css
                      />
                    </Grid>
                  </DialogContent>
                  <DialogActions>
                    <Button autoFocus onClick={handleClose} color="primary">
                      Continue
                    </Button>
                  </DialogActions>
              </Dialog>
            )
        }

         {securityQuestions && 
            <Dialog
              aria-labelledby="simple-dialog-title2"
              scroll="paper"
              fullWidth={true}
              maxWidth='md'
              open={openSecurityQ}
              onClose={() => {setOpenSecurityQ(false)}}
              >
                <DialogTitle id="simple-dialog-title2" style={{textAlign:"center"}} onClose={() => {setOpenSecurityQ(false)}}>
                      Answer Security Questions to Login as {username}
                </DialogTitle>
               
                  <DialogContent>
                    <form onSubmit={handleSubmit(handleSecurityQLogin)}>
                      <Grid container spacing={2}>
                        {securityQuestions.map((question, index) => (
                          <Grid key={`question-${index}`} item xs={12}>
                            <TextField
                              variant="outlined"
                              margin="normal"
                              fullWidth
                              id={`answer-${question.id}`}
                              label={question.question}
                              name={`answer-${question.id}`}
                              my={1}
                              inputRef={register({
                                required: "An answer is required.",
                              })}
                              error={Boolean(errors[`answer-${question.id}`])}
                              helperText={
                                errors.username
                                  ? errors.username[`answer-${question.id}`]
                                  : ""
                              }
                            />
                          </Grid>
                        ))}
                      <Grid item xs={3}></Grid>
                      <Grid item xs={6}>
                        <Box  mt={2}>
                          <Button fullWidth name='submit' type='submit' variant="contained" color="primary">
                            Login
                          </Button>
                        </Box>
                      </Grid>
                      </Grid>
                    </form>
                  </DialogContent>
              </Dialog>
         }


        <Box mt={2}>
          <Copyright />
        </Box>
      </Container>
    </div>
  );
}
