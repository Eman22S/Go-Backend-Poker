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
	rankHandResult := engine.RankHands(req.Players, req.CommunityCards)

	rankResult := make([]*sngpoker.RankingData, 0)
	for _, v := range rankHandResult {
		rankResult = append(rankResult, &sngpoker.RankingData{
			PlayerId:        v.PlayerId,
			Score:           v.Score,
			WinningCards:    v.WinningCards,
			KickingCards:    v.KickingCards,
			HandDescription: v.HandDescription,
			HoleCards:       v.HoleCards,
		})
	}
	return &sngpoker.RankHandsResult{
		WinnerPlayerId: rankHandResult[0].PlayerId,
		RankResult:     rankResult,
	}, nil
}
