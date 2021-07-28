import { Box } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import Container from "@material-ui/core/Container";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import Pagination from "@material-ui/lab/Pagination";
import TableContainer from "@material-ui/core/TableContainer";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Dialog from '@material-ui/core/Dialog';

import React, { useCallback, useEffect, useState } from "react";

import useGrpcClient from "../../contexts/grpc_client";
import Loading from "../../components/fragments/Loading";
import PaperTable from "../../components/fragments/PaperTable";
import { useSnackBarContext } from "../../contexts/snackbar";
import Typographyx from "../../components/fragments/Typographyx";
import CancelTournamentRow from "../../components/fragments/CancelTournamentRow";
import { useStyles, styles } from './CancelTournament.style';
import StyledTableCell from '../../components/fragments/StyledTableCell';
import StyledTableRow from '../../components/fragments/StyledTableRow';
import StyledFilterSelect from '../../components/fragments/StyledFilterSelect';
import StyledMenuItem from '../../components/fragments/StyledMenuItem';
import { Buyins, Timers, GameTypes, TableTypes, EntryFee } from "../../helpers/Filter.helpers";
import Buttonx from '../../components/fragments/Buttonx';

const CancelTournament = () => {
    const classes = useStyles();
    const grpcClient = useGrpcClient();
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);
    const showSnackBar = useSnackBarContext();

    const [loading, setLoading] = useState(false);
    const [buyIn, setBuyIn] = useState(Buyins[0].value);
    const [timer, setTimer] = useState(Timers[0].value);
    const [gameType, setGameType] = useState(GameTypes[0].value);
    const [tableType, setTableType] = useState(TableTypes[0].filter_value);
    const [entryFee, setEntryFee] = useState(EntryFee[0].value)


    const [selectAll, setSelectAll] = useState(false);
    const [selectedCount, setSelectedCount] = useState(0);
    const [state, setState] = React.useState({});
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [actionBtnLoading, setActionBtnLoading] = useState(false);

    const handleClose = () => {
        setShowConfirmation(false);
    };

    const cancelSelectedTournaments = () => {
        setActionBtnLoading(true);
        setShowConfirmation(false);
        let selectedTournaments = Object.entries(state).map((index) => {
            return index[1].id
        }).filter(n => n);
        setSelectAll(false);
        setState({});
        setSelectedCount(0)
        grpcClient.cancelTournaments(selectedTournaments, onSuccess, (errMsg) => errMsg && showSnackBar(errMsg))
    }

    const onSuccess = () => {
        getActiveTournaments();
        setActionBtnLoading(false);
    }

    const onCancelSelected = () => {
        if (selectedCount > 0) {
            setShowConfirmation(true);
        } else {
            showSnackBar("Please select at least one tournament!", "warning");
        }
    }

    const handleChange = (event) => {
        setSelectAll(false)
        if (event.target.checked) {
            setState({
                ...state,
                [event.target.name]: {
                    checked: event.target.checked,
                    id: event.target.value,
                },
            });
            setSelectedCount(prev => prev + 1)

        } else {
            setState({
                ...state,
                [event.target.name]: { checked: event.target.checked, id: null },
            });
            setSelectedCount(prev => prev - 1)
        }
    };

    const handleSelectAll = (event) => {
        if (event.target.checked) {
            setSelectAll(true);
            setSelectedCount(tournaments.length)
            setState(tournaments.map((tournament, index) => ({
                checked: true,
                id: tournament.tournament_instance_id
            })));
        } else {
            setSelectAll(false);
            setState({});
            setSelectedCount(0)
        }
    }

    const [tournaments, setTournaments] = useState([]);

    useEffect(() => {
        getActiveTournaments();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const onGetTournamentSuccess = (response) => {
        setLoading(false);

        let parsedResponse = JSON.parse(response.getResult());
        setTournaments(parsedResponse.payload);
        setCount(parsedResponse.pagination_data.number_of_pages);
    }

    const onGetTournamentFailure = (error) => {
        setLoading(false);
        if (error) {
            showSnackBar(error);
        }
    }

    const getActiveTournaments = useCallback(() => {
        setLoading(true);
        grpcClient.getTournamentsAdmin(
            {
                gameType: [gameType],
                status: ["running", "registering"],
                tableType: [tableType],
                buyinLow: [buyIn["buyin_low"]],
                buyinHigh: [buyIn["buyin_high"]],
                timerLow: [timer["timer_low"]],
                timerHigh: [timer["timer_high"]],
                entryFeeLow: [entryFee["entry_fee_low"]],
                entryFeeHigh: [entryFee["entry_fee_high"]],
                pagination_current_page: page,
                pagination_items_per_page: 10
            },
            onGetTournamentSuccess,
            onGetTournamentFailure, false, true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [grpcClient, tableType, buyIn, timer, gameType, page, entryFee]);


    const refreshTournaments = () => {
        getActiveTournaments();
    }

    // On Pagination Changed
    const handlePaginationChange = (event, value) => {
        setPage(value);
        setState({});
        setSelectAll(false);
    }


    const changeUsing = (valueSetter, validator = (value) => { }) => (event) => {
        const { type, checked } = event.target;
        if (type === "checkbox") {
            valueSetter(checked);
        }
        else {
            let value = event.target.value;
            if (typeof value === "string") value = value.trim();
            valueSetter(value);
            validator(value);
            getActiveTournaments();
        }
    };

    useEffect(() => {
        getActiveTournaments();
    }, [getActiveTournaments]);

    return (
        <Container component="main" maxWidth="lg" align="center" className={classes.root}>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Typographyx variant="h6" color="textSecondary" pt={3}>
                        Cancel Tournaments
                    </Typographyx>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={1}>
                        <Grid item xs={6} sm={2}>
                            <StyledFilterSelect id="gameType" label="Game Type" value={gameType} onChange={changeUsing(setGameType)} my={1.5}>
                                {
                                    GameTypes.map((type, index) => (
                                        <StyledMenuItem value={type.value} key={index}>
                                            {type.label}
                                        </StyledMenuItem>
                                    ))
                                }
                            </StyledFilterSelect>
                        </Grid>
                        <Grid item xs={6} sm={2}>
                            <StyledFilterSelect id="buyIn" label="Buy-In" value={buyIn} onChange={changeUsing(setBuyIn)} my={1.5}>
                                {
                                    Buyins.map((type, index) => (
                                        <StyledMenuItem value={type.value} key={index}>
                                            {type.label}
                                        </StyledMenuItem>
                                    ))
                                }
                            </StyledFilterSelect>
                        </Grid>
                        <Grid item xs={6} sm={2}>
                            <StyledFilterSelect id="speed" label="Speed" value={timer} onChange={changeUsing(setTimer)} my={1.5}>
                                {
                                    Timers.map((type, index) => (
                                        <StyledMenuItem value={type.value} key={index}>
                                            {type.label}
                                        </StyledMenuItem>
                                    ))
                                }
                            </StyledFilterSelect>
                        </Grid>
                        <Grid item xs={6} sm={2}>
                            <StyledFilterSelect id="tableType" label="Limit" value={tableType} onChange={changeUsing(setTableType)} my={1.5} >
                                {
                                    TableTypes.map((type, index) => (
                                        <StyledMenuItem value={type.filter_value} key={index}>
                                            {type.label}
                                        </StyledMenuItem>
                                    ))
                                }
                            </StyledFilterSelect>
                        </Grid>
                        <Grid item xs={6} sm={2}>
                            <StyledFilterSelect
                                id="entry_fee"
                                label="Entry-Fee"
                                value={entryFee}
                                onChange={changeUsing(setEntryFee)}
                                my={1.5}
                            >
                                {EntryFee.map((type, index) => (
                                    <StyledMenuItem dense value={type.value} key={index}>
                                        {type.label}
                                    </StyledMenuItem>
                                ))}
                            </StyledFilterSelect>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12}>
                    <PaperTable>
                        <TableContainer component={classes.paper}>
                            <Table size="small">
                                <TableHead>
                                    <StyledTableRow>
                                        <StyledTableCell>
                                            <FormGroup>
                                                <FormControlLabel
                                                    control={<Checkbox value={"selectAll"} checked={selectAll} onChange={handleSelectAll} name={"selectALL"} color="default" />}
                                                    label={<Typographyx variant="caption" color="textSecondary">All</Typographyx>}
                                                />
                                            </FormGroup>
                                        </StyledTableCell>
                                        <StyledTableCell align="center">Name</StyledTableCell>
                                        <StyledTableCell align="center">Game status </StyledTableCell>
                                        <StyledTableCell align="center">ID</StyledTableCell>
                                        <StyledTableCell align="center">Available Seat</StyledTableCell>
                                        <StyledTableCell align="center">Table Timer</StyledTableCell>
                                        <StyledTableCell align="center">Table Type</StyledTableCell>
                                        <StyledTableCell align="center">Game Type</StyledTableCell>
                                        <StyledTableCell align="center">Flash Mode</StyledTableCell>
                                        <StyledTableCell align="center">Additional Payout</StyledTableCell>
                                        <StyledTableCell align="center">Single Hand</StyledTableCell>
                                        <StyledTableCell align="center" style={{ whiteSpace: "nowrap" }}>
                                            <Buttonx variant="outlined" fullWidth bgcolor="secondary.main" onClick={onCancelSelected} disabled={actionBtnLoading} endIcon={actionBtnLoading ? <Loading size={20} /> : null}>
                                                Cancel ({selectedCount})
                                            </Buttonx>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                </TableHead>
                                <TableBody style={styles.card_content}>
                                    {
                                        tournaments &&
                                        Object.keys(tournaments).map((index) => (
                                            <CancelTournamentRow key={index} tournament={tournaments[index]} refreshTournaments={refreshTournaments} index={index} checked={state[index]?.checked || selectAll} onCheckboxChange={handleChange} />
                                        ))
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                        {loading && <Loading pb={5} />}
                        {
                            tournaments && tournaments.length === 0 ? (
                                <Typographyx variant="subtitle2" pb={5} pt={3}>
                                    No active tournaments found.
                                </Typographyx>
                            ) : (
                                <Box m={2}>
                                    <Pagination count={count} variant="outlined" shape="rounded" page={page} onChange={handlePaginationChange} />
                                </Box>
                            )
                        }

                    </PaperTable>
                </Grid>
            </Grid>
            <Dialog open={showConfirmation} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title" style={{ color: "#fff" }}>
                    <Typographyx variant="h6" style={{ color: "#fff", textTransform: "inherit" }} >
                        Confirm
                    </Typographyx>

                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you wanna cancel the selected {selectedCount} tournaments?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        No
                    </Button>
                    <Button onClick={cancelSelectedTournaments} color="primary" autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    )
};

export default CancelTournament;