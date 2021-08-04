import React, { createContext, useState, useContext, useCallback } from "react";

/**
 * A context to hold shared global state as store (don't know if this approach is best but hate redux anyway)
 * !! Beware, store values are stored as an object with their name as key
 */
const StoreContext = createContext(null);

/**
 * Higher level component to wrap app to have stable shared global store state
 * @param {any} props : props: will also be sent to child component
 */
function StoreProvider(props) {
  // app global state storage
  const [store, setStore] = useState({
    numberFormat: { decimal: ".", decimals: 2 },
  });

  /**
   * a handy interface to update store state, will expose this interface but not setStore to child components
   * @param {str} key: the key of the store object to be updated
   * @param {function} valueUpdater: function takes in current value of key and returns updated value
   * @param {boolean} clear: if true clears store before setting the new object in store
   */
  const updateStore = useCallback(function (key, valueUpdater, clear = false) {
    if (clear) {
      setStore((store) => ({ [key]: valueUpdater(store[key]) }));
    } else {
      setStore((store) => ({ ...store, [key]: valueUpdater(store[key]) }));
    }
  }, []);

  return <StoreContext.Provider value={[store, updateStore]} {...props} />;
}

/**
 * Custom hook to use store context
 */
function useStore() {
  return useContext(StoreContext);
}

/**
 * Extends any component to have a shared global state or store
 * @param {component} Component : a react component to have a shared global state
 * @param {any} props : props to be transfered to wrapped component
 */
function withStore(Component, props) {
  return function () {
    return (
      <StoreProvider>
        <Component {...props} />
      </StoreProvider>
    );
  };
}

export { StoreProvider, useStore, withStore };
