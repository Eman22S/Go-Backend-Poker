import React from "react";
import { useForm } from "react-hook-form";

import Grid from "@material-ui/core/Grid";
import TextFieldx from "../fragments/TextFieldx";
import Buttonx from "../fragments/Buttonx";

import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

export default function StepForm1({
  activeStep,
  onFormSubmit,
  handleBack,
  formData,
  ...props
}) {



  const {
    register,
    handleSubmit,
    watch,
    errors,
  } = useForm({
    defaultValues: formData
      ? formData
      : {
          // react-hook-form needs values set here to work with default values properly
          username: "test9",
          email: "test9@neba.com",
          password: "user.password",
          confirmPassword: "user.password",
          firstName: "Robert",
          lastName: "Birmingham",
        },
  });

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} noValidate>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextFieldx
            name="firstName"
            autoComplete="firstName"
            variant="outlined"
            required
            fullWidth
            id="firstName"
            label="First Name"
            autoFocus
            my={1}
            inputRef={register({
              required: "First name is required.",
              pattern: {
                value: /^([a-zA-Z \-'\s]{1,32}){1}$/,
                message: "Invalid first name.",
              },
            })}
            error={Boolean(errors.firstName)}
            helperText={errors.firstName?.message}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextFieldx
            name="lastName"
            variant="outlined"
            fullWidth
            id="lastName"
            label="Last Name"
            autoComplete="lastName"
            my={1}
            inputRef={register({
              required: "Last name is required.",
              pattern: {
                value: /^([a-zA-Z \-'\s]{1,32}){1}$/,
                message: "Invalid last name.",
              },
            })}
            error={Boolean(errors.lastName)}
            helperText={errors.lastName?.message}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextFieldx
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            my={1}
            inputRef={register({
              required: "Username is required.",
              minLength: {
                value: 2,
                message: "Username should be greater than 1 character.",
              },
              pattern: {
                // no special character
                value: /^\w+$/,
                message: "Username cannot contain special characters.",
              },
            })}
            error={Boolean(errors.username)}
            helperText={errors.username?.message}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextFieldx
            name="email"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            autoComplete="email"
            autoFocus
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
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextFieldx
            name="password"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            id="password"
            autoComplete=""
            my={1}
            inputRef={register({
              required: "Password is required.",
              minLength: {
                value: 4,
                message: "Password length must be at least 4 characters.",
              },
            })}
            error={Boolean(errors.password)}
            helperText={errors.password?.message}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextFieldx
            name="confirmPassword"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Confirm Password"
            type="password"
            id="confrimPassword"
            autoComplete=""
            my={1}
            inputRef={register({
              required: "Confirm password is required.",
              validate: (value) =>
                value === watch("password") || "Password did not match.",
            })}
            error={Boolean(errors.confirmPassword)}
            helperText={errors.confirmPassword?.message}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextFieldx
            variant="outlined"
            margin="normal"
            fullWidth
            id="user_rewards_id"
            label="User Rewards ID"
            name="user_rewards_id"
            autoComplete="user_rewards_id"
            autoFocus
            my={1}
            inputRef={register()}
            error={Boolean(errors.user_rewards_id)}
            helperText={errors.user_rewards_id?.message}
          />
        </Grid>


        <Grid item xs={12} sm={6}>
          <TextFieldx
            variant="outlined"
            margin="normal"
            fullWidth
            id="phone"
            label="Phone number"
            name="phone"
            autoComplete="phone"
            autoFocus
            type="tel"
            inputRef={register({
              required: "Phone cannot be blank.",
              pattern: {
                //eslint-disable-next-line
                value: /^(?:(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d?)\)?)?[\-\.\ \\\/]?)?((?:\(?\d{1,}\)?[\-\.\ \\\/]?){0,})(?:[\-\.\ \\\/]?(?:#|ext\.?|extension|x)[\-\.\ \\\/]?(\d+))?$/i,
                message: "Invalid phone number",
              },
            })}

            my={1}

            error={Boolean(errors.phone)}
            helperText={errors.phone?.message}
          />
        </Grid>


        <Grid item xs={12} sm={6}>
          <Grid container justify="flex-end">
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
        <Grid item xs={12} sm={6}>
          <Buttonx
            type="submit"
            variant="contained"
            color="primary"
            endIcon={<ArrowForwardIcon />}
          >
            Next
          </Buttonx>
        </Grid>
      </Grid>
    </form>
  );
}
