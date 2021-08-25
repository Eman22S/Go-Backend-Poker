import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
// import SwipeableViews from "react-swipeable-views";
import { useLocation ,Switch , Route, useRouteMatch } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";

import Box from "@material-ui/core/Box";
// import AppBar from "@material-ui/core/AppBar";
// import Toolbar from "@material-ui/core/Toolbar";
// import Tab from "@material-ui/core/Tab";
// import Tabs from "@material-ui/core/Tabs";

import CashBackSettings from "./CashBackSettings";
import AdminGlobalSettings from "./AdminGlobalSettings";
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
  0: "/global_settings",
  1: "/cash_back_settings",
  2: "/ui_settings",
};

export default function Templates({ temp, ...props }) {
  const classes = useStyles();
  // const theme = useTheme();
  const [, setValue] = useState(0);
  // const history = useHistory();
  const location = useLocation();

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
       

      <Switch>
        <Route exact path={path}>
          <AdminGlobalSettings />
        </Route>
        <Route path={`${path}/global_settings`}>
          <AdminGlobalSettings />
        </Route>
        <Route path={`${path}/cash_back_settings`}>
          <CashBackSettings />
        </Route>
        <Route path={`${path}/ui_settings`}>
          <UiSettings />
        </Route>
      </Switch>

    </div>
  );
}
