package engine

import (
	"fmt"
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

const rankingScale int32 = 10000000

// mapping of each card rank internal representation with user friendly strings
var CardRankNames = map[int]RankName{
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

// mapping of each card suit internal representation with user friendly strings
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

func getRoyalFlush(holes, community []*sngpoker.Card) (RankingDetails, bool) {
	straighResult, isStraightFlush := isStraightFlush(holes, community)

	return straighResult, isStraightFlush
}

func isStraightFlush(holes, community []*sngpoker.Card) (RankingDetails, bool) {
	// hand := append(holes, community...)
	return RankingDetails{}, false
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

// returns high card ranking data of given hand cards: RankingData{rank, score, winningCards}
// always returns true along with ranking data
func getHighCardRanking(holes, community []*sngpoker.Card) (RankingDetails, bool) {
	handByRank := sortHandByRank(holes, community)
	handBySuit := sortHandBySuit(holes, community)

	// get top card info
	highCard := handByRank[0]
	highCard.Suit = handBySuit[0].Suit

	// kick1, kick2, kick3, kick4 with Rank from handByRank and Suit from handBySuit
	kicks := handByRank[1:5]
	for i := range kicks {
		kicks[i].Suit = handBySuit[i].Suit
	}

	ranking := int32(HighCard)

	// calculate score for high card
	score := ranking * rankingScale // starting score is based on score and ranking scale

	// add score based on high card and kicks to break ties
	score = score + highCard.Rank*15
	// multiply each kicks(except last kick) based on their order
	for _, kick := range kicks[:len(kicks)-1] {
		score = (score + kick.Rank) * 15
	}

	score += kicks[len(kicks)-1].Rank
	return RankingDetails{
		Ranking:      ranking,
		Score:        score,
		WinningCards: []*sngpoker.Card{highCard},
		KickingCards: kicks,
	}, true
}

func getBestHand(player *sngpoker.Player, communityCards []*sngpoker.Card) RankingDetails {
	holes := player.Cards
	rankingResult, isHighCard := getHighCardRanking(holes, communityCards)
	if isHighCard {
		return rankingResult
	}
	return rankingResult
}

func rankHands(players []*sngpoker.Player, community []*sngpoker.Card) map[int]RankingDetails {
	playersHands := make([]RankingDetails, 0)
	rankings := make(map[int][]int)

	// populate playersBestHands map with player Id and ranking data
	// populate rankings array with ranking and player id
	for _, player := range players {
		bestHand := getBestHand(player, community)
		bestHand.PlayerId = player.Id
		playersHands = append(playersHands, bestHand)
		rankings[int(bestHand.Ranking)] = append(
			rankings[int(bestHand.Ranking)], int(player.Id))
	}
	sortedRankHands := make(map[int][]RankingDetails)
	for ranking := 0; ranking < 10; ranking++ {
		// skip ranking type if there are no players
		if len(rankings[ranking]) == 0 {
			continue
		}
		sortedRankHands[ranking] = sortPlayersHandsByScore(playersHands)
	}

	highScore := 0
	playerRankHands := make(map[int]RankingDetails)
	for ranking := 9; ranking >= 0; ranking-- {
		// skip rank type if no hands
		if len(sortedRankHands[ranking]) == 0 {
			continue
		}
		for _, rankHand := range sortedRankHands[ranking] {
			if rankHand.Score > int32(highScore) {
				highScore = int(rankHand.Score)
			}
			rankHand.HandDescription = getHandDescription(rankHand, ranking)
			playerRankHands[int(rankHand.PlayerId)] = rankHand
		}
	}
	// determine if kickers should be added to cards involved in the win for
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
				if otherHand.Ranking == rankHand.Ranking {
					//another player had the same rank but a lower score so kickers were used
					defeatedInSameRankId = append(defeatedInSameRankId,
						int(otherHand.PlayerId))
				}
			}
			for _, id := range defeatedInSameRankId {
				if containsItem([]int{7, 3, 1, 0}, int(rankHand.Ranking)) {
					//four of a kind OR three of a kind OR one pair OR just high card
					if rankHand.WinningCards[0].Rank > playerRankHands[int(id)].WinningCards[0].Rank || rankHand.KickingCards[0].Rank > playerRankHands[id].KickingCards[0].Rank {
						continue
					}
				} else if rankHand.Ranking == 2 {
					//two pair
					//see if pair1 or pair2 is enough to defeat the player
					if rankHand.WinningCards[0].Rank > playerRankHands[id].Ranking {
						continue
					}
				}
				//determine which kicker cards were used to win
				defeatedKickers := playerRankHands[id].KickingCards
				sort.Slice(defeatedKickers, func(i, j int) bool {
					return defeatedKickers[i].Rank > defeatedKickers[j].Rank
				})

				winnerKickers := rankHand.KickingCards
				sort.Slice(rankHand.KickingCards, func(i, j int) bool {
					return winnerKickers[i].Rank > winnerKickers[j].Rank
				})
				kickCardsUsed := make([]*sngpoker.Card, 0)
				for index, kick := range winnerKickers {
					kickCardsUsed = append(kickCardsUsed, kick)

					if kick.Rank > defeatedKickers[index].Rank {
						break
					}
				}
				rankHand.KickingCards = kickCardsUsed
				playerRankHands[indx] = rankHand
			}
		}
	}
	return playerRankHands

}

