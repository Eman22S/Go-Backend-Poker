import React from "react";

/**
 * A context to get snackbar showing function for all components
 */
const SnackBarContext = React.createContext();

/**
 * Custom hook to use snackbar context
 */
function useSnackBarContext() {
  return React.useContext(SnackBarContext);
}

export { SnackBarContext, useSnackBarContext };
