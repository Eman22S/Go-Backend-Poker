import React, { useState, useEffect } from "react";

import { useTableState } from "../../contexts/table_state";
import { toFloat } from "../utils/player";
import { useStore } from "../../contexts/store";

//!! Need to create processedActionTracker state to avoid multiple setTimeout bugs
function LatestAction({ player, ...props }) {
  const [tableState, ] = useTableState();
  const [store, ] = useStore();
  const [actionNumTracker, setActionNumTracker] = useState({}); // for the five game turns
  const [lastAction, setLastAction] = useState(null);
  const [winAction, setWinAction] = useState(null);

  // set winning action of a player if exists
  useEffect(() => {
    // get player wininning data
    let player_win_data = null;
    if (player.md5 && tableState.game.winners_data) {
      player_win_data = tableState.game.winners_data[player.md5];
    }

    if (player_win_data) {
      // if player has won
      let winning_action = null;
      if (player_win_data.hand_description.toLowerCase() === "refund") {
        winning_action = `${window._("COM_CAMERONA_REFUNDED")} ${toFloat(
          player_win_data.total,
          store["numberFormat"]
        )}`;
      } else {
        winning_action = `${window._("COM_CAMERONA_WON")} ${toFloat(
          player_win_data.total,
          store["numberFormat"]
        )}`;
      }
      setWinAction(winning_action);
    } else {
      setWinAction(null);
    }
  }, [tableState.game.winners_data, store, player.md5]);

  //!! logic only uses actions number tracker, to avoid bugs use processed action tracker
  // set last bet action of player if player has no winning action
    useEffect(() => {
    let timeout = null;
    if (!winAction) {
      // check if game_turn exists, otherwise abort
      let game_turn = tableState.game.game_turn;
      let game_turn_exists = game_turn || game_turn === 0;
      if (!game_turn_exists) {
        return;
      }

      // check round bet array exists, otherwise abort
      let round_bet_array = tableState.game.bet
        ? tableState.game.bet[game_turn]
        : null;
      if (!round_bet_array) {
        return;
      }

      let my_actions = round_bet_array.filter(
        bet_data => bet_data[0] === player.md5 // bet_data[0] is md5 of a player
      );
      let last_action_index = my_actions.length - 1;
      let last_action_md5 = my_actions[last_action_index] && my_actions[last_action_index][3];
      if (last_action_md5 && !actionNumTracker[last_action_md5]) {
        let last_action = my_actions[last_action_index][2];
        setLastAction(last_action);
        timeout = setTimeout(function() {
          setActionNumTracker(prevActionNumTracker => {
            return { ...prevActionNumTracker, [last_action_md5]: true};
          });
          setLastAction(null);
        }, 4000); // the rate latest action disappears
      }
    }

    // don't need to clear timeout since we don't need to reset it
    return () => {
        timeout && clearTimeout(timeout);
    };
  }, [
    winAction,
    tableState.game.bet,
    tableState.game.game_turn,
    actionNumTracker,
    store.numberFormat, //! change of this will break logic, now it doesn't change
    player.md5
  ]);

  // get the player action
  let player_action = winAction ? winAction : lastAction;

  return player_action ? (
    <div
      className="latest_action alert-message warning"
      id={`latest_action_${player.md5}`}
    >
      <span>{player_action}</span>
    </div>
  ) : null;
}

export default LatestAction;
