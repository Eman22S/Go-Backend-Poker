import React, { useRef, useEffect, useState } from "react";

import { useTableState } from "../../contexts/table_state";
import { useStore } from "../../contexts/store";
import { toFloat } from "../utils/player";

function getCurrentTimeDisplay() {
  let cur_date = new Date();
  let time_display =
    (cur_date.getHours() / 12 > 1
      ? cur_date.getHours() - 12
      : cur_date.getHours()) +
    ":" +
    (cur_date.getMinutes() < 10
      ? "0" + cur_date.getMinutes()
      : cur_date.getMinutes());

  if (cur_date.getHours() > 12) {
    time_display += "pm";
  } else {
    time_display += "am";
  }

  return time_display;
}

function getTimeDisplay(timestamp) {
  // Create a new JavaScript Date object based on the timestamp
  // multiplied by 1000 so that the argument is in milliseconds, not seconds.
  let date = new Date(timestamp * 1000);
  // Hours part from the timestamp
  let hours = date.getHours();
  let day_time = hours > 12 ? "pm" : "am";
  hours = hours / 12 > 1 ? hours - 12 : hours;

  // Minutes part from the timestamp
  let minutes = "0" + date.getMinutes();

  // Will display time in 10:30:23 format
  let formattedTime = `${hours}:${minutes.substr(-2)}${day_time}`;

  return formattedTime;
}

const betting_round_name = ["PRE-FLOP", "FLOP", "TURN", "RIVER"];

function TableChat({ ...props }) {
  const [tableState, ] = useTableState();
  const [store, ] = useStore();
  const [betCount, setBetCount] = useState(0);
  const messagesEndEl = useRef(null);
  useEffect(() => {
      let tempBet = tableState.game.bet;
      if(tempBet && tempBet[0] && tempBet[0].length !== betCount){
        setBetCount(tempBet[0].length);
        messagesEndEl.current.scrollIntoView({ behavior: "smooth" })
      }
    }, [messagesEndEl, tableState.game.winners_data, tableState.game.bet, betCount]);
  

  const winner_descriptions = [];
  if (tableState.game?.winners_data && tableState.players) {
    for (let winner in tableState.game.winners_data) {
      if (tableState.game.winners_data[winner].hand_description?.length > 0) {
        // set up won or refunded amount description
        let amount_description = "";
        let hand_description = "";
        if (
          tableState.game.winners_data[winner].hand_description.toLowerCase() ===
          "refund"
        ) {
          amount_description = window._("COM_CAMERONA_REFUNDED");
        } else {
          amount_description = window._("COM_CAMERONA_WON");

          // set up won hand description
          hand_description =
            window._("COM_CAMERONA_WON_WITH") +
            " " +
            tableState.game.winners_data[winner].hand_description;
        }
        amount_description +=
          " " +
          toFloat(
            tableState.game.winners_data[winner]["total"],
            store["numberFormat"]
          ) +
          " ";

        // collect all winner descriptions
        let win_description = amount_description + hand_description;

        let table_description = `${tableState.players[winner]?.username} : ${win_description}`;

        // setup time
        let cur_date = new Date();
        // let date_display =
        //   (cur_date.getHours() / 12 > 1
        //     ? cur_date.getHours() - 12
        //     : cur_date.getHours()) +
        //   ":" +
        //   (cur_date.getMinutes() < 10
        //     ? "0" + cur_date.getMinutes()
        //     : cur_date.getMinutes());
        // if (cur_date.getHours() > 12) {
        //   date_display += "pm";
        // } else {
        //   date_display += "am";
        // }
        let new_text_id = cur_date.getTime() + "_shout";

        // add to winners descriptions to be shown
        winner_descriptions.push({
          div_id: new_text_id,
          message: table_description,
        });
      }
    }
  }

  // set up small and big blind username
  // let sb_username = "";
  // let bb_username = "";
  // if (tableState.players) {
  //   if (tableState.game?.sb_player_key) {
  //     sb_username =
  //       tableState.players[tableState.game?.sb_player_key]?.username;
  //   }
  //   if (tableState.game?.bb_player_key) {
  //     bb_username =
  //       tableState.players[tableState.game?.bb_player_key]?.username;
  //   }
  // }

  return (
    <div className="table_chat_container" style={{ margin: "auto" }}>
      <div className="table_chat_log">
        <div id="1575334584587_shout" className="game_announce dealer_source">
          <span className="time"></span>
          <span className="message">Hand ID : 84406</span>
        </div>
        {tableState.game?.bet.map((round_bet_data, game_turn) => (
          <React.Fragment>
            {game_turn > 0 && (
              <div
                id={`${game_turn}_shout`}
                className="game_announce dealer_source"
              >
                <span className="time"></span>
                <span className="message">
                  {betting_round_name[game_turn]} STARTED
                </span>
              </div>
            )}

            {round_bet_data.map((bet_data, index) => (
              /* bet_data structure
                bet_data[0]=player_md5,
                bet_data[1]=bet_amount, 
                bet_data[2]=bet_action_message,
                bet_data[3]=weird_unique_hash,
                bet_data[4]=bet_action_timestamp 
              */
              <div id={bet_data[3]} className="game_announce">
                <span className="time">{getTimeDisplay(bet_data[4])}</span>
                <span className="message">
                  {/* cut addtional bet message if all in is found int bet action message */}
                  {tableState.players[bet_data[0]]?.username} : {bet_data[2].indexOf("All in") === -1 ? bet_data[2]: "All in"}
                </span>
              </div>
            ))}
          </React.Fragment>
        ))}

        {winner_descriptions.map((ele, index) => (
          <div
            id={ele.div_id}
            className="game_announce dealer_source"
            key={index}
          >
            <span className="time">{getCurrentTimeDisplay()}</span>
            <span
              className="message"
              dangerouslySetInnerHTML={{ __html: ele.message }}
            />
          </div>
        ))}
        {/* Scroll to the end of the message so that new messags are shown */}
        <div style={{ float:"left", clear: "both" }}
             ref={messagesEndEl}>
        </div>
      </div>
      
      {/* chat text input */}
      <input className="new_table_chat" type="text" name="new_table_chat" />
    </div>
  );
}

export default TableChat;
