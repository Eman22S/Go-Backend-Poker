import React from "react";

import { withStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";

const StyledTableCell = withStyles((theme) => ({
  root: {
    borderBottom: "none"
  },
  head: {
    backgroundColor: theme.palette.background.dark,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);


function StyledTableCellComponent({ ...props }) {
    return <StyledTableCell {...props}>{props.children}</StyledTableCell>;
  }

export default StyledTableCellComponent;