func GetRankedHandsResult(players []*sngpoker.Player,
	communityCards []*sngpoker.Card) map[int]RankingDetails {
	return rankHands(players, communityCards)
}

func GetHandTestResult(players []*sngpoker.Player,
	communityCard []*sngpoker.Card) sngpoker.RankHandsResult {
	rankHandResult := rankHands(players, communityCard)
	sortedRankHands := make([]RankingDetails, 0)
	for _, rankHand := range rankHandResult {
		sortedRankHands = append(sortedRankHands, rankHand)
	}

	sortedRankHands = sortPlayersHandsByScore(sortedRankHands)
	rankResult := make([]*sngpoker.RankingData, 0)
	for _, v := range sortedRankHands {
		rankResult = append(rankResult, &sngpoker.RankingData{
			PlayerId:        v.PlayerId,
			Score:           v.Score,
			WinningCards:    v.WinningCards,
			KickingCards:    v.KickingCards,
			HandDescription: v.HandDescription,
		})
	}

	return sngpoker.RankHandsResult{
		WinnerPlayerId: sortedRankHands[0].PlayerId,
		RankResult:     rankResult,
	}
}

// accepts best hand mapped with player id and returns sorted ids by
// best hand score value
func sortPlayersHandsByScore(bestHands []RankingDetails) []RankingDetails {
	sort.Slice(bestHands, func(i, j int) bool {
		return bestHands[i].Score > bestHands[j].Score
	})

	return bestHands
}

// returns the winning text from by rank and rank data
func getHandDescription(rankingData RankingDetails, ranking int) string {
	var handDescription string
	switch ranking {
	case 0: // High card
		high := rankingData.WinningCards[0]

		handDescription = fmt.Sprintf("HIGHCARD: %s", CardRankNames[int(high.Rank)].name)
		// concatenate kicker cards string
		handDescription += ", KICKERS: "
		kickers := rankingData.KickingCards
		for index, kick := range kickers {
			if index == len(kickers)-2 {
				handDescription += CardRankNames[int(kick.Rank)].name + " AND "
			} else if index == len(kickers)-1 {
				handDescription += CardRankNames[int(kick.Rank)].name
			} else {
				handDescription += CardRankNames[int(kick.Rank)].name + ", "
			}
			// cardStringRepresentation = getCardStringRepresentation(kick)
		}

	}

	return handDescription
}

// ! function trying to dictate/contain UI explicit syntax, consider removing this in future
func getCardHtmlRepresentation(card *sngpoker.Card) string {
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

	// ! script injection attack possible here beware when changing here
	return fmt.Sprintf(`<span class="%s"> %s </span>`, cardClass, SuitNames[int(card.Suit)])
}

func containsItem(arr []int, item int) bool {
	for _, element := range arr {
		if element == item {
			return true
		}
	}
	return false
}

type RankingDetails struct {
	PlayerId                     int32
	Ranking                      int32
	Score                        int32
	WinningCards                 []*sngpoker.Card
	KickingCards                 []*sngpoker.Card
	HandDescription              string
	CardsDirectlyInvolvedInHands []*sngpoker.Card
	CardsPotentiallyKickers      []*sngpoker.Card
}

type RankName struct {
	name       string
	multiplier string
}
