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

		for index, expectedRankingDetail := range testData.expectedRankingDetail {
			checkRankingIntegrity(
				t, testData.players[index],
				testData.communityCards,
				expectedRankingDetail,
			)
		}
	}
}

func checkRankingIntegrity(
	t *testing.T,
	players []*sngpoker.Player,
	communityCards []*sngpoker.Card,
	expectedRankingDetail *RankingDetails,
) {
	rankingResult := RankHands(players, communityCards)
	// checks the winner player id
	expectedWinnerIndex := 0
	expectedRanking := expectedRankingDetail.Ranking

	if rankingResult[expectedWinnerIndex].Ranking != expectedRanking {
		t.Errorf(
			"%s ranking: Expected winner should have %s ranking.",
			RankingTypeNames[expectedRanking],
			RankingTypeNames[expectedRanking],
		)
	}

	expectedWinnerId := expectedRankingDetail.PlayerId
	if rankingResult[expectedWinnerIndex].PlayerId != expectedWinnerId {
		t.Errorf(
			"%s ranking: Expected winner id should be %d.",
			RankingTypeNames[expectedRanking],
			expectedWinnerId,
		)
	}

	// checks winning cards of the winner player
	expectedWiningCards := expectedRankingDetail.WinningCards
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
	// check hand description of the winner player
	expectedWinningHandDescription := expectedRankingDetail.HandDescription
	winningHandDescription := rankingResult[expectedWinnerIndex].HandDescription

	if winningHandDescription != expectedWinningHandDescription {
		t.Errorf(
			`Expected winning hand description: %s
			Instead got: %s`, expectedWinningHandDescription, winningHandDescription,
		)
	}
}

