/**
 * Check if table type is no_limit
 * @param {str} table_type : no_limit | limit | pot_limit
 */
function isNoLimitType(table_type) {
  return "no_limit" === table_type?.toLowerCase();
}

/**
 * Check if table type is limit
 * @param {str} table_type : no_limit | limit | pot_limit
 */
function isLimitType(table_type) {
  return "limit" === table_type?.toLowerCase();
}

/**
 * Check if table type is pot_limit
 * @param {str} table_type : no_limit | limit | pot_limit
 */
function isPotLimitType(table_type) {
  return "pot_limit" === table_type?.toLowerCase();
}

/**
 * Get total sum of all pots
 * @param {array of obj} pot : array of pot objects
 */
function getPotSum(pot) {
  // sum up each pot object total
  let pot_sum = pot.reduce(
    (accumulator, pot_obj) => accumulator + parseFloat(pot_obj.total),
    0 // initial sum value
  );

  return pot_sum;
}

/**
 * Get number of bet actions in the current round
 * @param {obj} tableState
 */
function getThisTurnRaisesNum(tableState) {
  let raises_this_turn = 0;
  if (tableState.game.game_turn === 1) {
    // count post blind as raise 1
    raises_this_turn = 1;
  }

  // get current round bet actions
  let round_bets = tableState.game.bet[tableState.game.game_turn];
  if (round_bets) {
    // count bet actions that start with "raise" or "bet" string
    raises_this_turn = round_bets.reduce(
      function (accumulator, bet) {
        if (
          "RAISE".toLowerCase() ===
            bet[2].substring(0, "RAISE".length).toLowerCase() || // bet[2] is bet action
          "BET".toLowerCase() ===
            bet[2].substring(0, "BET".length).toLowerCase() // bet[2] is bet action
        ) {
          return accumulator + 1;
        }

        return accumulator;
      },
      raises_this_turn // initial count value
    );
  }
  else{
    // todo: we need to check why round_bets set to zero
    raises_this_turn = tableState.game.game_turn;
  }

  console.log("->Raise",raises_this_turn);
  return raises_this_turn;
}

function getActivePlayer(tableState) {
  return Object.values(tableState.players).find((player) => player.is_myturn);
}

/**
 * Get cards used by winners in a game if there exists
 * @param {obj} tableState
 * @returns {obj} : an object with the cards used as key or null if no winner
 */
function getWinnersCardsUsed(tableState) {
  // check dependency exist
  if (!tableState?.game) {
    return null;
  }

  // check if there is winner
  if (tableState.game.table_action !== "winner") {
    return null;
  }

  // check if there is winners data
  const winners_data = tableState.game.winners_data;
  if (!winners_data) {
    return null;
  }

  // collect cards used by winners
  let winner_cards = {};
  for (let winner in winners_data) {
    if (winners_data[winner].cards_used) {
      for (let card of winners_data[winner].cards_used) {
        winner_cards[card] = true;
      }
    }
  }

  return winner_cards;
}

/**
 * Get class of card based on if it is winning hand or not
 * @param {obj} winner_cards : can be null
 * @param {str} number_card : number representation of card
 * @returns {str} : class or empty string
 */
function getNumberCardWinnerClass(winner_cards, number_card) {
  if (winner_cards) {

    const isPartOfWinnerCards = winner_cards.find(card => {
      return card.rank === number_card.rank && card.suit === number_card.suit
    })
    return !!isPartOfWinnerCards
      ? "part_of_winning_hand"
      : "not_part_of_winning_hand";
  }

  return "";
}

/**
 * Get time in format as we want to show server time on UI
 * @param {integer} timestamp
 */
function getFormattedServerTime(timestamp) {
  let date = new Date(timestamp * 1000);

  let day = date.toDateString(); // format of "Sun Apr 05 2020"
  day = day.substring(3, 10); // extract month and day number: format of "Apr 05"

  return `${day} ${date.toLocaleTimeString()}`;
}

export {
  isNoLimitType,
  isLimitType,
  isPotLimitType,
  getPotSum,
  getThisTurnRaisesNum,
  getActivePlayer,
  getWinnersCardsUsed,
  getNumberCardWinnerClass,
  getFormattedServerTime,
};
