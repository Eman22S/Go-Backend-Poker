import React from "react";

import TextFieldx from "./TextFieldx";


function StyledFilterSelectComponent({ ...props }) {
    return <TextFieldx
                {...props}
                select
                size="small"
                variant="outlined"
                margin="normal"
                fullWidth
            >
                {props.children}
            </TextFieldx>;
}

export default StyledFilterSelectComponent;