package sngpoker

import (
	"log"
	"time"

	"google.golang.org/protobuf/types/known/anypb"
)

// GetStatus streams game state
func (s *Server) GetStatus(
	getStatusRequest *GetStatusRequest,
	stream Sng_GetStatusServer) error {

	SetInterval(func() {
		gameMeta := GameMeta{
			ServerTime:       time.Now().Unix(),
			IsHandInProgress: true,

			IsTournament:            true,
			TableType:               "NO_LIMIT",
			TableInstanceId:         112,
			GameplayHistoryId:       112,
			Timer:                   60,
			MaxNumPlayers:           2,
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

			BlindLevelAndValues: nil,
			FlashPrizePoolValues: &FlashPrizePoolValues{
				RoyalFlush: &FlashPoolValue{
					Prize: 10000,
					Timer: 360,
				},
				StraightFlush: &FlashPoolValue{
					Prize: 7500,
					Timer: 360,
				},
				FourOfAKind: &FlashPoolValue{
					Prize: 5000,
					Timer: 360,
				},
				FourAces: &FlashPoolValue{
					Prize: 6500,
					Timer: 240,
				},
				FourFivesThroughKings: &FlashPoolValue{
					Prize: 5250,
					Timer: 240,
				},
				FourTwosThreesOrFours: &FlashPoolValue{
					Prize: 5500,
					Timer: 240,
				},
				FullHouse: &FlashPoolValue{
					Prize: 2500,
					Timer: 360,
				},
				Flush: &FlashPoolValue{
					Prize: 1000,
					Timer: 240,
				},
				Straight: &FlashPoolValue{
					Prize: 500,
					Timer: 240,
				},
				ThreeOfAKind: &FlashPoolValue{
					Prize: 250,
					Timer: 240,
				},
				TwoPair: &FlashPoolValue{
					Prize: 100,
					Timer: 240,
				},
				JacksOrBetter: &FlashPoolValue{
					Prize: 75,
					Timer: 240,
				},
				Pair: &FlashPoolValue{
					Prize: 50,
					Timer: 240,
				},
				OneJackOrBetter: &FlashPoolValue{
					Prize: 25,
					Timer: 240,
				},
				HighCard: &FlashPoolValue{
					Prize: 250,
					Timer: 240,
				},
			},
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
			CardsRound:                1,
			BringIn:                   false,
			BringInValue:              15,
			GameType:                  "omaha",
			InitialSmallBlind:         10,
			SmallBlindMaxValue:        1000,
		}

		game := Game{
			Rake:                          0.1,
			TableAction:                   "cards",
			LastPlayerKeyToMakeValidRaise: "2cdbca1755150746ecb4d0010bcb183c",
			LastValidRaise:                20,
			CurRaise:                      20,
			Bigblind:                      20,
			Smallblind:                    10,
			GameTurn:                      0,
			Round:                         1,
			Flop:                          nil,
			Turn:                          nil,
			River:                         nil,
			IsAllin:                       false,
			WinnersDta:                    nil,
			Pot: []*Pot{
				&Pot{
					Total: 10,
					PlayersIN: []string{
						"cd81cfd0a3397761fac44ddbe5ec3349",
						"c802ceaa43e6ad9ddc511cab5f34789c",
					},
				}},
			Bet: &Bet{
				Streets: []*Street{
					&Street{
						Number: 1,
						BetValues: []*BetValue{
							&BetValue{
								PlayerId:    "c802ceaa43e6ad9ddc511cab5f34789c",
								BetAmount:   "10",
								Description: "Post small blind.",
								Hash:        "9b5b2fb12e3f89b5adbd0d3d60e4e922",
								Timestamp:   1630746460,
							},
							&BetValue{
								PlayerId:    "cd81cfd0a3397761fac44ddbe5ec3349",
								BetAmount:   "20",
								Description: "Post big blind.",
								Hash:        "2cdbca1755150746ecb4d0010bcb183c",
								Timestamp:   1630746460,
							},
							&BetValue{
								PlayerId:    "c802ceaa43e6ad9ddc511cab5f34789c",
								BetAmount:   "10",
								Description: "CALL 10",
								Hash:        "ef1014420c18c3fd0c8a4ebd85bd1287",
								Timestamp:   1630746491,
							},
						},
					},
				},
			},
			SbPlayerKey:     "c802ceaa43e6ad9ddc511cab5f34789c",
			BbPlayerKey:     "cd81cfd0a3397761fac44ddbe5ec3349",
			BlindsAnnounce:  false,
			TablePausedHtml: false,

			BlindLevelAndValues:       nil,
			FlashPrizePoolValues:      nil,
			AdditionalPrizePoolPayout: nil,
			FlashModeStatus:           false,
			UseAdditionalPayoutOnly:   false,
			AdditionalPayoutMadeTo:    &anypb.Any{},
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
			TableTurnTimeoutId:        "e1eb1526f77e65d31f344ea0f681d1b6s",
			TournamentBatchInfo:       []string{"CLEARN", "CLEARN"},
		}

		players := []*Player{
			&Player{
				Username:                "Test8",
				Chair:                   0,
				Name:                    "Mathew Doyle",
				Status:                  "active",
				Chips:                   4980,
				CanAddon:                false,
				CanRaise:                true,
				Latency:                 0,
				IsCelebrity:             false,
				Bet2Do:                  0,
				UserId:                  7771,
				Md5:                     "cd81cfd0a3397761fac44ddbe5ec3349",
				Action:                  "none",
				Score:                   0,
				IsDealer:                false,
				IsMyturn:                true,
				CanDraw:                 false,
				IsAllin:                 false,
				ShouldShowPrizeRevealer: true,
				HandDescription:         "",
				IsIdleHand:              true,
				IdleHandCount:           0,
				AmountRaked:             0,
				WasSmallBlindMissed:     false,
				WasBigBlindMissed:       false,
				IsAutomuckEnabled:       false,
				Cards:                   []int32{31, 19, 52, 46},
			},
			&Player{
				Username:                "Test9",
				Chair:                   1,
				Name:                    "Robert Birmingham",
				Status:                  "active",
				Chips:                   4980,
				CanAddon:                false,
				CanRaise:                true,
				Latency:                 0,
				IsCelebrity:             false,
				Bet2Do:                  0,
				UserId:                  7770,
				Md5:                     "c802ceaa43e6ad9ddc511cab5f34789c",
				Action:                  "check",
				Score:                   0,
				IsDealer:                true,
				IsMyturn:                false,
				CanDraw:                 false,
				IsAllin:                 false,
				ShouldShowPrizeRevealer: true,
				HandDescription:         "",
				IsIdleHand:              true,
				IdleHandCount:           0,
				AmountRaked:             0,
				WasSmallBlindMissed:     false,
				WasBigBlindMissed:       false,
				IsAutomuckEnabled:       false,
				Cards:                   []int32{-1, -1, -1, -1},
			},
		}

		tournamentMeta := TournamentMetaData{
			Id:                            152,
			TournamentId:                  1152,
			Name:                          "OMAHA 2P",
			Status:                        "ACTIVE",
			AddonsPermitted:               0,
			AddonsRoundStart:              0,
			AddonsRoundEnd:                0,
			AddonThreshold:                0,
			Buyin:                         1,
			BuyinChips:                    5000,
			Rake:                          0.1,
			IsForMoney:                    true,
			RebuysPermitted:               0,
			RebuysRoundStart:              0,
			RebuysRoundEnd:                0,
			TimeLimitSeconds:              3600,
			PendingTimeoutSeconds:         0,
			MinPlayersPerTable:            2,
			ScheduledStartTime:            "2021-09-04 09:05:36",
			ActualStartTime:               "2021-09-04 09:07:40",
			SmallBlindStartingValue:       10.00,
			SmallBlindMaxValue:            10000,
			TableTimer:                    30,
			TourPlayersMin:                0,
			TourPlayersMax:                999,
			Type:                          "SIT_N_GO",
			BlindsIncreaseIntervalSeconds: 36000,
			BlindsIncreaseIntervalRounds:  1000,
			UserContributedPrizePool:      2.00,
			MinPrizePoolValue:             0.0,
			TableType:                     "NO_LIMIT",
			TableMaxNumRaises:             0,
			RebalancingTableAlgorithm:     "MAX",
			EventId:                       152,
			IsInvalid:                     false,
			IsInScheduledQueue:            false,
		}

		rankings := Rankings{
			TournamentInstanceId: 152,
			PayoutDetails: []*PayoutDetail{
				&PayoutDetail{
					Username:                       "test9",
					UserId:                         7770,
					Chair:                          1,
					RemainingChips:                 5000,
					Rank:                           0,
					IsFinal:                        false,
					IsForMoney:                     true,
					Payout:                         0,
					PayoutPercentage:               0,
					FlashModePayout:                0,
					FlashModePayoutPercentage:      0,
					AdditionalPayoutHand:           0,
					AdditionalPayoutHandInitial:    -1,
					AdditionalPayoutWinningHand:    -1,
					AdditionalPayoutHandMultiplier: -1,
					TableInstanceId:                152,
					TotalPayoutAmount:              0,
				},
				&PayoutDetail{
					Username:                       "test8",
					UserId:                         7771,
					Chair:                          0,
					RemainingChips:                 5000,
					Rank:                           0,
					IsFinal:                        false,
					IsForMoney:                     true,
					Payout:                         0,
					PayoutPercentage:               0,
					FlashModePayout:                0,
					FlashModePayoutPercentage:      0,
					AdditionalPayoutHand:           0,
					AdditionalPayoutHandInitial:    -1,
					AdditionalPayoutWinningHand:    -1,
					AdditionalPayoutHandMultiplier: -1,
					TableInstanceId:                152,
					TotalPayoutAmount:              0,
				},
			},
			TotalPayout: 0,
		}

		resp := GetStatusResult{
			GameMeta:       &gameMeta,
			Game:           &game,
			Players:        players,
			TournamentMeta: &tournamentMeta,
			Rankings:       &rankings,
		}

		if err := stream.Send(&resp); err != nil {
			log.Printf("send error %v", err)
		}
	})

	return nil
}

// SetInterval executes periodically
func SetInterval(someFunc func()) {
	for range time.Tick(time.Second * 5) {
		someFunc()
	}
}
