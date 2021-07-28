import React from "react";

import { useTableState } from "../../contexts/table_state";

import PokerCard from "./PokerCard";

function CommunityCards({ winners_cards, ...props }) {
  const [tableState, ] = useTableState();

  return tableState?.game ? (
    <div className="community_cards">
      {tableState.game.flop?.map((card_number, index) => (
        <div className={`flop${index + 1}_marker marker`} key={index}>
          <PokerCard
            number={card_number}
            type={`flop${index + 1}`}
            winners_cards={winners_cards}
          />
        </div>
      ))}

      {tableState.game.turn && (
        <div className="turn_marker marker">
          <PokerCard
            number={tableState.game.turn}
            type="turn"
            winners_cards={winners_cards}
          />
        </div>
      )}

      {tableState.game.river && (
        <div className="river_marker marker">
          <PokerCard
            number={tableState.game.river}
            type="river"
            winners_cards={winners_cards}
          />
        </div>
      )}
    </div>
  ) : null;
}

export default CommunityCards;
