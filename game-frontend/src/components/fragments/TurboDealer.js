import React, {  useState, useEffect } from 'react';
import Grid from "@material-ui/core/Grid";
import useLocalStorage from '../utils/hooks';
import UnpositionedCard from './UnpositionedCard';
import { makeStyles } from '@material-ui/core';
import PlayerCards from './PlayerCards';

const useStyles = makeStyles((theme) => ({
    hand_name : {
     /* Standard Syntax */
     animation: "$PULSE 1.25s infinite"
   },
   flex_row:{
        display:"flex",
        justifyContent:"space-between",
        flexWrap:"wrap",
        position:"relative",
        width:"100%",
        border:"solid 2px red"

   },

   flex_col:{
    display:"flex",
    flexDirection:"column",
    alignItems:"flex-start",
    alignContent:"flex-start",
    justifyContent:"flex-start",
    border:"solid 2px green"
   },

   structure:{
       flex:"1",
   },
  
   opponents:{
     flex:"2",
    display:"flex",
    justifyContent:"space-around",
    flexWrap:"wrap",
    alignItems:"right",
    border:"solid 2px green"
   },
   opponent_name:{
    fontSize:"12px",
   },
   single_opponent : {
    display:"flex",
    justifyContent:"space-between",
    flexWrap:"wrap"
   },
   
   /* Standard Syntax */
   "@keyframes PULSE" : {
    "0%" : {
      fontSize:"16px",
      color:"rgba(0,255,255)"
    },	
     "110%" :{
      fontSize:"24px",
       color: "black"
      }
   }
  }));


