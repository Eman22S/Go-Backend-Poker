import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Buttonx from './Buttonx';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Loading from "./Loading";
import TournamentDetails from "../TournamentDetails";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import CloseIcon from '@material-ui/icons/Close';
import { game_type_labels, table_type_labels } from "../utils/constants";
import useGrpcClient from "../../contexts/grpc_client";
import { useStore } from "../../contexts/store";
import { useSnackBarContext } from "../../contexts/snackbar";
import Typographyx from './Typographyx';
import Yes from '@material-ui/icons/CheckCircle';
import No from '@material-ui/icons/Cancel';
import Active from '@material-ui/icons/PersonPin';
import Add from '@material-ui/icons/AddCircle';
import green from '@material-ui/core/colors/green';
import { format_currency } from '../../utils/number_utils';

import  Icon  from '@material-ui/core/Icon';



const useStyles = makeStyles((theme) => ({
    cardHeader: {
        backgroundColor: theme.palette.background.dark,
        color: theme.palette.common.white,
    },
    avatar: {
        backgroundColor: theme.palette.background.light,
        color: theme.palette.common.white
    },
    alignItems: {
        display: 'flex',
        alignItems: 'center'
    },
    background: {
        backgroundColor: theme.palette.background.default,
    },
    lobbyCardRow : {
        display:"flex",
        justifyContent:"space-between",
        padding:"10px 20px"
    },
    lobbyCardRowPadding : {
        display:"flex",
        justifyContent:"space-between",
        padding:"10px 40px"
    },
    lobbyCardBtnContainer: {
        display:"flex",
        direction:'row',
        border:"solid 2px red"
    },
    centerRow: {
        display:"flex",
        justifyContent:"center",
        alignItems:"center",

        "& .fa":{
            marginRight:"10px",
        }
    },
    lobbyCardBtn:{
        width:"100%", 
        marginBottom:"15px",
        borderRadius:"20px",
        border:"2px solid #ffd06a",
        display:"inline-block",
        padding:"5px 0",
        transition:"all .3s",
        transform:"translateY(0)",
        "&:hover": {
            transform:"translateY(-4px)"
          },
          "&:active":{
              transform:"translateY(-2px)"
          }
    }
}));

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        // padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

