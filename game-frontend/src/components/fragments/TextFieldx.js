import React from "react";

import { styled } from "@material-ui/core/styles";
import { compose, spacing } from "@material-ui/system";
import TextField from "@material-ui/core/TextField";

function TextFieldx({ ...props }) {
  return (
    // input label props needed to be set here override some bootstrap messing css
    <TextField InputLabelProps={{ style: { width: "initial" } }} {...props}>
      {props.children}
    </TextField>
  );
}

/**
 * Incorporate material-ui system declerative approach of styling, haleluya!!
 */
export default styled(TextFieldx)(compose(spacing));
