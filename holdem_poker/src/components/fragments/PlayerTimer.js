import React, { useEffect, useState } from "react";

import { useTableState } from "../../contexts/table_state";
import useGrpcClient from "../../contexts/grpc_client";

import Loading from "./Loading";

function PlayerTimer({ player, on_new_table_state, ...props }) {
  const [tableState, ] = useTableState();
  const grpc_client = useGrpcClient();

  const [remainingSeconds, setRemainingSeconds] = useState(null);
  const [totalSeconds, setTotalSeconds] = useState(null);
  const [timerActionLoading, setTimerActionLoading] = useState(false);

  const [timerWidth, setTimerWidth] = useState(100); // width in %

  // setup player timer for action
  useEffect(() => {
    let table_timer_seconds = parseInt(tableState.game_meta.timer);
    // check that dependencies exist
    if (
      !table_timer_seconds &&
      !tableState.game_meta.server_time &&
      !player.myturn_start_time
    ) {
      console.warn(
        "Couldn't get dependencies to setup player timer for action"
      );
      return;
    }

    // set total timer for a player turn from table state
    setTotalSeconds(table_timer_seconds);

    // find player remaining seconds from table state
    let remaining_player_seconds =
      table_timer_seconds -
      (tableState.game_meta.server_time - player.myturn_start_time);
    setRemainingSeconds(remaining_player_seconds);

    // create timer that reduces remaining seconds every second
    let timer_interval = setInterval(function () {
      setRemainingSeconds(function (prevRemainingSeconds) {
        let remaining_player_seconds = --prevRemainingSeconds;

        if (remaining_player_seconds < 0) {
          setTimerActionLoading(true);
          clearInterval(timer_interval);

          return 0;
        }

        return remaining_player_seconds;
      });
    }, 1000);

    // clear timer interval when this effect need to be changed
    return () => {
      clearInterval(timer_interval);
    };
  }, [
    grpc_client,
    tableState.game_meta.timer,
    tableState.game_meta.server_time,
    player.myturn_start_time,
  ]);

  // set timer width in UI when remaining or total seconds change
  useEffect(() => {
    if (remainingSeconds && totalSeconds) {
      setTimerWidth((remainingSeconds / totalSeconds) * 100); // width in %
    }
  }, [remainingSeconds, totalSeconds]);

  // reset timer action loading when turn changes
  useEffect(() => {
    setTimerActionLoading(false);
  }, [player.myturn_start_time]);

  return (
    <div className="player_timer_container">
      <div className="player_timer" style={{ width: `${timerWidth}%` }}></div>
      {timerActionLoading && <Loading size={20} style={{ float: "right" }} />}
    </div>
  );
}

export default PlayerTimer;
