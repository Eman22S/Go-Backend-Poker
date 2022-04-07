import React from "react";

import { useAssetPaths } from "../../contexts/asset_paths";
import { useStore } from "../../contexts/store";
import { useTableState } from "../../contexts/table_state";

import PlayerTimer from "./PlayerTimer";

import { toFloat } from "../utils/player";
import { connection_status_legend } from "../utils/constants";

function PlayerInfo({ player, on_new_table_state, ...props }) {
  const assetPaths = useAssetPaths();
  const [store, ] = useStore();
  const [tableState, ] = useTableState();

  // get class if player is myself
  let player_me_class =
    player.id && store.player?.id === player.id ? "my_player_info" : "";

  // set connection status of player, defaults to excellent
  let connection_status_class = player.meta?.latency || 0;
  let connection_status_title =
    connection_status_legend[connection_status_class];

  // show player as faded if not active
  let active_opacity =
    "active" === player.meta?.status?.toLowerCase() ? 1 : 0.5;

  // check if player has some special role in the game
  let is_small_blind = false;
  let is_big_blind = false;
  let winner_class = "";
  if (player.md5) {
    is_small_blind = tableState.game.sb_player_key === player.md5;
    is_big_blind = tableState.game.bb_player_key === player.md5;


    if(tableState.game_meta.game_type === "five_card_stud") //Don't show any big/ small blind badge for five stud
    {
      is_small_blind = false;
      is_big_blind = false;
    }


    // get winner class if player is a winner
    winner_class =
      tableState.game.winners_data && tableState.game.winners_data[player.md5]
        ? "winner"
        : "";
  }
  let is_dealer = Boolean(player.meta?.is_dealer);

  return (
    <div className="player_info_container">
      <div
        className={`player_info ${player_me_class} ${winner_class}`}
        id={player.md5}
        style={{ opacity: active_opacity }}
      >
        <div className="player_info_contents">
          <div
            className={`connection_status connection_status_${connection_status_class}`}
            title={`Connection: ${connection_status_title}`}
          ></div>
          <div className="avatar_image_container">
            <img
              src={`${assetPaths.imagePath}no_avatar.png`}
              className="player_img"
              alt={`Player ${player.username} Avatar`}
              style={{
                height: "auto",
                width: "auto"
              }}
              id={`img_${player.md5}`}
            />
          </div>
          <div id={`name_${player.md5}`} className="player_name">
            {player.username}
          </div>
          <div id={`cash_${player.md5}`} className="player_cash">
            {toFloat(player.chips, store["numberFormat"])}
          </div>
          <div className="indicators">
            {is_dealer && <div className="dealer" title="Dealer Button"></div>}
            {is_small_blind && (
              <div className="small_blind" title="Small Blind"></div>
            )}
            {is_big_blind && (
              <div className="big_blind" title="Big Blind"></div>
            )}
            {player.meta?.is_celebrity && (
              <div className="celebrity" title="Celebrity Player"></div>
            )}
          </div>
        </div>
        {player.is_myturn && (
          <PlayerTimer
            player={player}
            on_new_table_state={on_new_table_state}
          />
        )}
      </div>
    </div>
  );
}

export default PlayerInfo;
