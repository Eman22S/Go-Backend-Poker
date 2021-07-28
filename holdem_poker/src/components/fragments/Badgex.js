import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

const primaryColor = "#9c27b0";
const warningColor = "#ff9800";
const dangerColor = "#f44336";
const successColor = "#4caf50";
// const infoColor = "#00acc1";
// const roseColor = "#e91e63";
// const grayColor = "#999999";

const styles = {
  badge: {
    marginRight: "3px",
    borderRadius: "12px",
    padding: "5px 12px",
    textTransform: "uppercase",
    fontSize: "12px",
    fontWeight: "500",
    lineHeight: "1",
    color: "#fff",
    textAlign: "center",
    whiteSpace: "nowrap",
    verticalAlign: "baseline",
    display: "inline-block"
  },
  REGISTERING: {
    // TODO: this is for testing purpose I will change it later
    backgroundColor: warningColor
  },
  PENDING: {
    backgroundColor: primaryColor
  },
  CANCELLED: {
    backgroundColor: dangerColor
  },
  ACTIVE: {
    backgroundColor: successColor
  },
  FINISHED: {
    backgroundColor: "#6c757d"
  },
  gray: {
    backgroundColor: "#6c757d",
  }
};
const useStyles = makeStyles(styles);

export default function Badgex( { status, color, children, ...other }) {
  const classes = useStyles();
  return (
    <span className={classes.badge + " " + classes[color] + " " + classes[status]} {...other}>{children}</span>
  );
}

Badgex.defaultProps = {
  color: "gray"
};

Badgex.propTypes = {
  status: PropTypes.oneOf([
      "REGISTERING",
      "PENDING",
      "ACTIVE",
      "CANCELLED",
      "FINISHED",
  ]),
  children: PropTypes.node
};
