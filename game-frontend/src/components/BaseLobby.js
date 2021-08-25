import React, { useEffect, useState, useCallback } from "react";

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
import {
  game_types,
  table_types,
} from "./utils/constants";
import PaperTable from "./fragments/PaperTable";
import Loading from "./fragments/Loading";
import Typographyx from "./fragments/Typographyx";
import TournamentRow from "./fragments/TournamentRow";
import Box from "@material-ui/core/Box";
import StyledTableCell from './fragments/StyledTableCell';
import StyledTableRow from './fragments/StyledTableRow';
import StyledMenuItem from './fragments/StyledMenuItem';
import StyledFilterSelect from './fragments/StyledFilterSelect';
import TournamentLobbyCard from "./fragments/TournamentLobbyCard";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    minHeight: '100vh'
  },
  box : {
    marginTop: "65px"
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
    //backgroundColor: theme.palette.background.paper,
    backgroundImage: `url(${theme.backgroundImg.image})`,
    backgroundRepeat:  theme.backgroundImg.repeat   
  },
}));

const styles = {
  card_content: {
    paddingBottom: 1,
    paddingTop: 1,
  },
};

// add all options for all filtering parameters
const select_table_types = [
  { value: "*", label: "All", filter_value: "*" },
  ...table_types,
];
const select_game_types = [
  { value: "*", label: "All", filter_value: "*" },
  ...game_types,
];
const select_buyins = [
  { value: { buyin_low: "*", buyin_high: "*" }, label: "All" },
  { value: { buyin_low: "0", buyin_high: "25" }, label: "0-25" },
  { value: { buyin_low: "25", buyin_high: "50" }, label: "25-50" },
  { value: { buyin_low: "50", buyin_high: "100" }, label: "50-100" },
  { value: { buyin_low: "100", buyin_high: "250" }, label: "100-250" },
  { value: { buyin_low: "250", buyin_high: "500" }, label: "250-500" },
  { value: { buyin_low: "500", buyin_high: "1000" }, label: "500-1000" },
  { value: { buyin_low: "1000", buyin_high: "2500" }, label: "1000-2500" },
  { value: { buyin_low: "2500", buyin_high: "5000" }, label: "2500-5000" },
  { value: { buyin_low: "5000", buyin_high: "*" }, label: "5000+" },
];

const select_entry_fee = [
  { value: { entry_fee_low: "*", entry_fee_high: "*" }, label: "All" },
  { value: { entry_fee_low: "0", entry_fee_high: "25" }, label: "0-25" },
  { value: { entry_fee_low: "25", entry_fee_high: "50" }, label: "25-50" },
  { value: { entry_fee_low: "50", entry_fee_high: "100" }, label: "50-100" },
  { value: { entry_fee_low: "100", entry_fee_high: "250" }, label: "100-250" },
  { value: { entry_fee_low: "250", entry_fee_high: "500" }, label: "250-500" },
  { value: { entry_fee_low: "500", entry_fee_high: "1000" }, label: "500-1000" },
  { value: { entry_fee_low: "1000", entry_fee_high: "2500" }, label: "1000-2500" },
  { value: { entry_fee_low: "2500", entry_fee_high: "5000" }, label: "2500-5000" },
  { value: { entry_fee_low: "5000", entry_fee_high: "*" }, label: "5000+" },
];

const select_timers = [
  { value: { timer_low: "*", timer_high: "*" }, label: "All" },
  { value: { timer_low: "0", timer_high: "30" }, label: "0-30 seconds" },
  { value: { timer_low: "30", timer_high: "60" }, label: "30-60 seconds" },
  { value: { timer_low: "60", timer_high: "90" }, label: "60-90 seconds" },
  { value: { timer_low: "90", timer_high: "120" }, label: "90-120 seconds" },
  { value: { timer_low: "120", timer_high: "*" }, label: "120+ seconds" },
];


