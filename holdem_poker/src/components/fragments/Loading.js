import React from "react";

import CircularProgress from "@material-ui/core/CircularProgress";

export default function Loading({ style, ...props }) {
  return <CircularProgress style={{ color: "#fff", ...style }} {...props} />;
}
