import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
// import SwipeableViews from "react-swipeable-views";
import { useLocation,Switch,Route ,useRouteMatch} from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";

// import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
// import Toolbar from "@material-ui/core/Toolbar";
// import Tab from "@material-ui/core/Tab";
// import Tabs from "@material-ui/core/Tabs";

import CancelJoinAnyUsers from "./CancelJoinAnyUsers";
import CancelTournamentComponent from "../containers/CancelTournament/CancelTournament.component";

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
  0: "/cancel_tournaments",
  1: "/cancel_join_any",
};

export default function Tournaments({ temp, ...props }) {
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

  useEffect(() => {
    for (let key in aroutes) {
      if (location.pathname.startsWith(aroutes[key])) {
        setValue(parseInt(key));
        break;
      }
    }
  }, [location.pathname]);

  let { path } = useRouteMatch()

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
            <Tab label="Cancel Tournaments" />
            <Tab label="Cancel Join Any" />
          </Tabs>
        </Toolbar>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <SwipeTabPanel value={value} index={0} dir={theme.direction}>
          <CancelTournamentComponent />
        </SwipeTabPanel>
        <SwipeTabPanel value={value} index={1} dir={theme.direction}>
          <CancelJoinAnyUsers />
        </SwipeTabPanel>
      </SwipeableViews>*/}
       <Switch>
        <Route exact path={path}>
          <CancelTournamentComponent />
        </Route>
        <Route path={`${path}/cancel_tournaments`}>
          <CancelTournamentComponent />
        </Route>
        <Route path={`${path}/cancel_join_any`}>
          <CancelJoinAnyUsers />
        </Route>
      </Switch>
    </div>
  );
}
