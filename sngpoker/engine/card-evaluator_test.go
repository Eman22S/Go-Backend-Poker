package engine

import (
	"sngrpc/sngpoker"
	"testing"
)

func TestHighCard(t *testing.T) {
	communityCards := []*sngpoker.Card{
		{Rank: sngpoker.CardRank_SEVEN, Suit: sngpoker.Suit_DIAMOND},
		{Rank: sngpoker.CardRank_FOUR, Suit: sngpoker.Suit_HEART},
		{Rank: sngpoker.CardRank_SIX, Suit: sngpoker.Suit_SPADE},
		{Rank: sngpoker.CardRank_NINE, Suit: sngpoker.Suit_HEART},
		{Rank: sngpoker.CardRank_FIVE, Suit: sngpoker.Suit_SPADE},
	}

	player1 := sngpoker.Player{
		Id: 1,
		Cards: []*sngpoker.Card{
			{Rank: sngpoker.CardRank_THREE, Suit: sngpoker.Suit_SPADE},
			{Rank: sngpoker.CardRank_TEN, Suit: sngpoker.Suit_HEART},
		},
	}
	player2 := sngpoker.Player{
		Id: 2,
		Cards: []*sngpoker.Card{
			{Rank: sngpoker.CardRank_JACK, Suit: sngpoker.Suit_HEART},
			{Rank: sngpoker.CardRank_EIGHT, Suit: sngpoker.Suit_SPADE},
		},
	}

	rankingResult := rankHands([]*sngpoker.Player{
		&player1,
		&player2,
	}, communityCards)

	expectedWiningCard := sngpoker.Card{Rank: sngpoker.CardRank_JACK, Suit: sngpoker.Suit_HEART}
	winnningCard := rankingResult[2].WinningCards[0]
	if winnningCard.Rank != expectedWiningCard.Rank || winnningCard.Suit != expectedWiningCard.Suit {
		t.Error("Player 2 sould be the winner")
	}

}
