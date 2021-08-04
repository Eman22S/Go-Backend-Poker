import React, { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import { Redirect, Link, useHistory } from "react-router-dom";

import SwipeableViews from "react-swipeable-views";

import { makeStyles, useTheme } from "@material-ui/core/styles";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Avatar from "@material-ui/core/Avatar";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";

import BaseLobby from "./BaseLobby";
import useLocalStorage from "./utils/hooks";
import { is_logged_in, logout, is_admin } from "../utils/auth_utils";
import Typographyx from "./fragments/Typographyx";
import GameplayHistories from "./GameplayHistories";
import DepositWithdrawal from "./DepositWithdrawal";
import AccountStatements from "./AccountStatements";
import { TournamentTemplateLobby } from "../containers/TournamentTemplateLobby/TournamentTemplateLobby.component";
import Money from '@material-ui/icons/MonetizationOn';
import Points from '@material-ui/icons/Stars';
import yellow from '@material-ui/core/colors/yellow';
import green from '@material-ui/core/colors/green';
import { useSnackBarContext } from "../contexts/snackbar";
import useGrpcClient from "../contexts/grpc_client";
import { format_currency } from "../utils/number_utils";
import ActiveTournaments from "../components/ActiveTournaments";
import { Profile } from "../containers/Profile/Profile.component";
import Badgex from "./fragments/Badgex";
import { ActiveFiveTurboTournaments } from "./ActiveFiveTurboTournaments.component";
import { DEV_IMAGE_URL } from "../utils/image_utils";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  background: {
    backgroundColor: theme.palette.background.default,
  },
  logo: {
    width: theme.spacing(8),
    height: theme.spacing(8),
    margin: theme.spacing(0.5)
  },
  divider: {
    width: theme.spacing(8)
  },
  profile: {
    backgroundColor: theme.palette.background.default
  },
  alignItems: {
    display: 'flex',
    alignItems: 'center'
  },
  account_image_container: {
    display: 'flex',
    width: '100%',
    minHeight: '100px',
    alignItems: 'center',
    justifyContent: 'center',
  },
  account_info_container: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing('1'),
    marginBottom: theme.spacing('3')
  },
  account_options_container: {
    padding: theme.spacing('1'),
  },
  account_option_admin_button: {
    float: "left",
    marginBottom: theme.spacing('1')
  },
  account_option_logout_button: {
    float: "right",
    marginBottom: theme.spacing('1')
  },
  account_image: {
    width: '80px',
    height: '80px'
  }
}));

