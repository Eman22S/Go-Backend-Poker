import React, { useState, useEffect, useCallback, Fragment } from "react";
import { Redirect, useHistory, useParams, Link } from "react-router-dom";

import Grid from "@material-ui/core/Grid";

import useGrpcClient from "../contexts/grpc_client";
import { useStore } from "../contexts/store";
import { TableStateContext } from "../contexts/table_state";
import { useSnackBarContext } from "../contexts/snackbar";

import ActionControls from "./fragments/ActionControls";
import CommunityCards from "./fragments/CommunityCards";
import Loading from "./fragments/Loading";
import Typographyx from "./fragments/Typographyx";
import TableChat from "./fragments/TableChat";

import { is_logged_in } from "../utils/auth_utils";
import { getFormattedServerTime, getWinnersCardsUsed } from "./utils/table";
import { table_types, tournament_states_labels, tournament_template_buffer_status } from "./utils/constants";
import useLocalStorage from "./utils/hooks";

import Box from "@material-ui/core/Box";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';


import CountDownTimer from './fragments/CountDownTimer';
import PrizeRevealerSpinner from './fragments/PrizeRevealSpinner';
import GameResult from "./fragments/GameResult";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Buttonx from "./fragments/Buttonx";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import CircularProgress from "@material-ui/core/CircularProgress";
import IconButton from "@material-ui/core/IconButton";


import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';
import { convertRankingDetailsToHandName } from "./utils/player";
import PayoutStructureCard from "./fragments/PayoutStructureCard";
import Add from '@material-ui/icons/AddCircle';
import ChairsAlternate from "./ChairsAlternate";
import { ExitToApp } from "@material-ui/icons";

// These error should be skipped when encountered
const SKIP_ERRORS = {
  COM_CAMERONA_OUT_OF_TURN_ACTION_RECEIVED: true, // out of turn action is handled by the backend enough
  COM_CAMERONA_HAND_NOT_IN_PROGRESS: true, // for now timer is creating this error because of latency
};

