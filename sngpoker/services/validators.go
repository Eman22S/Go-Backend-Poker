package services

import (
	"sngrpc/sngpoker"

	"github.com/pkg/errors"
)

func ValidateRankHandRequest(rankhandRequest *sngpoker.RankHandsRequest) error {
	if len(rankhandRequest.CommunityCards) != 5 {
		return errors.New("Community cards must be five cards")
	}

	if len(rankhandRequest.Players) < 2 {
		return errors.New("You must have at least two players")
	}

	return nil
}
