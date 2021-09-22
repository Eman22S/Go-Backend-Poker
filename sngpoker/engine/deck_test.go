package engine

import (
	"reflect"
	sngerrors "sngrpc/sngErrors"
	"sngrpc/sngpoker"
	"testing"
)

func TestDeck(t *testing.T) {

	t.Run("Get new deck should give 52 cards", func(t *testing.T) {
		deck, err := GetNewDeck()
		if err != nil {
			sngerrors.PrintErrorAndFailTest(err, t)
		}
		want := 52
		got := len(deck.CurrentDeck.Cards)

		if want != got {
			t.Errorf("Incorrect number of cards, wanted: %d, got: %d", want, got)
		}
	})

	t.Run("New deck should contain all ranks and suits", func(t *testing.T) {
		deck, err := GetNewDeck()
		if err != nil {
			sngerrors.PrintErrorAndFailTest(err, t)
		}

		if !containsAllRanksAndSuits(deck.CurrentDeck.Cards) {
			t.Error("Card should contain all ranks and suits")
		}
	})

	t.Run("Shuffled deck should not be equal to initial deck", func(t *testing.T) {
		deck, err := GetNewDeck()

		if err != nil {
			sngerrors.PrintErrorAndFailTest(err, t)
		}
		cardsNow := deck.CurrentDeck.Cards
		err = deck.ShuffleDeck()
		if err != nil {
			sngerrors.PrintErrorAndFailTest(err, t)
		}
		cardsShuffled := deck.CurrentDeck.Cards

		if reflect.DeepEqual(cardsNow, cardsShuffled) {
			t.Errorf("Shuffled deck cards should not be the same as original deck")
		}
	})

	t.Run("Dealing cards more than available should throw error", func(t *testing.T) {
		deck, err := GetNewDeck()
		if err != nil {
			sngerrors.PrintErrorAndFailTest(err, t)
		}
		cards, err := deck.DealCards(55)

		if len(cards) != 0 {
			t.Errorf("No card should be returned")
		}
		if err == nil {
			t.Errorf("Should throw error if deal is greater than available cards")
		}

	})

	t.Run("Deal should return cards and decrease current card", func(t *testing.T) {
		deck, err := GetNewDeck()
		if err != nil {
			sngerrors.PrintErrorAndFailTest(err, t)
		}
		cards, err := deck.DealCards(2)

		if err != nil {
			sngerrors.PrintErrorAndFailTest(err, t)
		}

		got := len(cards)
		wanted := 2
		if wanted != got {
			t.Errorf("Wrong number of deal cards, wanted: %d, got: %d", wanted, got)
		}

		wanted = 50
		got = len(deck.CurrentDeck.Cards)
		if wanted != got {
			t.Errorf("Wrong number of cards after deal, wanted: %d, got: %d", wanted, got)
		}
	})
}

// checks if a deck card contains all ranks and suits
func containsAllRanksAndSuits(cards []*sngpoker.Card) bool {
	rankDict := make(map[int]int)
	suitDict := make(map[string]int)
	for _, card := range cards {
		rankDict[int(card.Rank)] = rankDict[int(card.Rank)] + 1
		suiteKey := string(card.Rank) + string(card.Suit)
		suitDict[suiteKey] = suitDict[suiteKey] + 1
	}

	for rank := 0; rank < 13; rank++ {

		if rankDict[rank] != 4 {
			return false
		}
		for suit := 0; suit < 4; suit++ {
			suiteKey := string(rune(rank)) + string(rune(suit))
			if suitDict[suiteKey] != 1 {
				return false
			}
		}
	}
	return true
}
