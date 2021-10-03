package engine

import (
	"fmt"
	"sngrpc/sngpoker"
	"sort"
)

type RankingType int32

const (
	RoyalFlush    RankingType = 9
	StraightFlush RankingType = 8
	FourOfAKind   RankingType = 7
	FullHouse     RankingType = 6
	Flush         RankingType = 5
	Straight      RankingType = 4
	ThreeOfAKind  RankingType = 3
	TwoPair       RankingType = 2
	OnePair       RankingType = 1
	HighCard      RankingType = 0
)

const rankingScale int32 = 10000000

type RankingDetails struct {
	PlayerId              int32
	Ranking               RankingType
	Score                 int32
	WinningCards          []*sngpoker.Card
	KickingCards          []*sngpoker.Card
	HandDescription       string
	KickingCardsUsedToWin []*sngpoker.Card
}

type RankName struct {
	name       string
	multiplier string
}

// mapping of each card rank internal representation with user friendly strings
var CardRankNames = map[sngpoker.CardRank]RankName{
	sngpoker.CardRank_TWO:   {name: "DEUCE", multiplier: "s"},
	sngpoker.CardRank_THREE: {name: "THREE", multiplier: "s"},
	sngpoker.CardRank_FOUR:  {name: "FOUR", multiplier: "s"},
	sngpoker.CardRank_FIVE:  {name: "FIVE", multiplier: "s"},
	sngpoker.CardRank_SIX:   {name: "SIX", multiplier: "es"},
	sngpoker.CardRank_SEVEN: {name: "SEVEN", multiplier: "s"},
	sngpoker.CardRank_EIGHT: {name: "EIGHT", multiplier: "s"},
	sngpoker.CardRank_NINE:  {name: "NINE", multiplier: "s"},
	sngpoker.CardRank_TEN:   {name: "TEN", multiplier: "s"},
	sngpoker.CardRank_JACK:  {name: "JACK", multiplier: "s"},
	sngpoker.CardRank_QUEEN: {name: "QUEEN", multiplier: "s"},
	sngpoker.CardRank_KING:  {name: "KING", multiplier: "s"},
	sngpoker.CardRank_ACE:   {name: "ACE", multiplier: "s"},
}

// mapping of each card suit internal representation with user friendly strings
var SuitNames = map[sngpoker.Suit]string{
	sngpoker.Suit_DIAMOND: "DIAMONDS",
	sngpoker.Suit_HEART:   "HEARTS",
	sngpoker.Suit_SPADE:   "SPADES",
	sngpoker.Suit_CLUB:    "CLUBS",
}

