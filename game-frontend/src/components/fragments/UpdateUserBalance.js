import React from "react";
import { useForm } from "react-hook-form";

import Grid from "@material-ui/core/Grid";
import TextFieldx from "../fragments/TextFieldx";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Loading from "../fragments/Loading";
import Buttonx from "../fragments/Buttonx";


export default function UpdateUserBalance({
  onSubmit,
  onCancel,
  type,
  loading,
  formData,
  ...props
}) {
  const {
    register,
    handleSubmit,
    errors,
  } = useForm({
    defaultValues: formData
      ? formData
      : {
        // react-hook-form needs values set here to work with default values properly
        cash_amount: 0,
        points_amount: 0,
        update_message: "",
      },
  });
  const [btnLoading, setBtnLoading] = React.useState(loading);
  React.useEffect(() => {
    setBtnLoading(loading);
  }, [loading])

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextFieldx
            name="cash_amount"
            autoComplete="cash_amount"
            variant="outlined"
            required
            fullWidth
            id="cash_amount"
            label="Cash Amount"
            autoFocus
            my={1}
            inputRef={register({
                required: "real money amount is required.",
            })}
            error={Boolean(errors.cash_amount)}
            helperText={errors.cash_amount?.message}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextFieldx
            name="points_amount"
            variant="outlined"
            fullWidth
            required
            id="points_amount"
            label="Points Amount"
            autoComplete="points_amount"
            my={1}
            inputRef={register({
                required: "points amount is required.",
            })}
            error={Boolean(errors.points_amount)}
            helperText={errors.points_amount?.message}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextFieldx
            name="update_message"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Memo"
            type="update_message"
            id="update_message"
            autoComplete=""
            my={1}
            inputRef={register({
              required: "Memo is required.",
            })}
            error={Boolean(errors.update_message)}
            helperText={errors.update_message?.message}
          />
        </Grid>
      </Grid>
      <Container align="center">
        <Box m={2}>
          <Buttonx
            variant="outlined"
            endIcon={btnLoading && <Loading size={12}/>}
            color="default"
            m={1}
            onClick={onCancel}
          >
              Cancel
          </Buttonx>
          <Buttonx
            type="submit"
            variant="outlined"
            endIcon={btnLoading && <Loading size={12}/>}
            bgcolor={type === 'Credit' ? "primary.main" : "secondary.main"}
            m={1}
          >
              {type}
          </Buttonx>
        </Box>
      </Container>
    </form>
  );
}
