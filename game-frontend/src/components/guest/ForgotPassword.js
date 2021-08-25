import React from "react";
import { Link as RouterLink } from "react-router-dom";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";

import Copyright from "../fragments/Copyright";

import ResetPasswordForm from "./ResetPasswordForm";

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
    minHeight: "100vh",
  },
}));

export default function ForgotPassword(props) {
  const classes = useStyles();
  const theme = useTheme();

  const nunet_logo =
    theme.palette.type === "dark" ? "/login_icon_1.png" : "/login_icon_1.png";

  return (
    <div className={classes.background}>
      <Container component="main" maxWidth="xs" className={classes.main}>
        <div className={classes.paper}>
          <img src={nunet_logo} alt="Logo" className={classes.logo} />
        </div>
      </Container>
      <ResetPasswordForm history={props.history} />
      <Box pt={2}>
        <Typography
          align="center"
          color="textSecondary"
          className={classes.white_text}
        >
          Don't have an account?
          <br />
          <Link component={RouterLink} to="/signup">
            Create Account
          </Link>
        </Typography>
      </Box>
      <Box pt={4}>
        <Typography
          align="center"
          color="textSecondary"
          className={classes.white_text}
        >
          Already have an account?
          <br />
          <Link component={RouterLink} to="/login">
            Sign in
          </Link>
        </Typography>
      </Box>
      <Box mt={2}>
        <Copyright />
      </Box>
    </div>
  );
}
