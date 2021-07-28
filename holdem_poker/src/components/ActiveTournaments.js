import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import Pagination from '@material-ui/lab/Pagination';


import useGrpcClient from "../contexts/grpc_client";
import { useSnackBarContext } from "../contexts/snackbar";
import PaperTable from "./fragments/PaperTable";
import Loading from "./fragments/Loading";
import Typographyx from "./fragments/Typographyx";
import TournamentRow from "./fragments/TournamentRow";
import Box from "@material-ui/core/Box";
import Buttonx from "./fragments/Buttonx";
import TextFieldx from "./fragments/TextFieldx";
import MenuItem from "@material-ui/core/MenuItem";
import { join_any_limit, join_any_status, game_type_labels, game_mode_labels } from "./utils/constants";
import StyledTableCell from './fragments/StyledTableCell';
import StyledTableRow from './fragments/StyledTableRow';
import TournamentLobbyCard from "./fragments/TournamentLobbyCard";
import usePersistedState from "../utils/use_persisted_state";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    minHeight: '100vh',
    backgroundImage: `url(${theme.backgroundImg.image})`,
    backgroundRepeat:  theme.backgroundImg.repeat   
  },
  page: {
    '& > *': {
      marginTop: theme.spacing(2),
      alignItems: "center",
    },
  },

  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  main: {
    paddingTop: theme.spacing(2),
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  card_header: {
    paddingBottom: 6,
    paddingInlineStart: 4,
  },
  background: {
    backgroundColor: theme.palette.background.paper,
  },
}));

const styles = {
  card_content: {
    paddingBottom: 1,
    paddingTop: 1,
  },
};


