import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";

import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import Grid from "@material-ui/core/Grid";
import CountrySelect, { us_states } from "../fragments/CountrySelect";
import TextFieldx from "../fragments/TextFieldx";
import Buttonx from "../fragments/Buttonx";

import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

// default selected state
const default_state = us_states["MD"];
const default_id_state = us_states["DE"];

export default function StepForm2({
  activeStep,
  onFormSubmit,
  handleBack,
  formData,
  ...props
}) {
  // set selected input values here
  // to make form output and select input UI consistent
  // since react-hook-form and select input value are differently set
  let select_default_state = default_state;
  let select_default_id_state = default_id_state;
  if (formData) {
    // override defaults if formData found
    select_default_state = formData.state;
    select_default_id_state = formData.idState;
  }

  // state needed for UI purposes
  const [state, setState] = useState(select_default_state);
  const [idState, setIdState] = useState(select_default_id_state);

  const {
    register,
    handleSubmit,
    errors,
    setValue,
    control,
  } = useForm({
    defaultValues: formData
      ? formData
      : {
          // react-hook-form needs values set here to work with default values properly
          ssn: "666522949",
          zip: "207041563",
          state: select_default_state,
          city: "Beltsville",
          address: "PO BOX 1563",
          idNumber: "1035289",
          idState: select_default_id_state,
          dateOfBirth: new Date("06/05/1961"),
        },
  });

  // custom register material-ui select so that they can work with react-hook-from properly
  useEffect(() => {
    register({ name: "state" }, { required: "State is required." });
    register(
      { name: "idState" },
      { required: "Driver License state is required." }
    );
  }, [register]);

  // state changer to accomodate react-hook-form
  const changeState = (event, option) => {
    setValue("state", option);
    setState(option);
  };
  const changeIdState = (event, option) => {
    setValue("idState", option);
    setIdState(option);
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} noValidate>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextFieldx
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="ssn"
            label="Social Security Number"
            type="text"
            id="ssn"
            autoComplete=""
            my={1}
            inputRef={register({
              required: "Social security number is required.",
              pattern: {
                value: /^(\d{3}-\d{2}-\d{4}|\d{9}|\d{4})?$/,
                message: "Invalid social security number.",
              },
            })}
            error={Boolean(errors.ssn)}
            helperText={errors.ssn?.message}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Controller
              as={
                <KeyboardDatePicker
                  disableToolbar
                  disableFuture
                  autoOk
                  variant="inline"
                  inputVariant="outlined"
                  format="MM/dd/yyyy"
                  margin="normal"
                  fullWidth
                  style={{ marginTop: "8px" }}
                  InputLabelProps={{ style: { width: "initial" } }} // fix  messy bootstrap on label
                  id="dateOfBirth"
                  label="Birth Date"
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                  error={Boolean(errors.dateOfBirth)}
                  helperText={errors.dateOfBirth?.message}
                />
              }
              name="dateOfBirth"
              rules={{
                required: "Birth date is required.",
                validate: {
                  isDate: (value) => !isNaN(value.getTime()) || "Invalid date.",
                  notFuture: (value) =>
                    value < new Date() || "Future date is invalid.",
                },
              }}
              control={control}
            />
          </MuiPickersUtilsProvider>
        </Grid>

        <Grid item xs={12}>
          <CountrySelect
            value={state}
            onChange={changeState}
            TextFieldProps={{
              label: "State",
              margin: "normal",
              required: true,
              fullWidth: true,
              id: "state",
              my: 1,
              InputLabelProps: { style: { width: "initial" } }, // fix  messy bootstrap on label
              error: Boolean(errors.state),
              helperText: errors.state?.message,
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextFieldx
            name="city"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="City"
            type="text"
            id="city"
            autoComplete=""
            my={1}
            inputRef={register({
              required: "City is required.",
            })}
            error={Boolean(errors.city)}
            helperText={errors.city?.message}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextFieldx
            name="zip"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Zip"
            type="text"
            id="zip"
            autoComplete=""
            my={1}
            inputRef={register({
              required: "Zip is required.",
              pattern: {
                //eslint-disable-next-line
                value: /^([\d]{5}([\-]?[\d]{4})?){1}$/,
                message: "Invalid zip number.",
              },
            })}
            error={Boolean(errors.zip)}
            helperText={errors.zip?.message}
          />
        </Grid>

        <Grid item xs={12}>
          <TextFieldx
            name="address"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Address"
            type="text"
            id="address"
            autoComplete="address"
            my={1}
            inputRef={register({
              required: "Address is required.",
              pattern: {
                //eslint-disable-next-line
                value: /^([a-zA-Z0-9# \-'$ / \.]{1,60}){1}$/,
                message: "Invalid address.",
              },
            })}
            error={Boolean(errors.address)}
            helperText={errors.address?.message}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextFieldx
            name="idNumber"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Driver License Number"
            type="text"
            id="idNumber"
            autoComplete=""
            my={1}
            inputRef={register({
              required: "Driver license number is required.",
            })}
            error={Boolean(errors.idNumber)}
            helperText={errors.idNumber?.message}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CountrySelect
            value={idState}
            onChange={changeIdState}
            TextFieldProps={{
              label: "Driver License State",
              margin: "normal",
              required: true,
              fullWidth: true,
              id: "idState",
              my: 1,
              InputLabelProps: { style: { width: "initial" } }, // fix  messy bootstrap on label
              error: Boolean(errors.idState),
              helperText: errors.idState?.message,
            }}
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
