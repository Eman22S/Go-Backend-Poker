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

func (s *Server) RankHands(ctx context.Context, req *sngpoker.RankHandsRequest) (*sngpoker.RankHandsResult, error) {
	err := ValidateRankHandRequest(req)
	if err != nil {
		return &sngpoker.RankHandsResult{}, err
	}
	players, communityCards := req.Players, req.CommunityCards
	handTestResult := engine.GetHandTestResult(players, communityCards)

	return &handTestResult, nil
}
