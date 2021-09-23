package services

import (
	"sngrpc/sngpoker"
	"sngrpc/sngpoker/engine"

	"golang.org/x/net/context"
	"google.golang.org/protobuf/types/known/emptypb"
)

func (s *Server) GetShuffledDeck(ctx context.Context, req *emptypb.Empty) (*sngpoker.DeckData, error) {
	deck, err := engine.GetNewDeck()
	if (err) != nil {
		return &sngpoker.DeckData{}, err
	}

	return &deck.CurrentDeck, nil
}
