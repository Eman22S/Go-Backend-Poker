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
			// if expectedWinnerRanking.Ranking == Straight {
			checkRankingIntegrity(t, testData.players[index], testData.communityCards, expectedWinnerRanking)
			// }
		}
	}
}

func checkRankingIntegrity(
	t *testing.T,
	players []*sngpoker.Player,
	communityCards []*sngpoker.Card,
	expectedWinnerRanking *RankingDetails,
) {
	rankingResult := RankHands(players, communityCards)

	expectedWinnerIndex := 0
	expectedRanking := expectedWinnerRanking.Ranking
	if rankingResult[expectedWinnerIndex].Ranking != expectedRanking {
		t.Errorf(
			"%s ranking: Expected winner should have %s ranking.",
			RankingTypeNames[expectedRanking],
			RankingTypeNames[expectedRanking],
		)
	}

	expectedWinnerId := expectedWinnerRanking.PlayerId
	if rankingResult[expectedWinnerIndex].PlayerId != expectedWinnerId {
		t.Errorf(
			"%s ranking: Expected winner id should be %d.",
			RankingTypeNames[expectedRanking],
			expectedWinnerId,
		)
	}

	expectedWiningCards := expectedWinnerRanking.WinningCards
	winnningCards := rankingResult[expectedWinnerIndex].WinningCards
	if len(winnningCards) != len(expectedWiningCards) {
		t.Errorf(
			"%s ranking: Winning cards must be %d cards",
			RankingTypeNames[expectedRanking],
			len(expectedWiningCards),
		)
	}

	if !reflect.DeepEqual(expectedWiningCards, rankingResult[expectedWinnerIndex].WinningCards) {
		t.Errorf(
			`%s ranking: Winner player id: %d
			 	Expected winning cards: %v
				Actual winning cards: %v`,
			RankingTypeNames[expectedRanking],
			expectedWinnerId,
			expectedWiningCards,
			rankingResult[expectedWinnerIndex].WinningCards,
		)
	}
}
