import { isNoLimitType, isPotLimitType, isLimitType, getPotSum } from "./table";
import { number_exists } from "../../utils/number_utils";

/**
 * Get chair index so that user always has 0 index and the order of other players start from him
 * @param {obj} player : a player object in table state
 * @returns : chair_index number or null if can't figure it out
 */
function getChairIndex(player, base_chair, players_num) {
  if (
    (base_chair || base_chair === 0) &&
    (player.chair || player.chair === 0)
  ) {
    if (player.chair === base_chair) {
      return 0;
    } else {
      let offset = players_num - base_chair;

      return (player.chair + offset) % players_num;
    }
  } else {
    return null;
  }
}

/**
 * Get sum of bets acted by a player for the current round
 * @param {integer} game_turn
 * @param {array} bet
 * @param {str} player_md5
 * @returns number of bets acted by a player or null if required variables don't exist
 */
function getBettingRoundSum(game_turn, bet, player_md5) {
  // check if dependencies exist
  if (!number_exists(game_turn) && !bet && !player_md5) {
    return null;
  }

  // if not round bets array exist, assume round sum as 0
  let bets_array = bet[game_turn];
  if (!bets_array) {
    return 0;
  }

  // get specific player bet actions for the current game_turn
  let player_bets = bets_array.filter((bet) => bet[0] === player_md5); // bet[0] is player md5

  // sum up player's bet amount for the current game_turn
  let bet_sum = player_bets.reduce(
    (accumulator, bet) => accumulator + parseFloat(bet[1]), // bet[1] is bet amount
    0 // initial sum value
  );

  return bet_sum;
}

/**
 * Get sum of bets acted by a player for the current game
 * @param {array} bet
 * @param {str} player_md5
 * @returns number of bets acted by a player or null if required variables don't exist
 */
function getAllBetRoundSum(bet, player_md5) {
  // check if dependencies exist
  if (!bet && !player_md5) {
    return null;
  }


  let bet_sum = 0
  bet.forEach(bets_array => {

    // get specific player bet actions for the current game_turn
    let player_bets = bets_array.filter((bet) => bet[0] === player_md5); // bet[0] is player md5

    // sum up player's bet amount for the current game_turn
    bet_sum += player_bets.reduce(
      (accumulator, bet) => accumulator + parseFloat(bet[1]), // bet[1] is bet amount
      0 // initial sum value
    );

  })

  return bet_sum;
}

/**
 * Get maximum value that can be raised by a player
 * @param {*} table_type
 * @param {*} pot
 * @param {*} game_turn
 * @param {*} bet
 * @param {*} bigblind
 * @param {*} player_md5
 * @param {*} player_chips
 * @param {*} player_bet2do
 */
function getMaxRaiseTo(
  table_type,
  pot,
  game_turn,
  bet,
  bigblind,
  player_md5,
  player_chips,
  player_bet2do
) {
  let raise_to_ceil = 0;

  if (isNoLimitType(table_type)) {
    raise_to_ceil = player_chips;
  } else if (isPotLimitType(table_type)) {
    raise_to_ceil = player_bet2do + getPotSum(pot);
  } else if (isLimitType(table_type)) {
    raise_to_ceil = getLimitTypeRaise(
      game_turn,
      bet,
      bigblind,
      player_md5,
      player_bet2do
    );
  } else {
    console.warn("Unknown table type: Couldnot get max raise to.");
  }

  // ensure it is not greater than player chips
  raise_to_ceil = Math.min(raise_to_ceil, player_chips);

  return raise_to_ceil;
}

/**
 * Get the minimum value that can be raised by a player
 * @param {*} table_type
 * @param {*} game_turn
 * @param {*} bet
 * @param {*} bigblind
 * @param {*} last_valid_raise: from tableState.game.raise_data.last_valid_raise
 * @param {*} player_md5
 * @param {*} player_bet2do
 */
function getMinRaiseTo(
  table_type,
  game_turn,
  bet,
  bigblind,
  last_valid_raise,
  player_md5,
  player_bet2do
) {
  let raise_to_floor = 0;
  if (isNoLimitType(table_type) || isPotLimitType(table_type)) {
    // get betting round sum of the player
    let betting_round_sum = getBettingRoundSum(game_turn, bet, player_md5);
    let base = parseFloat(player_bet2do); // start base from player bet2do
    if (betting_round_sum !== null) {
      base = base + betting_round_sum; // add betting round sum if we could get
    }

    // parse and validate last_valid_raise
    let parsed_last_valid_raise = parseFloat(last_valid_raise);

    // also need to add on the minimum raise/bet amount
    let min_raise = isNaN(parsed_last_valid_raise)
      ? bigblind
      : Math.max(bigblind, parsed_last_valid_raise);


    raise_to_floor = base + min_raise;
  } else if (isLimitType(table_type)) {
    raise_to_floor = getLimitTypeRaise(
      game_turn,
      bet,
      bigblind,
      player_md5,
      player_bet2do
    );
  } else {
    console.warn("Unknown table type: Couldnot get max raise to.");
  }

  return raise_to_floor;
}

/**
 * Get raise value of a player for limit type table
 * @param {*} game_turn
 * @param {*} bet
 * @param {*} bigblind
 * @param {*} player_md5
 * @param {*} player_bet2do
 */
