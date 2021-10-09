package engine

/**
When testing ranking,
expected winning cards and kicking cards must be sorted by rank
if equal rank cards, player cards first, then community cards
if equal rank cards on player or community,then based on their original card order
**/

import (
	"reflect"
	"sngrpc/sngpoker"
	"testing"
)

func TestRankings(t *testing.T) {
	for _, testData := range getRankingTestData() {
		for index, expectedWinnerRanking := range testData.expectedWinnerRanking {
			checkRankingIntegrity(t, testData.players[index], testData.communityCards, expectedWinnerRanking)
		}
	}
}

func checkRankingIntegrity(t *testing.T, players []*sngpoker.Player, communityCards []*sngpoker.Card, expectedWinnerRanking *RankingDetails) {
	rankingResult := rankHands(players, communityCards)

	expectedWinner := expectedWinnerRanking.PlayerId
	expectedRanking := expectedWinnerRanking.Ranking
	if rankingResult[expectedWinner].Ranking != expectedRanking {
		t.Errorf("%s ranking: Expected winner should have %s ranking.", RankingTypeNames[expectedRanking], RankingTypeNames[expectedRanking])
	}

	expectedWiningCards := expectedWinnerRanking.WinningCards
	winnningCards := rankingResult[expectedWinner].WinningCards
	if len(winnningCards) != len(expectedWiningCards) {
		t.Errorf("%s ranking: Winning cards must be %d cards", RankingTypeNames[expectedRanking], len(expectedWiningCards))
	}

	if !reflect.DeepEqual(expectedWiningCards, rankingResult[expectedWinner].WinningCards) {
		t.Errorf("%s ranking: Player %d should be winner. But the winning cards are incorrect.", RankingTypeNames[expectedRanking], expectedWinner)
	}
}
