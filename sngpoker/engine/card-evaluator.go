package engine

import (
	"sngrpc/sngpoker"
	"sort"
)

type Ranking int32

const (
	RoyalFlush    Ranking = 10
	StraightFlush Ranking = 9
	OnePair       Ranking = 1
	HighCard      Ranking = 0
)

const rankScale int32 = 10000000

var RankNames = map[int]RankName{
	0:  {name: "DEUCE", multiplier: "s"},
	1:  {name: "THREE", multiplier: "s"},
	2:  {name: "FOUR", multiplier: "s"},
	3:  {name: "FIVE", multiplier: "s"},
	4:  {name: "SIX", multiplier: "es"},
	5:  {name: "SEVEN", multiplier: "s"},
	6:  {name: "EIGHT", multiplier: "s"},
	7:  {name: "NINE", multiplier: "s"},
	8:  {name: "TEN", multiplier: "s"},
	9:  {name: "JACK", multiplier: "s"},
	10: {name: "QUEEN", multiplier: "s"},
	11: {name: "KING", multiplier: "s"},
	12: {name: "ACE", multiplier: "s"},
}

var SuitNames = map[int]string{
	3: "DIAMONDS",
	2: "HEARTS",
	1: "SPADES",
	0: "CLUBS",
}

func isCardMoreByRank(a, b *sngpoker.Card) bool {
	return a.Rank > b.Rank

}

func isCardLessBySuit(a, b *sngpoker.Card) bool {
	return a.Suit > b.Suit
}

// returns given hand cards sorted by their rank
func sortHandByRank(holes, community []*sngpoker.Card) []*sngpoker.Card {
	hand := append(holes, community...)
	sort.SliceStable(hand, func(i, j int) bool {
		// since in our representation higher number is higher rank
		// we need to sort it in reverse order(use more function not less function for sort.SliceStable)
		return isCardMoreByRank(hand[i], hand[j])
	})
	return hand[:5]
}

// returns given cards sorted by their suit
func sortHandBySuit(holes, community []*sngpoker.Card) []*sngpoker.Card {
	hand := append(holes, community...)

	// sort hand by rank
	sort.SliceStable(hand, func(i, j int) bool {
		return isCardLessBySuit(hand[i], hand[j])
	})
	return hand[:5]
}

func getRoyalFlush(holes, community []*sngpoker.Card) (RankingData, bool) {
	straighResult, isStraightFlush := isStraightFlush(holes, community)

	return straighResult, isStraightFlush
}

func isStraightFlush(holes, community []*sngpoker.Card) (RankingData, bool) {
	// hand := append(holes, community...)
	return RankingData{}, false
}

func isFourOfAKind(holes, community []*sngpoker.Card) bool {
	return false
}

func isFullHouse(holes, community []*sngpoker.Card) bool {
	return false
}

func isFlush(holes, community []*sngpoker.Card) bool {
	return false
}

func isStraight(holes, community []*sngpoker.Card) bool {
	return false
}

func getThreeOfAKindRanking(holes, community []*sngpoker.Card) bool {
	return false
}

func getTwoPairRanking(holes, community []*sngpoker.Card) bool {
	return false
}

func getOnePairRanking(holes, community []*sngpoker.Card) bool {
	return false
}

// returns high card ranking data: RankingData{rank, score, winningCards}
func getHighCardRanking(holes, community []*sngpoker.Card) (RankingData, bool) {
	handByRank := sortHandByRank(holes, community)
	handBySuit := sortHandBySuit(holes, community)
	// fmt.Printf("handByRank: %v\n", handByRank)
	high := handByRank[0]
	high.Suit = handBySuit[0].Suit
	// kik1, kick2, kick3, kick4 with Rank from handByRank and Suit from handBySuit
	kicks := handByRank[1:5]
	for i := range kicks {
		kicks[i].Suit = handBySuit[i].Suit
	}
	rank := int32(HighCard)

	// calculate score
	score := high.Rank * 15
	// multiply first kick to one before last kick by 15 and and to score
	// fmt.Printf("kicks: %v\n", kicks)
	for _, kick := range kicks[:len(kicks)-1] {
		score += kick.Rank * 15
	}
	score += (rank * rankScale) + kicks[len(kicks)-1].Rank
	return RankingData{
		Rank:        rank,
		Score:       score,
		WinningCard: high,
		KickCards:   kicks,
	}, true
}

func getBestHand(player *sngpoker.Player, communityCards []*sngpoker.Card) RankingData {
	holes := player.Cards
	rankResult, isHighCard := getHighCardRanking(holes, communityCards)
	if isHighCard {
		return rankResult
	}
	return rankResult
}

