import React, { useEffect, useState } from "react";

import { Link as RouterLink } from "react-router-dom";
import { useForm } from "react-hook-form";

import Typography from "@material-ui/core/Typography";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import TextFieldx from "../fragments/TextFieldx";
import Buttonx from "../fragments/Buttonx";
import MenuItem from "@material-ui/core/MenuItem";

import Loading from "../fragments/Loading";

import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const questions = [
  "What was the house number and street name you lived in as a child?",
  "What were the last four digits of your childhood telephone number?",
  "What primary school did you attend?",
  "In what town or city was your first full time job?",
  "In what town or city did you meet your spouse or partner?",
  "What is the middle name of your oldest child?",
  "What are the last five digits of your driver's license number?",
  "What is your grandmother's (on your mother's side) maiden name?",
  "What is your spouse or partner's mother's maiden name?",
  "In what town or city did your parents meet?",
  "What time of the day were you born? (hh:mm)",
  "What time of the day was your first child born? (hh:mm)",
];

export default function StepForm3({
  activeStep,
  onFormSubmit,
  handleBack,
  formData,
  submitLoading,
  ...props
}) {
  const {
    register,
    handleSubmit,
    watch,
    errors,
    setValue
  } = useForm({
    defaultValues: formData
      ? formData
      : {
          // react-hook-form needs values set here to work with default values properly
          question1: questions[0],
          answer1: "2073 George VI street",
          question2: questions[1],
          answer2: "1653",
        },
  });

  const [agree, setAgree] = useState(false);

  const signupDisabled = !agree || submitLoading;

  const changeUsing = (valueSetter, validator) => (event) => {
    const { type, checked } = event.target;
    if (type === "checkbox") {
      setAgree(checked);
    } else {
      let value = event.target.value.trim();
      valueSetter(value);
      validator && validator(value);
    }
  };

  // use this handler so material-ui select can work with react-hook-form
  const changeSelectUsing = (name) => (e) => {
    setValue(name, e.target.value);
  };

  // custom register material-ui select so that they can work with react-hook-from properly
  useEffect(() => {
    register(
      { name: "question1" },
      {
        required: "Question 1 is required.",
        validate: (value) =>
          value !== watch("question2") ||
          "Question 1 must be different from question 2.",
      }
    );
    register(
      { name: "question2" },
      {
        required: "Question 2 is required.",
        validate: (value) =>
          value !== watch("question1") ||
          "Question 2 must be different from question 1.",
      }
    );
  }, [register, watch]);

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} noValidate>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextFieldx
            select={true}
            name="question1"
            onChange={changeSelectUsing("question1")}
            defaultValue={questions[0]}
            variant="outlined"
            margin="normal"
            placeholder=""
            required
            fullWidth
            id="question1"
            label="Question 1"
            autoComplete="question1"
            autoFocus
            my={0.5}
            error={Boolean(errors.question1)}
            helperText={errors.question1?.message}
          >
            {questions.map((text, index) => (
              <MenuItem value={text} key={index}>
                {text}
              </MenuItem>
            ))}
          </TextFieldx>
        </Grid>
        <Grid item xs={12}>
          <TextFieldx
            name="answer1"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Answer 1"
            type="text"
            id="answer1"
            autoComplete=""
            my={1}
            inputRef={register({
              required: "Answer 1 is required.",
            })}
            error={Boolean(errors.answer1)}
            helperText={errors.answer1?.message}
          />
        </Grid>
        <Grid item xs={12}>
          <TextFieldx
            select={true}
            name="question2"
            onChange={changeSelectUsing("question2")}
            defaultValue={questions[1]}
            variant="outlined"
            margin="normal"
            placeholder=""
            required
            fullWidth
            id="question2"
            label="Question 2"
            autoComplete="question2"
            autoFocus
            my={0.5}
            error={Boolean(errors.question2)}
            helperText={errors.question2?.message}
          >
            {questions.map((text, index) => (
              <MenuItem value={text} key={index}>
                {text}
              </MenuItem>
            ))}
          </TextFieldx>
        </Grid>
        <Grid item xs={12}>
          <TextFieldx
            name="answer2"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Answer 2"
            type="text"
            id="answer2"
            autoComplete=""
            my={1}
            inputRef={register({
              required: "Answer 2 is required.",
            })}
            error={Boolean(errors.answer2)}
            helperText={errors.answer2?.message}
          />
        </Grid>

        <Grid item xs={12} sm={12}>
          <Grid container justify="center">
            <Buttonx
              variant="contained"
              color="primary"
              disabled={activeStep === 0}
              onClick={handleBack}
              startIcon={<ArrowBackIcon />}
            >
              Back
            </Buttonx>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                value="allowExtraEmails"
                label="Start"
                color="primary"
                name="agree"
                checked={agree}
                onChange={changeUsing(setAgree)}
              />
            }
            label={
              <Typography variant="caption" style={{ color: "white" }}>
                I agree with
                <span> </span>
                <Link to="/legalTerms" underline="hover" component={RouterLink}>
                  Terms of Service
                </Link>
                <span> & </span>
                <Link
                  to="/legalTerms/privacyPolicy"
                  title="Privacy Policy "
                  component={RouterLink}
                >
                  Privacy Policy
                </Link>
              </Typography>
            }
            style={{ width: "initial" }} // need to override some bootstrap css
          ></FormControlLabel>

          <Box mt={3} mb={1}>
            <Buttonx
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={Boolean(signupDisabled)}
              endIcon={submitLoading ? <Loading size={20} /> : null}
            >
              Sign Up
            </Buttonx>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
}
