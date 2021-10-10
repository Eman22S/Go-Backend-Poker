package engine

import "sngrpc/sngpoker"

type RankingTestData struct {
	communityCards        []*sngpoker.Card
	players               [][]*sngpoker.Player
	expectedWinnerRanking []*RankingDetails
}

func getRankingTestData() []*RankingTestData {
	return []*RankingTestData{
		// high card ranking
		{
			communityCards: []*sngpoker.Card{
				{Rank: sngpoker.CardRank_NINE, Suit: sngpoker.Suit_HEART},
				{Rank: sngpoker.CardRank_SEVEN, Suit: sngpoker.Suit_DIAMOND},
				{Rank: sngpoker.CardRank_SIX, Suit: sngpoker.Suit_SPADE},
				{Rank: sngpoker.CardRank_FIVE, Suit: sngpoker.Suit_SPADE},
				{Rank: sngpoker.CardRank_FOUR, Suit: sngpoker.Suit_HEART},
			},

			players: [][]*sngpoker.Player{
				{
					{
						Id: 1,
						Cards: []*sngpoker.Card{
							{Rank: sngpoker.CardRank_TWO, Suit: sngpoker.Suit_SPADE},
							{Rank: sngpoker.CardRank_JACK, Suit: sngpoker.Suit_HEART},
						},
					},
					{
						Id: 2,
						Cards: []*sngpoker.Card{
							{Rank: sngpoker.CardRank_TEN, Suit: sngpoker.Suit_HEART},
							{Rank: sngpoker.CardRank_TWO, Suit: sngpoker.Suit_SPADE},
						},
					},
				},
				{
					{
						Id: 1,
						Cards: []*sngpoker.Card{
							{Rank: sngpoker.CardRank_TWO, Suit: sngpoker.Suit_SPADE},
							{Rank: sngpoker.CardRank_TEN, Suit: sngpoker.Suit_HEART},
						},
					},
					{
						Id: 2,
						Cards: []*sngpoker.Card{
							{Rank: sngpoker.CardRank_ACE, Suit: sngpoker.Suit_HEART},
							{Rank: sngpoker.CardRank_TEN, Suit: sngpoker.Suit_SPADE},
						},
					},
				},
			},
			expectedWinnerRanking: []*RankingDetails{
				{
					PlayerId: 1,
					Ranking:  HighCard,
					WinningCards: []*sngpoker.Card{
						{Rank: sngpoker.CardRank_JACK, Suit: sngpoker.Suit_HEART},
					},
				},
				{
					PlayerId: 2,
					Ranking:  HighCard,
					WinningCards: []*sngpoker.Card{
						{Rank: sngpoker.CardRank_ACE, Suit: sngpoker.Suit_HEART},
					},
				},
			},
		},

		// one pair ranking
		{
			communityCards: []*sngpoker.Card{
				{Rank: sngpoker.CardRank_SEVEN, Suit: sngpoker.Suit_DIAMOND},
				{Rank: sngpoker.CardRank_FOUR, Suit: sngpoker.Suit_HEART},
				{Rank: sngpoker.CardRank_SIX, Suit: sngpoker.Suit_SPADE},
				{Rank: sngpoker.CardRank_NINE, Suit: sngpoker.Suit_HEART},
				{Rank: sngpoker.CardRank_ACE, Suit: sngpoker.Suit_SPADE},
			},

			players: [][]*sngpoker.Player{
				{
					{
						Id: 1,
						Cards: []*sngpoker.Card{
							{Rank: sngpoker.CardRank_NINE, Suit: sngpoker.Suit_SPADE},
							{Rank: sngpoker.CardRank_TEN, Suit: sngpoker.Suit_HEART},
						},
					},
					{
						Id: 2,
						Cards: []*sngpoker.Card{
							{Rank: sngpoker.CardRank_JACK, Suit: sngpoker.Suit_HEART},
							{Rank: sngpoker.CardRank_EIGHT, Suit: sngpoker.Suit_SPADE},
						},
					},
				},
				{
					{
						Id: 1,
						Cards: []*sngpoker.Card{
							{Rank: sngpoker.CardRank_NINE, Suit: sngpoker.Suit_SPADE},
							{Rank: sngpoker.CardRank_TEN, Suit: sngpoker.Suit_HEART},
						},
					},
					{
						Id: 2,
						Cards: []*sngpoker.Card{
							{Rank: sngpoker.CardRank_ACE, Suit: sngpoker.Suit_HEART},
							{Rank: sngpoker.CardRank_EIGHT, Suit: sngpoker.Suit_SPADE},
						},
					},
				},
			},
			expectedWinnerRanking: []*RankingDetails{
				{
					PlayerId: 1,
					Ranking:  OnePair,
					WinningCards: []*sngpoker.Card{
						{Rank: sngpoker.CardRank_NINE, Suit: sngpoker.Suit_SPADE},
						{Rank: sngpoker.CardRank_NINE, Suit: sngpoker.Suit_HEART},
					},
				},
				{
					PlayerId: 2,
					Ranking:  OnePair,
					WinningCards: []*sngpoker.Card{
						{Rank: sngpoker.CardRank_ACE, Suit: sngpoker.Suit_HEART},
						{Rank: sngpoker.CardRank_ACE, Suit: sngpoker.Suit_SPADE},
					},
				},
			},
		},

		// two pair ranking
		{
			communityCards: []*sngpoker.Card{
				{Rank: sngpoker.CardRank_EIGHT, Suit: sngpoker.Suit_DIAMOND},
				{Rank: sngpoker.CardRank_FOUR, Suit: sngpoker.Suit_HEART},
				{Rank: sngpoker.CardRank_SIX, Suit: sngpoker.Suit_SPADE},
				{Rank: sngpoker.CardRank_NINE, Suit: sngpoker.Suit_HEART},
				{Rank: sngpoker.CardRank_JACK, Suit: sngpoker.Suit_SPADE},
			},

			players: [][]*sngpoker.Player{
				{
					{
						Id: 1,
						Cards: []*sngpoker.Card{
							{Rank: sngpoker.CardRank_NINE, Suit: sngpoker.Suit_SPADE},
							{Rank: sngpoker.CardRank_TEN, Suit: sngpoker.Suit_HEART},
						},
					},
					{
						Id: 2,
						Cards: []*sngpoker.Card{
							{Rank: sngpoker.CardRank_JACK, Suit: sngpoker.Suit_HEART},
							{Rank: sngpoker.CardRank_EIGHT, Suit: sngpoker.Suit_SPADE},
						},
					},
				},
				{
					{
						Id: 1,
						Cards: []*sngpoker.Card{
							{Rank: sngpoker.CardRank_NINE, Suit: sngpoker.Suit_SPADE},
							{Rank: sngpoker.CardRank_JACK, Suit: sngpoker.Suit_CLUB},
						},
					},
					{
						Id: 2,
						Cards: []*sngpoker.Card{
							{Rank: sngpoker.CardRank_JACK, Suit: sngpoker.Suit_HEART},
							{Rank: sngpoker.CardRank_EIGHT, Suit: sngpoker.Suit_SPADE},
						},
					},
				},
			},
			expectedWinnerRanking: []*RankingDetails{
				{
					PlayerId: 2,
					Ranking:  TwoPair,
					WinningCards: []*sngpoker.Card{
						{Rank: sngpoker.CardRank_JACK, Suit: sngpoker.Suit_HEART},
						{Rank: sngpoker.CardRank_JACK, Suit: sngpoker.Suit_SPADE},
						{Rank: sngpoker.CardRank_EIGHT, Suit: sngpoker.Suit_SPADE},
						{Rank: sngpoker.CardRank_EIGHT, Suit: sngpoker.Suit_DIAMOND},
					},
				},
				{
					PlayerId: 1,
					Ranking:  TwoPair,
					WinningCards: []*sngpoker.Card{
						{Rank: sngpoker.CardRank_JACK, Suit: sngpoker.Suit_CLUB},
						{Rank: sngpoker.CardRank_JACK, Suit: sngpoker.Suit_SPADE},
						{Rank: sngpoker.CardRank_NINE, Suit: sngpoker.Suit_SPADE},
						{Rank: sngpoker.CardRank_NINE, Suit: sngpoker.Suit_HEART},
					},
				},
			},
		},

		// three of a kind ranking
		{
			communityCards: []*sngpoker.Card{
				{Rank: sngpoker.CardRank_EIGHT, Suit: sngpoker.Suit_DIAMOND},
				{Rank: sngpoker.CardRank_FOUR, Suit: sngpoker.Suit_HEART},
				{Rank: sngpoker.CardRank_SIX, Suit: sngpoker.Suit_SPADE},
				{Rank: sngpoker.CardRank_NINE, Suit: sngpoker.Suit_HEART},
				{Rank: sngpoker.CardRank_JACK, Suit: sngpoker.Suit_SPADE},
			},

			players: [][]*sngpoker.Player{
				{
					{
						Id: 1,
						Cards: []*sngpoker.Card{
							{Rank: sngpoker.CardRank_NINE, Suit: sngpoker.Suit_SPADE},
							{Rank: sngpoker.CardRank_NINE, Suit: sngpoker.Suit_CLUB},
						},
					},
					{
						Id: 2,
						Cards: []*sngpoker.Card{
							{Rank: sngpoker.CardRank_JACK, Suit: sngpoker.Suit_HEART},
							{Rank: sngpoker.CardRank_EIGHT, Suit: sngpoker.Suit_SPADE},
						},
					},
				},
				{
					{
						Id: 1,
						Cards: []*sngpoker.Card{
							{Rank: sngpoker.CardRank_NINE, Suit: sngpoker.Suit_SPADE},
							{Rank: sngpoker.CardRank_NINE, Suit: sngpoker.Suit_CLUB},
						},
					},
					{
						Id: 2,
						Cards: []*sngpoker.Card{
							{Rank: sngpoker.CardRank_JACK, Suit: sngpoker.Suit_HEART},
							{Rank: sngpoker.CardRank_JACK, Suit: sngpoker.Suit_CLUB},
						},
					},
				},
			},
			expectedWinnerRanking: []*RankingDetails{
				{
					PlayerId: 1,
					Ranking:  ThreeOfAKind,
					WinningCards: []*sngpoker.Card{
						{Rank: sngpoker.CardRank_NINE, Suit: sngpoker.Suit_SPADE},
						{Rank: sngpoker.CardRank_NINE, Suit: sngpoker.Suit_CLUB},
						{Rank: sngpoker.CardRank_NINE, Suit: sngpoker.Suit_HEART},
					},
				},
				{
					PlayerId: 2,
					Ranking:  ThreeOfAKind,
					WinningCards: []*sngpoker.Card{
						{Rank: sngpoker.CardRank_JACK, Suit: sngpoker.Suit_HEART},
						{Rank: sngpoker.CardRank_JACK, Suit: sngpoker.Suit_CLUB},
						{Rank: sngpoker.CardRank_JACK, Suit: sngpoker.Suit_SPADE},
					},
				},
			},
		},

		// straight ranking
		{
			communityCards: []*sngpoker.Card{
				{Rank: sngpoker.CardRank_SEVEN, Suit: sngpoker.Suit_DIAMOND},
				{Rank: sngpoker.CardRank_FIVE, Suit: sngpoker.Suit_SPADE},
				{Rank: sngpoker.CardRank_FOUR, Suit: sngpoker.Suit_HEART},
				{Rank: sngpoker.CardRank_THREE, Suit: sngpoker.Suit_HEART},
				{Rank: sngpoker.CardRank_TWO, Suit: sngpoker.Suit_SPADE},
			},

			players: [][]*sngpoker.Player{
				{
					{
						Id: 1,
						Cards: []*sngpoker.Card{
							{Rank: sngpoker.CardRank_SIX, Suit: sngpoker.Suit_SPADE},
							{Rank: sngpoker.CardRank_SEVEN, Suit: sngpoker.Suit_HEART},
						},
					},
					{
						Id: 2,
						Cards: []*sngpoker.Card{
							{Rank: sngpoker.CardRank_JACK, Suit: sngpoker.Suit_HEART},
							{Rank: sngpoker.CardRank_EIGHT, Suit: sngpoker.Suit_SPADE},
						},
					},
				},
				{
					{
						Id: 1,
						Cards: []*sngpoker.Card{
							{Rank: sngpoker.CardRank_SIX, Suit: sngpoker.Suit_SPADE},
							{Rank: sngpoker.CardRank_SEVEN, Suit: sngpoker.Suit_CLUB},
						},
					},
					{
						Id: 2,
						Cards: []*sngpoker.Card{
							{Rank: sngpoker.CardRank_EIGHT, Suit: sngpoker.Suit_HEART},
							{Rank: sngpoker.CardRank_SIX, Suit: sngpoker.Suit_SPADE},
						},
					},
				},
				{
					{
						Id: 1,
						Cards: []*sngpoker.Card{
							{Rank: sngpoker.CardRank_TEN, Suit: sngpoker.Suit_SPADE},
							{Rank: sngpoker.CardRank_ACE, Suit: sngpoker.Suit_CLUB},
						},
					},
					{
						Id: 2,
						Cards: []*sngpoker.Card{
							{Rank: sngpoker.CardRank_FIVE, Suit: sngpoker.Suit_HEART},
							{Rank: sngpoker.CardRank_SEVEN, Suit: sngpoker.Suit_SPADE},
						},
					},
				},
			},
			expectedWinnerRanking: []*RankingDetails{
				{
					PlayerId: 1,
					Ranking:  Straight,
					WinningCards: []*sngpoker.Card{
						{Rank: sngpoker.CardRank_SEVEN, Suit: sngpoker.Suit_DIAMOND},
						{Rank: sngpoker.CardRank_SIX, Suit: sngpoker.Suit_SPADE},
						{Rank: sngpoker.CardRank_FIVE, Suit: sngpoker.Suit_SPADE},
						{Rank: sngpoker.CardRank_FOUR, Suit: sngpoker.Suit_HEART},
						{Rank: sngpoker.CardRank_THREE, Suit: sngpoker.Suit_HEART},
					},
				},
				{
					PlayerId: 2,
					Ranking:  Straight,
					WinningCards: []*sngpoker.Card{
						{Rank: sngpoker.CardRank_EIGHT, Suit: sngpoker.Suit_HEART},
						{Rank: sngpoker.CardRank_SEVEN, Suit: sngpoker.Suit_DIAMOND},
						{Rank: sngpoker.CardRank_SIX, Suit: sngpoker.Suit_SPADE},
						{Rank: sngpoker.CardRank_FIVE, Suit: sngpoker.Suit_SPADE},
						{Rank: sngpoker.CardRank_FOUR, Suit: sngpoker.Suit_HEART},
					},
				},
				// special straight five high to ace low
				{
					PlayerId: 1,
					Ranking:  Straight,
					WinningCards: []*sngpoker.Card{
						{Rank: sngpoker.CardRank_FIVE, Suit: sngpoker.Suit_SPADE},
						{Rank: sngpoker.CardRank_FOUR, Suit: sngpoker.Suit_HEART},
						{Rank: sngpoker.CardRank_THREE, Suit: sngpoker.Suit_HEART},
						{Rank: sngpoker.CardRank_TWO, Suit: sngpoker.Suit_SPADE},
						{Rank: sngpoker.CardRank_ACE, Suit: sngpoker.Suit_CLUB},
					},
				},
			},
		},

		// flush ranking
		{
			communityCards: []*sngpoker.Card{
				{Rank: sngpoker.CardRank_SEVEN, Suit: sngpoker.Suit_HEART},
				{Rank: sngpoker.CardRank_FIVE, Suit: sngpoker.Suit_SPADE},
				{Rank: sngpoker.CardRank_FOUR, Suit: sngpoker.Suit_HEART},
				{Rank: sngpoker.CardRank_THREE, Suit: sngpoker.Suit_SPADE},
				{Rank: sngpoker.CardRank_TWO, Suit: sngpoker.Suit_SPADE},
			},

			players: [][]*sngpoker.Player{
				{
					{
						Id: 1,
						Cards: []*sngpoker.Card{
							{Rank: sngpoker.CardRank_SIX, Suit: sngpoker.Suit_SPADE},
							{Rank: sngpoker.CardRank_SEVEN, Suit: sngpoker.Suit_SPADE},
						},
					},
					{
						Id: 2,
						Cards: []*sngpoker.Card{
							{Rank: sngpoker.CardRank_JACK, Suit: sngpoker.Suit_HEART},
							{Rank: sngpoker.CardRank_EIGHT, Suit: sngpoker.Suit_SPADE},
						},
					},
				},
				{
					{
						Id: 1,
						Cards: []*sngpoker.Card{
							{Rank: sngpoker.CardRank_SIX, Suit: sngpoker.Suit_SPADE},
							{Rank: sngpoker.CardRank_SEVEN, Suit: sngpoker.Suit_SPADE},
						},
					},
					{
						Id: 2,
						Cards: []*sngpoker.Card{
							{Rank: sngpoker.CardRank_JACK, Suit: sngpoker.Suit_SPADE},
							{Rank: sngpoker.CardRank_EIGHT, Suit: sngpoker.Suit_SPADE},
						},
					},
				},
			},
			expectedWinnerRanking: []*RankingDetails{
				{
					PlayerId: 1,
					Ranking:  Flush,
					WinningCards: []*sngpoker.Card{
						{Rank: sngpoker.CardRank_SEVEN, Suit: sngpoker.Suit_SPADE},
						{Rank: sngpoker.CardRank_SIX, Suit: sngpoker.Suit_SPADE},
						{Rank: sngpoker.CardRank_FIVE, Suit: sngpoker.Suit_SPADE},
						{Rank: sngpoker.CardRank_THREE, Suit: sngpoker.Suit_SPADE},
						{Rank: sngpoker.CardRank_TWO, Suit: sngpoker.Suit_SPADE},
					},
				},
				{
					PlayerId: 2,
					Ranking:  Flush,
					WinningCards: []*sngpoker.Card{
						{Rank: sngpoker.CardRank_JACK, Suit: sngpoker.Suit_SPADE},
						{Rank: sngpoker.CardRank_EIGHT, Suit: sngpoker.Suit_SPADE},
						{Rank: sngpoker.CardRank_FIVE, Suit: sngpoker.Suit_SPADE},
						{Rank: sngpoker.CardRank_THREE, Suit: sngpoker.Suit_SPADE},
						{Rank: sngpoker.CardRank_TWO, Suit: sngpoker.Suit_SPADE},
					},
				},
			},
		},

		// full house ranking
		{
			communityCards: []*sngpoker.Card{
				{Rank: sngpoker.CardRank_SEVEN, Suit: sngpoker.Suit_HEART},
				{Rank: sngpoker.CardRank_SEVEN, Suit: sngpoker.Suit_SPADE},
				{Rank: sngpoker.CardRank_JACK, Suit: sngpoker.Suit_HEART},
				{Rank: sngpoker.CardRank_JACK, Suit: sngpoker.Suit_SPADE},
				{Rank: sngpoker.CardRank_TWO, Suit: sngpoker.Suit_SPADE},
			},

			players: [][]*sngpoker.Player{
				{
					{
						Id: 1,
						Cards: []*sngpoker.Card{
							{Rank: sngpoker.CardRank_TWO, Suit: sngpoker.Suit_HEART},
							{Rank: sngpoker.CardRank_SEVEN, Suit: sngpoker.Suit_CLUB},
						},
					},
					{
						Id: 2,
						Cards: []*sngpoker.Card{
							{Rank: sngpoker.CardRank_THREE, Suit: sngpoker.Suit_HEART},
							{Rank: sngpoker.CardRank_EIGHT, Suit: sngpoker.Suit_SPADE},
						},
					},
				},
				{
					{
						Id: 1,
						Cards: []*sngpoker.Card{
							{Rank: sngpoker.CardRank_TWO, Suit: sngpoker.Suit_HEART},
							{Rank: sngpoker.CardRank_SEVEN, Suit: sngpoker.Suit_CLUB},
						},
					},
					{
						Id: 2,
						Cards: []*sngpoker.Card{
							{Rank: sngpoker.CardRank_JACK, Suit: sngpoker.Suit_DIAMOND},
							{Rank: sngpoker.CardRank_TWO, Suit: sngpoker.Suit_DIAMOND},
						},
					},
				},
			},
			expectedWinnerRanking: []*RankingDetails{
				{
					PlayerId: 1,
					Ranking:  FullHouse,
					WinningCards: []*sngpoker.Card{
						{Rank: sngpoker.CardRank_SEVEN, Suit: sngpoker.Suit_CLUB},
						{Rank: sngpoker.CardRank_SEVEN, Suit: sngpoker.Suit_HEART},
						{Rank: sngpoker.CardRank_SEVEN, Suit: sngpoker.Suit_SPADE},
						{Rank: sngpoker.CardRank_JACK, Suit: sngpoker.Suit_HEART},
						{Rank: sngpoker.CardRank_JACK, Suit: sngpoker.Suit_SPADE},
					},
				},
				{
					PlayerId: 2,
					Ranking:  FullHouse,
					WinningCards: []*sngpoker.Card{
						{Rank: sngpoker.CardRank_JACK, Suit: sngpoker.Suit_DIAMOND},
						{Rank: sngpoker.CardRank_JACK, Suit: sngpoker.Suit_HEART},
						{Rank: sngpoker.CardRank_JACK, Suit: sngpoker.Suit_SPADE},
						{Rank: sngpoker.CardRank_SEVEN, Suit: sngpoker.Suit_HEART},
						{Rank: sngpoker.CardRank_SEVEN, Suit: sngpoker.Suit_SPADE},
					},
				},
			},
		},

		// four of a kind ranking
		{
			communityCards: []*sngpoker.Card{
				{Rank: sngpoker.CardRank_EIGHT, Suit: sngpoker.Suit_DIAMOND},
				{Rank: sngpoker.CardRank_JACK, Suit: sngpoker.Suit_DIAMOND},
				{Rank: sngpoker.CardRank_NINE, Suit: sngpoker.Suit_DIAMOND},
				{Rank: sngpoker.CardRank_NINE, Suit: sngpoker.Suit_HEART},
				{Rank: sngpoker.CardRank_JACK, Suit: sngpoker.Suit_SPADE},
			},

			players: [][]*sngpoker.Player{
				{
					{
						Id: 1,
						Cards: []*sngpoker.Card{
							{Rank: sngpoker.CardRank_NINE, Suit: sngpoker.Suit_SPADE},
							{Rank: sngpoker.CardRank_NINE, Suit: sngpoker.Suit_CLUB},
						},
					},
					{
						Id: 2,
						Cards: []*sngpoker.Card{
							{Rank: sngpoker.CardRank_JACK, Suit: sngpoker.Suit_HEART},
							{Rank: sngpoker.CardRank_EIGHT, Suit: sngpoker.Suit_SPADE},
						},
					},
				},
				{
					{
						Id: 1,
						Cards: []*sngpoker.Card{
							{Rank: sngpoker.CardRank_NINE, Suit: sngpoker.Suit_SPADE},
							{Rank: sngpoker.CardRank_NINE, Suit: sngpoker.Suit_CLUB},
						},
					},
					{
						Id: 2,
						Cards: []*sngpoker.Card{
							{Rank: sngpoker.CardRank_JACK, Suit: sngpoker.Suit_HEART},
							{Rank: sngpoker.CardRank_JACK, Suit: sngpoker.Suit_CLUB},
						},
					},
				},
			},
			expectedWinnerRanking: []*RankingDetails{
				{
					PlayerId: 1,
					Ranking:  FourOfAKind,
					WinningCards: []*sngpoker.Card{
						{Rank: sngpoker.CardRank_NINE, Suit: sngpoker.Suit_SPADE},
						{Rank: sngpoker.CardRank_NINE, Suit: sngpoker.Suit_CLUB},
						{Rank: sngpoker.CardRank_NINE, Suit: sngpoker.Suit_DIAMOND},
						{Rank: sngpoker.CardRank_NINE, Suit: sngpoker.Suit_HEART},
					},
				},
				{
					PlayerId: 2,
					Ranking:  FourOfAKind,
					WinningCards: []*sngpoker.Card{
						{Rank: sngpoker.CardRank_JACK, Suit: sngpoker.Suit_HEART},
						{Rank: sngpoker.CardRank_JACK, Suit: sngpoker.Suit_CLUB},
						{Rank: sngpoker.CardRank_JACK, Suit: sngpoker.Suit_DIAMOND},
						{Rank: sngpoker.CardRank_JACK, Suit: sngpoker.Suit_SPADE},
					},
				},
			},
		},

		// straight flush ranking
		{
			communityCards: []*sngpoker.Card{
				{Rank: sngpoker.CardRank_SEVEN, Suit: sngpoker.Suit_SPADE},
				{Rank: sngpoker.CardRank_FIVE, Suit: sngpoker.Suit_SPADE},
				{Rank: sngpoker.CardRank_FOUR, Suit: sngpoker.Suit_SPADE},
				{Rank: sngpoker.CardRank_THREE, Suit: sngpoker.Suit_SPADE},
				{Rank: sngpoker.CardRank_TWO, Suit: sngpoker.Suit_SPADE},
			},

			players: [][]*sngpoker.Player{
				{
					{
						Id: 1,
						Cards: []*sngpoker.Card{
							{Rank: sngpoker.CardRank_SIX, Suit: sngpoker.Suit_SPADE},
							{Rank: sngpoker.CardRank_SEVEN, Suit: sngpoker.Suit_HEART},
						},
					},
					{
						Id: 2,
						Cards: []*sngpoker.Card{
							{Rank: sngpoker.CardRank_JACK, Suit: sngpoker.Suit_HEART},
							{Rank: sngpoker.CardRank_EIGHT, Suit: sngpoker.Suit_SPADE},
						},
					},
				},
				{
					{
						Id: 1,
						Cards: []*sngpoker.Card{
							{Rank: sngpoker.CardRank_SIX, Suit: sngpoker.Suit_SPADE},
							{Rank: sngpoker.CardRank_SEVEN, Suit: sngpoker.Suit_CLUB},
						},
					},
					{
						Id: 2,
						Cards: []*sngpoker.Card{
							{Rank: sngpoker.CardRank_EIGHT, Suit: sngpoker.Suit_SPADE},
							{Rank: sngpoker.CardRank_SIX, Suit: sngpoker.Suit_SPADE},
						},
					},
				},
				{
					{
						Id: 1,
						Cards: []*sngpoker.Card{
							{Rank: sngpoker.CardRank_QUEEN, Suit: sngpoker.Suit_SPADE},
							{Rank: sngpoker.CardRank_ACE, Suit: sngpoker.Suit_SPADE},
						},
					},
					{
						Id: 2,
						Cards: []*sngpoker.Card{
							{Rank: sngpoker.CardRank_FIVE, Suit: sngpoker.Suit_HEART},
							{Rank: sngpoker.CardRank_SEVEN, Suit: sngpoker.Suit_SPADE},
						},
					},
				},
			},
			expectedWinnerRanking: []*RankingDetails{
				{
					PlayerId: 1,
					Ranking:  StraightFlush,
					WinningCards: []*sngpoker.Card{
						{Rank: sngpoker.CardRank_SEVEN, Suit: sngpoker.Suit_SPADE},
						{Rank: sngpoker.CardRank_SIX, Suit: sngpoker.Suit_SPADE},
						{Rank: sngpoker.CardRank_FIVE, Suit: sngpoker.Suit_SPADE},
						{Rank: sngpoker.CardRank_FOUR, Suit: sngpoker.Suit_SPADE},
						{Rank: sngpoker.CardRank_THREE, Suit: sngpoker.Suit_SPADE},
					},
				},
				{
					PlayerId: 2,
					Ranking:  StraightFlush,
					WinningCards: []*sngpoker.Card{
						{Rank: sngpoker.CardRank_EIGHT, Suit: sngpoker.Suit_SPADE},
						{Rank: sngpoker.CardRank_SEVEN, Suit: sngpoker.Suit_SPADE},
						{Rank: sngpoker.CardRank_SIX, Suit: sngpoker.Suit_SPADE},
						{Rank: sngpoker.CardRank_FIVE, Suit: sngpoker.Suit_SPADE},
						{Rank: sngpoker.CardRank_FOUR, Suit: sngpoker.Suit_SPADE},
					},
				},
				// special straight flush five high to ace low
				{
					PlayerId: 1,
					Ranking:  StraightFlush,
					WinningCards: []*sngpoker.Card{
						{Rank: sngpoker.CardRank_FIVE, Suit: sngpoker.Suit_SPADE},
						{Rank: sngpoker.CardRank_FOUR, Suit: sngpoker.Suit_SPADE},
						{Rank: sngpoker.CardRank_THREE, Suit: sngpoker.Suit_SPADE},
						{Rank: sngpoker.CardRank_TWO, Suit: sngpoker.Suit_SPADE},
						{Rank: sngpoker.CardRank_ACE, Suit: sngpoker.Suit_SPADE},
					},
				},
			},
		},
	}
}
