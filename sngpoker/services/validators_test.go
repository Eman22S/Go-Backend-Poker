package services

import (
	"sngrpc/sngpoker"
	"testing"
)

func TestValidateRankHandRequestValidator(t *testing.T) {
	t.Run("RankHandRequestValidator should throw error for empty cards and players",
		func(t *testing.T) {
			requestObject := sngpoker.RankHandsRequest{
				Players:        []*sngpoker.Player{},
				CommunityCards: []*sngpoker.Card{},
			}

			err := ValidateRankHandRequest(&requestObject)
			if err == nil {
				t.Error("Error should be thrown if no players or comunity cards exist")
			}
		})

	t.Run("RankHandRequestValidator should throw if community card is letss than five",
		func(t *testing.T) {
			requestObject := sngpoker.RankHandsRequest{
				Players: []*sngpoker.Player{},
				CommunityCards: []*sngpoker.Card{
					{Rank: 3, Suit: 4},
					{Rank: 7, Suit: 0},
					{Rank: 10, Suit: 2},
				},
			}

			err := ValidateRankHandRequest(&requestObject)
			if err.Error() != "Community cards must be five cards" {
				t.Error("Comunity check should give correct error message")
			}
		})

	t.Run("For correct requet data RankHandRequestValidator should not throw error",
		func(t *testing.T) {
			communityCards := []*sngpoker.Card{
				{Rank: 5, Suit: 3},
				{Rank: 2, Suit: 2},
				{Rank: 4, Suit: 1},
				{Rank: 7, Suit: 2},
				{Rank: 3, Suit: 1},
			}

			player1 := sngpoker.Player{
				Id: 1,
				Cards: []*sngpoker.Card{
					{Rank: 1, Suit: 3},
					{Rank: 8, Suit: 2},
				},
			}
			player2 := sngpoker.Player{
				Id: 2,
				Cards: []*sngpoker.Card{
					{Rank: 9, Suit: 2},
					{Rank: 6, Suit: 3},
				},
			}

			requestObject := sngpoker.RankHandsRequest{
				CommunityCards: communityCards,
				Players:        []*sngpoker.Player{&player1, &player2},
			}

			err := ValidateRankHandRequest(&requestObject)

			if err != nil {
				t.Error("RankHandRequestValidator should not return error for correct input")
			}
		})
}
