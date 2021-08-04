import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
// import SwipeableViews from "react-swipeable-views";
import { useLocation,Route, useRouteMatch,Switch } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";

import Box from "@material-ui/core/Box";
// import AppBar from "@material-ui/core/AppBar";
// import Toolbar from "@material-ui/core/Toolbar";
// import Tab from "@material-ui/core/Tab";
// import Tabs from "@material-ui/core/Tabs";

import UserWhitelist from "./UserWhitelist";
import PlayerAccountManagement from "./PlayerAccountManagement";
import ActiveUsers from "./ActiveUsers";
import Administrators from "./Administrators";
import Permissions from "./Permissions";
import PendingRequest from "./PendingRequest";
import BotList from "./BotList";
import ApprovedRequest from "./ApprovedRequest";
import UiSettings from "./UiSettings";

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

const useStyles = makeStyles(theme => ({
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
    backgroundImage: `url(${theme.backgroundImg.image})`,
    backgroundRepeat:  theme.backgroundImg.repeat
  },
}));

const aroutes = {
  0: "/user_whitelist",
  1: "/account_balance",
  2: "/active_users",
  3: "/administrators",
  4: "/permissions",
  5: "/requests",
  6: "/bots",
  7: "/uisettings"



};

export default function Users({ temp, ...props }) {
  const classes = useStyles();
  // const theme = useTheme();
  const [, setValue] = useState(0);
  // const history = useHistory();
  const location = useLocation();

  // const handleChange = (event, newValue) => {
  //   history.push(aroutes[newValue]);
  // };

  // const handleChangeIndex = (value, index) => {
  //   setValue(index);
  // };
  let { path } = useRouteMatch()

  useEffect(() => {
    for (let key in aroutes) {
      if (location.pathname.startsWith(aroutes[key])) {
        setValue(parseInt(key));
        break;
      }
    }
  }, [location.pathname]);

  return (
    <div className={`${classes.root} ${classes.background}`}>
      {/*<AppBar
        position="static"
        color={theme.palette.type === "dark" ? "inherit" : "primary"}
      >
        <Toolbar style={{ justifyContent: "center" }}>
          <Tabs
            textColor="primary"
            indicatorColor="primary"
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example"
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab label="Whitelist Users" />
            <Tab label="Account Balance" />

            <Tab label="Active Users" />
            <Tab label="Administrators" />
            <Tab label="Permissions" />

            <Tab label="Unverified Requests" />
            <Tab label="Bots" />

          </Tabs>
        </Toolbar>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <SwipeTabPanel value={value} index={0} dir={theme.direction}>
          <UserWhitelist />
        </SwipeTabPanel>
        <SwipeTabPanel value={value} index={1} dir={theme.direction}>
          <PlayerAccountManagement />
        </SwipeTabPanel>
        <SwipeTabPanel value={value} index={2} dir={theme.direction}>
          <ActiveUsers />
        </SwipeTabPanel>
        <SwipeTabPanel value={value} index={3} dir={theme.direction}>
          <Administrators />
        </SwipeTabPanel>
        <SwipeTabPanel value={value} index={4} dir={theme.direction}>
          <Permissions />
        </SwipeTabPanel>
        <SwipeTabPanel value={value} index={5} dir={theme.direction}>
          <PendingRequest />
        </SwipeTabPanel>
        <SwipeTabPanel value={value} index={6} dir={theme.direction}>
          <BotList />
        </SwipeTabPanel>
      </SwipeableViews>
      /*/}

      <Switch>
        <Route exact path={path}>
        <UserWhitelist />
        </Route>
        <Route path={`${path}/user_whitelist`}>
        <UserWhitelist />
        </Route>
        <Route path={`${path}/account_balance`}>
        <PlayerAccountManagement />
        </Route>
        <Route path={`${path}/active_users`}>
        <ActiveUsers />
        </Route>
        <Route path={`${path}/administrators`}>
        <Administrators />
        </Route>
        <Route path={`${path}/permissions`}>
        <Permissions />
        </Route>
        <Route path={`${path}/adjustments`}>
          <PendingRequest />
          <ApprovedRequest />
        </Route>
        <Route path={`${path}/bots`}>
          <BotList />
        </Route>
        <Route path={`${path}/uisettings`}>
          <UiSettings />
        </Route>
       
      </Switch>

    </div>
  );
}


