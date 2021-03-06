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

// mapping of each card rank internal representation with user friendly strings
var RankingTypeNames = map[RankingType]string{
	RoyalFlush:    "ROYAL FLUSH",
	StraightFlush: "STRAIGHT FLUSH",
	FourOfAKind:   "FOUR OF A KIND",
	FullHouse:     "FULL HOUSE",
	Flush:         "FLUSH",
	Straight:      "STRAIGHT",
	ThreeOfAKind:  "THREE OF A KIND",
	TwoPair:       "TWO PAIR",
	OnePair:       "ONE PAIR",
	HighCard:      "HIGHCARD",
}

const rankingScale int64 = 10000000

type RankingDetails struct {
	PlayerId              int32
	Ranking               RankingType
	Score                 int64
	WinningCards          []*sngpoker.Card
	KickingCards          []*sngpoker.Card
	HoleCards             []*sngpoker.Card
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

func getBestHand(
	player *sngpoker.Player,
	communityCards []*sngpoker.Card,
) RankingDetails {
	holes := player.Cards

	straightRankingResult, isStraight := getStraightRanking(holes, communityCards)
	if isStraight {
		straightFlushRanking, isStraightFlush := getStraightFlushRanking(holes, communityCards, straightRankingResult)
		if isStraightFlush {
			rankingResult, isRoyalFlush := getRoyalFlushRanking(holes, communityCards, straightFlushRanking)
			if isRoyalFlush {
				return rankingResult
			}

			return straightFlushRanking
		}
	}

	rankingResult, isFourOfAKind := getFourOfAKindRanking(holes, communityCards)
	if isFourOfAKind {
		return rankingResult
	}

	rankingResult, isFullHouse := getFullHouseRanking(holes, communityCards)
	if isFullHouse {
		return rankingResult
	}

	rankingResult, isFlush := getFlushRanking(holes, communityCards)
	if isFlush {
		return rankingResult
	}

	if isStraight {
		return straightRankingResult
	}

	rankingResult, isThreeOfAKind := getThreeOfAKindRanking(holes, communityCards)
	if isThreeOfAKind {
		return rankingResult
	}

	rankingResult, isTwoPair := getTwoPairRanking(holes, communityCards)
	if isTwoPair {
		return rankingResult
	}

	rankingResult, isOnePair := getOnePairRanking(holes, communityCards)
	if isOnePair {
		return rankingResult
	}

	// high card ranking is default always
	rankingResult, _ = getHighCardRanking(holes, communityCards)
	return rankingResult
}

func getRoyalFlushRanking(
	holes,
	community []*sngpoker.Card, straightFlushRanking RankingDetails) (RankingDetails, bool) {
	// check if found straight flush cards high cards is ace
	if straightFlushRanking.WinningCards[0].Rank != sngpoker.CardRank_ACE {
		return RankingDetails{}, false
	}

	// calculate score
	ranking := RoyalFlush

	baseScore := rankingScale * int64(ranking)

	// score and baseScore are the same for royal flush
	score := baseScore
	return RankingDetails{
		Ranking:      ranking,
		Score:        score,
		WinningCards: straightFlushRanking.WinningCards,
		HoleCards:    holes,
		KickingCards: []*sngpoker.Card{},
	}, true
}

func getStraightFlushRanking(
	holes,
	community []*sngpoker.Card,
	straightRankingResult RankingDetails,
) (RankingDetails, bool) {
	// check if found straight cards are also flush cards
	winningCards := straightRankingResult.WinningCards
	flushRanking, isFlush := getFlushRanking(winningCards, []*sngpoker.Card{})
	if !isFlush {
		return RankingDetails{}, false
	}

	// sort cards properly for special case five high to ace low straight cards
	if flushRanking.WinningCards[0].Rank == sngpoker.CardRank_ACE &&
		flushRanking.WinningCards[1].Rank == sngpoker.CardRank_FIVE {
		flushRanking.WinningCards = append(
			flushRanking.WinningCards[1:],
			flushRanking.WinningCards[0],
		)
	}

	winningCards = flushRanking.WinningCards

	// high card rank
	highCardRank := winningCards[0].Rank

	// calculate score
	ranking := StraightFlush

	baseScore := rankingScale * int64(ranking)

	// add score based on top card to break ties
	score := int64(highCardRank)
	score += baseScore
	return RankingDetails{
		Ranking:      ranking,
		Score:        score,
		WinningCards: winningCards,
		HoleCards:    holes,
		KickingCards: []*sngpoker.Card{},
	}, true
}

func getFourOfAKindRanking(
	holes,
	community []*sngpoker.Card,
) (RankingDetails, bool) {
	// sort hand cards by card rank
	handByRank := sortHandByRank(holes, community)

	// search for 4 cards with the same rank
	winningCards := []*sngpoker.Card{}
	for index := 0; index < len(handByRank)-3; index++ {
		if handByRank[index].Rank == handByRank[index+1].Rank &&
			handByRank[index].Rank == handByRank[index+2].Rank &&
			handByRank[index].Rank == handByRank[index+3].Rank {
			winningCards = []*sngpoker.Card{
				handByRank[index],
				handByRank[index+1],
				handByRank[index+2],
				handByRank[index+3],
			}
			break
		}
	}

	// no 4 same rank cards found
	if len(winningCards) != 4 {
		return RankingDetails{}, false
	}

	// 4 same card rank
	sameCardsRank := winningCards[0].Rank

	// get remaining 1 kicking cards
	kickingCards := make([]*sngpoker.Card, 0)
	for _, card := range handByRank {
		// if same card rank skip
		if sameCardsRank == card.Rank {
			continue
		}

		// 1 kicking cards must be found
		kickingCards = append(kickingCards, card)
		break
	}

	// calculate score
	ranking := FourOfAKind

	baseScore := rankingScale * int64(ranking)

	// add score based on top card and kicks to break ties
	score := int64(sameCardsRank) * 15
	score = score + int64(kickingCards[0].Rank) // add kicking card
	score += baseScore

	return RankingDetails{
		Ranking:      ranking,
		Score:        score,
		WinningCards: winningCards,
		KickingCards: kickingCards,
		HoleCards:    holes,
	}, true
}

func getFullHouseRanking(holes, community []*sngpoker.Card) (RankingDetails, bool) {
	// sort hand cards by card rank
	handByRank := sortHandByRank(holes, community)

	// search for 3 cards with the same rank
	winningCards := []*sngpoker.Card{}
	for index := 0; index < len(handByRank)-2; index++ {
		if handByRank[index].Rank == handByRank[index+1].Rank &&
			handByRank[index].Rank == handByRank[index+2].Rank {
			winningCards = []*sngpoker.Card{
				handByRank[index],
				handByRank[index+1],
				handByRank[index+2],
			}
			break
		}
	}

	// no 3 same rank cards found
	if len(winningCards) != 3 {
		return RankingDetails{}, false
	}

	// 3 same card rank
	threeSameCardRank := winningCards[0].Rank

	// search for cards pair with the same rank and set them as winning cards
	for index := 0; index < len(handByRank)-1; index++ {
		// skip if rank is the one we get for three same rank card
		if handByRank[index].Rank == threeSameCardRank {
			continue
		}

		if handByRank[index].Rank == handByRank[index+1].Rank {
			winningCards = append(winningCards, handByRank[index], handByRank[index+1])
			break
		}
	}

	// no pair found
	if len(winningCards) != 5 {
		return RankingDetails{}, false
	}

	// pair card rank
	twoSameCardRank := winningCards[3].Rank

	// calculate score
	ranking := FullHouse

	baseScore := rankingScale * int64(ranking)

	// add score based on top card and kicks to break ties
	score := int64(threeSameCardRank) * 15
	score += int64(twoSameCardRank)
	score += baseScore

	return RankingDetails{
		Ranking:      ranking,
		Score:        score,
		WinningCards: winningCards,
		KickingCards: []*sngpoker.Card{},
		HoleCards:    holes,
	}, true
}

func getFlushRanking(holes, community []*sngpoker.Card) (RankingDetails, bool) {
	handCards := append(holes, community...)
	cardsBySuit := make(map[sngpoker.Suit][]*sngpoker.Card)

	// collect cards by suit
	var maxSuitType sngpoker.Suit
	maxSuitTypeFound := false
	for _, card := range handCards {
		cardsBySuit[card.Suit] = append(cardsBySuit[card.Suit], card)
		if len(cardsBySuit[card.Suit]) >= 5 {
			maxSuitTypeFound = true
			maxSuitType = card.Suit
		}
	}

	// check we get more than 5 cards with the same suit
	if !maxSuitTypeFound {
		return RankingDetails{}, false
	}

	// sort and extract winning cards of the same suit
	maxSuitHandByRank := sortHandByRank(cardsBySuit[maxSuitType], []*sngpoker.Card{})
	winningCards := maxSuitHandByRank[:5]

	ranking := Flush

	baseScore := int64(ranking) * rankingScale

	subScoreMultiplier := int64(100000)
	score := int64(0)
	for _, card := range winningCards {
		score += subScoreMultiplier * int64(card.Rank)
		subScoreMultiplier /= 10
	}

	score += baseScore

	return RankingDetails{
		Ranking:      ranking,
		Score:        score,
		WinningCards: winningCards,
		KickingCards: []*sngpoker.Card{},
		HoleCards:    holes,
	}, true
}

func getStraightRanking(holes, community []*sngpoker.Card) (RankingDetails, bool) {
	// sort hand cards by card rank
	handByRank := sortHandByRank(holes, community)
	// fmt.Printf("Straight ranking:  %v\n", handByRank)

	// default values to check consecutive cards
	consecutiveCardsNumber := 0
	consecutiveCardsStartIndex := -1
	// search for cards pair with the same rank and set them as winning cards
	winningCards := []*sngpoker.Card{}
	for index := 0; index < len(handByRank)-1; index++ {
		if handByRank[index].Rank == handByRank[index+1].Rank+1 {
			if consecutiveCardsNumber == 0 {
				// first consecutive cards found
				consecutiveCardsNumber = 2
				consecutiveCardsStartIndex = index
			} else {
				consecutiveCardsNumber++
				// if 5 consecutive cards found, straight cards are found
				if consecutiveCardsNumber == 5 {
					winningCards = handByRank[consecutiveCardsStartIndex : consecutiveCardsStartIndex+5]
					break
				}
			}
		} else {
			// reset to default since consecutive card missed
			consecutiveCardsNumber = 0
			consecutiveCardsStartIndex = -1
		}
	}

	// no 5 consecutive cards found
	if len(winningCards) == 0 {
		// check if high five to low ace straight exists
		if handByRank[0].Rank == sngpoker.CardRank_ACE &&
			handByRank[len(handByRank)-1].Rank == sngpoker.CardRank_TWO &&
			handByRank[len(handByRank)-2].Rank == sngpoker.CardRank_THREE &&
			handByRank[len(handByRank)-3].Rank == sngpoker.CardRank_FOUR &&
			handByRank[len(handByRank)-4].Rank == sngpoker.CardRank_FIVE {
			winningCards = append(handByRank[len(handByRank)-4:], handByRank[0])
		} else {
			return RankingDetails{}, false
		}
	}

	// high card rank
	highCardRank := winningCards[0].Rank

	// calculate score
	ranking := Straight

	baseScore := rankingScale * int64(ranking)

	// add score based on top card to break ties
	score := int64(highCardRank)
	score += baseScore
	return RankingDetails{
		Ranking:      ranking,
		Score:        score,
		WinningCards: winningCards,
		KickingCards: []*sngpoker.Card{},
		HoleCards:    holes,
	}, true
}

func getThreeOfAKindRanking(holes, community []*sngpoker.Card) (RankingDetails, bool) {
	// sort hand cards by card rank
	handByRank := sortHandByRank(holes, community)

	// search for 3 cards with the same rank
	winningCards := []*sngpoker.Card{}
	for index := 0; index < len(handByRank)-2; index++ {
		if handByRank[index].Rank == handByRank[index+1].Rank &&
			handByRank[index].Rank == handByRank[index+2].Rank {
			winningCards = []*sngpoker.Card{
				handByRank[index], handByRank[index+1], handByRank[index+2],
			}
			break
		}
	}

	// no 3 same rank cards found
	if len(winningCards) != 3 {
		return RankingDetails{}, false
	}

	// 3 same card rank
	sameCardsRank := winningCards[0].Rank

	// get remaining 2 kicking cards
	kickingCards := make([]*sngpoker.Card, 0)
	for _, card := range handByRank {
		// if same card rank skip
		if sameCardsRank == card.Rank {
			continue
		}

		// 2 kicking cards must be found
		kickingCards = append(kickingCards, card)
		if len(kickingCards) == 2 {
			break
		}
	}

	// calculate score
	ranking := ThreeOfAKind

	baseScore := rankingScale * int64(ranking)

	// add score based on top card and kicks to break ties
	score := int64(sameCardsRank) * 15
	// multiply and add each kicks( based on their order
	score = (score + int64(kickingCards[0].Rank)) * 15
	score = score + int64(kickingCards[1].Rank) // last kick
	score += baseScore

	return RankingDetails{
		Ranking:      ranking,
		Score:        score,
		WinningCards: winningCards,
		KickingCards: kickingCards,
		HoleCards:    holes,
	}, true
}

func getTwoPairRanking(holes, community []*sngpoker.Card) (RankingDetails, bool) {
	// sort hand cards by card rank
	handByRank := sortHandByRank(holes, community)

	// search for cards pair with the same rank and but leaving at least 1 lower rank pair
	highRankPair := []*sngpoker.Card{}
	lowRankPairStart := 0
	// at least 3 cards must be left to get lower rank pair
	for index := 0; index < len(handByRank)-3; index++ {
		if handByRank[index].Rank == handByRank[index+1].Rank {
			highRankPair = []*sngpoker.Card{handByRank[index], handByRank[index+1]}
			lowRankPairStart = index + 2
			break
		}
	}
	// no high rank pair found
	if len(highRankPair) != 2 {
		return RankingDetails{}, false
	}
	// pair card rank
	highPairRank := highRankPair[0].Rank

	// search for cards pair with the same rank starting lower rank pair index
	lowRankPair := []*sngpoker.Card{}
	for index := lowRankPairStart; index < len(handByRank)-1; index++ {
		if handByRank[index].Rank == handByRank[index+1].Rank {
			lowRankPair = []*sngpoker.Card{handByRank[index], handByRank[index+1]}
			break
		}
	}
	// no low rank pair found
	if len(lowRankPair) != 2 {
		return RankingDetails{}, false
	}
	// pair card rank
	lowPairRank := lowRankPair[0].Rank

	// check integrity of winning cards
	if len(highRankPair)+len(lowRankPair) != 4 {
		// something is not right, winning cards expectation is failing
		return RankingDetails{}, false
	}

	// get remaining 1 kicking card
	kickingCards := []*sngpoker.Card{}
	for _, card := range handByRank {
		if highPairRank != card.Rank && lowPairRank != card.Rank {
			kickingCards = append(kickingCards, card)
			break
		}
	}

	// calculate score
	ranking := TwoPair

	baseScore := rankingScale * int64(ranking)

	// add score based on top card and kicks to break ties
	score := ((int64(highPairRank)*15 + int64(lowPairRank)) * 15)
	score = score + int64(kickingCards[0].Rank) // 1 kick
	score += baseScore
	return RankingDetails{
		Ranking:      ranking,
		Score:        score,
		WinningCards: append(highRankPair, lowRankPair...),
		KickingCards: kickingCards,
		HoleCards:    holes,
	}, true
}

func getOnePairRanking(holes, community []*sngpoker.Card) (RankingDetails, bool) {
	// sort hand cards by card rank
	handByRank := sortHandByRank(holes, community)

	// search for cards pair with the same rank and set them as winning cards
	winningCards := []*sngpoker.Card{}
	for index := 0; index < len(handByRank)-1; index++ {
		if handByRank[index].Rank == handByRank[index+1].Rank {
			winningCards = []*sngpoker.Card{handByRank[index], handByRank[index+1]}
			break
		}
	}

	// no pair found
	if len(winningCards) != 2 {
		return RankingDetails{}, false
	}

	// pair card rank
	pairCardRank := winningCards[0].Rank

	// get remaining 3 kicking cards
	kickingCards := make([]*sngpoker.Card, 0)
	for _, card := range handByRank {
		// if pair card rank skip
		if pairCardRank == card.Rank {
			continue
		}

		// 3 kicking cards must be found
		kickingCards = append(kickingCards, card)
		if len(kickingCards) == 3 {
			break
		}
	}

	// calculate score
	ranking := OnePair

	baseScore := rankingScale * int64(ranking)

	// add score based on top card and kicks to break ties
	score := int64(pairCardRank) * 15
	// multiply each kicks(except last kick) based on their order
	for _, kick := range kickingCards[:len(kickingCards)-1] {
		score = (score + int64(kick.Rank)) * 15
	}
	score = score + int64(kickingCards[len(kickingCards)-1].Rank) // last kick
	score += baseScore
	return RankingDetails{
		Ranking:      ranking,
		Score:        score,
		WinningCards: winningCards,
		KickingCards: kickingCards,
		HoleCards:    holes,
	}, true
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
	baseScore := int64(ranking) * rankingScale // starting score is based on score and ranking scale

	// add score based on high card and kicks to break ties
	score := int64(highCard.Rank) * 15
	// multiply each kicks(except last kick) based on their order
	for _, kick := range kickingCards[:len(kickingCards)-1] {
		score = (score + int64(kick.Rank)) * 15
	}

	score += int64(kickingCards[len(kickingCards)-1].Rank)
	score += baseScore

	return RankingDetails{
		Ranking:      ranking,
		Score:        score,
		WinningCards: []*sngpoker.Card{highCard},
		KickingCards: kickingCards,
		HoleCards:    holes,
	}, true
}

func RankHands(players []*sngpoker.Player, community []*sngpoker.Card) []RankingDetails {
	playersHands := make([]RankingDetails, 0)

	// populate playersBestHands map with player Id and ranking data
	// populate rankings array with ranking and player id
	for _, player := range players {
		bestHand := getBestHand(player, community)
		bestHand.PlayerId = player.Id
		playersHands = append(playersHands, bestHand)
	}

	// sort hands by score
	playersHands = sortPlayersHandsByScore(playersHands)
	for index, playerHand := range playersHands {
		playerHand.HandDescription = getHandDescription(playerHand)
		playersHands[index] = playerHand
	}

	// for winers of same rank, determine kicker cards userd for win
	return determineKickerCardsUsedToWin(playersHands)
}

// update high score player hand ranking to include kicker cards used to win if exists
// beware more than 1 player could have used kicker cards to win and same high score
// parameter playersHandRankings is mapping of player id to ranking details
func determineKickerCardsUsedToWin(rankedPlayerHands []RankingDetails) []RankingDetails {
	// since the hands are sorted by score, the first hand is
	// the one with the highest score
	highScore := rankedPlayerHands[0].Score
	for winningIndex, possibleWinningHand := range rankedPlayerHands {
		// determine if kickers should be added to cards involved in the win for
		// the winning player(s) compared to the other hands that were defeated
		if possibleWinningHand.Score == highScore &&
			// these rankings have no kicker possibilites so skip if these rankings found
			!containsItem([]RankingType{
				RoyalFlush,
				StraightFlush,
				FullHouse,
				Flush,
				Straight,
			}, possibleWinningHand.Ranking) {
			//include any kickers used in determining final outcome
			//remaining rankings have kicker possibilities

			highScoreHand := possibleWinningHand
			// collect other player hand rankings that have the same rank with high score player
			defeatedInSameRankIndexes := make([]int, 0)
			for defeatedIndex, defeatedHand := range rankedPlayerHands {
				if defeatedHand.Ranking == highScoreHand.Ranking {
					// skip if player is the one with high score
					if defeatedHand.PlayerId == highScoreHand.PlayerId ||
						(defeatedHand.Score == highScore) {
						continue
					}

					//another player had the same rank but a lower score so kickers were used
					defeatedInSameRankIndexes = append(defeatedInSameRankIndexes,
						defeatedIndex)
				}
			}

			kickingCardsUsedToWin := make([]*sngpoker.Card, 0)
			for _, defeatedIndex := range defeatedInSameRankIndexes {
				// check if 2 of winning cards of two pair is enough to defeat the player
				// without needing additional kicking cards and skip if so
				if highScoreHand.Ranking == TwoPair {
					if (highScoreHand.WinningCards[0].Rank >
						rankedPlayerHands[defeatedIndex].WinningCards[0].Rank) ||
						(highScoreHand.WinningCards[2].Rank >
							rankedPlayerHands[defeatedIndex].WinningCards[2].Rank) {
						continue
					}
					// for the rest (Four of A Kind, Three of A Kind, One pair or highcard)
					// check the winning card was enough to defeat player without needing kicking cards
				} else if highScoreHand.WinningCards[0].Rank >
					rankedPlayerHands[defeatedIndex].WinningCards[0].Rank {
					continue
				}

				// determine which kicker cards were used to win
				// sort defeated player kicking cards for comparison
				defeatedPlayerKickers := rankedPlayerHands[defeatedIndex].KickingCards
				sort.Slice(defeatedPlayerKickers, func(i, j int) bool {
					return defeatedPlayerKickers[i].Rank > defeatedPlayerKickers[j].Rank
				})

				// sort winner player kicking cards for comparison
				winnerPlayerKickers := highScoreHand.KickingCards
				sort.Slice(highScoreHand.KickingCards, func(i, j int) bool {
					return winnerPlayerKickers[i].Rank > winnerPlayerKickers[j].Rank
				})

				// check which winner kicking cards used comparing with the defeated player kicking cards
				for index, winnerKickCard := range winnerPlayerKickers {
					if winnerKickCard.Rank > defeatedPlayerKickers[index].Rank {
						kickingCardsUsedToWin = append(kickingCardsUsedToWin, winnerKickCard)
						break
					}
				}
			}
			// updated winner hand kicking cards used to win
			highScoreHand.KickingCardsUsedToWin = kickingCardsUsedToWin
			// need to update slice since range loop give us element copy
			rankedPlayerHands[winningIndex] = highScoreHand
		}
	}
	return rankedPlayerHands
}

// returns given hand cards sorted by their rank
func sortHandByRank(holes, community []*sngpoker.Card) []*sngpoker.Card {
	hand := append(holes, community...)
	sort.SliceStable(hand, func(i, j int) bool {
		// since in our representation higher number is higher rank
		// we need to sort it in reverse order(use more function not less function for sort.SliceStable)
		return isCardMoreByRank(hand[i], hand[j])
	})
	return hand
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

// accepts best hand mapped with player id and returns sorted player ids by
// best hand score value
func sortPlayersHandsByScore(bestHands []RankingDetails) []RankingDetails {
	sort.Slice(bestHands, func(i, j int) bool {
		return bestHands[i].Score > bestHands[j].Score
	})

	return bestHands
}

// returns the winning text from by rank and rank data
func getHandDescription(rankingData RankingDetails) string {
	var handDescription string
	switch rankingData.Ranking {
	case HighCard:
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
		}
		return handDescription
	case OnePair, ThreeOfAKind:
		highPairCard := rankingData.WinningCards[0]

		handDescription = fmt.Sprintf(
			"%s: %s%s",
			RankingTypeNames[rankingData.Ranking],
			CardRankNames[highPairCard.Rank].name,
			CardRankNames[highPairCard.Rank].multiplier,
		)
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
		return handDescription
	case TwoPair:
		highPairCard := rankingData.WinningCards[0]
		lowPairCard := rankingData.WinningCards[2]

		handDescription = fmt.Sprintf(
			"%s: %s%s",
			RankingTypeNames[rankingData.Ranking],
			CardRankNames[highPairCard.Rank].name,
			CardRankNames[highPairCard.Rank].multiplier,
		)
		handDescription += fmt.Sprintf(
			" AND %s%s",
			CardRankNames[lowPairCard.Rank].name,
			CardRankNames[lowPairCard.Rank].multiplier,
		)
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
		}
		return handDescription
	case Straight:
		highestCard := rankingData.WinningCards[0]
		lowestCard := rankingData.WinningCards[len(rankingData.WinningCards)-1]
		handDescription = fmt.Sprintf(
			"%s: %s TO %s",
			RankingTypeNames[rankingData.Ranking],
			CardRankNames[lowestCard.Rank].name,
			CardRankNames[highestCard.Rank].name,
		)
		return handDescription
	case Flush:
		highestCard := rankingData.WinningCards[0]
		handDescription = fmt.Sprintf(
			"%s %s, %s HIGH",
			RankingTypeNames[rankingData.Ranking],
			SuitNames[highestCard.Suit],
			CardRankNames[highestCard.Rank].name,
		)
		return handDescription
	case FullHouse:
		threeOfAKindCard := rankingData.WinningCards[0]
		pairCard := rankingData.WinningCards[3]
		handDescription = fmt.Sprintf(
			"%s %s%s FULL OF %s%s",
			RankingTypeNames[rankingData.Ranking],
			CardRankNames[threeOfAKindCard.Rank].name,
			CardRankNames[threeOfAKindCard.Rank].multiplier,
			CardRankNames[pairCard.Rank].name,
			CardRankNames[pairCard.Rank].multiplier,
		)
		return handDescription
	case FourOfAKind:
		fourOfAKindCard := rankingData.WinningCards[0]
		kickingCard := rankingData.KickingCards[0]
		handDescription = fmt.Sprintf(
			"%s %s%s %s KICKER",
			RankingTypeNames[rankingData.Ranking],
			CardRankNames[fourOfAKindCard.Rank].name,
			CardRankNames[fourOfAKindCard.Rank].multiplier,
			CardRankNames[kickingCard.Rank].name,
		)
		return handDescription
	case StraightFlush:
		highestCard := rankingData.WinningCards[0]
		handDescription = fmt.Sprintf(
			"%s %s, %s HIGH",
			RankingTypeNames[rankingData.Ranking],
			SuitNames[highestCard.Suit],
			CardRankNames[highestCard.Rank].name,
		)
		return handDescription
	case RoyalFlush:
		highestCard := rankingData.WinningCards[0]
		handDescription = fmt.Sprintf(
			"%s %s",
			RankingTypeNames[rankingData.Ranking],
			SuitNames[highestCard.Suit],
		)
		return handDescription
	}

	return handDescription
}