func GetHandTestResult(players []*sngpoker.Player,
	communityCards []*sngpoker.Card) sngpoker.RankHandsResult {
	rankHandResult := rankHands(players, communityCards)
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

func containsItem(arr []RankingType, item RankingType) bool {
	for _, element := range arr {
		if element == item {
			return true
		}
	}
	return false
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

// returns high card ranking details of given hand cards
// always returns true along with ranking data
func getHighCardRanking(holes, community []*sngpoker.Card) (RankingDetails, bool) {
	handByRank := sortHandByRank(holes, community)

	// get winning card info
	highCard := handByRank[0]

	// remaining 4 top cards are kicking cards kick1, kick2, kick3, kick4
	kickingCards := handByRank[1:5]

	ranking := HighCard

	// calculate score for high card
	score := int32(ranking) * rankingScale // starting score is based on score and ranking scale

	// add score based on high card and kicks to break ties
	score = score + int32(highCard.Rank)*15
	// multiply each kicks(except last kick) based on their order
	for _, kick := range kickingCards[:len(kickingCards)-1] {
		score = (score + int32(kick.Rank)) * 15
	}

	score += int32(kickingCards[len(kickingCards)-1].Rank)
	return RankingDetails{
		Ranking:      ranking,
		Score:        score,
		WinningCards: []*sngpoker.Card{highCard},
		KickingCards: kickingCards,
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

func rankHands(players []*sngpoker.Player, community []*sngpoker.Card) map[int32]RankingDetails {
	playersHands := make([]RankingDetails, 0)
	rankings := make(map[RankingType][]int)

	// populate playersBestHands map with player Id and ranking data
	// populate rankings array with ranking and player id
	for _, player := range players {
		bestHand := getBestHand(player, community)
		bestHand.PlayerId = player.Id
		playersHands = append(playersHands, bestHand)
		rankings[bestHand.Ranking] = append(
			rankings[bestHand.Ranking], int(player.Id))
	}

	// ranking type to ranking details mapping
	sortedHandRankings := make(map[RankingType][]RankingDetails)
	for ranking := HighCard; ranking <= RoyalFlush; ranking++ {
		// skip ranking type if there are no players
		if len(rankings[ranking]) == 0 {
			continue
		}
		sortedHandRankings[ranking] = sortPlayersHandsByScore(playersHands)
	}

	highScore := int32(0)
	// player id to ranking details mapping
	playersHandRankings := make(map[int32]RankingDetails)
	for ranking := RoyalFlush; ranking >= HighCard; ranking-- {
		// skip rank type if no hands
		if len(sortedHandRankings[ranking]) == 0 {
			continue
		}
		for _, handRanking := range sortedHandRankings[ranking] {
			if handRanking.Score > int32(highScore) {
				highScore = handRanking.Score
			}
			handRanking.HandDescription = getHandDescription(handRanking, ranking)
			playersHandRankings[handRanking.PlayerId] = handRanking
		}
	}

	// updated player hand ranking to contain kick cards used to win
	determineKickerCardsUsedToWin(playersHandRankings, highScore)

	return playersHandRankings
}

// update high score player hand ranking to include kicker cards used to win if exists
// beware more than 1 player could have used kicker cards to win and same high score
// parameter playersHandRankings is mapping of player id to ranking details
func determineKickerCardsUsedToWin(playersHandRankings map[int32]RankingDetails, highScore int32) {
	for index, possibleWinnerRanking := range playersHandRankings {
		// determine if kickers should be added to cards involved in the win for
		// the winning player(s) compared to the other hands that were defeated
		if possibleWinnerRanking.Score == highScore &&
			// these rankingss have no kicker possibilites so skip if these rankings found
			!containsItem([]RankingType{RoyalFlush, StraightFlush, FullHouse, Flush, Straight}, possibleWinnerRanking.Ranking) {
			//include any kickers used in determining final outcome
			//remaining rankings have kicker possibilities

			highScoreHandRanking := possibleWinnerRanking
			// collect other player hand rankings that have the same rank with high score player
			defeatedInSameRankPlayerIds := make([]int32, 0)
			for _, otherHand := range playersHandRankings {
				if otherHand.Ranking == highScoreHandRanking.Ranking {
					// skip if player is the one with high score
					if otherHand.PlayerId == highScoreHandRanking.PlayerId || (otherHand.Score == highScore) {
						continue
					}

					//another player had the same rank but a lower score so kickers were used
					defeatedInSameRankPlayerIds = append(defeatedInSameRankPlayerIds,
						otherHand.PlayerId)
				}
			}

			kickingCardsUsedToWin := make([]*sngpoker.Card, 0)
			for _, playerId := range defeatedInSameRankPlayerIds {
				if containsItem([]RankingType{FourOfAKind, ThreeOfAKind, OnePair, HighCard}, highScoreHandRanking.Ranking) {
					// check if the winning card of four of a kind OR three of a kind OR one pair OR just high card was enough
					// to defeat player without needing additional kicking cards and skip if so
					if highScoreHandRanking.WinningCards[0].Rank > playersHandRankings[playerId].WinningCards[0].Rank {
						continue
					}
				} else if highScoreHandRanking.Ranking == TwoPair {
					//check if 2 of winning cards of two pair is enough to defeat the player
					// without needing additional kicking cards and skip if so
					if highScoreHandRanking.WinningCards[0].Rank > playersHandRankings[playerId].WinningCards[0].Rank ||
						highScoreHandRanking.WinningCards[1].Rank > playersHandRankings[playerId].WinningCards[1].Rank {
						continue
					}
				}

				//determine which kicker cards were used to win

				// sort defeated player kicking cards for comparison
				defeatedPlayerKickers := playersHandRankings[playerId].KickingCards
				sort.Slice(defeatedPlayerKickers, func(i, j int) bool {
					return defeatedPlayerKickers[i].Rank > defeatedPlayerKickers[j].Rank
				})

				// sort winner player kicking cards for comparison
				winnerPlayerKickers := highScoreHandRanking.KickingCards
				sort.Slice(highScoreHandRanking.KickingCards, func(i, j int) bool {
					return winnerPlayerKickers[i].Rank > winnerPlayerKickers[j].Rank
				})

				// check which winner kicking cards used comparing with the defeated player kicking cards
				for index, winnerKickCard := range winnerPlayerKickers {
					kickingCardsUsedToWin = append(kickingCardsUsedToWin, winnerKickCard)

					if winnerKickCard.Rank > defeatedPlayerKickers[index].Rank {
						break
					}
				}
			}

			// updated winner hand kicking cards used to win
			highScoreHandRanking.KickingCardsUsedToWin = kickingCardsUsedToWin
			// need to update slice since range loop give us element copy
			playersHandRankings[index] = highScoreHandRanking
		}
	}
}

// accepts best hand mapped with player id and returns sorted player ids by
// best hand score value
func sortPlayersHandsByScore(bestHands []RankingDetails) []RankingDetails {
	sort.Slice(bestHands, func(i, j int) bool {
		return bestHands[i].Score > bestHands[j].Score
	})

	return bestHands
}

// returns the winning text from by rank and rank data
func getHandDescription(rankingData RankingDetails, ranking RankingType) string {
	var handDescription string
	switch ranking {
	case 0: // High card
		high := rankingData.WinningCards[0]

		handDescription = fmt.Sprintf("HIGHCARD: %s", CardRankNames[high.Rank].name)
		// concatenate kicker cards string
		handDescription += ", KICKERS: "
		kickers := rankingData.KickingCards
		for index, kick := range kickers {
			if index == len(kickers)-2 {
				handDescription += CardRankNames[kick.Rank].name + " AND "
			} else if index == len(kickers)-1 {
				handDescription += CardRankNames[kick.Rank].name
			} else {
				handDescription += CardRankNames[kick.Rank].name + ", "
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
	return fmt.Sprintf(`<span class="%s"> %s </span>`, cardClass, SuitNames[card.Suit])
}
