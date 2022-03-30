import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Redirect, Link } from "react-router-dom";

import SwipeableViews from "react-swipeable-views";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import Avatar from "@material-ui/core/Avatar";
import { is_admin_logged_in, logout } from "../utils/auth_utils";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import Popper from '@material-ui/core/Popper';

import useLocalStorage from "./utils/hooks";
import useGrpcClient from "../contexts/grpc_client";
import { useSnackBarContext } from "../contexts/snackbar";
import PlayerGeofencing from "./PlayerGeofencing";
import SpecificHandTest from "./SpecificHandTest";
import ClientManagement from "./ClientManagement";
import SimulationManagement from "./SimulationManagement";

import Templates from "./Templates";
import Users from "./Users";
import Tournaments from "./Tournaments";
import GameplayHistories from "./GameplayHistories";

import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Settings from "./Settings";

import { DEV_IMAGE_URL } from "../utils/image_utils";
import Geopoll from "./Geopoll";


// const StyledMenu = withStyles({
//   paper: {
//     border: '1px solid #d3d4d5',
//   },
// })((props) => (
//   <Menu
//     elevation={0}
//     getContentAnchorEl={null}
//     anchorOrigin={{
//       vertical: 'bottom',
//       horizontal: 'center',
//     }}
//     transformOrigin={{
//       vertical: 'top',
//       horizontal: 'center',
//     }}
//     {...props}
//   />
// ));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },

    },
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.common.white,
  },
}))(MenuItem);


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

