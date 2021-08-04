import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import Dialog from "@material-ui/core/Dialog";
import Button from '@material-ui/core/Button';
import TableHead from "@material-ui/core/TableHead";
import Container from "@material-ui/core/Container";
import TableBody from "@material-ui/core/TableBody";
import Pagination from '@material-ui/lab/Pagination';
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from "@material-ui/core/DialogContent";
import React, { useEffect, useState, useCallback } from 'react';

import { useStore } from "../../contexts/store";
import useGrpcClient from '../../contexts/grpc_client';
import Loading from '../../components/fragments/Loading';
import { useSnackBarContext } from '../../contexts/snackbar';
import TableContainer from "@material-ui/core/TableContainer";
import PaperTable from '../../components/fragments/PaperTable';
import Typographyx from "../../components/fragments/Typographyx";
import { tournament_template_buffer_status, join_any_limit, game_type_labels, game_mode_labels } from '../../components/utils/constants';
import { GameTypes, Buyins, Timers, TableTypes , EntryFee} from "../../helpers/Filter.helpers";
import TournamentTemplateLobbyRow from "../../components/fragments/TournamentTemplateLobbyRow";
//import { useStyles, styles } from './TournamentTemplateLobby.style';
import {  styles } from './TournamentTemplateLobby.style';
import { useHistory } from "react-router-dom";
import StyledTableCell from '../../components/fragments/StyledTableCell';
import StyledTableRow from '../../components/fragments/StyledTableRow';
import StyledMenuItem from '../../components/fragments/StyledMenuItem';
import StyledFilterSelect from '../../components/fragments/StyledFilterSelect';
import Buttonx from '../../components/fragments/Buttonx';
import TextFieldx from '../../components/fragments/TextFieldx';
import TemplateLobbyCard from '../../components/fragments/TemplateLobbyCard';
import { makeStyles } from "@material-ui/core/styles";

import {
    join_any_status,
  } from "../../components/utils/constants";
 

const useStyles = makeStyles((theme) => ({
    default_background: {
    //   backgroundColor: theme.palette.background.paper,
      backgroundImage: `url(${theme.backgroundImg.image})`,
      backgroundRepeat:  theme.backgroundImg.repeat       
    },
    root: {
        minHeight: '100vh',
        // backgroundColor: theme.palette.background.default,
       },
}));