export default function TurboDealer({ ...props }) {
    const tableState ={
        "game_meta": {
            "use_decimals": false,
            "gameplay_history_id": "185",
            "server_time": 1604511074,
            "is_hand_in_progress": true,
            "max_num_players": "2",
            "is_tournament": true,
            "table_type": "NO_LIMIT",
            "tournament_instance_id": "268",
            "is_random_seating_required": false,
            "max_num_raises": null,
            "table_instance_id": "268",
            "timer": "30",
            "min_buyin": "1.00",
            "max_buyin": "1.00",
            "is_for_money": "1",
            "status": "ACTIVE",
            "rake_limits_data": [{}, {}, {}, {}, {}, {}],
            "min_num_players": null,
            "tournament_type": null,
            "last_blinds_increase_round": 0,
            "last_blinds_increase_time": 1604511067,
            "blinds_increase_interval_rounds": "1000",
            "blinds_increase_interval_seconds": "3600",
            "chip_to_money_ratio": 1,
            "rebuys_round_start": null,
            "rebuys_round_end": null,
            "addons_round_start": null,
            "addons_round_end": null,
            "is_open_for_play": true,
            "initial_small_blind": 10,
            "small_blind_max_value": "10000.00",
            "handle_inactive_table_callback_id": null,
            "game_type": "five_card_draw",
            "is_flash_mode": "0",
            "is_turbo_mode": "1",
            "has_additional_payout": "1",
            "flash_mode_status": "0",
            "flash_prize_pool_values": {
                "royal_flush": {
                    "prize": 10000,
                    "timer": 360
                },
                "straight_flush": {
                    "prize": 7500,
                    "timer": 360
                },
                "four_of_a_kind": {
                    "prize": 5000,
                    "timer": 360
                },
                "full_house": {
                    "prize": 2500,
                    "timer": 360
                },
                "flush": {
                    "prize": 1000,
                    "timer": 240
                },
                "straight": {
                    "prize": 500,
                    "timer": 240
                },
                "three_of_a_kind": {
                    "prize": 250,
                    "timer": 240
                },
                "two_pair": {
                    "prize": 100,
                    "timer": 240
                },
                "pair": {
                    "prize": 50,
                    "timer": 240
                },
                "high_card": {
                    "prize": 5,
                    "timer": 240
                }
            },
            "user_id_that_is_up": false,
            "launch_source": "template_lobby",
            "actual_start_time": 1604511067,
            "use_additional_payout_only": "0",
            "addon_chips": "5000.00"
        },
        "game": {
            "rake": "0.00",
            "table_action": "flop",
            "raise_data": {
                "last_valid_raise_bet_id": null,
                "last_valid_raise": 0,
                "cur_raise": null
            },
            "bigblind": 20,
            "smallblind": 10,
            "game_turn": 1,
            "round": 1,
            "flop": [],
            "turn": "",
            "river": "",
            "is_allin": true,
            "winners_data": [],
            "pot": [{
                "total": "10000",
                "playersIN": ["31b3b31a1c2f8a370206f111127c0dbd", "1587965fb4d4b5afe8428a4a024feb0d"]
            }],
            "bet": [
                [
                    ["31b3b31a1c2f8a370206f111127c0dbd", 5000, "Post small blind. All in", "6a26ddfe75843ef35d066e111995ae66", 1604511067],
                    ["1587965fb4d4b5afe8428a4a024feb0d", 5000, "Post big blind. All in", "fd005d48cf0302ee00f3c65c7d9acdf4", 1604511067]
                ]
            ],
            "sb_player_key": "31b3b31a1c2f8a370206f111127c0dbd",
            "bb_player_key": "1587965fb4d4b5afe8428a4a024feb0d",
            "blinds_announce": "",
            "table_paused_html": null,
            "table_turn_timeout_id": null,
            "gameplay_history_id": "185",
            "dealer_chair": 1,
            "table_paused_timeout": null,
            "is_new_table_action_needed": true,
            "timeouts": null,
            "paused_for_rebuys": null,
            "flash_mode_status": "0",
            "additional_prize_pool_payout": null,
            "flash_mode_timer": null,
            "additional_payout_hand": []
        },
        "players": {
            "31b3b31a1c2f8a370206f111127c0dbd": {
                "meta": {
                    "name": "Robert Birmingham",
                    "username": "Test9",
                    "chair": 0,
                    "status": "active",
                    "chips": "0",
                    "can_addon": false,
                    "can_raise": true,
                    "latency": 0,
                    "is_celebrity": "0",
                    "bet2do": 0,
                    "user_id": "1008",
                    "md5": "1587965fb4d4b5afe8428a4a024feb0d",
                    "action": "none",
                    "score": 0,
                    "is_dealer": false,
                    "is_myturn": true,
                    "can_draw": true,
                    "should_show_prize_revealer": true,
                    "myturn_start_time": 1604511067,
                    "cards": [14, 11, 29, 15, 35],
                    "is_allin": true,
                    "is_away": null,
                    "timeouts": [],
                    "latency_time_ms": null,
                    "is_idle_hand": true,
                    "idle_hand_count": 0,
                    "amount_raked": null,
                    "was_small_blind_missed": null,
                    "was_big_blind_missed": null,
                    "is_automuck_enabled": false,
                    "resit_at_next_big_blind": null
                },
                "bet2do": 0,
                "addons_used": "0",
                "is_myturn": true,
                "myturn_start_time": 1604511067,
                "chair": 0,
                "username": "Test9",
                "id": "1008",
                "chips": 0,
                "user_id": "1009",
                "md5": "31b3b31a1c2f8a370206f111127c0dbd",
                "action": "none",
                "score": 0,
                "is_dealer": true,
                "is_myturn": false,
                "can_draw": true,
                "should_show_prize_revealer": true,
                "myturn_start_time": 1604511067,
                "cards": [31, 25, 7, 2, 11],
                "is_allin": true,
                "is_away": null,
                "timeouts": [],
                "latency_time_ms": null,
                "is_idle_hand": true,
                "idle_hand_count": 0,
                "amount_raked": null,
                "was_small_blind_missed": null,
                "was_big_blind_missed": null,
                "is_automuck_enabled": false,
                "resit_at_next_big_blind": null
            },
            "1587965fb4d4b5afe8428a4a024feb0d": {
                "meta": {
                    "name": "Mathew Doyle",
                    "username": "Test8",
                    "chair": 1,
                    "status": "active",
                    "chips": "0",
                    "can_addon": false,
                    "can_raise": true,
                    "latency": 0,
                    "is_celebrity": "0",
                    "bet2do": "0",
                    "user_id": "1009",
                    "md5": "31b3b31a1c2f8a370206f111127c0dbd",
                    "action": "none",
                    "score": 0,
                    "is_dealer": true,
                    "is_myturn": false,
                    "can_draw": true,
                    "should_show_prize_revealer": true,
                    "myturn_start_time": 1604511067,
                    "cards": [30, 38, 7, 23, 48],
                    "is_allin": true,
                    "is_away": null,
                    "timeouts": [],
                    "latency_time_ms": null,
                    "is_idle_hand": true,
                    "idle_hand_count": 0,
                    "amount_raked": null,
                    "was_small_blind_missed": null,
                    "was_big_blind_missed": null,
                    "is_automuck_enabled": false,
                    "resit_at_next_big_blind": null
                },
                "bet2do": 0,
                "addons_used": "0",
                "is_myturn": true,
                "myturn_start_time": 1604511067,
                "chair": 1,
                "username": "Test8",
                "id": "1009",
                "chips": 0,
                "md5": "31b3b31a1c2f8a370206f111127c0dbd",
                "cards": [30, 38, 7, 23, 48]
            },
            "1587965fb4d4b5afe8428a4a024feb62": {
                "meta": {
                    "name": "Mathew Doyle",
                    "username": "Test8",
                    "chair": 1,
                    "status": "active",
                    "chips": "0",
                    "can_addon": false,
                    "can_raise": true,
                    "latency": 0,
                    "is_celebrity": "0",
                    "bet2do": "0",
                    "user_id": "1009",
                    "md5": "31b3b31a1c2f8a370206f111127c0dbd",
                    "action": "none",
                    "score": 0,
                    "is_dealer": true,
                    "is_myturn": false,
                    "can_draw": true,
                    "should_show_prize_revealer": true,
                    "myturn_start_time": 1604511067,
                    "cards": [30, 38, 7, 23, 48],
                    "is_allin": true,
                    "is_away": null,
                    "timeouts": [],
                    "latency_time_ms": null,
                    "is_idle_hand": true,
                    "idle_hand_count": 0,
                    "amount_raked": null,
                    "was_small_blind_missed": null,
                    "was_big_blind_missed": null,
                    "is_automuck_enabled": false,
                    "resit_at_next_big_blind": null
                },
                "bet2do": 0,
                "addons_used": "0",
                "is_myturn": true,
                "myturn_start_time": 1604511067,
                "chair": 1,
                "username": "Test8",
                "id": "1009",
                "chips": 0,
                "md5": "31b3b31a1c2f8a370206f111127c0dbd",
                "cards": [30, 38, 7, 23, 48]
            },
            "4447965fb4d4b5afe8428a4a024feb62": {
                "meta": {
                    "name": "Mathew Doyle",
                    "username": "Test8",
                    "chair": 1,
                    "status": "active",
                    "chips": "0",
                    "can_addon": false,
                    "can_raise": true,
                    "latency": 0,
                    "is_celebrity": "0",
                    "bet2do": "0",
                    "user_id": "1009",
                    "md5": "31b3b31a1c2f8a370206f111127c0dbd",
                    "action": "none",
                    "score": 0,
                    "is_dealer": true,
                    "is_myturn": false,
                    "can_draw": true,
                    "should_show_prize_revealer": true,
                    "myturn_start_time": 1604511067,
                    "cards": [30, 12, 7, 23, 48],
                    "is_allin": true,
                    "is_away": null,
                    "timeouts": [],
                    "latency_time_ms": null,
                    "is_idle_hand": true,
                    "idle_hand_count": 0,
                    "amount_raked": null,
                    "was_small_blind_missed": null,
                    "was_big_blind_missed": null,
                    "is_automuck_enabled": false,
                    "resit_at_next_big_blind": null
                },
                "bet2do": 0,
                "addons_used": "0",
                "is_myturn": true,
                "myturn_start_time": 1604511067,
                "chair": 1,
                "username": "Test8",
                "id": "1009",
                "chips": 0,
                "md5": "31b3b31a1c2f8a370206f111127c0dbd",
                "cards": [30, 38, 7, 23, 48]
            },
            "44557965fb4d4b5afe8428a4a024feb62": {
                "meta": {
                    "name": "Mathew Doyle",
                    "username": "Test8",
                    "chair": 1,
                    "status": "active",
                    "chips": "0",
                    "can_addon": false,
                    "can_raise": true,
                    "latency": 0,
                    "is_celebrity": "0",
                    "bet2do": "0",
                    "user_id": "1009",
                    "md5": "31b3b31a1c2f8a370206f111127c0dbd",
                    "action": "none",
                    "score": 0,
                    "is_dealer": true,
                    "is_myturn": false,
                    "can_draw": true,
                    "should_show_prize_revealer": true,
                    "myturn_start_time": 1604511067,
                    "cards": [30, 12, 7, 23, 48],
                    "is_allin": true,
                    "is_away": null,
                    "timeouts": [],
                    "latency_time_ms": null,
                    "is_idle_hand": true,
                    "idle_hand_count": 0,
                    "amount_raked": null,
                    "was_small_blind_missed": null,
                    "was_big_blind_missed": null,
                    "is_automuck_enabled": false,
                    "resit_at_next_big_blind": null
                },
                "bet2do": 0,
                "addons_used": "0",
                "is_myturn": true,
                "myturn_start_time": 1604511067,
                "chair": 1,
                "username": "Test8",
                "id": "1009",
                "chips": 0,
                "md5": "31b3b31a1c2f8a370206f111127c0dbd",
                "cards": [30, 38, 7, 23, 48]
            },
            "44667965fb4d4b5afe8428a4a024feb62": {
                "meta": {
                    "name": "Mathew Doyle",
                    "username": "Test8",
                    "chair": 1,
                    "status": "active",
                    "chips": "0",
                    "can_addon": false,
                    "can_raise": true,
                    "latency": 0,
                    "is_celebrity": "0",
                    "bet2do": "0",
                    "user_id": "1009",
                    "md5": "31b3b31a1c2f8a370206f111127c0dbd",
                    "action": "none",
                    "score": 0,
                    "is_dealer": true,
                    "is_myturn": false,
                    "can_draw": true,
                    "should_show_prize_revealer": true,
                    "myturn_start_time": 1604511067,
                    "cards": [30, 12, 7, 23, 48],
                    "is_allin": true,
                    "is_away": null,
                    "timeouts": [],
                    "latency_time_ms": null,
                    "is_idle_hand": true,
                    "idle_hand_count": 0,
                    "amount_raked": null,
                    "was_small_blind_missed": null,
                    "was_big_blind_missed": null,
                    "is_automuck_enabled": false,
                    "resit_at_next_big_blind": null
                },
                "bet2do": 0,
                "addons_used": "0",
                "is_myturn": true,
                "myturn_start_time": 1604511067,
                "chair": 1,
                "username": "Test8",
                "id": "1009",
                "chips": 0,
                "md5": "31b3b31a1c2f8a370206f111127c0dbd",
                "cards": [30, 38, 7, 23, 48]
            },
            "44777965fb4d4b5afe8428a4a024feb62": {
                "meta": {
                    "name": "Mathew Doyle",
                    "username": "Test8",
                    "chair": 1,
                    "status": "active",
                    "chips": "0",
                    "can_addon": false,
                    "can_raise": true,
                    "latency": 0,
                    "is_celebrity": "0",
                    "bet2do": "0",
                    "user_id": "1009",
                    "md5": "31b3b31a1c2f8a370206f111127c0dbd",
                    "action": "none",
                    "score": 0,
                    "is_dealer": true,
                    "is_myturn": false,
                    "can_draw": true,
                    "should_show_prize_revealer": true,
                    "myturn_start_time": 1604511067,
                    "cards": [30, 12, 7, 23, 48],
                    "is_allin": true,
                    "is_away": null,
                    "timeouts": [],
                    "latency_time_ms": null,
                    "is_idle_hand": true,
                    "idle_hand_count": 0,
                    "amount_raked": null,
                    "was_small_blind_missed": null,
                    "was_big_blind_missed": null,
                    "is_automuck_enabled": false,
                    "resit_at_next_big_blind": null
                },
                "bet2do": 0,
                "addons_used": "0",
                "is_myturn": true,
                "myturn_start_time": 1604511067,
                "chair": 1,
                "username": "Test8",
                "id": "1009",
                "chips": 0,
                "md5": "31b3b31a1c2f8a370206f111127c0dbd",
                "cards": [30, 38, 7, 23, 48]
            },
            "44887965fb4d4b5afe8428a4a024feb62": {
                "meta": {
                    "name": "Mathew Doyle",
                    "username": "Test8",
                    "chair": 1,
                    "status": "active",
                    "chips": "0",
                    "can_addon": false,
                    "can_raise": true,
                    "latency": 0,
                    "is_celebrity": "0",
                    "bet2do": "0",
                    "user_id": "1009",
                    "md5": "31b3b31a1c2f8a370206f111127c0dbd",
                    "action": "none",
                    "score": 0,
                    "is_dealer": true,
                    "is_myturn": false,
                    "can_draw": true,
                    "should_show_prize_revealer": true,
                    "myturn_start_time": 1604511067,
                    "cards": [30, 12, 7, 23, 48],
                    "is_allin": true,
                    "is_away": null,
                    "timeouts": [],
                    "latency_time_ms": null,
                    "is_idle_hand": true,
                    "idle_hand_count": 0,
                    "amount_raked": null,
                    "was_small_blind_missed": null,
                    "was_big_blind_missed": null,
                    "is_automuck_enabled": false,
                    "resit_at_next_big_blind": null
                },
                "bet2do": 0,
                "addons_used": "0",
                "is_myturn": true,
                "myturn_start_time": 1604511067,
                "chair": 1,
                "username": "Test8",
                "id": "1009",
                "chips": 0,
                "md5": "31b3b31a1c2f8a370206f111127c0dbd",
                "cards": [30, 38, 7, 23, 48]
            }
        },
        "action_result": null,
        "tournament_meta": {
            "id": "268",
            "tournament_id": "1150",
            "name": "Five Card Multiiplier",
            "buyin": "1.00",
            "buyin_chips": "5000.00",
            "rake": "0.00",
            "is_for_money": "1",
            "rebuys_permitted": "0",
            "addons_permitted": "0",
            "addon_threshold": "10000000",
            "rebuys_round_start": "0",
            "rebuys_round_end": "0",
            "addons_round_start": "0",
            "addons_round_end": "0",
            "scheduled_breaks": "",
            "time_limit_seconds": "3600",
            "pending_timeout_seconds": "0",
            "min_players_per_table": "2",
            "max_players_per_table": "2",
            "scheduled_start_time": "2020-11-04 17:31:05",
            "actual_start_time": "2020-11-04 17:31:07",
            "finish_time": null,
            "small_blind_starting_value": "10.00",
            "small_blind_max_value": "10000.00",
            "table_timer": "30",
            "tour_players_min": "0",
            "tour_players_max": "999",
            "type": "SIT_N_GO",
            "status": "ACTIVE",
            "blinds_increase_interval_seconds": "3600",
            "blinds_increase_interval_rounds": "1000",
            "user_contributed_prize_pool": "2.00",
            "min_prize_pool_value": "0.00",
            "table_type": "NO_LIMIT",
            "table_max_num_raises": "0",
            "rebalancing_table_algorithm": "MAX",
            "publish_time": null,
            "event_id": "268",
            "is_invalid": "0",
            "is_in_scheduled_queue": "0",
            "use_decimals": "0"
        }
    }
    const classes = useStyles();


    const [localUser, ] = useLocalStorage("user");

    useEffect(()=>{
        console.log(tableState.players);
        console.log(localUser);
        console.log("=============+++++++++++++++");
    },[localUser])
    const [expanded, setExpanded] = useState(false);

    return (
        <React.Fragment>
            <div className={classes.flex_row}>
                    <div className={classes.structure}>
                            <h2>LOOK</h2>
                    </div>
                    <div className={classes.opponents}>
                        {
                            Object.keys(tableState.players).map((key)=>{
                                if(key !== localUser.md5){
                                    return (
                                        <div className={classes.flex_col}>
                                            <span className={classes.opponent_name}>{tableState.players[key].meta.name}</span>

                                            <div className ={classes.single_opponent}>

                                                {
                                                    tableState.players[key].cards.map(card=>{
                                                        return(
                                                        
                                                            <UnpositionedCard
                                                            number={card}
                                                            />   
                                                        )
                                                    })
                                                }
                                            
                                        </div>
                                    </div>);
                                }else{
                                    return (<></>);
                                }
                                
                            })
                        }
                    </div>

            </div>
             <div style={{ display:"flex", justifyContent:"space-around", marginTop:"20px"}} spacing={1}>
                 
             {tableState.players[localUser.md5].cards.map(card=>{
                                                        return(
                                                        
                                                            <UnpositionedCard
                                                            number={card}
                                                            />   
                                                        )
                                                    })}
                                
             </div>
       
        </React.Fragment>
    );
}
