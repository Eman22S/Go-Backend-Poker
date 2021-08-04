import React, { useEffect, useState,  useCallback } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextFieldx from "./fragments/TextFieldx";
import Buttonx from "./fragments/Buttonx";

import Table from "@material-ui/core/Table";
import { useHistory, useLocation } from "react-router-dom";
import Container from "@material-ui/core/Container";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import HistoryIcon from "@material-ui/icons/History";
import IconButton from "@material-ui/core/IconButton";
import TableContainer from "@material-ui/core/TableContainer";

import Loading from "./fragments/Loading";
import { useStore } from "../contexts/store";
import PaperTable from "./fragments/PaperTable";
import Typographyx from "./fragments/Typographyx";
import useGrpcClient from "../contexts/grpc_client";
import { useSnackBarContext } from "../contexts/snackbar";
import { table_type_labels, game_type_labels, table_types, game_types } from "./utils/constants";
import Pagination from "@material-ui/lab/Pagination";
import Box from "@material-ui/core/Box";
import Badgex from "./fragments/Badgex";
import StyledTableCell from './fragments/StyledTableCell';
import StyledTableRow from './fragments/StyledTableRow';
import StyledMenuItem from './fragments/StyledMenuItem';
import StyledFilterSelect from './fragments/StyledFilterSelect';
import HandHistory from "./HandHistory";
import TableHisotories from "./TableHistories";
import { MenuItem, Select } from "@material-ui/core";


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
const select_timers = [
  { value: { timer_low: "*", timer_high: "*" }, label: "All" },
  { value: { timer_low: "0", timer_high: "30" }, label: "0-30 seconds" },
  { value: { timer_low: "30", timer_high: "60" }, label: "30-60 seconds" },
  { value: { timer_low: "60", timer_high: "90" }, label: "60-90 seconds" },
  { value: { timer_low: "90", timer_high: "120" }, label: "90-120 seconds" },
  { value: { timer_low: "120", timer_high: "*" }, label: "120+ seconds" },
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


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      minHeight: '100vh'
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
     // backgroundColor: theme.palette.background.paper,
      backgroundImage: `url(${theme.backgroundImg.image})`,
      backgroundRepeat:  theme.backgroundImg.repeat  
    },
    full: {
      color: theme.palette.error.main
    },
    available: {
      color: theme.palette.success.main
    }
   
  }));
  
  const styles = {
    card_content: {
      paddingBottom: 1,
      paddingTop: 1,
    },
  };