export default function TournamentLobbyCard({ tournament, ...props }) {
    const classes = useStyles();
    const history = useHistory();
    const grpc_client = useGrpcClient();
    const [, updateStore] = useStore();

    const showSnackBar = useSnackBarContext();

    const [alreadyRegistered, setAlreadyRegistered] = useState(
        tournament?.already_registered
    );
    const [addonsLeft, setAddonsLeft] = useState(0);

    // since useState doesnot update its initial state when prop changes, use useEffect
    useEffect(() => {
        setAlreadyRegistered(tournament?.already_registered);
        setAddonsLeft(tournament?.addons_permitted)
    }, [tournament, setAlreadyRegistered, setAddonsLeft]);

    const [joinBtnLoading, setJoinBtnLoading] = useState(false);
    const [unregisterBtnLoading, setUnregisterBtnLoading] = useState(false);
    const [currentTournament, setCurrentTournament] = useState(null);
    const [open, setOpen] = useState(false);
    const [detailsOpen, setDetailsOpen] = useState(false);

    const onJoinTournament = (tournament) => {
        return (event) => {
            event.stopPropagation();
            setCurrentTournament(tournament)
            setOpen(true);
        }
    };

    const onConfirm = (e) => {
        join_tournament(currentTournament)(e);
        setOpen(false);
    };

    const onCancel = (e) => {
        setCurrentTournament(null)
        setAddonsLeft(tournament?.addons_permitted)
        setOpen(false);
    };

    const onDetailsClose = (e) => {
        setCurrentTournament(null)
        setAddonsLeft(tournament?.addons_permitted)
        setDetailsOpen(false);
    };

    const onDetailsOpen = (tournament) => {
        return (event) => {
            event.stopPropagation();
            setCurrentTournament(tournament)
            setAddonsLeft(tournament?.addons_permitted)
            setDetailsOpen(true);
        }
    }

    const on_join_response = function (joinResponse) {
        setJoinBtnLoading(false);
        setAddonsLeft(tournament?.addons_permitted);
        if (joinResponse.was_subscribed) {
            let tableStateResponse = {
                game_meta: {
                    tournament_instance_id: joinResponse.tournament_instance_id,
                    table_instance_id: joinResponse.table_instance_id,
                },
            };
            updateStore("startingTableState", () => tableStateResponse);
            if (props.newTab) {
                const win = window.open(`/gameplay/${joinResponse.tournament_instance_id}`, 'gameplay_' + joinResponse.tournament_instance_id);
                if (win) {
                    win.focus();
                }
            } else {
                history.push(`/gameplay/${joinResponse.tournament_instance_id}`);
            }
        } else {
            if (joinResponse.error_msgs) {
                for (let err of joinResponse.error_msgs) {
                    showSnackBar(window._(err), "error");
                    console.warn("Subscribe tournament error: ", err);
                }
            }
        }
    };

    function on_join_error(custom_msg) {
        setJoinBtnLoading(false);

        if (custom_msg) {
            showSnackBar(custom_msg);
        }
    }

    function join_tournament(tournament) {
        return (event) => {
            event.stopPropagation()
            let tournament_instance_id = tournament?.tournament_instance_id;
            let addons = tournament?.addons_permitted - addonsLeft;
            setJoinBtnLoading(true);

            grpc_client.joinTournament(
                tournament_instance_id,
                addons,
                on_join_response,
                on_join_error
            );
        };
    }

    const on_unregister_response = function (unregisterResponse) {
        setUnregisterBtnLoading(false);

        if (unregisterResponse.was_unsubscribed) {
            // change tournament fields that should be changed because of unregistering
            tournament.seats_occupied -= 1;
            // set as tournament is not registered(weirdly the field expects a string of "0")
            tournament.already_registered = "0";
            props.updateTournament(tournament)
            // this state should be set last to reload UI with the above changes
            setAlreadyRegistered("0");
        } else {
            if (unregisterResponse.error_msgs) {
                for (let err of unregisterResponse.error_msgs) {
                    showSnackBar(window._(err), "error");
                    console.warn("Unubscribe tournament error: ", err);
                }
            }
        }
    };

    function on_unregister_error(custom_msg) {
        setUnregisterBtnLoading(false);

        if (custom_msg) {
            showSnackBar(custom_msg);
        }
    }

    function unregister_tournament(tournament) {
        return (event) => {
            event.stopPropagation();
            let tournament_instance_id = tournament?.tournament_instance_id;
            setUnregisterBtnLoading(true);

            grpc_client.unregisterTournament(
                tournament_instance_id,
                on_unregister_response,
                on_unregister_error
            );
        };
    }

    return (
        <React.Fragment>
            <Card className={classes.root}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="tournament-id" className={classes.avatar}>
                            {(tournament && tournament.id) || ""}
                        </Avatar>
                    }
                    title={
                        <div className={classes.alignItems}>
                            {tournament?.name}
                            &nbsp;{" "} {alreadyRegistered === "1" && <Active fontSize="small" style={{color:green[500]}} />} 
                        </div>
                    }
                    subheader={
                        <div className={classes.alignItems}>
                            {tournament ? `Game Type: ${game_type_labels[tournament?.game_type] || ""}` : ''}
                        </div>
                    }
                    className={classes.cardHeader}
                />
                <Container align="start">
                    <CardContent>
                        <div className={classes.lobbyCardRow}>
                            <Typographyx variant="subtitle2" className={classes.centerRow}  color="textSecondary" display="inline">
                                <Icon className="fa" color="primary">attach_money</Icon>
                                {"Buyin: "}
                            </Typographyx>
                            <Typographyx variant="subtitle1" color="textSecondary" display="inline">
                                {tournament?.buyin}
                            </Typographyx>
                        </div>
                        <Divider />
                        <div className={classes.lobbyCardRow}>
                            <Typographyx variant="subtitle2"  className={classes.centerRow}  color="textSecondary" display="inline">
                                <Icon className="fa" color="primary">bookmark_border</Icon>
                                {"Rake: "}
                            </Typographyx>
                            <Typographyx variant="subtitle1" color="textSecondary" display="inline">
                                {tournament?.rake}
                            </Typographyx>
                        </div>
                        <Divider />
                        <div className={classes.lobbyCardRow}>
                            <Typographyx variant="subtitle2" className={classes.centerRow}  color="textSecondary" display="inline">
                                <Icon className="fa" color="primary">leaderboards</Icon>
                                {"Starting Chips: "}
                            </Typographyx>
                            <Typographyx variant="subtitle1" color="textSecondary" display="inline">
                                {tournament?.buyin_chips}
                            </Typographyx>
                        </div>
                        <Divider />
                        <div className={classes.lobbyCardRow}>
                            <Typographyx variant="subtitle2" className={classes.centerRow}  color="textSecondary" display="inline">
                                <Icon className="fa" color="primary">table_chart</Icon>
                                {"Table Type: "}
                            </Typographyx>
                            <Typographyx variant="subtitle1" color="textSecondary" display="inline">
                                {table_type_labels[tournament?.table_type]}
                            </Typographyx>
                        </div>

                        <Divider />
                        <div className={classes.lobbyCardRow}>
                            <Typographyx variant="subtitle2" className={classes.centerRow}  color="textSecondary" display="inline" pr={1}>
                                <Icon className="fa" color="primary">account_balance_wallet</Icon>
                                {"Is For Money: "}
                            </Typographyx>
                            {tournament?.is_for_money === '1' ? <Yes style={{ color: green[500] }} fontSize="small"/> : tournament ? <No color="error" fontSize="small"/> : ""}
                        </div>
                        <Divider />
                    </CardContent>
                </Container>
                <CardActions>
                        {tournament ? 
                        <Container align="right">
                            <Buttonx
                                className={classes.lobbyCardBtn}
                                variant="outlined"
                                onClick={onDetailsOpen(tournament)}
                                disabled={joinBtnLoading}
                                m={0.25}
                            >
                                Details
                            </Buttonx>
                            {alreadyRegistered === "1" ? (
                                tournament?.status?.toLowerCase() === "pending" || tournament?.status?.toLowerCase() === "registering"  ? (
                                    <React.Fragment>
                                        <Buttonx
                                            className={classes.lobbyCardBtn}
                                            variant="outlined"
                                            bgcolor="secondary.main"
                                            onClick={unregister_tournament(tournament)}
                                            disabled={unregisterBtnLoading}
                                            endIcon={unregisterBtnLoading ? <Loading size={10} /> : null}
                                            m={0.25}
                                        >
                                            Leave
                                        </Buttonx>
                                        <Buttonx
                                            className={classes.lobbyCardBtn}
                                            variant="outlined"
                                            bgcolor="success.dark"
                                            onClick={join_tournament(tournament)}
                                            disabled={joinBtnLoading}
                                            endIcon={joinBtnLoading ? <Loading size={10} /> : null}
                                            m={0.25}
                                        >
                                            Rejoin
                                        </Buttonx>
                                    </React.Fragment>
                                ) : (tournament?.status?.toLowerCase() !== "finished" ?
                                        <Buttonx
                                            className={classes.lobbyCardBtn}
                                            variant="outlined"
                                            bgcolor="success.dark"
                                            onClick={join_tournament(tournament)}
                                            disabled={joinBtnLoading}
                                            endIcon={joinBtnLoading ? <Loading size={10} /> : null}
                                            m={0.25}
                                        >
                                            Rejoin
                                        </Buttonx> : <></>
                                    )
                            ) : (
                                tournament?.status?.toLowerCase() !== "finished" ?  <Buttonx
                                        className={classes.lobbyCardBtn}
                                        variant="outlined"
                                        onClick={onJoinTournament(tournament)}
                                        disabled={joinBtnLoading}
                                        endIcon={joinBtnLoading ? <Loading size={10} /> : null}
                                        m={0.25}
                                    >
                                        Join
                                    </Buttonx>
                                :<></>)}
                        </Container>
                            : ""}
                </CardActions>
            </Card>
            {currentTournament && (
                <Dialog onClose={onCancel} fullWidth={true} maxWidth="sm" style={{width: 450, margin:"0 auto"}} aria-labelledby="customized-dialog-title" open={open}>
                    <DialogTitle id="customized-dialog-title" style={{textAlign:"center"}} onClose={onCancel}>
                        {currentTournament?.name} Details
                    </DialogTitle>
                    <Divider />

                    <div>
                        <Typography  className={classes.lobbyCardRowPadding} gutterBottom>
                            <span>Buyin:</span> {Number(currentTournament?.addons_permitted || '0') ? format_currency(Number(currentTournament?.buyin) + ((Number(currentTournament?.addons_permitted || '0') - addonsLeft) * Number(currentTournament?.buyin))) : `$${currentTournament?.buyin}`}
                            {(currentTournament?.status?.toLowerCase() === "pending" || currentTournament?.status?.toLowerCase() === "registering" ) &&(currentTournament?.is_single_hand  === '1' || currentTournament?.is_turbo_mode  === '1') && Number(currentTournament?.addons_permitted || '0') &&
                                <Button onClick={()=>{setAddonsLeft( prev => prev && prev - 1)}} style={{float:'right'}} color='primary' startIcon={<Add />}>
                                    Addon ({addonsLeft} left)
                                </Button>}
                        </Typography>
                    </div>
                    <Divider />
                    <div>
                        <Typography  className={classes.lobbyCardRowPadding} gutterBottom>
                            <span>Rake:</span> ${currentTournament?.rake} ({Math.round((Number(currentTournament?.rake) / Number(currentTournament?.buyin)) * 10000) / 100}%)
                        </Typography>
                    </div>
                    <Divider />
                    <div>
                        <Typography className={classes.lobbyCardRowPadding} gutterBottom>
                            <span>Chips: </span>{currentTournament?.buyin_chips}
                        </Typography>
                    </div>
                    <Divider />
                    <div>
                        <Typography className={classes.lobbyCardRowPadding} gutterBottom>
                            <span>Is for Money?</span> {currentTournament?.is_for_money === '1' ? "Yes" : "No"}
                        </Typography>
                    </div>
                    <Divider />
                    <DialogActions>
                        <Button autoFocus onClick={onCancel} color="primary">
                            Cancel
                        </Button>
                        <Button autoFocus onClick={onConfirm} color="primary">
                            Confirm
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
            <Dialog onClose={onDetailsClose} fullWidth={true} maxWidth="lg" aria-labelledby="customized-dialog-title" open={detailsOpen}>
                <DialogTitle id="customized-dialog-title" onClose={onDetailsClose} className={classes.background}>
                    {currentTournament?.name}
                </DialogTitle>
                <DialogContent className={classes.background}>
                    <TournamentDetails id={currentTournament?.tournament_instance_id} />
                </DialogContent>
                <DialogActions className={classes.background}>
                    <Button autoFocus onClick={onDetailsClose} color="primary">
                        Close
              </Button>
                    <Button autoFocus onClick={onConfirm} color="primary">
                        Join
              </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
