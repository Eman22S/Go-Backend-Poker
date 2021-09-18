package internal

import (
	"cameronapockergames/services"
	"cameronapockergames/utils"
	"errors"
)

// GetNewDeck returns a new deck instance
func GetNewDeck() (*Deck, error) {
	deck := Deck{}
	err := deck.intializeDeck()
	if err != nil {
		return &deck, err
	}
	return &deck, nil
}

// Deck class
type Deck struct {
	IntialState services.DeckData
	CurrentDeck services.DeckData
}

func (deck *Deck) intializeDeck() error {
	cards := make([]*services.Card, 52)
	cardIndex := 0
	for rank := int32(0); rank < 13; rank++ {
		for suit := int32(0); suit < 4; suit++ {
			cards[cardIndex] = &services.Card{
				Rank: rank,
				Suit: suit,
			}
			cardIndex++
		}
	}
	deck.CurrentDeck = services.DeckData{Cards: cards}
	err := deck.ShuffleDeck()
	if err != nil {
		return err
	}
	deck.IntialState.Cards = cards
	return nil
}

// ShuffleDeck shuffles current deck
func (deck *Deck) ShuffleDeck() error {
	cards := make([]*services.Card, 52)
	copy(cards, deck.CurrentDeck.Cards)
	for i := len(cards) - 2; i > 0; i-- {
		randIndex, err := utils.GetSecureRandom(0, i)
		if err != nil {
			return err
		}
		cardAtI := cards[i]
		cardAtRandIndex := cards[randIndex]
		cards[i] = cardAtRandIndex
		cards[randIndex] = cardAtI
	}
	deck.CurrentDeck.Cards = cards
	return nil
}

// DealCards deals specific number of cards to caller
func (deck *Deck) DealCards(numberOfCards int) ([]*services.Card, error) {
	if numberOfCards > len(deck.CurrentDeck.Cards) {
		err := errors.New("Number of cards should less than available cards")
		return []*services.Card{}, err
	}
	cardsToDeal := make([]*services.Card, 0)

	for i := 0; i < numberOfCards; i++ {
		currentCard := deck.CurrentDeck.Cards
		cardsToDeal = append(
			cardsToDeal,
			currentCard[len(currentCard)-1],
		)

		deck.CurrentDeck.Cards = currentCard[:len(currentCard)-1]
	}

	return cardsToDeal, nil
}
