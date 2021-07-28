import React from "react";

const TableStateContext = React.createContext(null);

/**
 * Custom hook to use table state
 */
function useTableState() {
  return React.useContext(TableStateContext);
}

export { useTableState, TableStateContext };
