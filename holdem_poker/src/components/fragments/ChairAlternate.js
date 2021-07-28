import React from "react";

import { useAssetPaths } from "../../contexts/asset_paths";
import { getChairIndex } from "../utils/player";

import PlayerInfo from "./PlayerInfo";
import BettingRoundSum from "./BettingRoundSum";
import CountDown from "./CountDown";
import LatestAction from "./LatestAction";
import PlayerCards from "./PlayerCards";

function ChairAlternate({
  player,
  layout,
  players_num,
  base_chair,
  on_new_table_state,
  winners_cards,
  ...props
}) {
  const assetPaths = useAssetPaths();

  // get chair index for a player
  let chair_index = getChairIndex(player, base_chair, players_num);

  if (chair_index === null) {
    console.warn("Cannot get chair index for player: ", player);
    return null;
  } else if (!(layout[chair_index])) {
    return null;
  } else {
    // these are guaranteed not to fail since layout is checked with players_num in parent component
    let chair_img = layout[chair_index][0];
    let chair_classes = layout[chair_index][1];

    return (
      <div
        className={`chair open ${chair_classes}`}
        id={`chair_${chair_index}`}
      >
        <img
          src={`${assetPaths.imagePath}${assetPaths.themePath}/chairs/${chair_img}.png`}
          alt={`${chair_img}`}
          style={{ height: 150, width: 140 }}
        />
        <div className="avatar_marker">
          <PlayerInfo player={player} on_new_table_state={on_new_table_state} />
        </div>
        <div className="countdown_marker">
          <CountDown player={player} />
        </div>
        <div className="cards_marker">
          <PlayerCards
            player={player}
            winners_cards={winners_cards}
            on_new_table_state={on_new_table_state}
          />
        </div>
        <div className="sitdown_marker"></div>
        <div className="latest_action_marker">
          <LatestAction player={player} />
        </div>
        <div className="betting_round_sum_marker">
          <BettingRoundSum player={player} />
        </div>
      </div>
    );
  }
}

export default ChairAlternate;
