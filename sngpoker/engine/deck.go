package engine

import (
	"sngrpc/sngpoker"
	"sngrpc/utils"

	"github.com/pkg/errors"
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
	IntialState sngpoker.DeckData
	CurrentDeck sngpoker.DeckData
}

func (deck *Deck) intializeDeck() error {
	cards := make([]*sngpoker.Card, 52)
	cardIndex := 0
	for rank := sngpoker.CardRank_TWO; rank <= sngpoker.CardRank_ACE; rank++ {
		for suit := sngpoker.Suit_CLUB; suit <= sngpoker.Suit_DIAMOND; suit++ {
			cards[cardIndex] = &sngpoker.Card{
				Rank: rank,
				Suit: suit,
			}
			cardIndex++
		}
	}
	deck.CurrentDeck = sngpoker.DeckData{Cards: cards}
	err := deck.ShuffleDeck()
	if err != nil {
		return errors.WithMessage(err, "Shuffling failed on intialization")
	}
	deck.IntialState.Cards = cards
	return nil
}

// ShuffleDeck shuffles current deck
func (deck *Deck) ShuffleDeck() error {
	cards := make([]*sngpoker.Card, 52)
	copy(cards, deck.CurrentDeck.Cards)
	for i := len(cards) - 1; i > 0; i-- {
		randIndex, err := utils.GetSecureRandom(0, i)
		if err != nil {
			return errors.WithMessage(err, "Secure random failed on shffling")
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
func (deck *Deck) DealCards(numberOfCards int) ([]*sngpoker.Card, error) {

	if numberOfCards > len(deck.CurrentDeck.Cards) {
		err := errors.New("Number of cards should less than available cards")
		return []*sngpoker.Card{}, err
	}
	cardsToDeal := make([]*sngpoker.Card, 0)

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
