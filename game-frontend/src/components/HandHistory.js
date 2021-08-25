import React, { useEffect, useState } from "react";

import { Link as RouterLink } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";

import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";

import NavigateNextIcon from "@material-ui/icons/NavigateNext";

import useGrpcClient from "../contexts/grpc_client";
import { useSnackBarContext } from "../contexts/snackbar";
import PaperTable from "./fragments/PaperTable";
import Loading from "./fragments/Loading";
import Typographyx from "./fragments/Typographyx";
import UnpositionedCard from "./fragments/UnpositionedCard";
import StyledTableCell from './fragments/StyledTableCell';
import StyledTableRow from './fragments/StyledTableRow';
import useLocalStorage from "./utils/hooks";
import GameResult from "./fragments/GameResult";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    overflow: "hidden"
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
  default_background: {
    //backgroundColor: theme.palette.background.default,
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


export default function HandHistory({ gameplay_history_id, ...props }) {
  const classes = useStyles();

  const grpc_client = useGrpcClient();

  const showSnackBar = useSnackBarContext();

  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState(null);
  const [localUser, ] = useLocalStorage("user");

  const [payoutDetails, setPayoutDetails] = useState(null);
  const [totalPayout, setTotalPayout] = useState(0);
  const on_history_response = function (response) {
    setLoading(false);

    if (response) {
      let parsed_history = JSON.parse(response.getResult());

      // change players_data structure to be keyed by player id
      let players_data = {};
      if (parsed_history.players_data) {
        for (let player of parsed_history.players_data) {
          players_data[player.user_id] = player;
        }
      }
      parsed_history.players_data = players_data;
      console.log(parsed_history);
      setHistory(parsed_history);
      grpc_client.getRankings(parsed_history?.meta_data?.tournament_instance_id, (response) =>{
        let data = JSON.parse(response.getPayoutDetails());
        console.log(data);
        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
        setPayoutDetails(data);
        setTotalPayout(response.getTotalPayout());

    }
    , (custom_msg) => custom_msg && showSnackBar(custom_msg)
    )
    }
  };

  function get_hand_history() {
    if (gameplay_history_id) {
      setLoading(true);

      grpc_client.getHandHistoryData(
        gameplay_history_id,
        on_history_response,
        on_grpc_error,
        localUser ? false : true
      );
    }
  }

  useEffect(() => {
    if (!history) {
      get_hand_history();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history]);

  function on_grpc_error(custom_msg) {
    setLoading(false);

    if (custom_msg) {
      showSnackBar(custom_msg);
    }
  }


  return (
    <div className={classes.default_background}>
    <Container maxWidth="md" align="center" className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typographyx variant="h5" color="textSecondary" pt={1.5}>
            Hand History
          </Typographyx>
          <Typographyx variant="subtitle1" color="textSecondary" pb={1.5}>
            Gameplay History ID {gameplay_history_id}
          </Typographyx>
        </Grid>

        <Grid item xs={12}>
          <Breadcrumbs
            aria-label="breadcrumb"
            separator={<NavigateNextIcon fontSize="small" />}
          >
            <Link component={RouterLink} color="inherit" to="/my_tournaments">
              Hand History
            </Link>
            <Link
              component={RouterLink}
              color="inherit"
              to={`/my_tournaments?tid=${history?.meta_data?.tournament_instance_id}`}
            >
              Tournament ID {history?.meta_data?.tournament_instance_id}
            </Link>
            <Typographyx color="textPrimary">
              Table ID {history?.meta_data?.table_id}
            </Typographyx>
          </Breadcrumbs>
        </Grid>

        {history && history.meta_data && history.meta_data.river_card !== history.meta_data.flop_card0
        &&  <Grid item xs={12}>
          {/* General Table Information */}
          <Typographyx variant="h6" color="textSecondary" pb={0.5} pt={0}>
            Table Information
          </Typographyx>
          {loading && <Loading />}
          {history?.meta_data && (
            <Card className={classes.background}>
              <CardContent>
                <Grid container>
                  <Grid item xs={5}>
                    <List>
                      <ListItem divider={true}>
                        <ListItemText
                          primary="Round"
                          secondary={`${history.meta_data.round}`}
                        />
                      </ListItem>
                      <ListItem divider={true}>
                        <ListItemText
                          primary={`Small blind user`}
                          secondary={`${
                            history.players_data[
                              history.meta_data.small_blind_user_id
                            ].username
                          }`}
                        />
                      </ListItem>
                      <ListItem divider={true}>
                        <ListItemText
                          primary={`Big blind user`}
                          secondary={`${
                            history.players_data[
                              history.meta_data.big_blind_user_id
                            ].username
                          }`}
                        />
                      </ListItem>
                      <ListItem divider={true}>
                        <ListItemText
                          primary={`Dealer user`}
                          secondary={`${
                            history.players_data[
                              history.meta_data.dealer_user_id
                            ].username
                          }`}
                        />
                      </ListItem>
                    </List>
                  </Grid>
                  <Grid item xs={7}>
                    <Grid container justify="center" spacing={5}>
                      <Grid item xs={12}>
                        <List>
                          <ListItem divider={true}>
                            <ListItemText
                              primary="Created time"
                              secondary={history.meta_data.created}
                            />
                          </ListItem>
                          <ListItem divider={true}>
                            <ListItemText
                              primary="Finished time"
                              secondary={
                                history.meta_data.finished || "Not finished yet"
                              }
                            />
                          </ListItem>
                        </List>
                      </Grid>
                      <Grid item>
                        <UnpositionedCard
                          number={history.meta_data.flop_card0}
                        />
                      </Grid>
                      <Grid item>
                        <UnpositionedCard
                          number={history.meta_data.flop_card1}
                        />
                      </Grid>
                      <Grid item>
                        <UnpositionedCard
                          number={history.meta_data.flop_card2}
                        />
                      </Grid>
                      <Grid item>
                        <UnpositionedCard
                          number={history.meta_data.turn_card}
                        />
                      </Grid>
                      <Grid item>
                        <UnpositionedCard
                          number={history.meta_data.river_card}
                        />
                      </Grid>
                    </Grid>
                    <Grid container justify="center" spacing={5}>
                      <Grid item xs={6}>
                        Flops
                      </Grid>
                      <Grid item>Turn</Grid>
                      <Grid item>River</Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          )}
        </Grid>}

        <Grid item xs={12}>
          {/* Players on table */}
          <Typographyx variant="h6" color="textSecondary" pb={0.5} pt={2}>
            Table Players
          </Typographyx>
          {loading && <Loading />}
          <Grid container spacing={2}>
            {history?.players_data &&
              Object.values(history.players_data).map((player, index) => (
                <Grid item xs={6} key={index}>
                  <Card className={classes.background}>
                    <CardContent>
                      <Grid container>
                        <Grid item xs={6}>
                          <List>
                            <ListItem divider={true}>
                              <ListItemText
                                primary="Username"
                                secondary={`${player.username}`}
                              />
                            </ListItem>
                            <ListItem divider={true}>
                              <ListItemText
                                primary="Chips at start"
                                secondary={`${player.chips_at_start}`}
                              />
                            </ListItem>
                            <ListItem divider={true}>
                              <ListItemText
                                primary="Chips at end"
                                secondary={player.chips_at_end || "None"}
                              />
                            </ListItem>
                            <ListItem divider={true}>
                              <ListItemText
                                primary="Chips at table"
                                secondary={`${player.chips_at_table}`}
                              />
                            </ListItem>
                            <ListItem divider={true}>
                              <ListItemText
                                primary="Status"
                                secondary={`${player.status}`}
                              />
                            </ListItem>
                          </List>
                        </Grid>
                        <Grid item xs={6}>
                          <Grid container justify="center" spacing={5}>
                            <Grid item xs={12}>
                              <List>
                                <ListItem divider={true}>
                                  <ListItemText
                                    primary="Is overall winner"
                                    secondary={`${
                                      player.is_overall_winner ? "Yes" : "No"
                                    }`}
                                  />
                                </ListItem>
                                <ListItem divider={true}>
                                  <ListItemText
                                    primary="Amount won"
                                    secondary={`${player.amount_won || "None"}`}
                                  />
                                </ListItem>
                                <ListItem divider={true}>
                                  <ListItemText
                                    primary="Amount raked"
                                    secondary={`${
                                      player.amount_raked || "None"
                                    }`}
                                  />
                                </ListItem>
                              </List>
                            </Grid>
                            {history && history.meta_data && history.meta_data.river_card === history.meta_data.flop_card0
        &&  player.all_cards && player.all_cards.map((card, index) => (
                              <Grid item key={index}>
                                <UnpositionedCard number={card} />
                              </Grid>
                            ))}
                            {history && (history.meta_data && history.meta_data.river_card !== history.meta_data.flop_card0)
        &&  player.hole_cards.map((card, index) => (
                              <Grid item key={index}>
                                <UnpositionedCard number={card} />
                              </Grid>
                            ))}
                          </Grid>
                          <Grid container justify="center" spacing={5}>
                            <Grid item>Hole Cards</Grid>
                          </Grid>
                        </Grid>
                        <Grid item xs={12}>
                          <List>
                            <ListItem divider={true}>
                              <ListItemText
                                primary="Hand Description"
                                secondary={
                                  <span
                                    dangerouslySetInnerHTML={{
                                      __html: player.hand_description || "None",
                                    }}
                                  />
                                }
                              />
                            </ListItem>
                          </List>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </Grid>

        <Grid item xs={12}>
          {/* Round Actions Data */}
          <Typographyx variant="h6" color="textSecondary" pb={0.5} pt={2}>
            Table Actions
          </Typographyx>
          {loading && <Loading />}
        </Grid>
        {history?.rounds_data &&
          history?.rounds_data.map((round_data, index) => (
            <Grid item xs={12} key={index}>
              <Typographyx align="left" color="textSecondary">
                Street {index + 1}
              </Typographyx>
              <PaperTable>
                <TableContainer component={classes.paper}>
                  <Table>
                    <TableHead>
                      <StyledTableRow>
                        <StyledTableCell>Username</StyledTableCell>
                        <StyledTableCell>Action</StyledTableCell>
                        <StyledTableCell align="center">Bet</StyledTableCell>
                        <StyledTableCell align="center">
                          Bet Required
                        </StyledTableCell>
                        <StyledTableCell align="center">Time</StyledTableCell>
                      </StyledTableRow>
                    </TableHead>
                    <TableBody style={styles.card_content}>
                      {round_data &&
                        round_data.map((action_data, index) => (
                          <StyledTableRow key={index} hover={true}>
                            <StyledTableCell component="th" scope="row">
                              {
                                history.players_data[action_data.user_id]
                                  ?.username
                              }
                            </StyledTableCell>
                            <StyledTableCell>
                              {action_data.action}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              {action_data.bet}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              {action_data.bet_required}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              {action_data.created}
                            </StyledTableCell>
                          </StyledTableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </PaperTable>

              {loading && <Loading />}

              {!loading && history && history.length === 0 && (
                <React.Fragment>
                  <Box mt={3}>
                    {/* <StarttournamentButton history={history} /> */}
                  </Box>
                </React.Fragment>
              )}
            </Grid>
          ))}

            <GameResult  
              players={Object.values(payoutDetails || {}).sort((a,b) => a.rank - b.rank)} 
              hasAdditionalPayout={true}
              showStandardPayout={true}
              totalPayout={totalPayout} 
              isHistory={true}
              showAll={true}/>
      </Grid>
    </Container>
    </div>
  );
}