export const TournamentTemplateLobby = ({updateBalance, toggleJoinAny, ...props}) => {
    let pollingInterval = null;

    const history = useHistory();
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);
    const [, updateStore] = useStore();
    const [loading, setLoading] = useState(false);
    const [waiting, setWaiting] = useState(false);
    const [actionBtnLoading, setActionBtnLoading] = useState(false);
    const [tournamentTemplates, setTournamentTemplates] = useState([]);
    const [selectedTournamentTemplate, setSelectedTournamentTemplate] = useState([]);

    const [buyIn, setBuyIn] = useState(Buyins[0].value);
    const [timer, setTimer] = useState(Timers[0].value);
    const [gameType, setGameType] = useState(GameTypes[0].value);
    const [tableType, setTableType] = useState(TableTypes[0].filter_value);

    const [entryFee, setEntryFee] = useState(EntryFee[0].value);


    const [joinAnyLimit, setJoinAnyLimit] = useState(join_any_limit[0]);
    const [joinAnyStatus, setJoinAnyStatus] = useState(false);
    const [joinAnyTournamentsLeft, setJoinAnyTournamentsLeft] = useState(0);
    const [joinAnyTotalTournaments, setJoinAnyTotalTournaments] = useState(0);
    const [joinAnyGameMode, setJoinAnyGameMode] = useState('any');
    const [joinAnyGameType, setJoinAnyGameType] = useState('any');
    const [joinAnyLoading, setJoinAnyLoading] = useState(false);

    const [currentTemplate, setCurrentTemplate] = useState(null);

    const classes = useStyles();
    const grpcClient = useGrpcClient();
    const showSnackBar = useSnackBarContext();
    const [globalSettings, setGlobalSettings] = useState({});

    
        useEffect(()=>{
            const getGlobalSettings = () => {
                grpcClient.getGlobalSettings((resp) => {
                    setGlobalSettings(Object.assign({}, ...JSON.parse(resp)))
                }, onGetTournamentTemplateFailure);
            }
            getGlobalSettings();
        // eslint-disable-next-line react-hooks/exhaustive-deps
        },[])
    const onTemplateClick = (e, item) => {
        e.stopPropagation();
        setCurrentTemplate(item);
      } 
    
    // Fetch Tournament Templates
    const filterTournamentTemplates = useCallback(() => {
        setLoading(true);
        setTournamentTemplates([]);
        grpcClient.getLobbyTournamentTemplateList(
            {
                tableType: [tableType],
                gameType: [gameType],
                buyinLow: [buyIn["buyin_low"]],
                buyinHigh: [buyIn["buyin_high"]],
                timerLow: [timer["timer_low"]],
                timerHigh: [timer["timer_high"]],
                entryFeeLow: [entryFee["entry_fee_low"]],
                entryFeeHigh:[entryFee["entry_fee_high"]],
                pagination_current_page: page,
                pagination_items_per_page: 10
            },
            onGetTournamentTemplateSuccess, 
            onGetTournamentTemplateFailure
        );
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [grpcClient, tableType, buyIn, timer, gameType, page, entryFee]);

    // Filter Tournament Templates Success
    const onGetTournamentTemplateSuccess = (response) => {
        let parsedResponse = JSON.parse(response.getResult());
        setLoading(false);
        setTournamentTemplates(parsedResponse.payload);
        if(!currentTemplate) setCurrentTemplate(parsedResponse.payload && parsedResponse.payload.length && parsedResponse.payload[0])
        setCount(parsedResponse.pagination_data.number_of_pages);
    };

    // Filter Tournament Templates Failure
    const onGetTournamentTemplateFailure = (error) => {
        setLoading(false);
        if (error) {
            showSnackBar(error);
        }
    };

    // On Join Tournament Template Success
    const onJoinTournamnetTemplate = (response, tournament_template) => {
        setWaiting(true);
        setSelectedTournamentTemplate(tournament_template);
        console.log("#########!!")
        console.log(tournament_template)
        console.log(response)
        updateBalance();
        pollingInterval = setInterval(() => {
            grpcClient.getTournamentTemplateBufferState(
                tournament_template.id, 
                onGetTournamentTemplateBufferStateSuccess,
                onTournamentTemplateBufferStateFailure
            )
        }, 2000);
    }

    // On Get Tournament Template Buffer State Success
    const onGetTournamentTemplateBufferStateSuccess = (response) => {
        
        if (response?.buffer_state) {
            if (response?.buffer_state?.status === tournament_template_buffer_status.tournament_created) {
                console.log("*************")
                console.log(response)
                updateStore("addons_amount", () => response?.buffer_state?.addons_amount);
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
        setWaiting(false);
        let tableStateResponse = {
            game_meta: {
                table_instance_id: table_instance_id,
                tournament_instance_id: tournament_instance_id,
            }
        };
        updateStore("startingTableState", () => tableStateResponse);
        console.log(globalSettings);
        console.log(currentTemplate)
        if(globalSettings.use_alternate_ui && currentTemplate?.game_type === 'five_card_draw'){
            history.push("/gameplay_alt");

        }else{
            history.push("/gameplay");
        }
    }

    // On Pagination Changed
    const handlePaginationChange = (event, value) => {
        setPage(value);
    }

    // On Get Tournament Template Buffer State Failure
    const onTournamentTemplateBufferStateFailure = (error) => {
        setWaiting(false);
        if (error) {
            showSnackBar(error);
        }
    };

    const changeUsing = (valueSetter, validator = (value) => {}) => (event) => {
        const { type, checked } = event.target;
        if (type === "checkbox") {
            valueSetter(checked);
        } 
        else {
            let value = event.target.value;
            if (typeof value === "string") value = value.trim();
            valueSetter(value);
            validator(value);
            filterTournamentTemplates();
        }
    };

    const handleUnsubscribeFromBuffer = () => {
        setActionBtnLoading(true);
        grpcClient.unsubscribeFromTournamentTemplateBuffer(
            selectedTournamentTemplate.id, 
            () => {
                setWaiting(false);
                setActionBtnLoading(false);
                clearInterval(pollingInterval);
                setSelectedTournamentTemplate(null);
            },
            (error) => {
                setActionBtnLoading(false);
                if (error) {
                    showSnackBar(error);
                }
            }
        )
    }

    useEffect(() => {
        filterTournamentTemplates();
    }, [filterTournamentTemplates]);

    const joinAnyTournaments = () => {
        setJoinAnyLoading(true)
        grpcClient.joinAnyTournament(joinAnyLimit, joinAnyGameType, joinAnyGameMode, (response) => {
          onJoinAnyTournament(response);
          toggleJoinAny(true);
          history.push("/active_tournaments");
        }, (custom_msg) => {
          setJoinAnyLoading(false);
          custom_msg && showSnackBar(custom_msg)
        });
      }

    const activeFiveTurbo = () => {
        history.push("/active_five_turbo_tournaments")
    }
    
      const onJoinAnyTournament = (response) => {
        grpcClient.getJoinAnyTournamentStatus(
          (response) => {
            updateBalance();
            setJoinAnyLoading(false);
            setJoinAnyStatus(response.getActive());
            setJoinAnyTournamentsLeft(response.getTournamentsLeft());
            setJoinAnyTotalTournaments(response.getTotalTournaments());
          },
          showSnackBar
        );
      }
    
      const unregisterJoinAnyTournaments = () => {
        setJoinAnyLoading(true)
        grpcClient.unregisterAnyTournament((req) => {
            onJoinAnyTournament(req);
            toggleJoinAny(false);
        }, (custom_msg) => {
          setJoinAnyLoading(false);
          custom_msg && showSnackBar(custom_msg)
        });
      }
      const getJoinAnyTournamentStatus = useCallback(
        function() {
            grpcClient.getJoinAnyTournamentStatus(
            (response) => {
                console.log(response);
              if(response.getActive()){
                  setJoinAnyStatus(true);
                  toggleJoinAny(true);
              } else {
                setJoinAnyStatus(false);
                toggleJoinAny(false);
              }
              setJoinAnyTournamentsLeft(response.getTournamentsLeft());
              setJoinAnyTotalTournaments(response.getTotalTournaments());
              setJoinAnyGameType(response.getJoinAnyGameType());
              setJoinAnyGameMode(response.getJoinAnyGameMode());
              let status = response.getJoinAnyStatus()
              if(status === join_any_status.DEACTIVATE){
                showSnackBar(response.getJoinAnyStatusMessage());
              }
            },
            showSnackBar
          )
        },
        [grpcClient, showSnackBar, toggleJoinAny]
    )

      useEffect(() => {
        getJoinAnyTournamentStatus();
      }, [getJoinAnyTournamentStatus]);    

    return (
        <div className={classes.default_background}>
            <Container maxWidth="xl" align="center" className={classes.root}>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Typographyx variant="h6" color="textSecondary" pt={3}>
                            Template Lobby
                        </Typographyx>
                    </Grid>
                    <Grid item xs={8}>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                            <Grid container spacing={1}>
                                <Grid item xs={12}>
                                {joinAnyStatus?
                                    <React.Fragment>
                                    <Container component="main" maxWidth="lg" align="start">
                                        <Typographyx variant="subtitle1" color="textSecondary" pb={2} px={1}>
                                        <b>Join Any</b> Activated. {joinAnyTournamentsLeft}/{joinAnyTotalTournaments} tournaments left.
                                        </Typographyx>
                                    </Container>
                                    <Container component="main" maxWidth="lg" align="start">
                                    <TextFieldx
                                            id="join_any_game_type_disabled"
                                            select
                                            size="small"
                                            label="Game Type"
                                            value={joinAnyGameType}
                                            onChange={(e) => (setJoinAnyGameType(e.target.value))}
                                            variant="outlined"
                                            margin="normal"
                                            style={{minWidth: "100px"}}
                                            disabled={true}
                                            m={1}
                                        >
                                        {Object.entries(game_type_labels).map( vals => (
                                                <StyledMenuItem dense value={vals[0]} key={vals[0]}>
                                                {vals[1]}
                                                </StyledMenuItem>
                                        ))}
                                        </TextFieldx>
                                        <TextFieldx
                                            id="join_any_game_mode_disabled"
                                            select
                                            size="small"
                                            label="Game Mode"
                                            value={joinAnyGameMode}
                                            onChange={(e) => (setJoinAnyGameMode(e.target.value))}
                                            variant="outlined"
                                            style={{minWidth: "100px"}}
                                            margin="normal"
                                            disabled={true}
                                            m={1}
                                        >
                                        {Object.entries(game_mode_labels).map( vals => (
                                                <StyledMenuItem dense value={vals[0]} key={vals[0]}>
                                                {vals[1]}
                                                </StyledMenuItem>
                                        ))}
                                        </TextFieldx>
                                        <Buttonx
                                        variant="outlined"
                                        bgcolor="secondary.main"
                                        onClick={() => unregisterJoinAnyTournaments()}
                                        endIcon={joinAnyLoading ? <Loading size={20} /> : null}
                                        m={1}
                                        p={1}
                                        >
                                            Deactivate
                                        </Buttonx>
                                    <Buttonx
                                        variant="outlined"
                                        bgcolor="primary.dark"
                                        onClick={() =>{
                                            history.push("/active_tournaments");
                                        }}
                                        m={1}
                                        p={1}
                                    >
                                        Active Tournaments
                                    </Buttonx>
                                    </Container>
                                    </React.Fragment>
                                    :
                                    <Container component="main" maxWidth="lg" align="start">
                                        <Buttonx
                                            variant="outlined"
                                            bgcolor="success.dark"
                                            onClick={() => joinAnyTournaments()}
                                            endIcon={joinAnyLoading ? <Loading size={20} /> : null}
                                            m={1}
                                            p={1}
                                        >
                                            Activate Join Any
                                        </Buttonx>
                                        <TextFieldx
                                            id="join_any_game_type"
                                            select
                                            size="small"
                                            label="Game Type"
                                            value={joinAnyGameType}
                                            onChange={(e) => (setJoinAnyGameType(e.target.value))}
                                            variant="outlined"
                                            margin="normal"
                                            style={{minWidth: "100px"}}
                                            m={1}
                                        >
                                        {Object.entries(game_type_labels).map( vals => (
                                                <StyledMenuItem dense value={vals[0]} key={vals[0]}>
                                                {vals[1]}
                                                </StyledMenuItem>
                                        ))}
                                        </TextFieldx>
                                        <TextFieldx
                                            id="join_any_game_mode"
                                            select
                                            size="small"
                                            label="Game Mode"
                                            value={joinAnyGameMode}
                                            onChange={(e) => (setJoinAnyGameMode(e.target.value))}
                                            variant="outlined"
                                            style={{minWidth: "100px"}}
                                            margin="normal"
                                            m={1}
                                        >
                                        {Object.entries(game_mode_labels).map( vals => (
                                                <StyledMenuItem dense value={vals[0]} key={vals[0]}>
                                                {vals[1]}
                                                </StyledMenuItem>
                                        ))}
                                        </TextFieldx>
                                        <TextFieldx
                                            id="join_any_limit"
                                            select
                                            size="small"
                                            label="Games"
                                            value={joinAnyLimit}
                                            onChange={(e) => (setJoinAnyLimit(e.target.value))}
                                            variant="outlined"
                                            margin="normal"
                                            m={1}
                                        >                                      
                                        {join_any_limit.map((amount, index) => (
                                            <StyledMenuItem dense value={amount} key={index}>
                                            {amount}
                                            </StyledMenuItem>
                                        ))}
                                        </TextFieldx>
                                        <Buttonx
                                            variant="outlined"
                                            bgcolor="primary.main"
                                            onClick={() => activeFiveTurbo()}
                                            m={1}
                                            p={1}
                                        >
                                            Active Five Turbo Tournaments
                                        </Buttonx>
                                    </Container> 
                                }
                                </Grid>
                            </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container spacing={2}>
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
                                        <StyledFilterSelect id="entryfee" label="Entry-fee" value={entryFee} onChange={changeUsing(setEntryFee)} my={1.5}>
                                            {
                                                EntryFee.map((type, index) => (
                                                    <StyledMenuItem value={type.value} key={index}>
                                                        {type.label}
                                                    </StyledMenuItem>
                                                ))
                                            }
                                        </StyledFilterSelect>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                            <PaperTable className={classes.root}>
                                <TableContainer className={classes.container}>
                                    <Table>
                                        <TableHead>
                                            <StyledTableRow>
                                                <StyledTableCell align="center">Name </StyledTableCell>
                                                <StyledTableCell align="center">Game Type</StyledTableCell>
                                                <StyledTableCell align="center">Table Type</StyledTableCell>
                                                <StyledTableCell align="center">Buyin</StyledTableCell>
                                                <StyledTableCell align="center">Buyin Chips</StyledTableCell>
                                                <StyledTableCell align="center">Flash Mode</StyledTableCell>
                                                <StyledTableCell align="center">Additional Payout</StyledTableCell>
                                                <StyledTableCell align="center">Single Hand</StyledTableCell>
                                            </StyledTableRow>
                                        </TableHead>
                                        <TableBody style={styles.card_content}>
                                            { loading && <Loading /> }
                                            {
                                                tournamentTemplates && tournamentTemplates.map((item, index) => (
                                                    <TournamentTemplateLobbyRow
                                                        key={index}
                                                        selected={currentTemplate?.id === item.id}
                                                        tournamentTemplate={item}
                                                        onClick={(e) => onTemplateClick(e, item)}
                                                        onJoinTournamnetTemplate={onJoinTournamnetTemplate}
                                                        endIcon={actionBtnLoading ? <Loading size={20} /> : null}>
                                                        
                                                    </TournamentTemplateLobbyRow>
                                                ))
                                            }
                                        </TableBody>
                                    </Table>
                                    {
                                        tournamentTemplates && tournamentTemplates.length === 0 ? (
                                            <Typographyx variant="subtitle2" pb={5} pt={3}>
                                                No tournament templates found.
                                            </Typographyx>
                                        ): (
                                            <Box m={2}>
                                                <Pagination count={count} variant="outlined" shape="rounded" page={page} onChange={handlePaginationChange} />
                                            </Box>
                                        )
                                    }
                                </TableContainer>
                            </PaperTable>
                        </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={4}>
                        <TemplateLobbyCard tournamentTemplate={currentTemplate} onJoinTournamnetTemplate={onJoinTournamnetTemplate}/>
                    </Grid>
                </Grid>
            </Container>
            <Dialog aria-labelledby="simple-dialog-title" open={waiting} PaperProps={{ style: { alignItems: "center" } }} >
                <DialogTitle id="simple-dialog-title" disableTypography={true}>
                    <Typographyx variant="h6" style={{ color: "#fff", textTransform: "inherit" }} >
                        Waiting for other players...
                    </Typographyx>
                </DialogTitle>
                <DialogContent>
                    <Box p={1}>
                        <Loading />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleUnsubscribeFromBuffer} color="primary" autoFocus>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};
