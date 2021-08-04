import React, { useState, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Buttonx from './Buttonx';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Container from '@material-ui/core/Container';
import Loading from "./Loading";
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import CloseIcon from '@material-ui/icons/Close';
import { game_type_labels, table_type_labels } from "../utils/constants";
import useGrpcClient from "../../contexts/grpc_client";
import { useSnackBarContext } from "../../contexts/snackbar";
import Typographyx from './Typographyx';
import Yes from '@material-ui/icons/CheckCircle';
import No from '@material-ui/icons/Cancel';
import Add from '@material-ui/icons/AddCircle';
import green from '@material-ui/core/colors/green';
import { format_currency } from '../../utils/number_utils';
import TournamentTemplateDetail from "../TournamentTemplateDetail";
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
    },
    centerRow: {
        display:"flex",
        justifyContent:"center",
        alignItems:"center",

        "& .fa":{
            marginRight:"10px",
        }
    },
    lobbyCardRow : {
        display:"flex",
        justifyContent:"space-between",
        padding:"10px 20px"
    },
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

export default function TemplateLobbyCard({ tournamentTemplate, onJoinTournamnetTemplate, ...props }) {
    const classes = useStyles();
    const grpcClient = useGrpcClient();
    const showSnackBar = useSnackBarContext();
    const [actionBtnLoading, setActionBtnLoading] = useState(false);
    const [openTournamentTemplateDetail, setOpenTournamentTemplateDetail] = useState(false);

    const [addonsLeft, setAddonsLeft] = useState(0);
    const [currentTournament, setCurrentTournament] = useState(null);
    const [open, setOpen] = useState(false);

    // since useState doesnot update its initial state when prop changes, use useEffect
    useEffect(() => {
        setAddonsLeft(tournamentTemplate?.addons_permitted)
    }, [tournamentTemplate, setAddonsLeft]);


    // On Join tournamentTemplate Template
    const joinTournamentTemplate = () => {
        setActionBtnLoading(true);
        console.log("addOnAmount!"+(tournamentTemplate?.addons_permitted - addonsLeft))
        grpcClient.joinTournamentTempalte(
            tournamentTemplate.id,
            (tournamentTemplate?.addons_permitted - addonsLeft), 
            onJoinTournamentSuccess, 
            onJoinTournamentFailure
        );
    }
    
    /**
     * Open tournamentTemplate Detail Dialog 
     * @param {*} tournament_template_id 
     */
    const onTournamentDetailOpen = (tournament_template_id) => {
        setOpenTournamentTemplateDetail(true);
    }

    /**
     * Close tournamentTemplate detail Dialog
     */
    const onTournamentDetailClose = () => {
        setOpenTournamentTemplateDetail(false);
    }

    /**
     * On Join tournamentTemplate Success
     * @param {*} response 
     */
    const onJoinTournamentSuccess = (response) => {
        setActionBtnLoading(false);
        setOpen(false)
        setAddonsLeft(Number(currentTournament?.addons_permitted || '0') )
        if (response.error_msgs.length !== 0) {
            for (let err of response.error_msgs) {
                showSnackBar(window._(err), "error");
            }
        }
        else {
            onJoinTournamnetTemplate(response, tournamentTemplate);
        }
    }

    /**
     * On Join tournamentTemplate Failure
     * @param {*} error 
     */
    const onJoinTournamentFailure = (error) => {
        setActionBtnLoading(false);
        if (error) {
            showSnackBar(error);
        }
    }

    /**
     * Format tournamentTemplate Template name
     */
    const getTournamentTemplateGameType = () => {
        if (isFiveCardDrawTurboMode()) {
            return `${game_type_labels[tournamentTemplate.game_type]} Turbo Mode`;
        }
        else {
            return game_type_labels[tournamentTemplate.game_type];
        }
    }

    /**
     * Is Five Card Draw ()
     */
    const isFiveCardDrawTurboMode = () => {
        return tournamentTemplate.game_type === "five_card_draw" && tournamentTemplate.is_turbo_mode === "1";
    }

    const onJoinButonClicked = (tournament) => {
        return (event) => {
            event.stopPropagation();
            setCurrentTournament(tournament)
            setOpen(true);
        }
    };

    const onCancel = (e) => {
        setCurrentTournament(null)
        setAddonsLeft(tournamentTemplate?.addons_permitted)
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Card className={classes.root}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="tournamentTemplate-id" className={classes.avatar}>
                            {(tournamentTemplate && tournamentTemplate.id) || ""}
                        </Avatar>
                    }
                    title={
                        <div className={classes.alignItems}>
                            {tournamentTemplate?.name}
                        </div>
                    }
                    subheader={
                        <div className={classes.alignItems}>
                            {tournamentTemplate ? `Game Type: ${getTournamentTemplateGameType() || ""}` : ''}
                        </div>
                    }
                    className={classes.cardHeader}
                />
                <Container align="start">
                    <CardContent>
                        <div className={classes.lobbyCardRow}>
                            <Typographyx variant="subtitle2" color="textSecondary" display="inline" className={classes.centerRow}>
                                <Icon className="fa" color="primary">attach_money</Icon>
                                {"Buyin: "}
                            </Typographyx>
                            <Typographyx variant="subtitle1" color="textSecondary" display="inline">
                                {tournamentTemplate?.buyin}
                            </Typographyx>
                        </div>
                        <Divider />
                        <div className={classes.lobbyCardRow}>
                            <Typographyx variant="subtitle2" color="textSecondary" display="inline" className={classes.centerRow}>
                                <Icon className="fa" color="primary">bookmark_border</Icon>
                                {"Rake: "}
                            </Typographyx>
                            <Typographyx variant="subtitle1" color="textSecondary" display="inline">
                                {tournamentTemplate?.rake}
                            </Typographyx>
                        </div>
                        <Divider />
                        <div className={classes.lobbyCardRow}>
                            <Typographyx variant="subtitle2" color="textSecondary" display="inline" className={classes.centerRow}>
                            <   Icon className="fa" color="primary">leaderboards</Icon>
                                {"Starting Chips: "}
                            </Typographyx>
                            <Typographyx variant="subtitle1" color="textSecondary" display="inline">
                                {tournamentTemplate?.buyin_chips}
                            </Typographyx>
                        </div>
                        <Divider />
                        <div className={classes.lobbyCardRow}>
                            <Typographyx variant="subtitle2" color="textSecondary" display="inline" className={classes.centerRow}> 
                            <   Icon className="fa" color="primary">table_chart</Icon>
                                {"Table Type: "}
                            </Typographyx>
                            <Typographyx variant="subtitle1" color="textSecondary" display="inline">
                                {table_type_labels[tournamentTemplate?.table_type]}
                            </Typographyx>
                        </div>
                        <Divider />
                        
                        <div className={classes.lobbyCardRow}>
                            <Typographyx variant="subtitle2" color="textSecondary" display="inline" pr={1} className={classes.centerRow}>
                                <Icon className="fa" color="primary">account_balance_wallet</Icon>
                                {"Is For Money: "}
                            </Typographyx>
                            {tournamentTemplate?.is_for_money === '1' ? <Yes style={{ color: green[500] }} fontSize="small"/> : tournamentTemplate ? <No color="error" fontSize="small"/> : ""}
                        </div>
                        <Divider />
                    </CardContent>
                </Container>
                <CardActions>
                    {tournamentTemplate ? <Container align="right">
                        <Buttonx className={classes.lobbyCardBtn} variant="outlined" onClick={() => onTournamentDetailOpen(tournamentTemplate.id)} >
                            Detail
                        </Buttonx>
                        {" "}
                        <Buttonx className={classes.lobbyCardBtn} variant="outlined" onClick={onJoinButonClicked(tournamentTemplate)}>
                            Join
                        </Buttonx>
                    </Container>
                        : ""}</CardActions>
            </Card>

            {currentTournament && (
                <Dialog onClose={onCancel} fullWidth={true} maxWidth="sm" aria-labelledby="customized-dialog-title" open={open}>
                    <DialogTitle id="customized-dialog-title" onClose={onCancel}>
                        {currentTournament?.name} Details
                    </DialogTitle>
                    <DialogContent dividers>
                        <Typography gutterBottom>
                            Buyin: {Number(currentTournament?.addons_permitted || '0') ? format_currency(Number(currentTournament?.buyin) + ((Number(currentTournament?.addons_permitted || '0') - addonsLeft) * Number(currentTournament?.buyin))) : `$${currentTournament?.buyin}`}
                            {(currentTournament?.is_single_hand  === '1' || currentTournament?.is_turbo_mode  === '1') && Number(currentTournament?.addons_permitted || '0') &&
                                <Button onClick={()=>{setAddonsLeft( prev => prev && prev - 1)}} style={{float:'right'}} color='primary' startIcon={<Add />}>
                                    Addon ({addonsLeft} left)
                                </Button>}
                        </Typography>
                    </DialogContent>
                    <DialogContent dividers>
                        <Typography gutterBottom>
                            Rake: ${currentTournament?.rake} ({Math.round((Number(currentTournament?.rake) / Number(currentTournament?.buyin)) * 10000) / 100}%)
                        </Typography>
                    </DialogContent>
                    <DialogContent dividers>
                        <Typography gutterBottom>
                            Chips: {Number(currentTournament?.addons_permitted || '0') ? format_currency(Number(currentTournament?.buyin_chips) + ((Number(currentTournament?.addons_permitted || '0') - addonsLeft) * Number(currentTournament?.addon_chips || '0'))).replace('$', '') : `$${currentTournament?.buyin_chips}`}
                        </Typography>
                    </DialogContent>
                    <DialogContent dividers>
                        <Typography gutterBottom>
                            Is for Money? {currentTournament?.is_for_money === '1' ? "Yes" : "No"}
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={onCancel} color="primary">
                            Cancel
                        </Button>
                        <Button autoFocus onClick={() => joinTournamentTemplate(tournamentTemplate.id)} endIcon={actionBtnLoading ? <Loading size={12} /> : null} color="primary">
                            Confirm
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
            <Dialog open={openTournamentTemplateDetail} onClose={onTournamentDetailClose} fullWidth={true} maxWidth="lg" aria-labelledby="customized-dialog-title">
                <DialogTitle id="customized-dialog-title" onClose={onTournamentDetailClose} className={classes.background}>
                    { tournamentTemplate?.name }
                </DialogTitle>
                <DialogContent dividers className={classes.background}>
                    <TournamentTemplateDetail id={tournamentTemplate?.id} />
                </DialogContent>
                <DialogActions className={classes.background}>
                    <Button autoFocus onClick={onTournamentDetailClose} color="secondary">
                        Close
                    </Button>
                    <Button autoFocus onClick={() => joinTournamentTemplate(tournamentTemplate.id)} color="primary" endIcon={actionBtnLoading ? <Loading size={20} /> : null} >
                        Join
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