export function SwipeTabPanel(props) {
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

SwipeTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const aroutes = {
  0: "/templates",
  1: "/users",
  2: "/tournaments",
  3: "/player_geofencing",
  4: "/hand_tests",
  5: "/settings",
  6: "/client_management",
  7: "/simulation_management",
  8: "/admin_tournaments",
  9: "/geopoll"


};

export default function Admin({ component: Component, ...props }) {
  const classes = useStyles();
  const theme = useTheme();
  const [localUser, ] = useLocalStorage("admin_user");
  const nunet_logo =
    theme.palette.type === "dark" ? "/login_icon_1.png" : "/login_icon_1.png";
  const [value, setValue] = React.useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const grpc_client = useGrpcClient();
  const showSnackBar = useSnackBarContext();

  const [anchorEl1, setAnchorEl1] = React.useState(null);
  const [anchorEl2, setAnchorEl2] = React.useState(null);
  const [anchorEl3, setAnchorEl3] = React.useState(null);
  const [anchorEl4, setAnchorEl4] = React.useState(null);

  const [logo, setLogo] = React.useState(null);


  const handleClick = (setFunc,event) => {
    hideAllPopups();
    setFunc(event.currentTarget);
  };

  const hideAllPopups = () => {
    setAnchorEl1(null);
    setAnchorEl2(null);
    setAnchorEl3(null);
    setAnchorEl4(null);
  }
  const handleMenuClose = (setFunc) => {
    setFunc(null);
  };




  const handleChange = (event, newValue) => {
    props.history.push(aroutes[newValue]);
  };


  const handleChangeIndex = (value, index) => {
    setValue(index);
  };


  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLobby = () => {
      props.history.push("/lobby");
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

  const handleAccount = () => {
    props.history.push("/profile");
  }

  useEffect(() => {
    console.log('path name', props.location.pathname);
    for (let key in aroutes) {
      if (props.location.pathname.startsWith(aroutes[key])) {
        setValue(parseInt(key));
        break;
      }
    }
  }, [props.location.pathname]);


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
    console.log('path name', props.location.pathname);
    //eslint-disable-next-line
    }, [])


  return !is_admin_logged_in() ? (
    <Redirect to="/admin/login" />
  ) : ((
    <div className={`${classes.root} ${classes.background}`}>
      <AppBar
        position="static"
        color={theme.palette.type === "dark" ? "inherit" : "primary"}
      >
        <Toolbar style={{ justifyContent: "space-between" }}>
          <Box>
              <Link to="/">
                <Avatar src={logo ? logo:nunet_logo} alt="Logo" className={classes.logo} />
              </Link>
          </Box>


          <Popper
            id="customized-menu"
            anchorEl={anchorEl1}
            keepMounted
            open={Boolean(anchorEl1)}
            onClose={()=>{handleMenuClose(setAnchorEl1)}}
            onMouseLeave={()=>{handleMenuClose(setAnchorEl1)}}

          >
            <StyledMenuItem component={Link} to="/templates/create_tournament_template" onClick={()=>{handleMenuClose(setAnchorEl1)}}>Add  Template</StyledMenuItem>
            <StyledMenuItem component={Link} to="/templates/template_list" onClick={()=>{handleMenuClose(setAnchorEl1)}}>Tournament Templates</StyledMenuItem>
            <StyledMenuItem component={Link} to={'/templates/create_payout_template'} onClick={()=>{handleMenuClose(setAnchorEl1)}}>Add Payout Template</StyledMenuItem>

          </Popper>
          {/* tournaments */}

          <Popper
            id="customized-menu-users"
            anchorEl={anchorEl2}
            open={Boolean(anchorEl2)}
            onClose={()=>{handleMenuClose(setAnchorEl2)}}
            onMouseLeave={()=>{handleMenuClose(setAnchorEl2)}}
          >
            <StyledMenuItem component={Link} to="/users/user_whitelist" onClick={()=>{handleMenuClose(setAnchorEl2)}}>Whitelist Users</StyledMenuItem>
            <StyledMenuItem component={Link} to="/users/active_users" onClick={()=>{handleMenuClose(setAnchorEl2)}}>Active Users</StyledMenuItem>
            <StyledMenuItem component={Link} to="/users/administrators" onClick={()=>{handleMenuClose(setAnchorEl2)}}>Administrators</StyledMenuItem>
            <StyledMenuItem component={Link} to="/users/permissions" onClick={()=>{handleMenuClose(setAnchorEl2)}}>Permissions</StyledMenuItem>
            <StyledMenuItem component={Link} to="/users/account_balance" onClick={()=>{handleMenuClose(setAnchorEl2)}}>User Accounts</StyledMenuItem>
            <StyledMenuItem component={Link} to="/users/adjustments" onClick={()=>{handleMenuClose(setAnchorEl2)}}>Pending Adjustments</StyledMenuItem>
            <StyledMenuItem component={Link} to="/users/bots" onClick={()=>{handleMenuClose(setAnchorEl2)}}>Bots</StyledMenuItem>

          </Popper>



          <Popper
            id="customized-menu-tournaments"
            anchorEl={anchorEl3}
            keepMounted
            open={Boolean(anchorEl3)}
            onClose={()=>{handleMenuClose(setAnchorEl3)}}
            onMouseLeave={()=>{handleMenuClose(setAnchorEl3)}}
          >
            <div >
              <StyledMenuItem component={Link} to="/tournaments/cancel_tournaments" onClick={()=>{handleMenuClose(setAnchorEl3)}}>Cancel Tournaments</StyledMenuItem>
              <StyledMenuItem component={Link} to="/tournaments/cancel_join_any" onClick={()=>{handleMenuClose(setAnchorEl3)}}>Cancel Join Any</StyledMenuItem>
            </div>
          </Popper>

          <Popper
            id="customized-menu-settings"
            anchorEl={anchorEl4}
            keepMounted
            open={Boolean(anchorEl4)}
            onClose={()=>{handleMenuClose(setAnchorEl4)}}
            onMouseLeave={()=>{handleMenuClose(setAnchorEl4)}}
          >
            <div >
              <StyledMenuItem component={Link} to="/settings/global_settings" onClick={()=>{handleMenuClose(setAnchorEl4)}}>Global Settings</StyledMenuItem>
              <StyledMenuItem component={Link} to="/settings/cash_back_settings" onClick={()=>{handleMenuClose(setAnchorEl4)}}>Cash Back Settings</StyledMenuItem>
              <StyledMenuItem component={Link} to="/settings/ui_settings" onClick={()=>{handleMenuClose(setAnchorEl4)}}>UI Settings</StyledMenuItem>
            </div>
          </Popper>


          <Tabs
            textColor="primary"
            indicatorColor="primary"
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example"
            variant="scrollable"
            scrollButtons="auto"
            style={{cursor:"pointer"}}
          >

            <Tab style={{cursor:"pointer"}} label={<><div>Templates <ExpandMoreIcon   style={{ marginTop: -10 }} viewBox="0 -5 24 24"/></div></>} onMouseEnter={(e) => {handleClick(setAnchorEl1,e)}} onClick={(e) => {handleMenuClose(setAnchorEl1)}}/>
            <Tab label={<><div>Users<ExpandMoreIcon  style={{ marginTop: -10 }} viewBox="0 -5 24 24"/></div></>} onMouseEnter={(e) => {handleClick(setAnchorEl2,e)}} onClick={(e) => {handleMenuClose(setAnchorEl2)}} />
            <Tab label={<><div>Tournaments<ExpandMoreIcon style={{ marginTop: -10 }} viewBox="0 -5 24 24"/></div></>} onMouseEnter={(e) => {handleClick(setAnchorEl3,e)}} onClick={(e) => {handleMenuClose(setAnchorEl3)}}  />


            <Tab label="Player Geofencing"  onMouseEnter={hideAllPopups}/>
            <Tab label="Specific Hand Tests" onMouseEnter={hideAllPopups}/>
            <Tab label={<><div> Settings<ExpandMoreIcon  style={{ marginTop: -10 }} viewBox="0 -5 24 24"/></div></>} onMouseEnter={(e) => {handleClick(setAnchorEl4,e)}} onClick={(e) => {handleMenuClose(setAnchorEl4)}}  />
            <Tab label="Client Management" onMouseEnter={hideAllPopups}/>
            <Tab label="Automated Games" onMouseEnter={hideAllPopups}/>
            {/*<Tab label="Cash Back Settings" value={9} onMouseEnter={hideAllPopups} />*/}
            {/*<Tab label="Global Settings" onMouseEnter={hideAllPopups}/>*/}
            <Tab label="Geopoll" value={9} onMouseEnter={hideAllPopups} />
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
                {localUser?.admin_username?.toUpperCase()}
              </div>
              <div className={classes.account_info_container}>
                <Button variant="contained" color="primary" onClick={handleLobby} className={classes.account_option_admin_button} size="small">Lobby</Button>
              </div>
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

        </Toolbar>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <SwipeTabPanel value={value} index={0} dir={theme.direction}>
          <Templates temp={props.location.state} />
          </SwipeTabPanel>
        <SwipeTabPanel value={value} index={1} dir={theme.direction}>
          <Users />
        </SwipeTabPanel>
        <SwipeTabPanel value={value} index={2} dir={theme.direction}>
          <Tournaments />
        </SwipeTabPanel>
        <SwipeTabPanel value={value} index={3} dir={theme.direction}>
          <PlayerGeofencing />
        </SwipeTabPanel>
        <SwipeTabPanel value={value} index={4} dir={theme.direction}>
          <SpecificHandTest />
        </SwipeTabPanel>
        <SwipeTabPanel value={value} index={5} dir={theme.direction}>
          <Settings />
        </SwipeTabPanel>
        <SwipeTabPanel value={value} index={6} dir={theme.direction}>
          <ClientManagement />
        </SwipeTabPanel>
        <SwipeTabPanel value={value} index={7} dir={theme.direction}>
          <SimulationManagement />
        </SwipeTabPanel>
        <SwipeTabPanel value={value} index={8} dir={theme.direction}>
          <GameplayHistories />
        </SwipeTabPanel>
        {/*<SwipeTabPanel value={value} index={9} dir={theme.direction}>
          <CashBackSettings />
        </SwipeTabPanel>*/}
        <SwipeTabPanel value={value} index={9} dir={theme.direction}>
          <Geopoll />
        </SwipeTabPanel>
      </SwipeableViews>
    </div>
  ));
}
