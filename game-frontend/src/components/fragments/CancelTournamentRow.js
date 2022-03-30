import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import React, { useState, Fragment } from "react";
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import {  makeStyles } from "@material-ui/core/styles";
import DialogContentText from '@material-ui/core/DialogContentText';

import Buttonx from "./Buttonx";
import Loading from './Loading';
import Typographyx from "./Typographyx";
import useGrpcClient from "../../contexts/grpc_client";
import { useSnackBarContext } from "../../contexts/snackbar";
import { table_type_labels, game_type_labels } from "../utils/constants";
import Yes from '@material-ui/icons/CheckCircle';
import No from '@material-ui/icons/Block';
import green from '@material-ui/core/colors/green';
import Badgex from "./Badgex";
import StyledTableCell from './StyledTableCell';
import StyledTableRow from './StyledTableRow';
import Checkbox from '@material-ui/core/Checkbox'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'

const useStyles = makeStyles( theme => ({
    full: {
      color: theme.palette.error.main
    },
    available: {
      color: theme.palette.success.main
    }
  }))

const CancelTournamentRow = ({ tournament, refreshTournaments, index, checked, onCheckboxChange, ...props }) => {
    const classes = useStyles();
    const grpcClient = useGrpcClient();
    const showSnackBar = useSnackBarContext();
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [actionBtnLoading, setActionBtnLoading] = useState(false);

    const handleClose = () => {
        setShowConfirmation(false);
    };

    const onCancelClicked = () => {
        setShowConfirmation(true);
    }

    const cancelTournament = () => {
        setActionBtnLoading(true);
        setShowConfirmation(false);

        grpcClient.cancelTournament(tournament.tournament_instance_id, onSuccess, onFailure)
    }

    const onSuccess = (response) => {
        setActionBtnLoading(false);
        refreshTournaments();
    }

    const onFailure = (error) => {
        setActionBtnLoading(false);

        if (error) {
            showSnackBar(error);
        }
    }

    return (
        <Fragment>
            <StyledTableRow>
                <StyledTableCell component="th" scope="row" align="center">
                <FormGroup row>
                    <FormControlLabel
                        control={ <Checkbox value={tournament.tournament_instance_id} checked={checked} onChange={onCheckboxChange} name={index} color="default" />}
                    />
                    </FormGroup>
                </StyledTableCell>
                <StyledTableCell align="center" component="th" scope="row">
                    {tournament.name} &nbsp;{" "}
                </StyledTableCell>
                <StyledTableCell align="center"><Badgex color={tournament.status}>{tournament.status}</Badgex></StyledTableCell>
                <StyledTableCell align="center">
                    {tournament.tournament_instance_id}
                </StyledTableCell>
                <StyledTableCell align="center" className={parseInt(tournament.max_players_per_table) - parseInt(tournament.seats_occupied) > 0 ? classes.available: classes.full }>
                    { parseInt(tournament.min_players_per_table) - parseInt(tournament.seats_occupied)} / {parseInt(tournament.min_players_per_table) }
                </StyledTableCell>
                <StyledTableCell align="center">{tournament.table_timer}</StyledTableCell>
                <StyledTableCell align="center">
                    {table_type_labels[tournament.table_type]}
                </StyledTableCell>
                <StyledTableCell align="center">
                    {game_type_labels[tournament.game_type]}
                </StyledTableCell>
                <StyledTableCell align="center">
                    {tournament.is_flash_mode === "1" ? <Yes style={{color: green[500]}}/> : <No />}
                </StyledTableCell>
                <StyledTableCell align="center">
                    {tournament.has_additional_payout === "1" ? <Yes style={{color: green[500]}}/> : <No />}
                </StyledTableCell>
                <StyledTableCell align="center">
                    {tournament.is_single_hand === "1" ? <Yes style={{color: green[500]}}/> : <No />}
                </StyledTableCell>
                <StyledTableCell align="center">
                    { tournament.status === "ACTIVE" ||  tournament.status === "PENDING" || tournament.status === "REGISTERING" ? (
                        <Buttonx variant="outlined" bgcolor="secondary.main" onClick={() => onCancelClicked()} disabled={actionBtnLoading} endIcon={actionBtnLoading ? <Loading size={20} /> : null}>
                            Cancel
                        </Buttonx>
                    ) : null }
                </StyledTableCell>
            </StyledTableRow>
            <Dialog open={showConfirmation} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title" style={{ color: "#fff" }}>
                    <Typographyx variant="h6" style={{ color: "#fff", textTransform: "inherit" }} >
                        Confirm
                    </Typographyx>

                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you wanna cancel this tournament?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        No
                    </Button>
                    <Button onClick={cancelTournament} color="primary" autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>

    );
};

export default CancelTournamentRow;