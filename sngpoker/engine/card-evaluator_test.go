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
			if expectedWinnerRanking.Ranking == HighCard {
				checkRankingIntegrity(
					t, testData.players[index],
					testData.communityCards,
					expectedWinnerRanking,
				)
			}
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

	// expectedKickingCardsToWin := expectedWinnerRanking.KickingCardsUsedToWin
	// kickingCardsUsedToWin := rankingResult[expectedWinnerIndex].KickingCardsUsedToWin

	// if !reflect.DeepEqual(
	// 	expectedKickingCardsToWin,
	// 	kickingCardsUsedToWin,
	// ) {
	// 	t.Errorf(
	// 		`%s ranking: Winner player id: %d
	// 		 	Expected kicking cards used to win: %v
	// 			Actual kicking cards used to win: %v`,
	// 		RankingTypeNames[expectedRanking],
	// 		expectedWinnerId,
	// 		expectedKickingCardsToWin,
	// 		kickingCardsUsedToWin,
	// 	)
	// }

	// expectectedKickingCards := expectedWinnerRanking.KickingCards
	// kickingCards := rankingResult[expectedWinnerIndex].KickingCards
	// if !reflect.DeepEqual(
	// 	expectectedKickingCards,
	// 	kickingCards,
	// ) {
	// 	t.Errorf(
	// 		`%s ranking: Winner player id: %d
	// 		 	Expected winning cards: %v
	// 			Actual winning cards: %v`,
	// 		RankingTypeNames[expectedRanking],
	// 		expectedWinnerId,
	// 		expectectedKickingCards,
	// 		kickingCards,
	// 	)
	// }

	expectedWiningCards := expectedWinnerRanking.WinningCards
	winnningCards := rankingResult[expectedWinnerIndex].WinningCards
	if !reflect.DeepEqual(
		expectedWiningCards,
		winnningCards,
	) {
		t.Errorf(
			`%s ranking: Winner player id: %d
			 	Expected winning cards: %v
				Actual winning cards: %v`,
			RankingTypeNames[expectedRanking],
			expectedWinnerId,
			expectedWiningCards,
			winnningCards,
		)
	}
}
