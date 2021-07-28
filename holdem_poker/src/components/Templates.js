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

import TournamentTemplateList from "./TournamentTemplateList";
import CreateTournamentTemplate from "./CreateTournamentTemplate";
import CreatePrizePayoutTemplate from "./CreatePrizePayoutTemplate";

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
  },
}));

const aroutes = {
  0: "/create_tournament_template",
  1: "/template_list",
  2: "/create_payout_template",
};

export default function Templates({ temp, ...props }) {
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
        {/*
      <AppBar
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
            <Tab label="Add  Template" />
            <Tab label="Tournament Templates" />
            <Tab label="Add Payout Template" />
          </Tabs>
        </Toolbar>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <SwipeTabPanel value={value} index={0} dir={theme.direction}>
          <CreateTournamentTemplate temp={temp} />
        </SwipeTabPanel>
        <SwipeTabPanel value={value} index={1} dir={theme.direction}>
          <TournamentTemplateList />
        </SwipeTabPanel>
        <SwipeTabPanel value={value} index={2} dir={theme.direction}>
          <CreatePrizePayoutTemplate />
        </SwipeTabPanel>
      </SwipeableViews>
      <ul>
        <li><Link  to={`${url}/create_tournament_template`}>Testttt</Link></li>
        <li><Link  to={`${url}/template_list`}>Testttt</Link></li>
        <li><Link  to={`${url}/create_payout_template`}>Testttt</Link></li>
      </ul>
      
      */}




      <Switch>
        <Route exact path={path}>
          <TournamentTemplateList />
        </Route>
        <Route path={`${path}/create_tournament_template`}>
          <CreateTournamentTemplate temp={temp} />
        </Route>
        <Route path={`${path}/template_list`}>
          <TournamentTemplateList />
        </Route>
        <Route path={`${path}/create_payout_template`}>
          <CreatePrizePayoutTemplate />
        </Route>
      </Switch>

    </div>
  );
}
