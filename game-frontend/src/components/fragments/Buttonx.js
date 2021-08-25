import React from "react";

import { styled } from "@material-ui/core/styles";
import { compose, spacing, palette } from "@material-ui/system";
import Button from "@material-ui/core/Button";

function Buttonx({ ...props }) {
    return <Button size="small" {...props}>{props.children}</Button>;
}

/**
 * Incorporate material-ui system declerative approach of styling, haleluya!!
 */
export default styled(Buttonx)(compose(spacing, palette));
