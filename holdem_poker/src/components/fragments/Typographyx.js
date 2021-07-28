import React from "react";

import { styled } from "@material-ui/core/styles";
import { compose, spacing } from "@material-ui/system";
import Typography from "@material-ui/core/Typography";

function Typographyx({ ...props }) {
  return <Typography {...props}>{props.children}</Typography>;
}

/**
 * Incorporate material-ui system declerative approach of styling, haleluya!!
 */
export default styled(Typographyx)(compose(spacing));