function GamePlayAlternate(props) {
    let pollingInterval = null;

    const grpc_client = useGrpcClient();
    const history = useHistory();
    const params = useParams();
    
    const [store, updateStore] = useStore();
    const showSnackBar = useSnackBarContext();
    const [localUser, ] = useLocalStorage("user");

    const [tableState, setTableState] = useState(null);

    const [addonOpen, setAddonOpen] = useState(false);
    const [addonLoading, setAddonLoading] = useState(false);

    const [nextHandLoading, ] = useState(false);
    const [payoutDetails, setPayoutDetails] = useState(null);
    const [totalPayout, setTotalPayout] = useState(0);
    const [showCancelledDialog, setShowCancelledDialog] = useState(false);
    const [nextTournamentLoading, setNextTournamentLoading] = useState(false);
    const [paramsLoading, setParamsLoading] = useState(false);
    const [isDealingCards, setIsDealingCards] = useState(false);

    //show prize pool values 
    const [showPrizeDialog, setShowPrizeDialog] = useState(true);
    const [showTimesUpDialogue, setShowTimesUpDialogue] = useState(false);
    const [timedOut, setTimedOut] = useState(false);

    const [addOnAmount, setAddonAmount] = useState(0);
    const [displayAddon, setDisplayAddon] = useState(2);
    const [addOnSelected, setAddonSelected] = useState(false);

    const [currentAddOnAmount, setCurrentAddonAmount] = useState(0);

    //store additional hand infomatio
    const [payoutHand, setPayoutHand] = useState(null);
    const [additionalHand, setAdditionalHand] =useState(null);

    const [addonsPermitted, setAddonsPermitted] =useState(null);


    const [waiting, setWaiting] = useState(false);
    //store account balance info
    const [cashInAcount, setCashInAccount] = useState(0);
    const [winnings, setWinnings] = useState(0);
    const [currentTournamentId, setCurrentTournamentId] = useState(null);
    const [initialBalance, setInitialBalance] = useState(null);
    /**
     * Handler when new table state is encountered
     * This should be used in any components to handle new table state
     */
    const on_new_table_state = useCallback(        
        (tableStateResponse) => {
        setNextTournamentLoading(false);
        setParamsLoading(false);
        setTableState(tableStateResponse);
  
        if (tableStateResponse?.tournament_meta?.status && (tableStateResponse.tournament_meta.status.toLowerCase() === tournament_states_labels.STATUS_CANCELLED)) {
            setShowCancelledDialog(true);
        }
        
        setHandCompletedAfterTimeOut((showTimesUpDialogue || timedOut) && (tableStateResponse?.game?.table_action === 'winner' || !tableStateResponse?.game?.table_action));
        grpc_client.getRankings(tableStateResponse?.game_meta?.tournament_instance_id, (response) =>{
            let data = JSON.parse(response.getPayoutDetails());
            setPayoutDetails(data);
            setTotalPayout(response.getTotalPayout());
        }
        , (custom_msg) => custom_msg && showSnackBar(custom_msg)
        );
        
        // development purpose only
        // make user the same as player with current turn
        // if (tableStateResponse?.game_meta?.user_id_that_is_up) {
        //   let user_up_md5 = md5(tableStateResponse.game_meta.user_id_that_is_up);
        //   updateStore("player", () => tableStateResponse.players[user_up_md5]);
        //   updateStore("user", () => tableStateResponse.players[user_up_md5]);
        // }

        // commented for development purpose
        //!! please uncomment when finished
        if (localUser) {
            updateStore("player", () => tableStateResponse.players[localUser.md5]);
        } else {
            console.warn(
            "Couldn't get local user to update player from new table."
            );
        }

        
        // if result exists from player action
        if (tableStateResponse?.action_result) {
            // if action was not performed
            if (!tableStateResponse.action_result.was_action_performed) {
            let action_errors = tableStateResponse.action_result.error_msgs || [];
            for (let action_err of action_errors) {
                if (action_err in SKIP_ERRORS) {
                console.warn(
                    "Skipped handling Action Result Error: ",
                    action_err
                );
                } else {
                showSnackBar(window._(action_err), "error");
                console.warn("Action Result Error: ", action_err);
                }
            }
            }

            // if table go allin
            if (tableStateResponse?.action_result?.did_table_go_allin) {
            if (!tableStateResponse.action_result.was_allin_completed) {
                let allin_err =
                tableStateResponse.action_result.allin_error_msgs || [];
                for (let err of allin_err) {
                showSnackBar(err, "error");
                console.warn("Action Result Table Allin Error: ", err);
                }
            }
            }
        }
        },
        [grpc_client, updateStore, showSnackBar, localUser, showTimesUpDialogue, timedOut]
    );

    // Get Payout Structure If Five Card Turbo Mode
    useEffect(()=>{
        if(tableState?.game?.additional_payout_hand && tableState?.game?.additional_payout_hand .length !== 0 ){      
            const additional_payout_hand = tableState?.game?.additional_payout_hand;
            if(additional_payout_hand[localUser.md5]){
                setAdditionalHand(convertRankingDetailsToHandName(additional_payout_hand[localUser.md5]?.hand));   
            }
            /*const additional_payout_hand = tableState?.game?.additional_payout_hand;
            Object.keys(additional_payout_hand).forEach(payout=>{
                setAdditionalHand(convertRankingDetailsToHandName(additional_payout_hand[localUser.md5].hand));   
            })*/
        }else{
            setAdditionalHand(null);
        }
        if((!payoutHand && tableState?.game_meta?.is_turbo_mode === '1' && tableState?.game_meta?.game_type === 'five_card_draw')){
            grpc_client.getTournamentPayoutStructure(tableState.game_meta?.tournament_instance_id, (response)=>{
                let payout_hand = JSON.parse(response.getStructure());
                if(payout_hand?.hand){
                    if(!payout_hand?.buyin){
                        payout_hand["buyin"] = []
                    }
                    if(!payout_hand?.hands){
                        payout_hand["hands"] = []
                    }else{
                        payout_hand["hands"][0] =payout_hand["hand"] 
                    }
                    
                    setPayoutHand(payout_hand);
                }
                },(custom_msg)=>{
                    custom_msg && showSnackBar(custom_msg);
                })
                
               
        
        }
        setAddonsPermitted(tableState?.tournament_meta?.addons_permitted);
        console.log("setCurrentAddonAmount(store.addons_amount);")
        setCurrentAddonAmount(store.addons_amount);

        //on new table created fetch account balance
        if((tableState?.game_meta?.table_instance_id && currentTournamentId !== tableState?.game_meta?.table_instance_id) || tableState?.game?.table_action === 'finished'){
            getAccountBalance();
        }

        if(tableState?.game_meta?.table_instance_id && currentTournamentId !== tableState?.game_meta?.table_instance_id){
            setIsDealingCards(false);
            setCurrentTournamentId(tableState?.game_meta?.table_instance_id);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[tableState, grpc_client, showSnackBar])
    
    //don't show controls after hand completes
    const [handCompletedAfterTimeOut, setHandCompletedAfterTimeOut] = useState(false);

    const joinNextTournament = (event) => {
        setNextTournamentLoading(true);
        grpc_client.getNextTournament(
            tableState.game_meta?.tournament_instance_id, 
            onNextTournamentFound,
            (custom_msg) => {
                custom_msg && showSnackBar(custom_msg);
                setNextTournamentLoading(false);
            }
        );
    }
    //start next in five card draw turbo mode
    const startNextTable = (event) => {
        setIsDealingCards(true);
        setNextTournamentLoading(true);
        updateStore("addons_amount", () => addOnAmount);
        setCurrentAddonAmount(addOnAmount);
        grpc_client.joinTournamentTempalte(
            tableState?.tournament_meta?.tournament_id,
            addOnAmount, 
            onJoinTournamentSuccess, 
            (error)=>{
                if(error){
                    showSnackBar(error);
                }
            }
        );
        // grpc_client.startTournamentTableInstance(
        //     {tournament_id : tableState.game_meta?.tournament_instance_id, addons : addOnAmount},
        //     (response)=>{
        //         setNewTableCreated(true);
        //         console.log(response);
        //     },
        //     (custom_msg) => {
        //         custom_msg && showSnackBar(custom_msg);
        //         setNextTournamentLoading(false);
        //     }
        // );
    }

    /**
     * On Join tournamentTemplate Success
     * @param {*} response 
     */
    const onJoinTournamentSuccess = (response) => {
        //clear previously selected addons
        setAddonSelected(false);
        setAddonAmount(0);
        if (response.error_msgs.length !== 0) {
            for (let err of response.error_msgs) {
                showSnackBar(window._(err), "error");
            }
        }
        else {
            onJoinTournamnetTemplate(response);
        }
    }

    // On Join Tournament Template Success
    const onJoinTournamnetTemplate = (response) => {
        setWaiting(true);
        pollingInterval = setInterval(() => {
            grpc_client.getTournamentTemplateBufferState(
                tableState?.tournament_meta?.tournament_id, 
                onGetTournamentTemplateBufferStateSuccess,
                (error)=>{
                    if(error){
                        showSnackBar(error);
                    }
                }
            )
        }, 2000);
    }


    // On Get Tournament Template Buffer State Success
    const onGetTournamentTemplateBufferStateSuccess = (response) => {
        if (response?.buffer_state) {
            if (response?.buffer_state?.status === tournament_template_buffer_status.tournament_created) {
                setWaiting(false);
                getAccountBalance();
                clearInterval(pollingInterval);
                onTournamentCreated(response.buffer_state.joined_tournament_id, response.buffer_state.joined_table_id);
            }
        }
        else {
            setWaiting(false);

            clearInterval(pollingInterval);
        }
    };

    // On Tournament Created
    const onTournamentCreated = (tournament_instance_id, table_instance_id) => {
        let tableStateResponse = {
            game_meta: {
                table_instance_id: table_instance_id,
                tournament_instance_id: tournament_instance_id,
            }
        };

        updateStore("startingTableState", () => tableStateResponse);
    }

    const getAccountBalance =() =>{
        grpc_client.getPlayerAccountBalance(
            (response) => {
                setCashInAccount(response.getCashInAccount());
                let cash = response.getCashInAccount();
                if(!initialBalance || initialBalance === 0){
                    setInitialBalance(cash);
                }else{
                    setWinnings(cash -initialBalance);
                }
            },
            showSnackBar
        )
    }


    const onNextTournamentFound = (response) => {
        let nextTournamentId = response.getTournamentInstanceId();
        grpc_client.joinTournament(
            nextTournamentId, 0,
            on_join_response,
            (custom_msg) => {
                custom_msg && showSnackBar(custom_msg);
                setNextTournamentLoading(false);
            }
        );
    }

    const on_join_response = function (joinResponse) {
        setTimedOut(false);
        setShowPrizeDialog(true);
        if (joinResponse.was_subscribed) {
          let tableStateResponse = {
            game_meta: {
              tournament_instance_id: joinResponse.tournament_instance_id,
              table_instance_id: joinResponse.table_instance_id,
            },
          };
          updateStore("startingTableState", () => tableStateResponse);
   
        } else {
          if (joinResponse.error_msgs) {
            for (let err of joinResponse.error_msgs) {
              showSnackBar(window._(err), "error");
            }
          }
        }
      };
    

    // set document title
    useEffect(() => {
        let title = `Poker:: `;
        if (tableState?.game_meta) {
        if (tableState.game_meta.table_instance_id) {
            title += `Table ID ${tableState.game_meta.table_instance_id}`;
        }

        if (tableState.game_meta.table_type) {
            let type = table_types.find(
            (type) => type.value === tableState.game_meta.table_type
            );
            title += `, ${type.label}`;
        }
        }
        document.title = title;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ tableState ]);

    // subscribe to table state if starting table state found
    useEffect(() => {
        let startingTableState = store.startingTableState;
        if (startingTableState) {
        if (
            startingTableState.game_meta?.tournament_instance_id &&
            startingTableState.game_meta?.table_instance_id
        ) {
            // setTableState(startingTableState);

            grpc_client.subscribeTournamentState(
            startingTableState.game_meta.tournament_instance_id,
            startingTableState.game_meta.table_instance_id,
            on_new_table_state,
            (custom_msg) => custom_msg && showSnackBar(custom_msg)
            );
        } else {
            console.error(
            "Starting Table State: can not be subscribed. Could not get tournament or table instance id."
            );
        }
        } else if(params.id) {
            setParamsLoading(true)
            grpc_client.joinTournament(
                params.id, 0,
                (response) => {
                    if (response.was_subscribed) {
                        grpc_client.subscribeTournamentState(
                            response.tournament_instance_id,
                            response.table_instance_id,
                            on_new_table_state,
                            (custom_msg) => {
                                setParamsLoading(false);
                                custom_msg && showSnackBar(custom_msg);
                            }
                        );                 
                      } else {
                        setParamsLoading(false);
                        if (response.error_msgs) {
                          for (let err of response.error_msgs) {
                            showSnackBar(window._(err), "error");
                          }
                        }
                      }
                },
                (custom_msg) => {
                    setParamsLoading(false);
                    custom_msg && showSnackBar(custom_msg);
                }
            );
        } else {
            history.push("/gamestart");
        }

        return () => {
        grpc_client.unSubscribeTournamentState();
        };
    }, [
        grpc_client,
        on_new_table_state,
        store.startingTableState,
        showSnackBar,
        history,
        params
    ]);

    // show feedback that next hand is loading
    useEffect(() => {
        if (nextHandLoading) {
        showSnackBar("Loading next hand...", "loading");
        } else {
        showSnackBar("", "loading");
        }
    }, [nextHandLoading, showSnackBar]);

    const handleCancelledDialogClose = () => {
        history.push("/lobby");
    };

    // get cards used by winners if exist
    const winners_cards = getWinnersCardsUsed(tableState);

    const handle_back_to_lobby = () => {
        if (tableState?.game_meta?.launch_source === "template_lobby") {
            history.push("/template_lobby");
        }
        else {
            history.push("/gamestart");
        }
    }

    function addonPlayer() {
        setAddonLoading(true);
        //TODO[ADDON]: maybe update table state here immediately by calling getStatus on addon success, so that state is updated on the frontend
        grpc_client.addonPlayer(tableState.game_meta.tournament_instance_id, () => {
            setAddonLoading(false);
            setAddonOpen(false);
            showSnackBar("Addon Successful!", "success")
        }, (custome_msg) => {
            setAddonLoading(false);
            setAddonOpen(false);
            custome_msg && showSnackBar(custome_msg)
        });
    }


    function setUserAddonAmount(number){
        setAddonSelected(true);
        setAddonAmount(number);
        showSnackBar("Bet confirmed for the next round, press the draw card to continue", "success");


    }
    function openAddonDialog(){
        
        setAddonOpen(true);
    }
    function handleAddonClose(){
        setAddonOpen(false);
    }


    function isFiveCardDrawTurboMode(){
        return tableState?.game_meta?.is_turbo_mode === '1' && tableState?.game_meta?.game_type === 'five_card_draw';
    }

    const isGameIncomplete = ()=>{
        return tableState?.game?.table_action !== "finished" && tableState?.tournament_meta?.status !== "FINISHED"
    }

    const disableBetting = () => {
        if(isGameIncomplete()){
            if(isPayoutMade()){
                return isDealingCards ? true : false;
            }else{
                return true;
            }
        }else{
            return isDealingCards ? true : false;
        }
    }
    /*const isPayoutMade = () =>{
        return tableState.game.additional_payout_made_to[localUser.md5];
    }*/



    const isPayoutMade = () =>{
        return tableState?.game?.additional_payout_made_to && tableState?.game?.additional_payout_made_to.length && tableState?.game?.additional_payout_made_to[localUser.md5];
    }


    const isGameOver = () => {
        return isPayoutMade() || !isGameIncomplete();
    }

      
    const handleUnsubscribeFromBuffer = () => {
        if(tableState?.game_meta?.is_turbo_mode === "1"){
            grpc_client.unsubscribeFromTournamentTemplateBuffer(
                tableState?.tournament_meta?.tournament_id,
                () => {
                    setWaiting(false);
                    clearInterval(pollingInterval);
                    history.push("/template_lobby");
    
                },
                (error) => {
                    if (error) {
                        showSnackBar(error);
                    }
                }
            )
        }else{
            grpc_client.unregisterTournament(
                tableState.game_meta.tournament_instance_id,
                ()=>{
                    history.push("/lobby");
                },
                (error) => {
                    if (error) {
                        showSnackBar(error);
                    }
                }
            );
        }
    }

    return !is_logged_in() ? (
        <Redirect to="/login" />
    ) : (
        <Fragment>
            <TableStateContext.Provider value={[tableState, setTableState]}>

                <div id='flash_mode_timer' className='flash_mode_timer' style={{fontSize:'5rem', position: 'absolute', top:"25px", left: "25px", zIndex: '10'}}>
                    {tableState?.game_meta?.is_flash_mode === "1" ? <CountDownTimer timeOut={()=>{ setShowTimesUpDialogue(true && !timedOut)}} date={tableState?.game_meta?.actual_start_time} timer={(tableState?.game?.table_action !== "finished" && tableState?.tournament_meta?.status !== "FINISHED" ) && tableState?.game?.flash_mode_timer}/> :  "" }
                </div>
                <div id='flash_mode_prize_pool' className='flash_mode_prize_pool' style={{fontSize:'5rem', position: 'absolute', top:"25px", right: "25px", zIndex: '10'}}>
                {tableState?.game_meta?.is_flash_mode === '1' && tableState?.game?.additional_prize_pool_payout && (!showPrizeDialog || tableState?.players[localUser.md5]?.meta?.should_show_prize_revealer === false ) && (
                    <Typographyx
                    variant="h6"
                    style={{ color: "#fff", textTransform: "inherit" }}
                    >
                    Prize Pool: {'$'}{tableState?.game?.additional_prize_pool_payout || 0}
                    </Typographyx>
                )}

          

                {!(tableState?.game_meta?.is_single_hand === '1' || tableState?.game_meta?.is_turbo_mode === '1' ) && Number(tableState?.tournament_meta?.addons_round_start) <= tableState?.game?.round && Number(tableState?.tournament_meta?.addons_round_end)  >= tableState?.game?.round  && Number(tableState?.tournament_meta?.addon_threshold) >= tableState?.players[localUser.md5]?.chips && 
                    //TODO[ADDON]: here add loading when button is clicked, find a better place for the addon, add more information, ui improvement
                    <>
                    {/* <Buttonx
                        onClick={addonPlayer}
                        disabled={false}
                        endIcon={false ? <Loading size={20} /> : null}
                        color="primary"
                    >
                        Addon
                    </Buttonx> */}
                    <Link  onClick={openAddonDialog} className="floating-btn">
                        <Icon>add</Icon>
                    </Link>
                    <div className="fb-label-container">
                        <div className="fb-label-text">Add on</div>
                    </div>
                    </>
                }


                  

                        {addonOpen &&
                             (
                                <Dialog onClose={handleAddonClose} aria-labelledby="simple-dialog-title" open={addonOpen}>
                                  <DialogTitle id="simple-dialog-title" disableTypography={true}>
                                    <Typographyx
                                        variant="h6"
                                        style={{ color: "#fff", textTransform: "inherit" }}
                                        >
                                            Buy Addons
                                    </Typographyx>
                                </DialogTitle>
                                <DialogContent>
                                    <List>
                                        <ListItem autoFocus button >
                                            <ListItemAvatar>
                                            <Avatar style={{color:"#fff"}}>
                                                <Icon>format_list_numbered</Icon>
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary={tableState?.players[localUser.md5]?.addons_used} secondary="Addons Used" />
                                        </ListItem>
                                        <ListItem autoFocus button >
                                            <ListItemAvatar>
                                                <Avatar style={{color:"#fff"}}>
                                                <Icon>attach_money</Icon>
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary={tableState?.tournament_meta?.buyin * tableState?.players[localUser.md5]?.addons_used} secondary="Money spent" />
                                        </ListItem>

                                        <ListItem autoFocus button >
                                            <ListItemAvatar>
                                            <Avatar style={{color:"#fff"}}>
                                                <Icon>bar_chart</Icon>
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary={tableState?.game_meta?.addon_chips * tableState?.players[localUser.md5]?.addons_used} secondary="Chips bought" />
                                        </ListItem>
                                        <ListItem autoFocus button >
                                            <ListItemAvatar>
                                            <Avatar style={{color:"#fff"}}>
                                                <Icon>arrow_circle_down</Icon>
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary={tableState?.tournament_meta?.addons_permitted - tableState?.players[localUser.md5]?.addons_used} secondary="Addons left" />
                                        </ListItem>
                                    </List>
                                </DialogContent>
                                <DialogActions>
                                    <Buttonx onClick={handleAddonClose} color="primary" >
                                        Cancel
                                    </Buttonx>
                                    <Buttonx onClick={addonPlayer} color="primary" disabled={addonLoading}
                                    endIcon={addonLoading ? <Loading size={10} /> : null}autoFocus>
                                        Buy Addon
                                    </Buttonx>
                                </DialogActions>
                                </Dialog>
                              )
                        }
                </div>
                <div
                    id="holdem_table1"
                    className="holdem_table"
                    style={{
                    width: "100%",
                    minHeight: '100vh',
                    backgroundSize: "cover",
                    overflowY:"scrollable"
                    }}
                >
                    {payoutHand && <PayoutStructureCard style={{marginTop:"25px"}} payoutHand = {payoutHand
                } additionalHand ={additionalHand} currentAddOnAmount={currentAddOnAmount} addons_permitted={addonsPermitted} />}

                {
                    isGameOver() && isFiveCardDrawTurboMode() &&
                    <div item xs={12} style={{position:"absolute", top:"10px", right:"0px", zIndex:"999"}}>
                        

                        <GameResult  
                            players={Object.values(payoutDetails).sort((a,b) => a.rank - b.rank)} 
                            hasAdditionalPayout={tableState.game_meta?.has_additional_payout === '1'}
                            showStandardPayout={true}
                            isFiveCardDrawTurboMode={isFiveCardDrawTurboMode()}
                            totalPayout={totalPayout} />:
                    </div>
                }

                    <div
                    className="holdem_table_body"
                    style={{
                        
                        position: "relative",
                        width: 1020,
                        marginLeft: "auto",
                        marginRight: "auto",
                    }}
                    >
                    <div className="cached_assets">
                        <div className="sounds"></div>
                    </div>
                    <form>
                        <input
                        type="hidden"
                        id="multifactor_url"
                        value="/component/multifactor/?view=auth&amp;context=game&amp;format=raw"
                        />
                    </form>

                  
                    {/* Community Cards */}
                    {<CommunityCards winners_cards={winners_cards} />}

                    {/* Table with the chairs and players around it */}
                    <Grid item xs={12} style={{minHeight:"60vh"}}>
                        {/* Table */}
                        {((tableState?.game?.table_action === "pending" &&  !tableState?.game?.additional_prize_pool_payout) || waiting) && (
                        <Dialog
                        aria-labelledby="simple-dialog-title"
                        open={true}
                        PaperProps={{ style: { alignItems: "center" , backgroundColor: 'transparent', alignSelf:"start", marginTop:"215px" ,
                        boxShadow: 'none',} }}
                        >
                           
                            <DialogContent>
                                <div className="loading-container">
                                    <div className="loading"></div>
                                    <div id="loading-text">waiting for players</div>
                                </div>
                                <Buttonx
                                  variant="contained"
                                  color="primary"
                                  onClick={handleUnsubscribeFromBuffer}
                                  mt={1}
                                  mb={2}
                                  style={{float:"right",backgroundColor: "transparent", color: "white",  outline: "none", border: "solid 1px #fafafa"}}
                                >
                                  Leave Tournament
                                </Buttonx>
                            </DialogContent>
                        </Dialog>
                        )}

                        {/* Wait until page loads and gets all data */}
                        {paramsLoading && (
                            <Dialog
                                aria-labelledby="simple-dialog-title"
                                open={true}
                                PaperProps={{ style: { alignItems: "center" } }}
                            >
                                <DialogTitle id="simple-dialog-title" disableTypography={true}>
                                <Typographyx
                                    variant="h6"
                                    style={{ color: "#fff", textTransform: "inherit" }}
                                    >
                                    Please wait...
                                </Typographyx>
                                </DialogTitle>
                                <DialogContent>
                                <Box p={1}>
                                    <Loading />
                                </Box>
                                </DialogContent>
                            </Dialog>
                        )}         
                        {/* PRIZE POOL DRAW DIALOG */}
                        {tableState?.players[localUser.md5]?.meta?.should_show_prize_revealer !== false && tableState?.game_meta?.is_flash_mode === '1' && tableState?.game?.additional_prize_pool_payout 
                        && tableState?.game_meta?.flash_prize_pool_values && (tableState?.game?.table_action !== "finished" && tableState?.tournament_meta?.status !== "FINISHED" )  && !timedOut &&(
                        <Dialog
                            aria-labelledby="prize-dialog-title"
                            PaperProps={{ style: { alignItems: "center", backgroundColor:'rgba(0, 0, 0, 0.3)',  alignSelf:"start", marginTop:"215px" } }}
                            open={showPrizeDialog && !showTimesUpDialogue}
                        >
                            <DialogContent>
                            <PrizeRevealerSpinner
                                tournament_instance_id={tableState.game_meta?.tournament_instance_id}
                                closeModal={() => setShowPrizeDialog(false)}
                                prizes={[
                                    tableState?.game?.additional_prize_pool_payout, 
                                    ...getPrizePoolMoneyValuesOnly(tableState?.game_meta?.flash_prize_pool_values, tableState?.game?.additional_prize_pool_payout )
                                ]}
                                transitionDuration={5}
                                repeat={3}
                                style={{ fontSize: "5.5rem", fontWeight: "bold" }}
                                currency="$"
                            />
                            </DialogContent>
                        </Dialog>
                        )}

                    
                        {/* Additional prize pool payout dialog */}
                        { (tableState?.game?.table_action === "finished" || tableState?.tournament_meta?.status === "FINISHED" ) && payoutDetails &&
                        (!isFiveCardDrawTurboMode()) &&
                        (
                            <Dialog
                            aria-labelledby="prize-dialog-title"
                            PaperProps={{ style: { alignItems: "center" } }}
                            open={true}
                            fullWidth={true}
                            maxWidth='md'
                            >
                            <DialogTitle id="simple-dialog-title" disableTypography={true}>
                                <Typographyx
                                variant="h6"
                                style={{ color: "#fff", textTransform: "inherit" }}
                                >
                                    Tournament Results
                                </Typographyx>
                            </DialogTitle>
                            <DialogContent>
                                <GameResult  
                                players={Object.values(payoutDetails).sort((a,b) => a.rank - b.rank)} 
                                isFlashMode={tableState?.game_meta?.is_flash_mode === '1'} 
                                hasAdditionalPayout={tableState.game_meta?.has_additional_payout === '1'}
                                showStandardPayout={tableState.game_meta?.use_additional_payout_only !== "1"}
                                isFiveCardDrawTurboMode={isFiveCardDrawTurboMode()}
                                totalPayout={totalPayout} />
                            </DialogContent>
                            <DialogActions>
                                <Container align="spaceAround">
                                    <Box m={2} >
                                        <Buttonx
                                            onClick={()=>{handle_back_to_lobby();}}
                                            fullWidth
                                            variant="contained"
                                            color="primary"
                                            startIcon={<ArrowBackIcon />}
                                            >
                                            Back to Lobby
                                        </Buttonx>
                                        
                                        
                                    </Box>
                                    {tableState?.game_meta?.is_turbo_mode !== '1' && tableState?.game_meta?.game_type !== 'five_card_draw' && !(params.id) &&
                                        <Box m={2}>
                                            <Buttonx
                                                onClick={joinNextTournament}
                                                fullWidth
                                                variant="contained"
                                                color="primary"
                                                endIcon={<SkipNextIcon />}
                                                startIcon={nextTournamentLoading ? <CircularProgress /> : null}
                                                >
                                                Next Game
                                            </Buttonx>
                                        </Box>
                                    }
                                </Container>
                            </DialogActions>
                            </Dialog>
                        )}

                        {/* Chairs around table with all the details including players */}
                        {tableState?.game?.table_action !== "pending" && (
                        <ChairsAlternate
                            on_new_table_state={on_new_table_state}
                            winners_cards={winners_cards}
                        />
                        )}
                    </Grid>

                    {/* bottom action controls */}
                    {tableState && <div
                        style={{ width: "71em", height:"200px", marginTop:"1em",marginBottom:"1em",padding: "1em", backgroundSize: "cover", backgroundColor:"rgba(255,255,255,0.1)" , border:"solid 2px rgba(255,255,255,0.2)", borderRadius:"5px"}}
                    >

                        <Grid container>
                        <Grid item xs={12}>
                              {/* table timer speed */}
                                <div style={{display:"flex", justifyContent:"space-between", marginBottom:"10px"}}>
                                    <div className="decision_time_meta" style={{position:"initial"}}>
                                    {isFiveCardDrawTurboMode() && <div className="balance">
                                            <span className="balance_title">Balance:&nbsp;</span>
                                            <span className="balance_value">${cashInAcount}</span>
                                        </div>}
                                        <div className="table_decision_time">
                                        <span>Speed:&nbsp;</span>
                                        <span className="decision_time">
                                            {tableState?.game_meta?.timer
                                            ? tableState.game_meta.timer
                                            : "--"}
                                        </span>
                                        <span className="decision_time_secs">&nbsp;seconds</span>
                                        </div>
                                    </div>

                                    {/* Server time  */}
                                    <div className="server_time_meta" style={{position:"initial"}}>
                                        {isFiveCardDrawTurboMode() && <div className="balance">
                                            <span className="balance_title">{winnings >= 0 ? "Winnings :" : "Loss : " }&nbsp;</span>
                                            <span className="balance_value">
                                            ${winnings}
                                            </span>
                                        </div>}
                                        <div className="server_time">
                                            <span>Server Time:&nbsp;</span>
                                            <span className="clock">
                                                {tableState?.game_meta?.server_time
                                                ? getFormattedServerTime(tableState.game_meta.server_time)
                                                : "--"}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                
 
                             </Grid> 
                        {/* .meta_game_controls */}
                        <Grid item xs={5}>
                            <Grid container spacing={0}>
                            <Grid item xs={1}>
                                <div className="btnDealerChat">
                                <img
                                    src="components/com_camerona/assets/images/chat_icn_1.png"
                                    alt="dealer chat toggle"
                                />
                                <input
                                    type="checkbox"
                                    value="1"
                                    // checked="checked"
                                />
                                </div>
                                <div id="btnAutomuck">
                                <img
                                    src="components/com_camerona/assets/images/settings_gear_icn_1.png"
                                    alt="auto muck"
                                />
                                <input
                                    type="checkbox"
                                    value="1"
                                    // checked="checked"
                                />
                                </div>
                                <div id="btnSpeaker">
                                <img
                                    src="components/com_camerona/assets/images/speaker.png"
                                    alt="speaker"
                                />
                                <input
                                    id="soundOff"
                                    type="checkbox"
                                    value="1"
                                    // checked="checked"
                                />
                                </div>
                                <div id="btnAddon" className="btn small success">
                                <span>Addon</span>
                                </div>
                                {/* .game_options_container */}
                            </Grid>

                            {/* Table chat container */}
                            <Grid item xs={11}>
                                {tableState && <TableChat />}
                            </Grid>
                            </Grid>
                        </Grid>
                          
                        {/* bet action controls */}
                        <Grid item xs={7}>
                            {(!(tableState?.game_meta?.is_turbo_mode === '1' && tableState?.game_meta?.game_type === 'five_card_draw')) && store.player && tableState && (
                            <ActionControls
                                on_new_table_state={on_new_table_state}
                                on_draw_new_cards={startNextTable}
                                disable_actions={nextHandLoading || handCompletedAfterTimeOut}
                            />
                            )}
                             {(tableState?.game_meta?.is_turbo_mode === '1' && tableState?.game_meta?.game_type === 'five_card_draw') && tableState && 
                            <React.Fragment>
                            <Grid container spacing={0} alignItems="center" justify="center">
                              <Grid
                                item
                                xs={3}
                                style={{ display: "flex", justifyContent: "space-around" }}
                              >
                                   <Buttonx
                                  variant="contained"
                                  color="primary"
                                  disabled ={(disableBetting())  || addOnSelected}
                                  onClick={()=>{setUserAddonAmount(0)}}
                                  mt={1}
                                  mb={2}
                                >
                                  1 Buyin
                                </Buttonx>
                            </Grid>
                            {tableState?.tournament_meta?.addons_permitted && tableState?.tournament_meta?.addons_permitted > 0 && (
                                 <Grid
                                item
                                xs={3}
                                style={{ display: "flex", justifyContent: "space-around" }}
                              >

                                <Buttonx
                                  variant="contained"
                                  color="primary"
                                  onClick={()=>{setUserAddonAmount(displayAddon - 1)}} style={{float:'right'}}
                                  disabled ={(disableBetting()) || addOnSelected}
                                  mt={1}
                                  mb={2}
                                >
                                  1 Buyin and {displayAddon-1} addons
                                </Buttonx>
                               
                                <IconButton
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    style={{marginBottom:"10px"}}
                                    disabled ={(disableBetting()) || addOnSelected}
                                    onClick={()=>{displayAddon < tableState?.tournament_meta?.addons_permitted  &&  setDisplayAddon(displayAddon + 1)}}
                      
                                    >
                                      <Add />
                                </IconButton>
                                
                                </Grid>)}   
                            {tableState?.tournament_meta?.addons_permitted && tableState?.tournament_meta?.addons_permitted > 1 && (<Grid
                                item
                                xs={3}
                                style={{ display: "flex", justifyContent: "space-around" }}
                              >    
                                <Buttonx
                                  variant="contained"
                                  color="primary"
                                  onClick={()=>{setUserAddonAmount(tableState?.tournament_meta?.addons_permitted)}}
                                  disabled ={(disableBetting()) || addOnSelected}
                                  mt={1}
                                  mb={2}
                                >
                                  1 Buyin and {tableState?.tournament_meta?.addons_permitted} addons
                                </Buttonx>
                            </Grid>)}
                            <Grid
                                item
                                xs={3}
                                style={{ display: "flex", justifyContent: "space-around" }}
                              >  
                                <Buttonx
                                  variant="contained"
                                  color="primary"
                                  onClick={startNextTable}
                                  disabled ={(isGameIncomplete() && !isPayoutMade()) || !addOnSelected}
                                  mt={1}
                                  mb={2}
                                >
                                  Deal
                                </Buttonx>
                      
                              
                              </Grid>
                      
                             </Grid>
                          </React.Fragment>}

                        </Grid>
                        </Grid>
                        <button
                                  variant="contained"
                                  color="primary"
                                  className="game_btn game_cancel"
                                  onClick={handleUnsubscribeFromBuffer}
                                  disabled ={(tableState?.game?.table_action !== "finished" || tableState?.tournament_meta?.status !== "FINISHED")}
                                  mt={1}
                                  mb={2}
                                  style={{display:"flex", alignItems:"center", justifyContent:"center", float:"right", marginTop:"-20px", paddingTop:"5px", paddinngBottom:"5px"}}
                                >
                                 <ExitToApp />&nbsp; Leave
                                </button>
                    </div>}

              
                    </div>
                </div>
            </TableStateContext.Provider>
            <Dialog open={showCancelledDialog} onClose={handleCancelledDialogClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title" style={{ color: "#fff" }}>
                    <Typographyx variant="h6" style={{ color: "#fff", textTransform: "inherit" }} >
                        Tournament Cancelled
                    </Typographyx>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        The tournament has been cancelled!
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancelledDialogClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );

  /**
   * Convert the prize pool value object into  
   * number values of the prize pool
   *
   * @param Object prize: prize value object as it is sent from the server / backend
   * @param Number payout: the payout value so that we want to filter that one out so it doesn't appear twice
   * @return array: list of prize value numbers
  */
  function getPrizePoolMoneyValuesOnly(prize, payout) {
    return Object.values(prize)
      .map(val => val?.prize)
      .filter(n => n !== payout);
  }
}

export default GamePlayAlternate;
