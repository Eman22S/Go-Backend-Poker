package engine

import (
	"sngrpc/sngpoker"
	"testing"
)

func TestHighCard(t *testing.T) {
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

	rankingResult := GetRankHandsResult([]*sngpoker.Player{
		&player1,
		&player2,
	}, communityCards)

	expectedWiningCard := sngpoker.Card{Rank: 9, Suit: 3}
	winnningCard := rankingResult[2].WinningCard
	if winnningCard.Rank != expectedWiningCard.Rank || winnningCard.Suit != expectedWiningCard.Suit {
		t.Error("Player 2 sould be the winner")
	}

}
