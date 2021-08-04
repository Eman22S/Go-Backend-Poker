import React from "react";

import Chair from "./fragments/Chair";

import { chairLayouts } from "./utils/constants";
import { useTableState } from "../contexts/table_state";
import { useSnackBarContext } from "../contexts/snackbar";

function Chairs({ on_new_table_state, winners_cards, ...props }) {
  const [tableState, ] = useTableState();
  const showSnackBar = useSnackBarContext();

  // check that main dependencies exist
  if (!tableState?.players || !tableState?.game_meta || !tableState?.game) {
    return null;
  }

  // number of players
  let players_num = null;

  // base chair to start from when showing players
  let base_chair = null;

  // Get players by order we want
  let players_by_ordering = null;

  players_by_ordering = Object.values(tableState.players);

  // determine starting player for ordering
  let starting_key =
    tableState.game.sb_player_key || tableState.game.bb_player_key;
  if (!starting_key) {
    return null;
  }
  let starting_chair_index = tableState.players[starting_key].chair;

  // set number of players
  players_num = tableState.game_meta.max_num_players || players_by_ordering.length;

  // sort player from starting player
  players_by_ordering.sort(function (a, b) {
    // need to get this to not affect player object
    let a_chair_index = parseInt(a.chair);
    let b_chair_index = parseInt(b.chair);

    if (a_chair_index === starting_chair_index) {
      // player_a should be first
      return -1;
    }

    if (b_chair_index < starting_chair_index) {
      // player b should be second if possible
      b_chair_index += parseInt(players_num);
    }
    if (a_chair_index < starting_chair_index) {
      // player a should be second if possible
      a_chair_index += parseInt(players_num);
    }

    // choose the one preferred to be first
    if (a_chair_index < b_chair_index) {
      return -1;
    } else {
      return 1;
    }
  });

  // find chair layout based on players number
  let chair_layout = chairLayouts[players_num];
  if (!chair_layout) {
    showSnackBar("Unsupported number of players are in the table.");
    return null;
  }

  // commented out for development purposes
  // if (store.player?.md5) {
  //   let me_player = tableState.players[store.player.md5];
  //   if (me_player) {
  //     base_chair =
  //       me_player.chair || me_player.chair === 0 ? me_player.chair : null;
  //   }
  // }

  // for development purposes only
  if (tableState.game.sb_player_key) {
    let sb_player = tableState.players[tableState.game.sb_player_key];
    if (sb_player) {
      base_chair =
        sb_player.chair || sb_player.chair === 0 ? sb_player.chair : null;
    }
  } else {
    console.warn("Couldn't get base chair dependencies.");
  }

  return (
    <React.Fragment>
      {players_by_ordering.map((player, index) => (
        <Chair
          player={player}
          layout={chair_layout}
          players_num={players_num}
          base_chair={base_chair}
          key={index}
          on_new_table_state={on_new_table_state}
          winners_cards={winners_cards}
        />
      ))}
    </React.Fragment>
  );
}

export default Chairs;