func TestKickingCards(t *testing.T) {

	t.Run("Test kicking card used to win with HIGHCARD rank", func(t *testing.T) {
		communityCards := []*sngpoker.Card{
			{Rank: sngpoker.CardRank_ACE, Suit: sngpoker.Suit_CLUB},
			{Rank: sngpoker.CardRank_EIGHT, Suit: sngpoker.Suit_SPADE},
			{Rank: sngpoker.CardRank_TWO, Suit: sngpoker.Suit_DIAMOND},
			{Rank: sngpoker.CardRank_KING, Suit: sngpoker.Suit_HEART},
			{Rank: sngpoker.CardRank_FIVE, Suit: sngpoker.Suit_CLUB},
		}

		players := []*sngpoker.Player{
			{
				Id: 1,
				Cards: []*sngpoker.Card{
					{Rank: sngpoker.CardRank_NINE, Suit: sngpoker.Suit_DIAMOND},
					{Rank: sngpoker.CardRank_QUEEN, Suit: sngpoker.Suit_SPADE},
				},
			},
			{
				Id: 2,
				Cards: []*sngpoker.Card{
					{Rank: sngpoker.CardRank_SEVEN, Suit: sngpoker.Suit_DIAMOND},
					{Rank: sngpoker.CardRank_QUEEN, Suit: sngpoker.Suit_CLUB},
				},
			},
		}
		rankingResult := RankHands(players, communityCards)
		expectedKickingCardUsedToWin := []*sngpoker.Card{
			{Rank: sngpoker.CardRank_NINE, Suit: sngpoker.Suit_DIAMOND}}
		if rankingResult[0].Ranking != HighCard {
			t.Error("Hand rank must be HIGHCARD")

		}
		if !reflect.DeepEqual(
			rankingResult[0].KickingCardsUsedToWin,
			expectedKickingCardUsedToWin) {
			t.Errorf(
				"kicking card used to win is not correct \n %v",
				rankingResult[0].KickingCardsUsedToWin,
			)
		}
	})

	t.Run("Test kicking card used to win with ONEPAIR rank", func(t *testing.T) {
		communityCards := []*sngpoker.Card{
			{Rank: sngpoker.CardRank_ACE, Suit: sngpoker.Suit_CLUB},
			{Rank: sngpoker.CardRank_EIGHT, Suit: sngpoker.Suit_SPADE},
			{Rank: sngpoker.CardRank_TWO, Suit: sngpoker.Suit_DIAMOND},
			{Rank: sngpoker.CardRank_FIVE, Suit: sngpoker.Suit_CLUB},
			{Rank: sngpoker.CardRank_SIX, Suit: sngpoker.Suit_DIAMOND},
		}

		players := []*sngpoker.Player{
			{
				Id: 1,
				Cards: []*sngpoker.Card{
					{Rank: sngpoker.CardRank_QUEEN, Suit: sngpoker.Suit_SPADE},
					{Rank: sngpoker.CardRank_ACE, Suit: sngpoker.Suit_CLUB},
				},
			},
			{
				Id: 2,
				Cards: []*sngpoker.Card{
					{Rank: sngpoker.CardRank_KING, Suit: sngpoker.Suit_HEART},
					{Rank: sngpoker.CardRank_ACE, Suit: sngpoker.Suit_CLUB},
				},
			},
		}
		rankingResult := RankHands(players, communityCards)
		expectedKickingCardUsedToWin := []*sngpoker.Card{
			{Rank: sngpoker.CardRank_KING, Suit: sngpoker.Suit_HEART}}

		if rankingResult[0].Ranking != OnePair {
			t.Error("Hand rank must be ONEPAIR")
		}

		if !reflect.DeepEqual(
			rankingResult[0].KickingCardsUsedToWin,
			expectedKickingCardUsedToWin) {
			t.Errorf(
				"kicking card used to win is not correct \n %v",
				rankingResult[0].KickingCardsUsedToWin,
			)
		}
	})

	t.Run("Test kicking card used to win with TWO PAIR rank", func(t *testing.T) {
		communityCards := []*sngpoker.Card{
			{Rank: sngpoker.CardRank_ACE, Suit: sngpoker.Suit_CLUB},
			{Rank: sngpoker.CardRank_QUEEN, Suit: sngpoker.Suit_SPADE},
			{Rank: sngpoker.CardRank_TWO, Suit: sngpoker.Suit_DIAMOND},
			{Rank: sngpoker.CardRank_ACE, Suit: sngpoker.Suit_CLUB},
			{Rank: sngpoker.CardRank_FIVE, Suit: sngpoker.Suit_CLUB},
		}

		players := []*sngpoker.Player{
			{
				Id: 1,
				Cards: []*sngpoker.Card{
					{Rank: sngpoker.CardRank_EIGHT, Suit: sngpoker.Suit_DIAMOND},
					{Rank: sngpoker.CardRank_QUEEN, Suit: sngpoker.Suit_SPADE},
				},
			},
			{
				Id: 2,
				Cards: []*sngpoker.Card{
					{Rank: sngpoker.CardRank_SEVEN, Suit: sngpoker.Suit_DIAMOND},
					{Rank: sngpoker.CardRank_QUEEN, Suit: sngpoker.Suit_CLUB},
				},
			},
		}
		rankingResult := RankHands(players, communityCards)
		expectedKickingCardUsedToWin := []*sngpoker.Card{
			{Rank: sngpoker.CardRank_EIGHT, Suit: sngpoker.Suit_DIAMOND},
		}

		if rankingResult[0].Ranking != TwoPair {
			t.Error("Hand rank must be TWO PAIR")
		}
		if !reflect.DeepEqual(
			rankingResult[0].KickingCardsUsedToWin,
			expectedKickingCardUsedToWin) {
			t.Errorf(
				"kicking card used to win is not correct \n %v",
				rankingResult[0].KickingCardsUsedToWin,
			)
		}
	})

	t.Run("Test kicking card used to win with THEREE OF A KIND rank", func(t *testing.T) {
		communityCards := []*sngpoker.Card{
			{Rank: sngpoker.CardRank_ACE, Suit: sngpoker.Suit_CLUB},
			{Rank: sngpoker.CardRank_ACE, Suit: sngpoker.Suit_SPADE},
			{Rank: sngpoker.CardRank_TWO, Suit: sngpoker.Suit_DIAMOND},
			{Rank: sngpoker.CardRank_EIGHT, Suit: sngpoker.Suit_CLUB},
			{Rank: sngpoker.CardRank_FIVE, Suit: sngpoker.Suit_CLUB},
		}

		players := []*sngpoker.Player{
			{
				Id: 1,
				Cards: []*sngpoker.Card{
					{Rank: sngpoker.CardRank_ACE, Suit: sngpoker.Suit_DIAMOND},
					{Rank: sngpoker.CardRank_KING, Suit: sngpoker.Suit_SPADE},
				},
			},
			{
				Id: 2,
				Cards: []*sngpoker.Card{
					{Rank: sngpoker.CardRank_ACE, Suit: sngpoker.Suit_DIAMOND},
					{Rank: sngpoker.CardRank_QUEEN, Suit: sngpoker.Suit_CLUB},
				},
			},
		}
		rankingResult := RankHands(players, communityCards)
		expectedKickingCardUsedToWin := []*sngpoker.Card{
			{Rank: sngpoker.CardRank_KING, Suit: sngpoker.Suit_SPADE},
		}

		if rankingResult[0].Ranking != ThreeOfAKind {
			t.Error("Hand rank must be TWO PAIR")
		}
		if !reflect.DeepEqual(
			rankingResult[0].KickingCardsUsedToWin,
			expectedKickingCardUsedToWin) {
			t.Errorf(
				"kicking card used to win is not correct \n %v",
				rankingResult[0].KickingCardsUsedToWin,
			)
		}
	})

	t.Run("Test kicking card used to win with FOUR OF A KIND rank", func(t *testing.T) {
		communityCards := []*sngpoker.Card{
			{Rank: sngpoker.CardRank_ACE, Suit: sngpoker.Suit_CLUB},
			{Rank: sngpoker.CardRank_ACE, Suit: sngpoker.Suit_SPADE},
			{Rank: sngpoker.CardRank_ACE, Suit: sngpoker.Suit_SPADE},
			{Rank: sngpoker.CardRank_EIGHT, Suit: sngpoker.Suit_CLUB},
			{Rank: sngpoker.CardRank_FIVE, Suit: sngpoker.Suit_CLUB},
		}

		players := []*sngpoker.Player{
			{
				Id: 1,
				Cards: []*sngpoker.Card{
					{Rank: sngpoker.CardRank_ACE, Suit: sngpoker.Suit_DIAMOND},
					{Rank: sngpoker.CardRank_KING, Suit: sngpoker.Suit_SPADE},
				},
			},
			{
				Id: 2,
				Cards: []*sngpoker.Card{
					{Rank: sngpoker.CardRank_ACE, Suit: sngpoker.Suit_DIAMOND},
					{Rank: sngpoker.CardRank_QUEEN, Suit: sngpoker.Suit_CLUB},
				},
			},
		}
		rankingResult := RankHands(players, communityCards)
		expectedKickingCardUsedToWin := []*sngpoker.Card{
			{Rank: sngpoker.CardRank_KING, Suit: sngpoker.Suit_SPADE},
		}

		if rankingResult[0].Ranking != FourOfAKind {
			t.Error("Hand rank must be FOUR OF A KIND")
		}
		if !reflect.DeepEqual(
			rankingResult[0].KickingCardsUsedToWin,
			expectedKickingCardUsedToWin) {
			t.Errorf(
				"kicking card used to win is not correct \n %v",
				rankingResult[0].KickingCardsUsedToWin,
			)
		}
	})

	t.Run("Test kicking cards for players", func(t *testing.T) {
		communityCards := []*sngpoker.Card{
			{Rank: sngpoker.CardRank_ACE, Suit: sngpoker.Suit_CLUB},
			{Rank: sngpoker.CardRank_EIGHT, Suit: sngpoker.Suit_SPADE},
			{Rank: sngpoker.CardRank_TWO, Suit: sngpoker.Suit_DIAMOND},
			{Rank: sngpoker.CardRank_KING, Suit: sngpoker.Suit_HEART},
			{Rank: sngpoker.CardRank_FIVE, Suit: sngpoker.Suit_CLUB},
		}
		players := []*sngpoker.Player{
			{
				Id: 1,
				Cards: []*sngpoker.Card{
					{Rank: sngpoker.CardRank_NINE, Suit: sngpoker.Suit_DIAMOND},
					{Rank: sngpoker.CardRank_QUEEN, Suit: sngpoker.Suit_SPADE},
				},
			},
			{
				Id: 2,
				Cards: []*sngpoker.Card{
					{Rank: sngpoker.CardRank_SEVEN, Suit: sngpoker.Suit_DIAMOND},
					{Rank: sngpoker.CardRank_QUEEN, Suit: sngpoker.Suit_CLUB},
				},
			},
		}
		rankingResult := RankHands(players, communityCards)

		playerOneExpectedKickers := []*sngpoker.Card{
			{Rank: sngpoker.CardRank_KING, Suit: sngpoker.Suit_HEART},
			{Rank: sngpoker.CardRank_QUEEN, Suit: sngpoker.Suit_SPADE},
			{Rank: sngpoker.CardRank_NINE, Suit: sngpoker.Suit_DIAMOND},
			{Rank: sngpoker.CardRank_EIGHT, Suit: sngpoker.Suit_SPADE},
		}

		playerTwoExpectedKickers := []*sngpoker.Card{
			{Rank: sngpoker.CardRank_KING, Suit: sngpoker.Suit_HEART},
			{Rank: sngpoker.CardRank_QUEEN, Suit: sngpoker.Suit_CLUB},
			{Rank: sngpoker.CardRank_EIGHT, Suit: sngpoker.Suit_SPADE},
			{Rank: sngpoker.CardRank_SEVEN, Suit: sngpoker.Suit_DIAMOND},
		}

		if !reflect.DeepEqual(rankingResult[0].KickingCards, playerOneExpectedKickers) {
			t.Error("Player one should have the correct kicker cards")
		}
		if !reflect.DeepEqual(rankingResult[1].KickingCards, playerTwoExpectedKickers) {
			t.Errorf("Player %v should have the correct kickers\n Expected %v\n Actual %v\n",
				rankingResult[1].PlayerId,
				playerTwoExpectedKickers,
				rankingResult[1].KickingCards,
			)
		}
	})

	t.Run("Test sort hands by rank", func(t *testing.T) {
		communityCards := []*sngpoker.Card{
			{Rank: sngpoker.CardRank_TWO, Suit: sngpoker.Suit_HEART},
			{Rank: sngpoker.CardRank_ACE, Suit: sngpoker.Suit_CLUB},
			{Rank: sngpoker.CardRank_FIVE, Suit: sngpoker.Suit_DIAMOND},
			{Rank: sngpoker.CardRank_NINE, Suit: sngpoker.Suit_HEART},
			{Rank: sngpoker.CardRank_JACK, Suit: sngpoker.Suit_SPADE},
		}

		holeCards := []*sngpoker.Card{
			{Rank: sngpoker.CardRank_SIX, Suit: sngpoker.Suit_CLUB},
			{Rank: sngpoker.CardRank_KING, Suit: sngpoker.Suit_CLUB},
		}

		expectedSortedRank := []sngpoker.CardRank{
			sngpoker.CardRank_ACE,
			sngpoker.CardRank_KING,
			sngpoker.CardRank_JACK,
			sngpoker.CardRank_NINE,
			sngpoker.CardRank_SIX,
			sngpoker.CardRank_FIVE,
			sngpoker.CardRank_TWO,
		}

		actualSortedHand := sortHandByRank(holeCards, communityCards)

		for index, rank := range expectedSortedRank {
			if actualSortedHand[index].Rank != rank {
				t.Errorf(
					"Incorrect sorted ranking \nExpected: %d, Actual: %d",
					rank,
					actualSortedHand[index].Rank)
			}
		}
	})
}
