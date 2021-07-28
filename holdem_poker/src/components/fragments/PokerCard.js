import React from "react";

import { useAssetPaths } from "../../contexts/asset_paths";
import { getNumberCardWinnerClass } from "../utils/table";
import { numberCardClass } from "../utils/constants";
import { cardImagePath } from "../../utils/image_utils";

const CardNameClasses = {
  flop1: "flop1",
  flop2: "flop2",
  flop3: "flop3",
  turn: "turn",
  river: "river"
};

function PokerCard({ number, type, winners_cards, ...props }) {
  const assetPaths = useAssetPaths();

  const name_class = CardNameClasses[type];
  const type_class = numberCardClass(number);
  const winner_class = getNumberCardWinnerClass(winners_cards, number);

  return (
    <div
      className={`card ${name_class} ${type_class} ${winner_class}`}
      style={{
        opacity: 1,
        visibility: "visible",
        top: 0,
        left: 0
      }}
    >
      <img src={cardImagePath(assetPaths)} alt={type} />
    </div>
  );
}

export default PokerCard;
