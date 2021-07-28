import React from "react";

import { useTableState } from "../../contexts/table_state";
import { getPotSum } from "../utils/table";
import { useStore } from "../../contexts/store";
import { toFloat } from "../utils/player";

function PotsContainer({ ...props }) {
  const [tableState, ] = useTableState();
  const [store, ] = useStore();

  // check that dependencies exist
  if (!tableState?.game?.pot) {
      return null;
  }

  let pot_index = 0;

  let pot_sum = getPotSum(tableState.game.pot);

  return (
    <div className="pots_container" style={{ top: 10, left: 20 }}>
      <div
        className={`btn info pot disable_selection_pot_${pot_index}`}
        style={{
          top: pot_index * 30
        }}
      >
        {toFloat(pot_sum, store["numberFormat"])}
      </div>
    </div>
  );
}

export default PotsContainer;
