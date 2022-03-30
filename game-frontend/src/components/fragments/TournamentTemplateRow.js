import Loading from './Loading';
import Switch from '@material-ui/core/Switch';
import { Grid, FormLabel, FormControl } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from "@material-ui/core/DialogContent";
import React, { Fragment, useState, useEffect } from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import Typographyx from "./Typographyx";
import useGrpcClient from "../../contexts/grpc_client";
import { useSnackBarContext } from '../../contexts/snackbar';
import StyledTableCell from './StyledTableCell';
import StyledTableRow from './StyledTableRow';
import { DEV_IMAGE_URL } from '../../utils/image_utils';

const TournamentTemplateRow = ({ template, index, hover, selected, checked, onClick, onCheckboxChange, ...props }) => {
    const grpcClient = useGrpcClient();
    const showSnackBar = useSnackBarContext();
    const [loading, ] = useState(false);
    const [showLaunchDialog, setShowLaunchDialog] = useState(false);
    const [lobbyVisibility, setLobbyVisibilit] = useState(template ? template.is_visible_in_lobby === '1' : false);

    // Game Mode States
    const [gameMode, setGameMode] = useState({
        is_flash_mode: false,
        is_single_hand: false,
        has_additional_payout: false,
        is_turbo_mode: false
    });
    const [disableFlashMode, setDisableFlashMode] = useState(false);
    const [disableSingleHand, setDisableSingleHand] = useState(false);

    const handleGameModeChange = (event) => {
        const name = event.target.name;
        const checked = event.target.checked;
        if (name === "is_flash_mode" && checked) {
            setGameMode({
                ...gameMode,
                is_flash_mode: true,
                is_single_hand: false
            });
        }
        else if (name === "is_single_hand" && checked) {
            setGameMode({
                ...gameMode,
                is_flash_mode: false,
                is_single_hand: true
            });
        }
        else if (name === "is_turbo_mode" && checked) {
            setGameMode({
                ...gameMode,
                is_turbo_mode: true,
                is_single_hand: true
            });
        }
        else if (name === "is_turbo_mode" && !checked) {
            setGameMode({
                ...gameMode,
                is_turbo_mode: false,
                is_single_hand: false
            });
        }
        else {
            setGameMode({ ...gameMode, [name]: checked });
        }
    }

    /**
     * On Lobby Visibility Changed
     */
    const onLobbyVisibilityChanged = (event) => {
        let checked = event.target.checked;

        if (checked) {
            setGameMode({
                is_flash_mode: false,
                is_single_hand: false,
                has_additional_payout: false
            });
            setShowLaunchDialog(true);
        }
        else {
            setLobbyVisibilit(checked);
            grpcClient.removeTournamentTemplateFromLobby(template.id, (response) => {},
                (error) => {
                    if (error) {
                        showSnackBar(error);
                    }
                }
            );
        }
    };

    /**
     * On Tournament Launch Cancelled
     */
    const onCancelLaunchDialog = () => {
        setShowLaunchDialog(false);
    }

    /**
     * On Tournament Launch Confirmed
     */
    const onConfirmLaunchDialog = () => {
        grpcClient.addTournamentTemplateToLobby(
            template.id,
            gameMode.is_flash_mode,
            gameMode.is_single_hand,
            gameMode.has_additional_payout,
            gameMode.is_turbo_mode,
            onTournamentTemplateLaunchSuccess,
            onTournamentTemplateLaunchFailure
        );
    }

    /**
     * On Tournament Template Launch Success
     * @param {*} response
     */
    const onTournamentTemplateLaunchSuccess = (response) => {
        setLobbyVisibilit(true);
        setShowLaunchDialog(false);
    }

    /**
     * On Tournament Template Launch Failure
     * @param {*} error
     */
    const onTournamentTemplateLaunchFailure= (error) => {
        if (error) {
            showSnackBar(error);
        }
    }

    /**
     * Is Five Card Draw
     */
    const isFiveCardDraw = () => {
        return template.game_type === "five_card_draw";
    }

    useEffect(() => {
        if (gameMode.is_turbo_mode) {
            setDisableFlashMode(true);
            setDisableSingleHand(true);
        }
        else {
            setDisableFlashMode(false);
            setDisableSingleHand(false);
        }
    }, [gameMode]);

    return (
        <Fragment>
            <StyledTableRow hover={hover} selected={selected} onClick={onClick}>
                <StyledTableCell component="th" scope="row" align="center">
                    <FormGroup row>
                        <FormControlLabel
                            control={ <Checkbox value={template.id} checked={checked} onChange={onCheckboxChange} name={index} color="default" />}
                            label={ <Typographyx color="textSecondary"> {template.id} </Typographyx> }/>
                    </FormGroup>
                </StyledTableCell>
                <StyledTableCell align="center">
                {template.tournament_image && <img alt="tournament_image" src={DEV_IMAGE_URL+ template.tournament_image?.replace("./","/") } height="50" width="50" style={{borderRadius:"50px"}} />}
                </StyledTableCell>
                <StyledTableCell align="center">
                    { template.name }
                </StyledTableCell>
                <StyledTableCell align="center">
                    { template.buyin }
                </StyledTableCell>
                <StyledTableCell align="center">
                    { parseInt(template.min_prize_pool_value) }
                </StyledTableCell>
                <StyledTableCell align="center">
                    { template.buyin_chips }
                </StyledTableCell>
                <StyledTableCell align="center">
                    { template.blinds_increase_interval_seconds }
                </StyledTableCell>
                <StyledTableCell align="center">
                    { template.table_type }
                </StyledTableCell>
                <StyledTableCell align="center">
                    { template.type }
                </StyledTableCell>
                <StyledTableCell align="center">
                    { template.game_type }
                </StyledTableCell>
                <StyledTableCell align="center">
                <FormGroup row>
                    <FormControlLabel
                            control={ <Switch checked={lobbyVisibility} onChange={onLobbyVisibilityChanged} color="primary" inputProps={{ 'aria-label': 'primary checkbox' }}/>}/>
                    </FormGroup>

                </StyledTableCell>
            </StyledTableRow>
            <Dialog aria-labelledby="simple-dialog-title" open={showLaunchDialog} fullWidth={true}>
                <DialogTitle id="simple-dialog-title" disableTypography={true}>
                    <Typographyx variant="h6" style={{ color: "#fff", textTransform: "inherit" }} >
                        Gameplay mode used when template is in lobby
                    </Typographyx>
                </DialogTitle>
                <DialogContent>
                    <Grid container spacing={1}>
                        <Grid item xs={6}>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Modes</FormLabel>
                                <FormGroup>
                                    <FormControlLabel
                                        disabled={disableFlashMode}
                                        checked={gameMode.is_flash_mode}
                                        label={<Typographyx color="textSecondary">Flash Mode</Typographyx>}
                                        control={
                                            <Checkbox checked={gameMode.is_flash_mode} onChange={handleGameModeChange} name="is_flash_mode" color="primary" />
                                        }/>
                                    <FormControlLabel
                                        disabled={disableSingleHand}
                                        checked={gameMode.is_single_hand}
                                        label={<Typographyx color="textSecondary">Single Hand</Typographyx>}
                                        control={
                                            <Checkbox checked={gameMode.is_single_hand} onChange={handleGameModeChange} name="is_single_hand" color="primary" />
                                        }/>
                                    {
                                        isFiveCardDraw() && (
                                            <FormControlLabel
                                                checked={gameMode.is_turbo_mode}
                                                label={<Typographyx color="textSecondary">Turbo Mode</Typographyx>}
                                                control={
                                                    <Checkbox checked={gameMode.is_turbo_mode} onChange={handleGameModeChange} name="is_turbo_mode" color="primary" />
                                                }/>
                                        )
                                    }
                                </FormGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Other Options</FormLabel>
                                <FormGroup>
                                    <FormControlLabel
                                        checked={gameMode.has_additional_payout}
                                        label={<Typographyx color="textSecondary">Additional Payout</Typographyx>}
                                        control={
                                            <Checkbox checked={gameMode.has_additional_payout} onChange={handleGameModeChange} name="has_additional_payout" color="primary" />
                                        }/>
                                </FormGroup>
                            </FormControl>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onCancelLaunchDialog} color="default" autoFocus>
                        Cancel
                    </Button>
                    <Button onClick={onConfirmLaunchDialog} color="primary" autoFocus endIcon={loading ? <Loading size={20} /> : null}>
                        Add to Lobby
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
};

export default TournamentTemplateRow;