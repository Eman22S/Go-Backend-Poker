import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";

import { makeStyles, useTheme } from "@material-ui/core/styles";

import green from '@material-ui/core/colors/green';

import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";

import CheckCircleIcon from "@material-ui/icons/CheckCircle";

import Typographyx from "../fragments/Typographyx";
import Copyright from "../fragments/Copyright";
import { useSnackBarContext } from "../../contexts/snackbar";
import useGrpcClient from "../../contexts/grpc_client";
import StepForm1 from "./StepForm1";
import StepForm2 from "./StepForm2";
import StepForm3 from "./StepForm3";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    padding: theme.spacing(2)
  },
  main: {
    backgroundColor: theme.palette.background.paper,
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
    width: "15%",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    padding: theme.spacing(0, 2),
  },
  background: {
    backgroundColor: theme.palette.background.default,
  },
  paperBackground: {
    backgroundColor: theme.palette.background.paper,
  },
  white_text: {
    color: "white",
  },
}));

function getSteps() {
  return ["Account Information", "Age Verification", "Security Questions"];
}

export default function Signup(props) {
  const classes = useStyles();
  const theme = useTheme();
  const grpc_client = useGrpcClient();
  const showSnackBar = useSnackBarContext();

  const [form1Data, setForm1Data] = useState(null);
  const [form2Data, setForm2Data] = useState(null);
  const [form3Data, setForm3Data] = useState(null);

  const [errorSteps, setErrorSteps] = useState({
    0: false,
    1: false,
    2: false,
  });
  const [signupBtnLoading, setSignupBtnLoading] = useState(false);

  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    // remove error step if exists
    setErrorSteps((prevErrorSteps) => ({
      ...prevErrorSteps,
      [activeStep]: false,
    }));
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const nunet_logo =
    theme.palette.type === "dark" ? "/login_icon_1.png" : "/login_icon_1.png";

  function on_signup_response(response) {
    setSignupBtnLoading(false);
    const success = response.getSuccess();
    const errors = response.getErrorsList();

    if (success) {
      handleNext();
    } else if (errors?.length) {
      showSnackBar(`${errors[0]}`);
    } else {
      // set error label for form 2
      setErrorSteps((prevErrorSteps) => ({ ...prevErrorSteps, 1: true }));
      // take user to form 2(credit form)
      setActiveStep(1);

      showSnackBar("Validation failed. Please, enter correct information.");
    }
  }

  function on_signup_error(custom_msg, err) {
    setSignupBtnLoading(false);

    // set error label for form 1
    setErrorSteps((prevErrorSteps) => ({ ...prevErrorSteps, 0: true }));
    // take user to form 1
    setActiveStep(0);

    custom_msg && showSnackBar(custom_msg);
  }

  const onSubmitForm1 = (data) => {
    setForm1Data(data);
    handleNext();
  };

  const onSubmitForm2 = (data) => {
    setForm2Data(data);
    handleNext();
  };

  const onSubmitForm3 = (data) => {
    setForm3Data(data);
    let all_user_data = Object.assign({}, form1Data, form2Data, data);
    setSignupBtnLoading(true);
    console.log("sign up data")
    console.log(all_user_data)
    grpc_client.signup(all_user_data, on_signup_response, on_signup_error);
  };

  function getStepJSX(step) {
    switch (step) {
      case 0:
        return (
          <StepForm1
            activeStep={activeStep}
            onFormSubmit={onSubmitForm1}
            handleBack={handleBack}
            formData={form1Data}
          />
        );
      case 1:
        return (
          <StepForm2
            activeStep={activeStep}
            onFormSubmit={onSubmitForm2}
            handleBack={handleBack}
            formData={form2Data}
          />
        );
      case 2:
        return (
          <StepForm3
            activeStep={activeStep}
            onFormSubmit={onSubmitForm3}
            handleBack={handleBack}
            formData={form3Data}
            submitLoading={signupBtnLoading}
          />
        );
      default: 
          return "";
    }
  }

  return (
    <div className={`${classes.background} ${classes.root}`}>
      <Container component="main" maxWidth="md" className={classes.main}>
        <div className={classes.paper}>
          <img src={nunet_logo} alt="Logo" className={classes.logo} />
          <Typography
            component="h1"
            variant="h5"
            className={classes.white_text}
          >
            Sign up
          </Typography>
          <div className={classes.form}>
            <Stepper
              activeStep={activeStep}
              alternativeLabel
              className={classes.paperBackground}
            >
              {steps.map((label, index) => (
                <Step key={index}>
                  <StepLabel error={errorSteps[index]}>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </div>
          <Container maxWidth="sm">
            {activeStep === steps.length ? (
              <Grid
                container
                justify="center"
                style={{ color: green[500], textAlign: "center" }}
              >
                <Grid item xs={12}>
                  <CheckCircleIcon fontSize="large" />
                </Grid>
                <Grid item xs={12}>
                  <Typographyx my={1} variant="h5" color="inherit">
                    Successfully registered.
                  </Typographyx>
                </Grid>
              </Grid>
            ) : (
              <div>{getStepJSX(activeStep)}</div>
            )}
          </Container>

          <Box pt={4}>
            <Typography
              variant="subtitle1"
              align="center"
              className={classes.white_text}
            >
              {activeStep === steps.length
                ? "You can sign in now."
                : "Already have an account?"}
              <br />
              <Link component={RouterLink} to="/login" variant="inherit">
                Sign in
              </Link>
            </Typography>
          </Box>
        </div>

        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    </div>
  );
}
