import { number_exists } from "../../utils/number_utils";

function tranformData (data, name) {
    switch(name) {
        case 'tableState':
            return transformTableSate(data);
        default:
            return data;
    }
}   

function transformTableSate (data) {
    const players = getExpectedPlayersData(data.players)
    const bet = getExpectedBets(data.game.bet)
    const rankings = getExpectedRankings(data.rankings)
    data.game.bet = bet;
    return {
        ...data,
        players,
        rankings
    }
}

function getExpectedBets(data) {
  const betValues = data.streets.map(street => {
    return street.betvalues.map(betVal => {
      const transBetVals = []
      transBetVals.push(betVal.playerid)
      transBetVals.push(betVal.betamount)
      transBetVals.push(betVal.description)
      transBetVals.push(betVal.hash)
      transBetVals.push(betVal.timestamp)
      return [...transBetVals]
    })
  })
  return [...betValues]
}

function getExpectedRankings(data) {
  let payout_details = data.payout_details
  const transformedPayouts = {}

  payout_details.forEach(payoutDetail => {
    transformedPayouts[payoutDetail.user_id] = payoutDetail
  })
  data.payout_details = transformedPayouts

  return data
}

function getExpectedPlayersData(playersData) {
    let players = {};
    playersData.forEach(function (grpc_player, index) {
      players[grpc_player.md5] = getExpectedPlayer(grpc_player);
    });
  
    return players;
  }

  function getExpectedPlayer(player) {
    let player_meta = player
    let player_cards = player.cards || [];
    let bet2do = number_exists(player_meta?.bet2do)
      ? parseFloat(player_meta.bet2do)
      : null;
    return {
      meta: player_meta,
      bet2do: bet2do,
      addons_used: player.addons_used,
      is_myturn: player.is_myturn,
      myturn_start_time: player?.myturn_start_time
        ? parseInt(player.myturn_start_time)
        : null,
      chair: number_exists(player.chair)
        ? parseInt(player.chair)
        : null,
      username: player.username,
      id: player.id,
      chips: number_exists(player.chips)
        ? parseFloat(player.chips)
        : null,
      md5: player.md5,
      cards: player_cards,
    };
  }
  

export { tranformData } 