function TabPanel(props) {
  const classes = useStyles();
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      className={classes.background}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

const routes = {
  0: "/cash",
  1: "/lobby",
  2: "/my_tournaments",
  3: "/statements",
  4: "/template_lobby",
  5: "/active_tournaments",
  6: "/profile",
  7: "/active_five_turbo_tournaments"
};

export default function Layout({ component: Component, ...props }) {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  const showSnackBar = useSnackBarContext();
  const grpc_client = useGrpcClient();
  const [localUser, ] = useLocalStorage("user");
  const [value, setValue] = React.useState(1);
  const [joinAny, setjoinAny] = React.useState(false);
  const nunet_logo =
    theme.palette.type === "dark" ? "/login_icon_1.png" : "/login_icon_1.png";

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const [cashInAccount, setCashInAccount] = useState(0);
  const [pointsInAccount, setPointsInAccount] = useState(0);

  const [logo, setLogo] = useState(null);

  const handleChange = (event, newValue) => {
    props.history.push(routes[newValue]);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  useEffect(() => {
    for (let key in routes) {
      if (props.location.pathname.startsWith(routes[key])) {
        setValue(parseInt(key));
        break;
      }
    }
  }, [props.location.pathname]);

  const getJoinAnyTournamentStatus = useCallback(
    function() {
        grpc_client.getJoinAnyTournamentStatus(
        (response) => {
          setjoinAny(response.getActive());
        },
        showSnackBar
      )
    },
    [grpc_client, setjoinAny, showSnackBar]
  )

  useEffect(() => {
    getJoinAnyTournamentStatus();
  }, [getJoinAnyTournamentStatus]); 

  const getPlayerAccountBalance = useCallback(
    function() {
      grpc_client.getPlayerAccountBalance(
        (response) => {
          setPointsInAccount(response.getPointsInAccount());
          setCashInAccount(response.getCashInAccount());
        },
        showSnackBar
      )
    },
    [grpc_client, showSnackBar]
  )

  useEffect(() => {
    getPlayerAccountBalance();
  }, [getPlayerAccountBalance]);


  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAdmin = () => {
      history.push("/admin");
  }

  const handleAccount = () => {
    history.push("/profile");
  }

  const handleLogout = () => {
    grpc_client.logout(() => {
        logout();
        props.history.push("/login");
    }, (error) => {
        if (error) {
            showSnackBar(error);
        }
    });
  }

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

  return !is_logged_in() ? (
    <Redirect to="/login" />
  ) : (
    <div className={`${classes.root}`}>
      <AppBar
        position="static"
        color={theme.palette.type === "dark" ? "inherit" : "primary"}
      >
        <Toolbar style={{ justifyContent: "center" }}>
          <Box ml={-8}>
              <Link to="/">
                <Avatar src={logo?logo:nunet_logo} alt="Logo" className={classes.logo} />
              </Link>
          </Box>
          <Divider orientation="vertical" className={classes.divider} />
          <Tabs
            textColor="primary"
            indicatorColor="primary"
            value={value}
            onChange={handleChange}
            centered
            aria-label="simple tabs example"
          >
            <Tab label="Cash" />
            <Tab label="Sit & Go" />
            <Tab label="Hand History" />
            <Tab label="Account Statements" />
            <Tab label="Template Lobby" />
            <Tab label="Active Tournaments" disabled={!joinAny}/>
          </Tabs>
          <Box ml={8} my={0.5}>
            <Container align="center">
              <Avatar className={classes.profile}>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                >
                <AccountCircle fontSize="large" />
              </IconButton>
              </Avatar>
              
            </Container>
          </Box>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            getContentAnchorEl={null} // need to be null to support anchorOrigin props
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            open={open}
            onClose={handleClose}
          >
            <div style={{ minWidth: '300px' }}>
              <div className={classes.account_image_container}>
                <AccountCircle fontSize="large" className={classes.account_image} />
              </div>
              <div className={classes.account_info_container}>
                { localUser?.username?.toUpperCase() }
              </div>
              {
                  is_admin() ? (
                    <div className={classes.account_info_container}>
                      <Button variant="contained" color="primary" onClick={handleAdmin} className={classes.account_option_admin_button} size="small">Admin Dashboard</Button>
                    </div>                      
                  ) : ( null )
              }              
              <Divider />
              <div className={classes.account_options_container}>
                <Button variant="contained" color="primary" autoFocus className={classes.account_option_admin_button} onClick={handleAccount}>
                  Account
                </Button>

                <Button variant="contained" color="secondary" autoFocus className={classes.account_option_logout_button} onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            </div>
          </Menu>
          <Box m={0.5}>
            <Container align="start">
              <Box className={classes.alignItems}>
                <Money fontSize="small" style={{color:green[400]}}/>
                <Typographyx variant="inherit" color="textSecondary" p={0.5}>
                  <b>{format_currency(cashInAccount).replace('$', "")}</b>
                </Typographyx>
              </Box>
              <Box className={classes.alignItems}>
                <Points fontSize="small" style={{color:yellow[700]}}/>
                <Typographyx variant="inherit" color="textSecondary" p={0.5}>
                  <b> {format_currency(pointsInAccount).replace('$', "")}</b>
                </Typographyx>
              </Box>
            </Container>
          </Box>
          <Box m={0.5}>
            {localUser.is_suspended && 
              <Box className={classes.alignItems} p={0.5}>
                <Badgex color="CANCELLED">
                  Account Suspended
                </Badgex>
              </Box>
            }
            {localUser.has_pending_investigation && 
              <Box className={classes.alignItems} p={0.5}>
                <Badgex color="CANCELLED">
                  Investigation Pending
                </Badgex>
              </Box>
            }
          </Box>
        </Toolbar>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <DepositWithdrawal updateBalance={getPlayerAccountBalance} />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <BaseLobby updateBalance={getPlayerAccountBalance} />
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <GameplayHistories />
        </TabPanel>
        <TabPanel value={value} index={3} dir={theme.direction}>
          <AccountStatements />
        </TabPanel>
        <TabPanel value={value} index={4} dir={theme.direction}>
          <TournamentTemplateLobby toggleJoinAny={setjoinAny} updateBalance={getPlayerAccountBalance} />
        </TabPanel>
        <TabPanel value={value} index={5} dir={theme.direction}>
          <ActiveTournaments toggleJoinAny={setjoinAny} updateBalance={getPlayerAccountBalance} />
        </TabPanel>
        <TabPanel value={value} index={6} dir={theme.direction}>
          <Profile />
        </TabPanel>
        <TabPanel value={value} index={7} dir={theme.direction}>
          <ActiveFiveTurboTournaments />
        </TabPanel>
      </SwipeableViews>
      <Box className={classes.background}>
        <Container align="right">
          <Typographyx color="textSecondary" pb={1}><b>Last Login: </b>{localUser.last_login} </Typographyx>
        </Container>
      </Box>
    </div>
  );
}
