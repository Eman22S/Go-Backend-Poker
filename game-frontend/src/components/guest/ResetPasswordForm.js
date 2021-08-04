import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import useGrpcClient from "../../contexts/grpc_client";
import { useSnackBarContext } from "../../contexts/snackbar";

import Grid from "@material-ui/core/Grid";
import Step from "@material-ui/core/Step";
import Loading from "../fragments/Loading";
import Button from "@material-ui/core/Button";
import Stepper from "@material-ui/core/Stepper";
import Container from "@material-ui/core/Container";
import StepLabel from "@material-ui/core/StepLabel";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  main: {
    backgroundColor: theme.palette.background.paper,
    paddingTop: theme.spacing(4),
  },
  background: {
    backgroundColor: theme.palette.background.default,
  },
  paperBackground: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    fontSize: "24px",
  },
}));

const getSteps = () => [
  "User Information",
  "Security Questions",
  "New Password",
];

export default function ResetPasswordForm(props) {
  const classes = useStyles();
  const grpcClient = useGrpcClient();
  const snackbar = useSnackBarContext();
  const [activeStep, setActiveStep] = useState(0);
  const [userInformation, setUserInformation] = useState({});
  const [answers, setAnswers] = useState({});
  const [resetting, setResetting] = useState(false);
  const steps = getSteps();

  const handleNext = () => {
    if (activeStep === steps.length - 1) return;
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    if (activeStep === 0) return;
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const getStepContent = stepIndex => {
    switch (stepIndex) {
      case 0:
        return (
          <UserInformationForm
            onFormSubmit={onUserInformationSubmit}
            handleBack={handleBack}
            handleNext={handleNext}
            activeStep={activeStep}
          />
        );
      case 1:
        return (
          <SecurityQuestionsForm
            onFormSubmit={onSecurityQuestionsSubmit}
            handleBack={handleBack}
            handleNext={handleNext}
            activeStep={activeStep}
            data={userInformation}
          />
        );
      case 2:
        return (
          <NewPasswordForm
            onFormSubmit={onNewPasswordSubmit}
            handleBack={handleBack}
            resetting={resetting}
            data={userInformation}
          />
        );
      default:
        return "Unknown stepIndex";
    }
  };

  const onUserInformationSubmit = data => {
    setUserInformation(data);
    handleNext();
  };

  const onSecurityQuestionsSubmit = data => {
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
    setAnswers(answers);
    handleNext();
  };

  const onNewPasswordSubmit = data => {
    setResetting(true);
    grpcClient.resetPassword(
      {
        username: userInformation.username,
        email: userInformation.email,
        answers: JSON.stringify(answers),
        newPassword: data.password,
        confirmPassword: data.passwordConfirmation,
      },
      onResetPasswordResponse,
      onResetPasswordError
    );
  };

  const onResetPasswordResponse = response => {
    if (response.getStatus() === "204") {
      snackbar(
        "Password reset successfully. You can now login with your new passowrd.",
        "success"
      );
      props.history.push("/login");
    }
    setResetting(false);
  };

  const onResetPasswordError = (message, error) => {
    message
      ? snackbar(message)
      : snackbar("Failed to reset password. Please try again later!");
    setActiveStep(1);
    setResetting(false);
  };

  return (
    <div className={`${classes.background} ${classes.root}`}>
      <Container component="main" maxWidth="md" className={classes.main}>
        <Typography
          align="center"
          component="h2"
          className={classes.title}
          color="textSecondary"
        >
          Reset Password
        </Typography>
        <div className={classes.root}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map(label => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {
            <React.Fragment>
              {activeStep === steps.length ? (
                <div>
                  <Typography className={classes.instructions}>
                    All steps completed
                  </Typography>
                  <Button onClick={handleReset}>Reset</Button>
                </div>
              ) : (
                getStepContent(activeStep)
              )}
            </React.Fragment>
          }
        </div>
      </Container>
    </div>
  );
}

function UserInformationForm({
  onFormSubmit,
  handleBack,
  handleNext,
  activeStep,
  ...props
}) {
  const { register, handleSubmit, errors } = useForm();

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <Grid container spacing={2}  alignContent="center" alignItems="center" justify="center">
        <Grid item xs={12} sm={6}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="username"
            label="Username or Email"
            name="username"
            autoComplete="username"
            autoFocus
            my={1}
            inputRef={register({
              required: "Username / Email is required.",
              minLength: {
                value: 2,
                message: "Username should be greater than 1 character.",
              },
              // pattern: {
              //   // no special character
              //   value: /^\w+$/,
              //   message: "Username cannot contain special characters.",
              // },
            })}
            error={Boolean(errors.username)}
            helperText={errors.username?.message}
          />
        </Grid>

        {/* <Grid item xs={12} sm={6}>
          <TextField
            name="email"
            variant="outlined"
            margin="normal"
            fullWidth
            id="email"
            label="Email"
            autoComplete="email"
            my={1}
            inputRef={register({
              required: "Email address is required.",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Invalid email address",
              },
            })}
            error={Boolean(errors.email)}
            helperText={errors.email?.message}
          />
        </Grid> */}
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Grid container justify="flex-end">
            <Button
              variant="contained"
              color="primary"
              disabled={activeStep === 0}
              onClick={handleBack}
              startIcon={<ArrowBackIcon />}
            >
              Back
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            endIcon={<ArrowForwardIcon />}
          >
            Next
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

function SecurityQuestionsForm({
  onFormSubmit,
  handleBack,
  handleNext,
  data,
  ...props
}) {
  const { register, handleSubmit, errors } = useForm();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const grpcClient = useGrpcClient();
  const snackbar = useSnackBarContext();

  const fetchSecurityQuestions = data => {
    setLoading(true);
    grpcClient.fetchSecurityQuestions(
      {
        username: data.username,
        // email: data.email,
      },
      onFetchSecurityQuestionsResponse,
      onFetchSecurityQuestionsError
    );
  };

  const onFetchSecurityQuestionsError = error => {
    snackbar("User doesn't exist!");
    setLoading(false);
    handleBack();
  };

  const onFetchSecurityQuestionsResponse = response => {
    setQuestions(JSON.parse(response.getQuestions()));
    setLoading(false);
  };

  useEffect(() => {
    fetchSecurityQuestions(data);
    //eslint-disable-next-line
  }, [data]);

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      {loading ? (
        <Grid container justify="center" style={{ padding: "50px 0" }}>
          <CircularProgress />
        </Grid>
      ) : (
        <React.Fragment>
          <Grid container spacing={2}>
            {questions.map((question, index) => (
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
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Grid container justify="flex-end">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleBack}
                  startIcon={<ArrowBackIcon />}
                >
                  Back
                </Button>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                endIcon={<ArrowForwardIcon />}
              >
                Next
              </Button>
            </Grid>
          </Grid>
        </React.Fragment>
      )}
    </form>
  );
}

function NewPasswordForm({ onFormSubmit, handleBack, resetting, ...props }) {
  const { register, handleSubmit, watch, errors } = useForm();

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            type="password"
            id="password"
            label="New Password"
            name="password"
            autoComplete="password"
            autoFocus
            my={1}
            inputRef={register({
              required: "Password is required.",
            })}
            error={Boolean(errors.password)}
            helperText={errors.password?.message}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            name="passwordConfirmation"
            variant="outlined"
            margin="normal"
            fullWidth
            type="password"
            id="passwordConfirmation"
            label="Confrim New Password"
            autoComplete="passwordConfirmation"
            my={1}
            inputRef={register({
              required: "Password confirmation is required.",
              validate: value =>
                value === watch("password") || "Passwords don't match.",
            })}
            error={Boolean(errors.passwordConfirmation)}
            helperText={errors.passwordConfirmation?.message}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Grid container justify="flex-end">
            <Button
              variant="contained"
              color="primary"
              onClick={handleBack}
              startIcon={<ArrowBackIcon />}
            >
              Back
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={resetting}
            endIcon={resetting ? <Loading size={20} /> : null}
          >
            Reset Password
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
