import React, { useState, useEffect } from "react";

import { useAssetPaths } from "../../contexts/asset_paths";
import { useStore } from "../../contexts/store";
import { useSnackBarContext } from "../../contexts/snackbar";
import { cardImagePath } from "../../utils/image_utils";
import { numberCardClass } from "../utils/constants";
import useGrpcClient from "../../contexts/grpc_client";
import { useTableState } from "../../contexts/table_state";

import Badge from "@material-ui/core/Badge";
import Paper from "@material-ui/core/Paper";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import Buttonx from "./Buttonx";
import Loading from "./Loading";
import { ButtonGroup } from "@material-ui/core";
import useLocalStorage from "../utils/hooks";

function PlayerCards({ player, winners_cards, on_new_table_state, ...props }) {
    const assetPaths = useAssetPaths();
    const showSnackBar = useSnackBarContext();
    const grpc_client = useGrpcClient();
    const [store, ] = useStore();
    const [tableState, ] = useTableState();
    const [localUser, ] = useLocalStorage("user");

    const partial_visible_card_width = 18; // width of a partially visible card
    const card_width = 44;
    const card_height = 67;

    const [cardGap, setCardGap] = useState(partial_visible_card_width); // in pixels

    const [selectedCards, setSelectedCards] = useState(
        player.cards ? new Array(player.cards.length).fill(false) : []
    );
    const [hoveredCards, setHoveredCards] = useState(
        player.cards ? new Array(player.cards.length).fill(false) : []
    );
    const [, setActionEnabled] = useState(false);
    const [drawBtnLoading, setDrawBtnLoading] = useState(false);
    const [skipBtnLoading, setSkipBtnLoading] = useState(false);

    const [alreadyDrawn, setAlreadyDrawn] = useState(false);

    //check if payout is made then allow to draw cards
    useEffect(()=>{
        if(tableState.game.additional_payout_made_to && tableState.game.additional_payout_made_to[localUser.md5]){
            setAlreadyDrawn(false);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tableState.game.additional_payout_made_to])
    // setup if draw action should be capable
    useEffect(() => {
        let enable_action = false;
        if ( tableState.game_meta.game_type === "five_card_draw" && tableState.game.table_action === "flop") {
            if (player.md5 === store.player?.md5) {
                enable_action = true;
            }
        }
        setActionEnabled(enable_action);
    }, [
        tableState.game_meta.game_type,
        player,
        store.player,
        tableState.game.table_action,
    ]);

    // reset already drawn flag
    useEffect(() => {
        setAlreadyDrawn(false);
        resetSelectedCards();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tableState.game.game_turn]);

    // sets up processed cards options for rendering
    const cards_options = [];
    const isPlayerWinner = () =>{
         if(tableState.game.winners_data[localUser.md5]){
            return true;
        }else{
            return false;
        }
    }
    // if player cards exist show them and also check if they are part of winning hand or not
    if (player.cards) {
        for (let i = 0; i < player.cards.length; i++) {
            let player_card = player.cards[i];
            let card_attributes = {
                name_class: `card${i}`,
                type_class: numberCardClass(player_card),
                winner_class: "",
            };

            if (winners_cards) {
                if (winners_cards[player_card]) {
                    if(tableState.game_meta.game_type === "five_card_draw" || tableState.game_meta.game_type === "five_card_stud"){
                        card_attributes.winner_class = isWinnerPlayer(player.cards, winners_cards) ? "part_of_winning_hand" : "not_part_of_winning_hand";

                    }else{
                        if(isPlayerWinner()){
                            card_attributes.winner_class =  "part_of_winning_hand" ;
                        }else{
                            card_attributes.winner_class = "not_part_of_winning_hand";

                        }


                    }
                }
                else {
                    card_attributes.winner_class = "not_part_of_winning_hand";
                }
            }
            cards_options.push(card_attributes);
        }
    }

    function isWinnerPlayer(cards, winning_cards){
        let is_winner = true;
        for (let i = 0; i < cards.length; i++) {
            if (winning_cards) {
                if(!winning_cards[cards[i]]){
                    is_winner = false;
                }
            }
        }
        return is_winner;
    }

    function disperseCards() {
        if (isFiveCardDrawTurboMode() && player.md5 === store.player?.md5 && player.meta?.can_draw) {
            setCardGap(card_width + partial_visible_card_width);
        }
        else if (player.meta?.can_draw && player.md5 === store.player?.md5 && player.is_myturn) {
            setCardGap(card_width + partial_visible_card_width);
        }
    }

    function undisperseCards() {
        if (!selectedCardFound()) {
            setCardGap(partial_visible_card_width);
        }
    }

    function selectedCardFound() {
        if (selectedCards.some((selected) => selected)) {
            return true;
        }
        else {
            return false;
        }
    }

    function shouldShowDispersedCards() {
        if (!player.meta?.can_draw) {
            return false;
        }
        else if (!isFiveCardDrawTurboMode() && !player.is_myturn) {
            return false;
        }
        else if (cardGap !== partial_visible_card_width) {
          return true;
        }
        return false;
    }

    function resetSelectedCards() {
        setSelectedCards(
            player.cards ? new Array(player.cards.length).fill(false) : []
        );
    }

    function drawCards() {
        if (drawBtnLoading) {
            return;
        }

        /**
         * Check If Drawing is Possible
         *      -> If Game is 5 Card Draw In Turbo mode player can draw at any moment
         *      -> If Not and already player drawn then show error
         */
        if (alreadyDrawn) {
            console.log("Already Drawn");
            resetSelectedCards();
            showSnackBar("You have already drawn for the current round.");
            return;
        }

        // check if card is selected
        if (!selectedCardFound()) {
            showSnackBar("No card selected.", "warning");
            return;
        }

        setDrawBtnLoading(true);

        let change_idxs = [];
        for (let index in selectedCards) {
            if (selectedCards[index]) {
                change_idxs.push(index);
            }
        }

        grpc_client.sendDrawReplaceAction(
            player.id,
            change_idxs,
            (tableStateResponse) => {
                setDrawBtnLoading(false);

                resetSelectedCards();
                setAlreadyDrawn(true);

                on_new_table_state(tableStateResponse);
            },
            (custom_msg) => {
                setDrawBtnLoading(false);
                if (custom_msg) showSnackBar(custom_msg);
            }
        );
    }

    function skipDrawCards() {
        if (skipBtnLoading) {
            return;
        }

        if (alreadyDrawn) {
            resetSelectedCards();
            showSnackBar("You have already drawn for the current round.");
            return;
        }

        setSkipBtnLoading(true);
        grpc_client.sendDrawReplaceAction(
            player.id,
            [],
            (tableStateResponse) => {
                setSkipBtnLoading(false);

                resetSelectedCards();
                setAlreadyDrawn(true);

                on_new_table_state(tableStateResponse);
            },
            (custom_msg) => {
                setSkipBtnLoading(false);
                if (custom_msg) showSnackBar(custom_msg);
            }
        );
    }

    function isFiveCardDrawTurboMode() {
        return tableState.game_meta.game_type === "five_card_draw" && tableState.game_meta.is_turbo_mode === "1";
    }

    function disableDrawCardButton() {
        if (isFiveCardDrawTurboMode() && player.meta?.can_draw) {
            return false;
        }
        return !(player.meta?.can_draw && player.is_myturn);
    }

    return (
        <div
            id={`player_cards_${player.md5}`}
            style={{
                position: "absolute",
                zIndex: 400, // need this and above, so that it mouse events work
                width: (cards_options.length - 1) * cardGap + card_width,
                height: card_height,
                margin: 10,
            }}
            onMouseEnter={disperseCards}
            onMouseLeave={undisperseCards}
        >
        {
            tableState.game_meta.game_type === "five_card_draw" && player.md5 === store.player?.md5 && (
                <ButtonGroup color="primary" variant="contained" size="small" aria-label="outlined primary button group" style={{ position: "absolute", top: -24, width: '300px' }}>
                    <Buttonx
                        onClick={drawCards}
                        disabled={disableDrawCardButton()}
                        endIcon={drawBtnLoading ? <Loading size={20} /> : null}
                    >
                        Draw & Replace
                    </Buttonx>
                    {
                        isFiveCardDrawTurboMode() && (
                                <Buttonx
                                    onClick={skipDrawCards}
                                    disabled={disableDrawCardButton()}
                                    endIcon={skipBtnLoading ? <Loading size={20} /> : null}
                                    >
                                    Skip Draw
                                </Buttonx>
                        )
                    }

                </ButtonGroup>
                // <Fragment>

                // </Fragment>
            )
        }
        {
            cards_options.map((card, index) => (
                <div
                    className={`card ${card.name_class} ${card.type_class} ${card.winner_class}`}
                    id={`${card.name_class}_${player.md5}`}
                    style={{
                        top: 0,
                        left: index * cardGap,
                        opacity: 1,
                        visibility: "visible",
                        // width: cardGap
                    }}
                    key={index}
                >
                {shouldShowDispersedCards() ? (
                    <Badge
                    badgeContent={
                        selectedCards[index] ? (
                        <CheckCircleIcon color="primary" />
                        ) : hoveredCards[index] ? (
                        <RadioButtonUncheckedIcon color="primary" />
                        ) : null
                    }
                    overlap="circle"
                    style={{
                        position: "absolute",
                        // zIndex: 399,
                        width: card_width - 2,
                        height: card_height,
                    }}
                    onClick={() => {
                        setSelectedCards((cards) => {
                        cards[index] = !cards[index];
                        return [...cards];
                        });
                    }}
                    >
                    <Paper
                        onMouseEnter={() => {
                        setHoveredCards((cards) => {
                            cards[index] = true;
                            return [...cards];
                        });
                        }}
                        onMouseLeave={() => {
                        setHoveredCards((cards) => {
                            cards[index] = false;
                            return [...cards];
                        });
                        }}
                        elevation={hoveredCards[index] ? 0 : 10}
                        style={{
                        width: "100%",
                        height: 64,
                        }}
                    >
                        <img
                        src={cardImagePath(assetPaths)}
                        alt={`${card.name_class}`}
                        />
                    </Paper>
                    </Badge>
                ) : (
                    <img src={cardImagePath(assetPaths)} alt={`${card.name_class}`} />
                )}
                </div>
            ))
        }
        </div>
    );
}

export default PlayerCards;
