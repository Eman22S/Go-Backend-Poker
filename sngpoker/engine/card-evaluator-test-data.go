package engine

import "sngrpc/sngpoker"

type RankingTestData struct {
	communityCards        []*sngpoker.Card
	players               [][]*sngpoker.Player
	expectedRankingDetail []*RankingDetails
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
							{Rank: sngpoker.CardRank_TWO, Suit: sngpoker.Suit_HEART},
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
			expectedRankingDetail: []*RankingDetails{
				{
					PlayerId: 1,
					Ranking:  HighCard,
					WinningCards: []*sngpoker.Card{
						{Rank: sngpoker.CardRank_JACK, Suit: sngpoker.Suit_HEART},
					},
					HandDescription: "HIGHCARD: JACK, KICKERS: NINE, SEVEN, SIX AND FIVE",
				},
				{
					PlayerId: 2,
					Ranking:  HighCard,
					WinningCards: []*sngpoker.Card{
						{Rank: sngpoker.CardRank_ACE, Suit: sngpoker.Suit_HEART},
					},
					HandDescription: "HIGHCARD: ACE, KICKERS: TEN, NINE, SEVEN AND SIX",
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
			expectedRankingDetail: []*RankingDetails{
				{
					PlayerId: 1,
					Ranking:  OnePair,
					WinningCards: []*sngpoker.Card{
						{Rank: sngpoker.CardRank_NINE, Suit: sngpoker.Suit_SPADE},
						{Rank: sngpoker.CardRank_NINE, Suit: sngpoker.Suit_HEART},
					},
					HandDescription: "ONE PAIR: NINEs, KICKERS: ACE, TEN AND SEVEN",
				},
				{
					PlayerId: 2,
					Ranking:  OnePair,
					WinningCards: []*sngpoker.Card{
						{Rank: sngpoker.CardRank_ACE, Suit: sngpoker.Suit_HEART},
						{Rank: sngpoker.CardRank_ACE, Suit: sngpoker.Suit_SPADE},
					},
					HandDescription: "ONE PAIR: ACEs, KICKERS: NINE, EIGHT AND SEVEN",
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
			expectedRankingDetail: []*RankingDetails{
				{
					PlayerId: 2,
					Ranking:  TwoPair,
					WinningCards: []*sngpoker.Card{
						{Rank: sngpoker.CardRank_JACK, Suit: sngpoker.Suit_HEART},
						{Rank: sngpoker.CardRank_JACK, Suit: sngpoker.Suit_SPADE},
						{Rank: sngpoker.CardRank_EIGHT, Suit: sngpoker.Suit_SPADE},
						{Rank: sngpoker.CardRank_EIGHT, Suit: sngpoker.Suit_DIAMOND},
					},
					HandDescription: "TWO PAIR: JACKs AND EIGHTs, KICKERS: NINE",
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
					HandDescription: "TWO PAIR: JACKs AND NINEs, KICKERS: EIGHT",
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
			expectedRankingDetail: []*RankingDetails{
				{
					PlayerId: 1,
					Ranking:  ThreeOfAKind,
					WinningCards: []*sngpoker.Card{
						{Rank: sngpoker.CardRank_NINE, Suit: sngpoker.Suit_SPADE},
						{Rank: sngpoker.CardRank_NINE, Suit: sngpoker.Suit_CLUB},
						{Rank: sngpoker.CardRank_NINE, Suit: sngpoker.Suit_HEART},
					},
					HandDescription: "THREE OF A KIND: NINEs, KICKERS: JACK AND EIGHT",
				},
				{
					PlayerId: 2,
					Ranking:  ThreeOfAKind,
					WinningCards: []*sngpoker.Card{
						{Rank: sngpoker.CardRank_JACK, Suit: sngpoker.Suit_HEART},
						{Rank: sngpoker.CardRank_JACK, Suit: sngpoker.Suit_CLUB},
						{Rank: sngpoker.CardRank_JACK, Suit: sngpoker.Suit_SPADE},
					},
					HandDescription: "THREE OF A KIND: JACKs, KICKERS: NINE AND EIGHT",
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
							{Rank: sngpoker.CardRank_SIX, Suit: sngpoker.Suit_DIAMOND},
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
			expectedRankingDetail: []*RankingDetails{
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
					HandDescription: "STRAIGHT: THREE TO SEVEN",
				},
				{
					PlayerId: 2,
					Ranking:  Straight,
					WinningCards: []*sngpoker.Card{
						{Rank: sngpoker.CardRank_EIGHT, Suit: sngpoker.Suit_HEART},
						{Rank: sngpoker.CardRank_SEVEN, Suit: sngpoker.Suit_DIAMOND},
						{Rank: sngpoker.CardRank_SIX, Suit: sngpoker.Suit_DIAMOND},
						{Rank: sngpoker.CardRank_FIVE, Suit: sngpoker.Suit_SPADE},
						{Rank: sngpoker.CardRank_FOUR, Suit: sngpoker.Suit_HEART},
					},
					HandDescription: "STRAIGHT: FOUR TO EIGHT",
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
					HandDescription: "STRAIGHT: ACE TO FIVE",
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
			expectedRankingDetail: []*RankingDetails{
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
					HandDescription: "FLUSH SPADES, SEVEN HIGH",
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
					HandDescription: "FLUSH SPADES, JACK HIGH",
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
			expectedRankingDetail: []*RankingDetails{
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
					HandDescription: "FULL HOUSE SEVENs FULL OF JACKs",
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
					HandDescription: "FULL HOUSE JACKs FULL OF SEVENs",
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
			expectedRankingDetail: []*RankingDetails{
				{
					PlayerId: 1,
					Ranking:  FourOfAKind,
					WinningCards: []*sngpoker.Card{
						{Rank: sngpoker.CardRank_NINE, Suit: sngpoker.Suit_SPADE},
						{Rank: sngpoker.CardRank_NINE, Suit: sngpoker.Suit_CLUB},
						{Rank: sngpoker.CardRank_NINE, Suit: sngpoker.Suit_DIAMOND},
						{Rank: sngpoker.CardRank_NINE, Suit: sngpoker.Suit_HEART},
					},
					HandDescription: "FOUR OF A KIND NINEs JACK KICKER",
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
					HandDescription: "FOUR OF A KIND JACKs NINE KICKER",
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
			expectedRankingDetail: []*RankingDetails{
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
					HandDescription: "STRAIGHT FLUSH SPADES, SEVEN HIGH",
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
					HandDescription: "STRAIGHT FLUSH SPADES, EIGHT HIGH",
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
					HandDescription: "STRAIGHT FLUSH SPADES, FIVE HIGH",
				},
			},
		},

		// straight flush ranking
		{
			communityCards: []*sngpoker.Card{
				{Rank: sngpoker.CardRank_QUEEN, Suit: sngpoker.Suit_SPADE},
				{Rank: sngpoker.CardRank_TEN, Suit: sngpoker.Suit_SPADE},
				{Rank: sngpoker.CardRank_KING, Suit: sngpoker.Suit_SPADE},
				{Rank: sngpoker.CardRank_THREE, Suit: sngpoker.Suit_SPADE},
				{Rank: sngpoker.CardRank_TWO, Suit: sngpoker.Suit_SPADE},
			},

			players: [][]*sngpoker.Player{
				{
					{

						Id: 1,
						Cards: []*sngpoker.Card{
							{Rank: sngpoker.CardRank_JACK, Suit: sngpoker.Suit_SPADE},
							{Rank: sngpoker.CardRank_ACE, Suit: sngpoker.Suit_SPADE},
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
							{Rank: sngpoker.CardRank_JACK, Suit: sngpoker.Suit_SPADE},
							{Rank: sngpoker.CardRank_ACE, Suit: sngpoker.Suit_SPADE},
						},
					},
				},
			},
			expectedRankingDetail: []*RankingDetails{
				{
					PlayerId: 1,
					Ranking:  RoyalFlush,
					WinningCards: []*sngpoker.Card{
						{Rank: sngpoker.CardRank_ACE, Suit: sngpoker.Suit_SPADE},
						{Rank: sngpoker.CardRank_KING, Suit: sngpoker.Suit_SPADE},
						{Rank: sngpoker.CardRank_QUEEN, Suit: sngpoker.Suit_SPADE},
						{Rank: sngpoker.CardRank_JACK, Suit: sngpoker.Suit_SPADE},
						{Rank: sngpoker.CardRank_TEN, Suit: sngpoker.Suit_SPADE},
					},
					HandDescription: "ROYAL FLUSH SPADES",
				},
				{
					PlayerId: 2,
					Ranking:  RoyalFlush,
					WinningCards: []*sngpoker.Card{
						{Rank: sngpoker.CardRank_ACE, Suit: sngpoker.Suit_SPADE},
						{Rank: sngpoker.CardRank_KING, Suit: sngpoker.Suit_SPADE},
						{Rank: sngpoker.CardRank_QUEEN, Suit: sngpoker.Suit_SPADE},
						{Rank: sngpoker.CardRank_JACK, Suit: sngpoker.Suit_SPADE},
						{Rank: sngpoker.CardRank_TEN, Suit: sngpoker.Suit_SPADE},
					},
					HandDescription: "ROYAL FLUSH SPADES",
				},
			},
		},
	}
}

// func getKickingTestData() []*RankingTestData {
// 	return []*RankingTestData{}
// }