export default function SimulationManagement(props) {
    let pollingInterval = null;
    const classes = useStyles();
    const grpc_client = useGrpcClient();
    const [globalSettings, setGlobalSettings] = useState({});
    const [tournamentLimit, setTournamentLimit] = useState("");
    const [addonsAmount, setAddonsAmount] = useState("");
    const [numberOfPlayers, setNumberOfPlayers] = useState("");

    const [tournamentTemplateId, setTournamentTemplateId] = useState("");
    const [isSimulationOn, setIsSimulationOn] = useState(false);

    const history = useHistory();
  
    const [, updateStore] = useStore();
  
    const showSnackBar = useSnackBarContext();
  
    const [loading, setLoading] = useState(false);
    const [joining, ] = useState(false);
    const [waiting, ] = useState(false);
    const [tournamentTemps, setTournamentTemps] = useState([])
    const [tournaments, setTournaments] = useState(null);
    const [selectedTournament, ] = useState(null);
  
    const [gameType, setGameType] = useState(select_game_types[0].value);
    const [buyIn, setBuyIn] = useState(select_buyins[0].value);
    const [timer, setTimer] = useState(select_timers[0].value);
    const [tableType, setTableType] = useState(
      select_table_types[0].filter_value
    );
    const [entryFee, setEntryFee] = useState(select_entry_fee[0].value)

  
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);

    const getGlobalSettings = () => {
        grpc_client.getGlobalSettings((resp) => {
            let global_settings = Object.assign({}, ...JSON.parse(resp));
            setGlobalSettings(global_settings);
            console.log(global_settings.is_simulation_on);
            setIsSimulationOn(global_settings.is_simulation_on || false);
            if(!global_settings.is_simulation_on){
                clearInterval(pollingInterval);
                get_tournaments();
            }

        }, on_error);
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
          entryFeeLow: [entryFee["entry_fee_low"]],
          entryFeeHigh:[entryFee["entry_fee_high"]],
          pagination_current_page: page,
          pagination_items_per_page: 10
        };
        console.log('-----Data----', data);
                
        grpc_client.getTournamentsAdmin(
          data,
          on_tournaments_response,
          on_tournaments_error,
          false,true,true

        );
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [grpc_client, tableType, buyIn, timer, gameType, page, entryFee]
    );
   
    useEffect(() => {
        //
        get_tournaments();
        get_tournament_temps();
        getGlobalSettings();
        //eslint-disable-next-line
      }, [get_tournaments])
      useEffect(()=>{
        get_tournaments();
        //eslint-disable-next-line
      },[page])
    useEffect(()=>{
      if(globalSettings.is_simulation_on){
        const subscription = setInterval(() => getGlobalSettings(), 3000);
        return () => clearInterval(subscription);
      }
    //eslint-disable-next-line
    },[globalSettings])


    const on_error = (custom_msg) => {
        console.log(custom_msg);
        if (custom_msg) {
            showSnackBar(custom_msg);
        }
    }



    const simulateGames = (e)=>{
        e.preventDefault();
 
        grpc_client.simulateGames(tournamentTemplateId, tournamentLimit, addonsAmount, numberOfPlayers,(response) => {
            showSnackBar('Game Simulation Started!', 'success')
            setTournamentTemplateId("");
            setTournamentLimit("");
            setAddonsAmount("");
            setNumberOfPlayers("");
            getGlobalSettings();
       
        }, on_error)
    }

    const get_tournament_temps = useCallback(() => {
      setLoading(true);
      grpc_client.getTournamentTemplateList(
        {
          pagination_current_page: page,
          pagination_items_per_page: 5
        },
        on_tournaments_temp_response,
        on_tournaments_temp_error
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [grpc_client, page]);
    const on_tournaments_temp_response = function (response) {
      setLoading(false);
      let parsedResponse = JSON.parse(response.getResult());
      let tournament_templates = parsedResponse.payload;
  
      setTournamentTemps(tournament_templates);
    };
  
    function on_tournaments_temp_error(custom_msg) {
      setLoading(false);
  
      if (custom_msg) {
        showSnackBar(custom_msg);
      }
    }
  
    const changeUsing = (valueSetter, validator = (value) => {}) => (event) => {
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
      // hacky way rather than pagination to reduce load
      // sit_n_go_tournaments.splice(5);
      setTournaments(sit_n_go_tournaments);
      setCount(pagination_num_pages);
    };
  
    function on_tournaments_error(custom_msg) {
      setLoading(false);
  
      if (custom_msg) {
        showSnackBar(custom_msg);
      }
    }
  
   
  

 
    const go_to_hand_history = (tournament_instance_id) => (event) => {
      event.stopPropagation();
  
      updateStore("tournament_instance_id", () => tournament_instance_id);
      history.push(
        `/simulation_management?tid=${tournament_instance_id}`,
      );
    };


    // On Pagination Changed
    const handlePaginationChange = (event, value) => {
        setPage(value);
    }
    const location = useLocation();

    // get tournament or gameplay history id from url parameters
    const query = new URLSearchParams(location.search);
    const tournament_instance_id = query.get("tid");
    const gameplay_history_id = query.get("gid");

    if (gameplay_history_id) {
        return <HandHistory gameplay_history_id={gameplay_history_id} />;
    } else if (tournament_instance_id) {
        return <TableHisotories tournament_instance_id={tournament_instance_id} />;
    }
    return (
      <div className={classes.background}>
        <Container component="main" maxWidth="lg" align="center" className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typographyx variant="h6" color="textSecondary" pt={3}>
            Automated Tournaments
          </Typographyx>
        </Grid>
        <Grid container spacing={1}>
            <Box my={12} style={{display:"flex",  alignItems:"spaceAround", justifyContent:"spaceAround", width:"100%"}}>
            <Select
                labelId="demo-simple-select-label"
                id="cash-back-select"
                value={tournamentTemplateId}
                style={{padding:"10px", width:"20%"}}
                placeholder="Select Tournament"
                onChange={(e)=>{
                  setTournamentTemplateId(e.target.value)
              }}
                >   
                    <MenuItem value="0">None</MenuItem>
                    {tournamentTemps && tournamentTemps.map((client)=>{
                        return (<MenuItem key ={client.id} value={client.id}>{client.name}</MenuItem>);
                    })}
                
            
            </Select>
                {/* <TextFieldx
                    name={"tournamentTemplateId"}
                    size="small"
                    variant="outlined"
                    margin="normal"
                    placeholder="1148"
                    required
                    label={"Tournament Template Id"}
                    autoComplete={"tournamentTemplateId"}
                    onChange={(e)=>{
                        setTournamentTemplateId(e.target.value)
                    }}
                    value={tournamentTemplateId}
                /> */}
                    <TextFieldx
                    name={"tournamentLimit"}
                    size="small"
                    variant="outlined"
                    margin="normal"
                    placeholder="1148"
                    required
                    label={"Tournament Limit"}
                    autoComplete={"tournamentLimit"}
                    onChange={(e)=>{
                        setTournamentLimit(e.target.value)
                    }}
                    value={tournamentLimit}
                />
                    <TextFieldx
                    name={"addonsAmount"}
                    size="small"
                    variant="outlined"
                    margin="normal"
                    placeholder="1148"
                    required
                    label={"Addons Amount"}
                    autoComplete={"addonsAmount"}
                    onChange={(e)=>{
                        setAddonsAmount(e.target.value)
                    }}
                    value={addonsAmount}
                />
                <TextFieldx
                    name={"numberOfPlayers"}
                    size="small"
                    variant="outlined"
                    margin="normal"
                    placeholder="0"
                    required
                    label={"Number of Players"}
                    autoComplete={"numberOfPlayers"}
                    onChange={(e)=>{
                        setNumberOfPlayers(e.target.value)
                    }}
                    value={numberOfPlayers}
                />
                <Buttonx
                        onClick={simulateGames}
                        variant="contained"
                        color="primary"
                        mx={1}
                        mt={0.5}
                    >
                        Simulate Games
                </Buttonx>
               
            </Box>
        </Grid>
        <div  className="simulation_status" style={{display:"flex", justifyContent:"center", alignItems:"center",width:"100%"}}>
        {isSimulationOn && <p>  <Badgex color="ACTIVE">
                  Ongoing Simulation....
                </Badgex> </p>}
                {!isSimulationOn &&<Badgex color="FINISHED">
                  No Simulation Running
                </Badgex> } 
        </div>
                      
        <Grid item xs={12}>
          <Grid container spacing={1}>
            <Grid item xs={6} sm={2}>
              <StyledFilterSelect
                id="gameType"
                label="Game Type"
                value={gameType}
                onChange={changeUsing(setGameType)}
                my={1.5}
              >
                {select_game_types.map((type, index) => (
                  <StyledMenuItem value={type.value} key={index}>
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
                  <StyledMenuItem value={type.value} key={index}>
                    {type.label}
                  </StyledMenuItem>
                ))}
              </StyledFilterSelect>
            </Grid>
            <Grid item xs={6} sm={2}>
              <StyledFilterSelect
                id="speed"
                label="Speed"
                value={timer}
                onChange={changeUsing(setTimer)}
                my={1.5}
              >
                {select_timers.map((type, index) => (
                  <StyledMenuItem value={type.value} key={index}>
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
                  <StyledMenuItem value={type.filter_value} key={index}>
                    {type.label}
                  </StyledMenuItem>
                ))}
              </StyledFilterSelect>
            </Grid>
            <Grid item xs={6} sm={2}>
              <StyledFilterSelect
                id="entryfee"
                label="Entry-Fee"
                value={entryFee}
                onChange={changeUsing(setEntryFee)}
                my={1.5}
              >
                {select_entry_fee.map((type, index) => (
                  <StyledMenuItem value={type.value} key={index}>
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
                    <StyledTableCell>Name </StyledTableCell>
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
                    <StyledTableCell align="center">
                      Hand History
                    </StyledTableCell>
                  </StyledTableRow>
                </TableHead>
                {tournaments && !loading && (
                  <TableBody style={styles.card_content}>
                    {Object.keys(tournaments).map((index) => (
                      <StyledTableRow
                        key={index}
                        hover={true}
                       
                      >
                        <StyledTableCell component="th" scope="row">
                          {tournaments[index].name} &nbsp;{" "}
                          {selectedTournament ===
                            tournaments[index].tournament_instance_id &&
                            (joining ? (
                              <span>
                                <Loading size={12} />
                                &nbsp; joining tournament...
                              </span>
                            ) : (
                              waiting && (
                                <span>
                                  <Loading size={12} />
                                  &nbsp; waiting for other players...
                                </span>
                              )
                            ))}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <Badgex color={tournaments[index].status}>{tournaments[index].status}</Badgex>
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {tournaments[index].tournament_instance_id}
                        </StyledTableCell>
                        <StyledTableCell align="center" className={parseInt(tournaments[index].max_players_per_table) - parseInt(tournaments[index].seats_occupied) > 0 ? classes.available: classes.full }>
                          {parseInt(tournaments[index].min_players_per_table) -
                            parseInt(tournaments[index].seats_occupied)}
                          /{parseInt(tournaments[index].min_players_per_table)}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {tournaments[index].table_timer}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {table_type_labels[tournaments[index].table_type]}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {game_type_labels[tournaments[index].game_type]}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <IconButton
                            onClick={go_to_hand_history(
                              tournaments[index].tournament_instance_id
                            )}
                          >
                            <HistoryIcon />
                          </IconButton>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                )}
              </Table>
            </TableContainer>

            {loading && <Loading pb={5} />}

            {tournaments && tournaments.length === 0 ? (
              <Typographyx variant="subtitle2" pb={5} pt={3}>
                No tournaments found.
              </Typographyx>
            ): (
                <Box m={2}>
                  <Pagination count={count} variant="outlined" shape="rounded" page={page} onChange={handlePaginationChange} />
                </Box>
            )}
          </PaperTable>
        </Grid>
      </Grid>
    </Container>
    </div>
    )
       
}
