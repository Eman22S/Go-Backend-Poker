import React from "react";

import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";

const StyledMenuItem = withStyles((theme) => ({
    // root: {
    //   '&:focus': {
    //     backgroundColor: theme.palette.primary.main,
    //     '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
    //       color: theme.palette.common.white,
    //     },
    //   },
    //   '&:hover': {
    //     backgroundColor: theme.palette.primary.main,
    //     '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
    //       color: theme.palette.common.white,
    //     },
    //   },
    // },
}))(MenuItem);


function StyledMenuItemComponent({ ...props }) {
    return <StyledMenuItem {...props}>{props.children}</StyledMenuItem>;
}

export default StyledMenuItemComponent;
  
