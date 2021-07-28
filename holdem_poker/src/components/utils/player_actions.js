import { getBettingRoundSum } from "./player";
import {
  isLimitType,
  isPotLimitType,
  getPotSum,
  getThisTurnRaisesNum
} from "./table";

function canRaise(tableState, minRaise, maxRaise, player) {
  if (!player.meta.can_raise) {
    return false;
  } else if (maxRaise < minRaise) {
    return false;
  } else if (
    minRaise -
      getBettingRoundSum(
        tableState.game.game_turn,
        tableState.game.bet,
        player.md5
      ) >
    player.chips
  ) {
    // minimum raise should be as much as chips you have
    return false;
  } else if (
    isLimitType(tableState.game_meta.table_type) &&
    Number(tableState.tournament_meta.table_max_num_raises)
  ) {
    return (
      getThisTurnRaisesNum(tableState) <= Number(tableState.tournament_meta.table_max_num_raises)
    );
  }

  return true;
}

function canCall(tableState, player) {
  if (player.bet2do <= 0) {
    return false;
  } else if (player.bet2do > player.chips) {
    return false;
  }

  return true;
}

function canCheck(tableState, player) {
  if (player.bet2do > 0) {
    return false;
  }

  return true;
}

function canAllin(tableState, player) {
  if (isPotLimitType(tableState.game_meta.table_type)) {
    return player.chips <= getPotSum(tableState.game.pot);
  } else if (isLimitType(tableState.game_meta.table_type)) {
    return player.chips > 0 && player.chips <= player.bet2do;
  }

  return true;
}

export { canRaise, canCall, canCheck, canAllin };