func rankHands(players []*sngpoker.Player, community []*sngpoker.Card) map[int]RankingData {
	playersHands := make([]RankingData, 0)
	ranks := make(map[int][]int)

	// populate playersBestHands map with player Id and rankin data
	// populate ranks array with rank and player id
	for _, player := range players {
		bestHand := getBestHand(player, community)
		bestHand.PlayerId = player.Id
		playersHands = append(playersHands, bestHand)
		ranks[int(bestHand.Rank)] = append(
			ranks[int(bestHand.Rank)], int(player.Id))
	}
	sortedRankHands := make(map[int][]RankingData)
	for rank := 0; rank < 10; rank++ {
		// skip rank type if there are no players
		if len(ranks[rank]) == 0 {
			continue
		}
		sortedRankHands[rank] = sortPlayersHandsByScore(playersHands)
	}

	highScore := 0
	playerRankHands := make(map[int]RankingData)
	for rank := 9; rank >= 0; rank-- {
		// skip rank type if no hands
		if len(sortedRankHands[rank]) == 0 {
			continue
		}
		for _, rankHand := range sortedRankHands[rank] {
			if rankHand.Score > int32(highScore) {
				highScore = int(rankHand.Score)
			}
			rankHand.WinningText = getWinningText(rankHand, rank)
			playerRankHands[int(rankHand.PlayerId)] = rankHand
		}
	}
	// determine if kickers shoudl be adde to cards invlved in the win for
	// the winning player(s) compared to the other hands that were defeated
	for indx, rankHand := range playerRankHands {
		if rankHand.Score == int32(highScore) &&
			!containsItem([]int{9, 8, 7, 6, 5, 4}, int(rankHand.Score)) {
			//include any kickers used in determining final outcome
			//these ranks have kicker possibilities
			defeatedInSameRankId := make([]int, 0)
			for _, otherHand := range playerRankHands {
				if otherHand.PlayerId == rankHand.PlayerId || (otherHand.Score == int32(highScore)) {
					continue
				}
				if otherHand.Rank == rankHand.Rank {
					//another player had the same rank but a lower score so kickers were used
					defeatedInSameRankId = append(defeatedInSameRankId,
						int(otherHand.PlayerId))
				}
			}
			for _, id := range defeatedInSameRankId {
				if containsItem([]int{7, 3, 1, 0}, int(rankHand.Rank)) {
					//four of a kind OR three of a kind OR one pair OR just high card
					if rankHand.WinningCard.Rank > playerRankHands[int(id)].WinningCard.Rank || rankHand.KickCards[0].Rank > playerRankHands[id].KickCards[0].Rank {
						continue
					}
				} else if rankHand.Rank == 2 {
					//two pair
					//see if pair1 or pair2 is enough to defeat the player
					if rankHand.WinningCard.Rank > playerRankHands[id].Rank {
						continue
					}
				}
				//determine which kicker cards were used to win
				defeatedKickers := playerRankHands[id].KickCards
				sort.Slice(defeatedKickers, func(i, j int) bool {
					return defeatedKickers[i].Rank > defeatedKickers[j].Rank
				})

				winnerKickers := rankHand.KickCards
				sort.Slice(rankHand.KickCards, func(i, j int) bool {
					return winnerKickers[i].Rank > winnerKickers[j].Rank
				})
				kickCardsUsed := make([]*sngpoker.Card, 0)
				for index, kick := range winnerKickers {
					kickCardsUsed = append(kickCardsUsed, kick)

					if kick.Rank > defeatedKickers[index].Rank {
						break
					}
				}
				rankHand.KickCards = kickCardsUsed
				playerRankHands[indx] = rankHand
			}
		}
	}
	return playerRankHands

}

func GetRankHandsResult(players []*sngpoker.Player,
	communityCards []*sngpoker.Card) map[int]RankingData {
	return rankHands(players, communityCards)
}

func GetHandTestResult(players []*sngpoker.Player,
	communityCard []*sngpoker.Card) sngpoker.RankHandsResult {
	rankHandResult := rankHands(players, communityCard)
	sortedRankHands := make([]RankingData, 0)
	for _, rankHand := range rankHandResult {
		sortedRankHands = append(sortedRankHands, rankHand)
	}

	sortedRankHands = sortPlayersHandsByScore(sortedRankHands)
	rankResult := make([]*sngpoker.RankData, 0)
	for _, v := range sortedRankHands {
		rankResult = append(rankResult, &sngpoker.RankData{
			PlayerId:        v.PlayerId,
			Score:           v.Score,
			HighCard:        v.WinningCard,
			KickCards:       v.KickCards,
			HandDescription: v.WinningText,
		})
	}

	return sngpoker.RankHandsResult{
		WinnerPlayerId: sortedRankHands[0].PlayerId,
		RankResult:     rankResult,
	}
}

// accepts best hand mapped with player id and returns sorted ids by
// best hand score value
func sortPlayersHandsByScore(bestHands []RankingData) []RankingData {
	sort.Slice(bestHands, func(i, j int) bool {
		return bestHands[i].Score > bestHands[j].Score
	})

	return bestHands
}

// returns the winning text from by rank and rank data
func getWinningText(rankData RankingData, rank int) string {
	var winningText string
	switch rank {
	case 0: // High card
		high := rankData.WinningCard

		winningText = "HIGHCARD: " + RankNames[int(high.Rank)].name
		winningText += ", KICKERS: "
		kickers := rankData.KickCards
		for index, kick := range kickers {
			if index == len(kickers)-2 {
				winningText += RankNames[int(kick.Rank)].name + " AND "
			} else if index == len(kickers)-1 {
				winningText += RankNames[int(kick.Rank)].name
			} else {
				winningText += RankNames[int(kick.Rank)].name + ", "
			}
			// cardStringRepresentation = getCardStringRepresentation(kick)
		}

	}

	return winningText
}

func getCardStringRepresentation(card *sngpoker.Card) string {
	var cardClass string
	switch card.Suit {
	case 0:
		cardClass = "card_diamond"
	case 1:
		cardClass = "card_club"
	case 2:
		cardClass = "card_spade"
	case 3:
		cardClass = "card_head"
	}

	return "<span class=\"" + cardClass + "\">" + SuitNames[int(card.Suit)] + "</span>"
}

func containsItem(arr []int, item int) bool {
	for _, element := range arr {
		if element == item {
			return true
		}
	}
	return false
}

type RankingData struct {
	PlayerId    int32
	Rank        int32
	Score       int32
	WinningCard *sngpoker.Card
	KickCards   []*sngpoker.Card
	WinningText string
}

type RankName struct {
	name       string
	multiplier string
}