function getLimitTypeRaise(
  game_turn,
  bet,
  bigblind,
  player_md5,
  player_bet2do
) {
  let base = player_bet2do + getBettingRoundSum(game_turn, bet, player_md5);

  let raise_amount;
  if (game_turn <= 1) {
    // in pre-flop or flop
    raise_amount = parseFloat(bigblind)
  } else {
    // in turn or river
    raise_amount = base +  parseFloat(bigblind) * 2;
  }
  return raise_amount;
}
/**
 * Change number based on given format specifications for UI purposes
 * @param {string} number
 * @param {obj} numberFormat : contains specifications of number format
 */
function toFloat(number, numberFormat) {
  return parseFloat(number).toFixed(numberFormat["decimals"]);
}

function getRaiseRange(tableState, player) {
  let raise_floor = 0;
  let raise_ceil = 1;
  if (tableState.players && tableState.game) {
    raise_ceil = player.chips - parseFloat(player.bet2do);
    if (isPotLimitType(tableState.game_meta.table_type)) {
      raise_ceil = Math.min(raise_ceil, getPotSum(tableState.game.pot));
    } else if (isLimitType(tableState.game_meta.table_type)) {
      if (tableState.game.game_turn <= 1) {
        //in pre-flop or flop
        raise_ceil = parseFloat(tableState.game.smallblind);
        raise_floor = parseFloat(tableState.game.smallblind);
      } else {
        //in turn or river
        raise_ceil = parseFloat(tableState.game.bigblind);
        raise_floor = parseFloat(tableState.game.bigblind);
      }
    }
    raise_floor = parseFloat(player.bet2do) * 2;
    if (raise_floor === 0 || raise_floor < tableState.game.bigblind) {
      raise_floor = tableState.game.bigblind;
    }
  }
  raise_floor = raise_floor > raise_ceil ? raise_ceil : raise_floor;
  raise_floor = raise_floor < 0 ? 0 : raise_floor;

  return { floor: raise_floor, ceil: raise_ceil };
}

function isMyTurn(tableState, player) {
  const user_id_that_is_up = tableState.game_meta.user_id_that_is_up;
  const is_my_turn =
    !(user_id_that_is_up === undefined) && user_id_that_is_up === player?.id;

  return is_my_turn;
}

function getPreviousTurnPlayerAction(tableState, prevTableState, player) {
  let prev_game_turn;
  // if there is no previous table, get actions from the current bets array
  if (prevTableState) {
    // check if this player was active previously
    let previously_active = isMyTurn(prevTableState, player);
    if (!previously_active) {
      return null;
    }

    prev_game_turn = prevTableState.game.game_turn;
  } else {
    prev_game_turn = 0; // must be the initial times
  }

  let bets_array = tableState.game.bet[prev_game_turn];
  if (!bets_array) {
    return null;
  }

  let bet_data = bets_array
    .reverse()
    .find((bet_data) => bet_data[0] === player.md5);

  let player_action = bet_data ? bet_data[2] : null;

  return player_action;
}

function getPlayerWinningAction(tableState, player, numberFormat) {
  let player_win_data = tableState.game.winners_data[player.md5];
  // if player hasn't won
  if (!player_win_data) {
    return null;
  }

  if (player_win_data.hand_description.toLowerCase() === "refund") {
    return `${window._("COM_CAMERONA_REFUNDED")} ${toFloat(
      player_win_data.total,
      numberFormat
    )}`;
  } else {
    return `${window._("COM_CAMERONA_WON")} ${toFloat(
      player_win_data.total,
      numberFormat
    )}`;
  }
}

function convertRankingDetailsToHandName(msg){
  const rank_map = ["high_card", "pair", "two_pair", "three_of_a_kind", "straight", "flush", "full_house", "four_of_a_kind", "straight_flush", "royal_flush", "one_jack_or_better", "jacks_or_better", "four_aces", "four_twos_threes_or_fours", "four_fives_through_kings"];
  if(!msg){
    return null;
  }
  if (msg.includes('HIGH')) {
    return rank_map[0];
  }else  if (msg.includes('JACKS OR BETTER')) {
    return rank_map[11];
  } else  if (msg.includes('ONE PAIR')) {
    return rank_map[1];
  } else  if (msg.includes('TWO PAIR')) {
    return rank_map[2];
  }else  if (msg.includes('THREE OF A KIND')) {
    return rank_map[3];
  } else  if (msg.includes('STRAIGHT FLUSH OF')) {
    return rank_map[8];
  } else  if (msg.includes('STRAIGHT')) {
    return rank_map[4];
  } else  if (msg.includes('ROYAL FLUSH OF')) {
    return rank_map[9];
  } else  if (msg.includes('FLUSH OF')) {
    return rank_map[5];
  } else  if (msg.includes('FULL HOUSE')) {
    return rank_map[6];
  }  else  if (msg.includes('FOUR OF A KIND')) {
    return rank_map[7];

  } else  if (msg.includes('ONE JACK OR BETTER')) {
    return rank_map[10];
  } 
  else  if (msg.includes('FOUR ACES')) {
    return rank_map[12];
  }
  else  if (msg.includes('FOUR TWOS THREES OR FOURS')) {
    return rank_map[13];
  }
  else  if (msg.includes('FOUR FIVES THROUGH KINGS')) {
    return rank_map[14];
  }
  return null;
}

export {
  getChairIndex,
  getRaiseRange,
  getBettingRoundSum,
  getMaxRaiseTo,
  getMinRaiseTo,
  toFloat,
  isMyTurn,
  getPreviousTurnPlayerAction,
  getPlayerWinningAction,
  convertRankingDetailsToHandName,
  getAllBetRoundSum
};