export default function BaseLobby(props) {
  const classes = useStyles();

  const grpc_client = useGrpcClient();

  const showSnackBar = useSnackBarContext();

  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };

  const [tournaments, setTournaments] = useState(null);
  const [currentTournament, setCurrentTournament] = useState(null);

  const [gameType, setGameType] = useState(select_game_types[0].value);
  const [buyIn, setBuyIn] = useState(select_buyins[0].value);
  const [timer, setTimer] = useState(select_timers[0].value);
  const [tableType, setTableType] = useState(
    select_table_types[0].filter_value
  );
  const [entryFee, setEntryFee] = useState(select_entry_fee[0].value)

  const changeUsing = (valueSetter, validator = (value) => { }) => (event) => {
    const { type, checked } = event.target;
    if (type === "checkbox") {
      valueSetter(checked);
    } else {
      let value = event.target.value;
      if (typeof value === "string") value = value.trim();
      valueSetter(value);
      validator(value);
    }
  };

  const on_tournaments_response = function (response) {
    setLoading(false);
    let parsed_touranments = JSON.parse(response.getResult());
    let sit_n_go_tournaments = parsed_touranments.payload;
    let pagination_num_pages = parsed_touranments.pagination_data.number_of_pages;
    // sit_n_go_tournaments.sort(
    //   (t1, t2) => t2.tournament_instance_id - t1.tournament_instance_id
    // );
   setTournaments(sit_n_go_tournaments);
    setCurrentTournament(sit_n_go_tournaments && sit_n_go_tournaments.length && sit_n_go_tournaments[0]);
    setCount(pagination_num_pages);
  };

  function on_tournaments_error(custom_msg) {
    setLoading(false);

    if (custom_msg) {
      showSnackBar(custom_msg);
    }
  }

  const get_tournaments = useCallback(
    function () {
      setLoading(true);

      // set filter values to corresponding filter options
      const data = {
        status: [],
        tableType: [tableType],
        gameType: [gameType],
        buyinLow: [buyIn["buyin_low"]],
        buyinHigh: [buyIn["buyin_high"]],
        timerLow: [timer["timer_low"]],
        timerHigh: [timer["timer_high"]],
        pagination_current_page: page,
        pagination_items_per_page: 10,
        entryFeeLow: [entryFee["entry_fee_low"]],
        entryFeeHigh:[entryFee["entry_fee_high"]]
      };

      grpc_client.getTournaments(
        data,
        on_tournaments_response,
        on_tournaments_error
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [grpc_client, tableType, buyIn, timer, gameType, page,entryFee]
  );


  const updateTournament = () => {
    get_tournaments();
    props.updateBalance();
  }



  useEffect(() => {
    get_tournaments();
  }, [get_tournaments]);



  // const on_join_new_table_state = useCallback(
  //   (tableStateResponse) => {
  //     if (tableStateResponse.game?.table_action !== "pending") {
  //       setWaiting(false);
  //       grpc_client.unSubscribeTournamentState();

  //       updateStore("startingTableState", () => tableStateResponse);
  //       history.push("/gameplay");
  //     }
  //     console.log("join table state: ", tableStateResponse);
  //   },
  //   [grpc_client, updateStore, history]
  // );

  // const go_to_hand_history = ($tournament_instance_id) => (event) => {
  //   event.stopPropagation();

  //   updateStore("tournament_instance_id", () => $tournament_instance_id);
  //   history.push(`/my_tournamnets?tid=${$tournament_instance_id}`);
  // };

  const onTournamentClick = (e, tournament) => {
    e.stopPropagation();
    setCurrentTournament(tournament);
  }

  return (
    <div className={classes.background}>
    <Container component="main" maxWidth="xl" align="center" className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={8}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typographyx variant="h6" color="textSecondary" pt={3}>
                Sit & Go Tournaments
          </Typographyx>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={6} sm={2}>
                  <StyledFilterSelect
                    id="gameType"
                    label="Game Type"
                    value={gameType}
                    onChange={changeUsing(setGameType)}
                    my={1.5}
                  >
                    {select_game_types.map((type, index) => (
                      <StyledMenuItem dense value={type.value} key={index}>
                        {type.label}
                      </StyledMenuItem>
                    ))}
                  </StyledFilterSelect>
                </Grid>
                <Grid item xs={6} sm={2}>
                  <StyledFilterSelect
                    id="tableType"
                    label="Table Type"
                    value={tableType}
                    onChange={changeUsing(setTableType)}
                    my={1.5}
                  >
                    {select_table_types.map((type, index) => (
                      <StyledMenuItem dense value={type.filter_value} key={index}>
                        {type.label}
                      </StyledMenuItem>
                    ))}
                  </StyledFilterSelect>
                </Grid>

                <Grid item xs={6} sm={2}>
                  <StyledFilterSelect
                    id="speed"
                    label="Table Speed"
                    value={timer}
                    onChange={changeUsing(setTimer)}
                    my={1.5}
                  >
                    {select_timers.map((type, index) => (
                      <StyledMenuItem dense value={type.value} key={index}>
                        {type.label}
                      </StyledMenuItem>
                    ))}
                  </StyledFilterSelect>
                </Grid>

                <Grid item xs={6} sm={2}>
                  <StyledFilterSelect
                    id="buyIn"
                    label="Buy-In"
                    value={buyIn}
                    onChange={changeUsing(setBuyIn)}
                    my={1.5}
                  >
                    {select_buyins.map((type, index) => (
                      <StyledMenuItem dense value={type.value} key={index}>
                        {type.label}
                      </StyledMenuItem>
                    ))}
                  </StyledFilterSelect>
                  {/* Entry free */}
                </Grid>
                <Grid item xs={6} sm={2}>
                  <StyledFilterSelect
                    id="entry_fee"
                    label="Entry-Fee"
                    value={entryFee}
                    onChange={changeUsing(setEntryFee)}
                    my={1.5}
                  >
                    {select_entry_fee.map((type, index) => (
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
                  <Table size='small'>
                    <TableHead>
                      <StyledTableRow>
                        <StyledTableCell>Name</StyledTableCell>
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
                            onClick={(e) => onTournamentClick(e, tournaments[index])}
                            selected={currentTournament && tournaments[index]?.id === currentTournament?.id}
                            key={index}
                            tournament={tournaments[index]}
                          />
                        ))}
                    </TableBody>
                  </Table>
                  {loading ?
                    <Box m={8}><Loading size={40} /></Box> : tournaments && tournaments.length === 0 ? (
                      <Typographyx variant="subtitle2" pb={5} pt={3}>
                        No tournaments found.
                      </Typographyx>
                    ) : (
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
          <Box className={classes.box}>
            <TournamentLobbyCard tournament={currentTournament} updateTournament={updateTournament} />
          </Box>
        </Grid>
      </Grid>
    </Container>
    </div>);
}
