import React, { useState, useEffect } from "react";

import { useTableState } from "../../contexts/table_state";
import { number_exists } from "../../utils/number_utils";

import Chips from "./Chips";

function ChipsContainer({ ...props }) {
  const [tableState, ] = useTableState();
  const [betTracker, setBetTracker] = useState([]);
  const [processedBetMd5Tracker, setProcessedBetMd5Tracker] = useState({});

  // Process bets to be tracked
  useEffect(() => {
    // check if dependencies exist
    if (!number_exists(tableState.game.game_turn) || !tableState.game.bet) {
      return;
    }

    let game_turn = tableState.game.game_turn;
    let this_turn_tracker = betTracker[game_turn];
    let round_bet_array = tableState.game.bet[game_turn]; // don't forget bets are set in descending time order in backend, who did this??

    // check this round bet array does exist
    if (!round_bet_array) {
      return;
    }

    // handle backend quirk which orders in ascending time the first time small blind and big bling post
    if (game_turn === 0 && round_bet_array.length === 2) {
      round_bet_array = round_bet_array.reverse();
    }

    // check if a new bet needs to be tracked and process it
    if (this_turn_tracker) {
      let length_diff = round_bet_array.length - this_turn_tracker.length;
      // if bet tracker length is different from tableState bet, add a bet to be tracked
      if (length_diff > 0) {
        let bet_index_to_track = length_diff - 1;
        let bet_to_track = round_bet_array[bet_index_to_track];
        // process bet to track if only its unique md5 does not exist in processed bet md5 tracker
        if (!processedBetMd5Tracker[bet_to_track[3]]) {
          // update processed bet md5 tracker to include the new bet to be tracked
          setProcessedBetMd5Tracker((prevBetMd5Tracker) => ({
            ...prevBetMd5Tracker,
            [bet_to_track[3]]: true,
          }));

          // update bet tracker to include the new bet to be tracked
          setBetTracker((prevBetTracker) => {
            prevBetTracker[game_turn] = [
              ...prevBetTracker[game_turn],
              bet_to_track,
            ];
            return prevBetTracker;
          });
        }
      }
    } else {
      // if no bet tracked for game turn, create bet array for game turn
      if (round_bet_array.length > 0 && round_bet_array[0]) {
        let first_bet_index = round_bet_array.length - 1;
        let bet_to_track = round_bet_array[first_bet_index];
        // update processed bet md5 tracker to include the new bet to be tracked
        setProcessedBetMd5Tracker((prevBetMd5Tracker) => ({
          ...prevBetMd5Tracker,
          [bet_to_track[3]]: true,
        }));

        // create new array and update bet tracker to include the new bet to be tracked
        setBetTracker((prevBetTracker) => {
          prevBetTracker.push([
            bet_to_track, // slice to clone it
          ]); // push new array to track the game turn
          return prevBetTracker;
        });
      }
    }
  }, [
    tableState.game.bet,
    tableState.game.game_turn,
    processedBetMd5Tracker,
    betTracker,
  ]);

  return (
    <React.Fragment>
      {betTracker.map((round_bets, index) =>
        round_bets.map((bet_array, i) => (
          <Chips
            chips_value={parseInt(bet_array[1])}
            bet_md5={bet_array[3]}
            key={index + i}
          />
        ))
      )}
    </React.Fragment>
  );
}

export default ChipsContainer;
