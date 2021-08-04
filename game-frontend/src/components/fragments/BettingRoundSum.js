import React from "react";

import { useStore } from "../../contexts/store";
import { useTableState } from "../../contexts/table_state";
import { getAllBetRoundSum, toFloat } from "../utils/player";

function BettingRoundSum({ player, ...props }) {
  const [store, ] = useStore();
  const [tableState, ] = useTableState();

  let bet_sum = getAllBetRoundSum(
    tableState.game.bet,
    player.md5
  );

  return bet_sum !== null ? (
    <div
      className="betting_round_sum label success"
      id={`betting_round_sum_${player.md5}`}
    >
      <span>{toFloat(bet_sum, store["numberFormat"])}</span>
    </div>
  ) : null;
}

export default BettingRoundSum;
