package services

import (
	context "context"

	emptypb "google.golang.org/protobuf/types/known/emptypb"
)

// Server server
type PokerServer struct {
	UnimplementedSngServer
}

func (s PokerServer) GetStatus(ctx context.Context, bado *emptypb.Empty) (*TableState, error) {
	game_meta := GameMeta{
		ServerTime:       0,
		IsHandInProgress: true,

		IsTournament:            true,
		TableType:               "texas_holdem",
		TableInstanceId:         112,
		GameplayHistoryId:       112,
		Timer:                   60,
		MaxNumPlayers:           3,
		MinBuyin:                10,
		MaxBuyin:                10,
		IsForMoney:              true,
		MaxNumRaises:            0,
		UseDecimals:             false,
		IsRandomSeatingRequired: false,

		IsFlashMode:         false,
		IsSingleHand:        false,
		IsTurboMode:         false,
		HasAdditionalPayout: false,

		BlindLevelAndValues:       nil,
		FlashPrizePoolValues:      nil,
		AdditionalPrizePoolPayout: nil,
		FlashModeStatus:           false,
		UseAdditionalPayoutOnly:   false,
		UniqueDeck:                nil,
		InstantPayout:             nil,
		TournamentImage:           "",
		AddonChips:                0,
		WildcardsEnabled:          false,
		WildcardValue:             nil,
		ChipsInPenny:              false,
		PairMixedAddonPlayers:     nil,
		HardCapEnabled:            true,
		UsernamePrivacy:           false,
		RevealCardsAfterAction:    false,
		CardsRound:                0,
		BringIn:                   false,
		BringInValue:              0,
	}

	game := Game{
		Rake:                          0.1,
		TableAction:                   "flop",
		LastPlayerKeyToMakeValidRaise: "",
		LastValidRaise:                0,
		CurRaise:                      0,
		Bigblind:                      "",
		Smallblind:                    "",
		GameTurn:                      0,
		Round:                         1,
		Flop:                          nil,
		Turn:                          nil,
		River:                         nil,
		IsAllin:                       false,
		WinnersDta:                    nil,
		Pot:                           nil,
		Bet:                           nil,
		SbPlayerKey:                   "",
		BbPlayerKey:                   "",
		BlindsAnnounce:                false,
		TablePausedHtml:               false,

		BlindLevelAndValues:       nil,
		FlashPrizePoolValues:      nil,
		AdditionalPrizePoolPayout: nil,
		FlashModeStatus:           false,
		UseAdditionalPayoutOnly:   false,
		UniqueDeck:                nil,
		InstantPayout:             nil,
		TournamentImage:           "",
		AddonChips:                0,
		WildcardsEnabled:          false,
		WildcardValue:             nil,
		ChipsInPenny:              false,
		PairMixedAddonPlayers:     nil,
		HardCapEnabled:            true,
		UsernamePrivacy:           false,
		RevealCardsAfterAction:    false,
		CardsRound:                0,
		BringIn:                   false,
		BringInValue:              0,
	}

	players := []*Player{
		&Player{
			Username: "test9",
			Chair:    1,
		},
		&Player{
			Username: "test8",
			Chair:    2,
		},
	}

	return &TableState{
		GameMeta: &game_meta,
		Game:     &game,
		Players:  players,
	}, nil
}
