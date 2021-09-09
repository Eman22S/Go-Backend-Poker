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
    numberFormat: { decimal: ".", decimals: 2,
    // store player mock data
    // Should get this from service later
    player: {
      "name": "Mathew Doyle",
      "username": "Test8",
      "chair": 0,
      "status": "active",
      "chips": "4980",
      "can_addon": false,
      "can_raise": true,
      "latency": 0,
      "is_celebrity": "0",
      "bet2do": 0,
      "user_id": "7771",
      "md5": "cd81cfd0a3397761fac44ddbe5ec3349",
      "action": "none",
      "score": 0,
      "is_dealer": false,
      "is_myturn": true,
      "can_draw": false,
      "should_show_prize_revealer": true,
      "hand_description": "",
      "myturn_start_time": 1630746491,
      "cards": [],
      "is_allin": false,
      "is_away": null,
      "timeouts": [],
      "latency_time_ms": null,
      "is_idle_hand": true,
      "idle_hand_count": 0,
      "amount_raked": null,
      "was_small_blind_missed": null,
      "was_big_blind_missed": null,
      "is_automuck_enabled": false,
      "resit_at_next_big_blind": null
  }
   },
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
