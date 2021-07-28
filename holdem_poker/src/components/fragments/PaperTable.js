import React from "react";

import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";

export default function PaperTable(props) {
  return (
    <Box
      width="100%"
      overflow="auto auto"
      mt={1}
      mb={2}
      clone
    >
      <Paper>{props.children}</Paper>
    </Box>
  );
}