export default function ActiveTournaments({updateBalance, toggleJoinAny, ...props}) {
  const classes = useStyles();

  const grpc_client = useGrpcClient();

  const showSnackBar = useSnackBarContext();

  const [loading, setLoading] = useState(false);
  const [checked, setChecked] =usePersistedState("checked",false);
  const [page, setPage] = useState(1);
  const [count, ] = useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };

  const [tournaments, setTournaments] = useState(null);
  const [currentTournament, setCurrentTournament] = useState(null);

  const [joinAnyLimit, setJoinAnyLimit] = useState(join_any_limit[0]);
  const [joinAnyStatus, setJoinAnyStatus] = useState(false);
  const [joinAnyTournamentsLeft, setJoinAnyTournamentsLeft] = useState(0);
  const [joinAnyTotalTournaments, setJoinAnyTotalTournaments] = useState(0);
  const [joinAnyLoading, setJoinAnyLoading] = useState(false);
  const [joinAnyGameMode, setJoinAnyGameMode] = useState('any');
  const [joinAnyGameType, setJoinAnyGameType] = useState('any');

  const on_tournaments_response = function (response) {
    setLoading(false);
    let parsed_touranments = JSON.parse(response.getData());
    setTournaments(parsed_touranments);
    if(!currentTournament) setCurrentTournament(parsed_touranments && parsed_touranments.length && parsed_touranments[0]);
  };

  function on_tournaments_error(custom_msg) {
    setLoading(false);

    if (custom_msg) {
      showSnackBar(custom_msg);
    }
  }

  const get_join_any_status_and_data = () => {
    setLoading(true);
    updateBalance();
    grpc_client.getActiveJoinAnyTournaments(
      on_tournaments_response,
      on_tournaments_error
    );

    grpc_client.getJoinAnyTournamentStatus(
      (response) => {
        setJoinAnyLoading(false);
        if(response.getActive()) {
          setJoinAnyStatus(true);
          toggleJoinAny(true);
          setJoinAnyGameType(response.getJoinAnyGameType());
          setJoinAnyGameMode(response.getJoinAnyGameMode());
        } else {
          setJoinAnyStatus(false);
          toggleJoinAny(false);
        }
        setJoinAnyTournamentsLeft(response.getTournamentsLeft());
        setJoinAnyTotalTournaments(response.getTotalTournaments());
        let status = response.getJoinAnyStatus()
        if(status === join_any_status.DEACTIVATE){
          showSnackBar(response.getJoinAnyStatusMessage());
        }else{
          let tournament_id = response.getJoinAnyStatusMessage();
          if(tournament_id && checked){
            const win = window.open(`/gameplay/${tournament_id}`, 'gameplay_' +tournament_id);
            if (win) {
                win.focus();
            }
          
          }
          
        }
      },
      showSnackBar
    );
  }

  const joinAnyTournaments = () => {
    setJoinAnyLoading(true)
    grpc_client.joinAnyTournament(joinAnyLimit, joinAnyGameType, joinAnyGameMode, (req) => {
      if(req.array && req.array.length > 0){
        let response = JSON.parse(req.array[0]);
        if(response && response.errors && response.errors.length > 0){
          showSnackBar(response.errors[0]);
        }
      }
      get_join_any_status_and_data(req);
      toggleJoinAny(true);
      }, (custom_msg) => {
      setJoinAnyLoading(false);
      custom_msg && showSnackBar(custom_msg)
    });
  }

  const updateTournament = () => {
    get_join_any_status_and_data();
  }

  const onTournamentClick = (e, tournament) => {
    e.stopPropagation();
    setCurrentTournament(tournament);
  } 

  const unregisterJoinAnyTournaments = () => {
    setJoinAnyLoading(true)
    grpc_client.unregisterAnyTournament((req)=>{
        get_join_any_status_and_data(req);
        toggleJoinAny(false);
      }, (custom_msg) => {
      setJoinAnyLoading(false);
      custom_msg && showSnackBar(custom_msg)
    });
  }

  useEffect(() => {
    get_join_any_status_and_data()
    const subscription = setInterval(() => get_join_any_status_and_data(), 3000);
    return () => clearInterval(subscription);
  //eslint-disable-next-line
  }, [checked]);


  return (
  <div className={classes.root}>
    <Container component="main" maxWidth="xl" align="center">
      <Grid container spacing={1}>
      <Grid item xs={8}>
      <Grid container spacing={1}>
      <Grid item xs={12}>
          <Typographyx variant="h6" color="textSecondary" pt={3}>
            Active Tournaments
          </Typographyx>
        </Grid>

        <Grid item xs={12}>
          <Grid container spacing={1}>
            <Grid item xs={8}>
              {joinAnyStatus?
                <React.Fragment>
                <Container component="main" maxWidth="md" align="start">
                    <Typographyx variant="subtitle1" color="textSecondary" pb={1} px={1}>
                      <b>Join Any</b> Activated. {joinAnyTournamentsLeft}/{joinAnyTotalTournaments} tournaments left.
                    </Typographyx>
                </Container>
                <Container component="main" maxWidth="md" align="start">
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
                      <MenuItem dense value={vals[0]} key={vals[0]}>
                      {vals[1]}
                      </MenuItem>
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
                      <MenuItem dense value={vals[0]} key={vals[0]}>
                      {vals[1]}
                      </MenuItem>
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
                </Container>
                </React.Fragment>
                :
                <Container component="main" maxWidth="md" align="start">
                  <Box pt={2}>
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
                            <MenuItem dense value={vals[0]} key={vals[0]}>
                            {vals[1]}
                            </MenuItem>
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
                            <MenuItem dense value={vals[0]} key={vals[0]}>
                            {vals[1]}
                            </MenuItem>
                    ))}
                    </TextFieldx>
                    <TextFieldx
                      id="join_any_limit"
                      select
                      size="small"
                      label="Games"
                      value={joinAnyLimit}
                      onChange={(e) => (setJoinAnyLimit (e.target.value))}
                      variant="outlined"
                      margin="normal"
                      m={1}
                      >
                      {join_any_limit.map((amount, index) => (
                        <MenuItem value={amount} key={index}>
                          {amount}
                        </MenuItem>
                      ))}
                    </TextFieldx>
                  </Box>
                </Container> 
              }
            </Grid>
            <Grid item xs={6}>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <PaperTable>
            <TableContainer component={classes.paper}>
              <Table size="small">
                <TableHead>
                  <StyledTableRow>
                    <StyledTableCell align="center">Name</StyledTableCell>
                    <StyledTableCell align="center">
                      Game status
                    </StyledTableCell>
                    <StyledTableCell align="center">ID</StyledTableCell>
                    <StyledTableCell align="center">
                      Available Seat
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      Table Timer
                    </StyledTableCell>
                    <StyledTableCell align="center">Table Type</StyledTableCell>
                    <StyledTableCell align="center">Game Type</StyledTableCell>
                    <StyledTableCell align="center">Flash Mode</StyledTableCell>
                    <StyledTableCell align="center">Additional Payout</StyledTableCell>
                    <StyledTableCell align="center">Single Hand</StyledTableCell>
                    <StyledTableCell align="center">Publish Time</StyledTableCell>
                    <StyledTableCell align="center">Gameplay Time</StyledTableCell>
                  </StyledTableRow>
                </TableHead>
                <TableBody style={styles.card_content}>
                  {tournaments &&
                    Object.keys(tournaments).map((index) => (
                      <TournamentRow
                        key={index}
                        selected={tournaments[index]?.id === currentTournament?.id}
                        onClick={(e) => onTournamentClick(e, tournaments[index])}
                        tournament={tournaments[index]}
                      />
                    ))}
                </TableBody>
              </Table>
              {loading ? <Loading size={20}/> : <Box style={{height:"24px"}} />}
          
              {tournaments && tournaments.length === 0 ? (
                <Typographyx variant="subtitle2" pb={5} pt={3}>
                  No tournaments found.
                </Typographyx>
              ): (
                <Box m={2}>
                  <Pagination count={count} variant="outlined" shape="rounded" page={page} onChange={handleChange} />
                </Box>
              )}
            </TableContainer>
          </PaperTable>
          </Grid>
          </Grid>
          </Grid>
          <Grid item xs={4}>
        <Box mt={8} mx={2}>
        {joinAnyStatus &&  <div style={{fontSize: "4em", display:"flex", color:"#fff"}}>
            <input type="checkbox" id="test1" class="togglex"   checked={checked }
                  onChange={()=>setChecked(!checked)} />
              <label for="test1" style={{color:"#fff"}}></label>
              <p style={{marginLeft:"15px"}}>Open New Games In A New Tab</p>
            </div>}
       
          <TournamentLobbyCard newTab={true} tournament={currentTournament} updateTournament={updateTournament} />
        </Box>
      </Grid>
      </Grid>
    </Container>
  </div>
  );
}
