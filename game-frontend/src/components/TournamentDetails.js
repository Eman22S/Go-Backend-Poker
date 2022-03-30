import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import Typographyx from "./fragments/Typographyx";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import Divider from "@material-ui/core/Divider";
import PaperTable from "./fragments/PaperTable";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import useGrpcClient from "../contexts/grpc_client";
import { useSnackBarContext } from "../contexts/snackbar";
import Yes from "@material-ui/icons/CheckCircle";
import No from "@material-ui/icons/Cancel";
import green from "@material-ui/core/colors/green";
import Badgex from "./fragments/Badgex";
import StyledTableCell from "./fragments/StyledTableCell";
import StyledTableRow from "./fragments/StyledTableRow";

import { table_type_labels, game_type_labels } from "./utils/constants";
import AdditionalPayoutTable from "./fragments/AdditionalPayoutTable";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    minHeight: "100%",
  },
  background: {
    backgroundColor: theme.palette.background.paper,
  },
  headerInfo: {
    width: "100%",
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.secondary,
    // padding: theme.spacing(1),
    "& svg": {
      margin: theme.spacing(1.5),
    },
    "& hr": {
      margin: theme.spacing(0, 0.5),
    },
  },
  paperTable: {
    flexGrow: 1,
  },
  tableContainer: {
    maxHeight: 480,
    minHeight: 200,
  },
  alignItems: {
    display: "flex",
    alignItems: "center",
  },
}));

export default function TournamentDetails(props) {
  const classes = useStyles();
  const showSnackBar = useSnackBarContext();
  const grpc_client = useGrpcClient();
  const [tournamentDetails, setTournamentDetails] = useState({});
  const [flashPrizePoolValues, setFlashPrizePoolValues] = useState({});
  const [additionalPayoutPerHand, setAdditionalPayoutPerHand] = useState({});
  const [players, setPlayers] = useState([]);

  const onResponse = (response) => {
    let tournamentDetails = response.getTournamentDetails();
    setTournamentDetails(JSON.parse(tournamentDetails));
    setPlayers(response.getPlayersList());
    let flash_prize_pools =
      JSON.parse(tournamentDetails).flash_prize_pool_values;
    if (flash_prize_pools) {
      let flashPrize = JSON.parse(flash_prize_pools);
      setFlashPrizePoolValues(flashPrize);
    }

    if (JSON.parse(tournamentDetails).has_additional_payout) {
      getAdditionalPayoutData(JSON.parse(tournamentDetails).tournament_id);
    }
  };
  const getAdditionalPayoutData = (tournamentID) => {
    grpc_client.getTournamentTemplateDetail(
      tournamentID,
      (response) => {
        let templateDetail = JSON.parse(response.getTournamentTempalteDetail());
        if (templateDetail?.additional_payout_structure) {
          setAdditionalPayoutPerHand(templateDetail?.additional_player_payout);
        }
      },
      (error) => {
        if (error) {
          showSnackBar(error);
        }
      }
    );
  };

  const subscribeTournamentOverview = (id) => {
    grpc_client.getTournamentDetails(
      id,
      onResponse,
      (custom_msg) => custom_msg && showSnackBar(custom_msg)
    );
  };

  useEffect(() => {
    if (props.id) {
      subscribeTournamentOverview(props.id);
    }
    // const subscription = setInterval(() => subscribeTournamentOverview(params.id), 5000);
    // return () => clearInterval(subscription);
    //eslint-disable-next-line
  }, [props.id]);


  return (
    <div className={`${classes.root}`}>
      <Container maxWidth="lg" align="center">
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typographyx variant="h6" color="textSecondary" pt={3}>
              Tournament Details
            </Typographyx>
          </Grid>
          <Grid item xs={12}>
            <Grid container alignItems="stretch" className={classes.headerInfo}>
              <Typographyx
                variant="button"
                color="textSecondary"
                display="inline"
                p={1}
              >
                Buy In: ${tournamentDetails?.buyin}
              </Typographyx>
              <Divider orientation="vertical" flexItem />
              <Typographyx
                variant="button"
                color="textSecondary"
                display="inline"
                p={1}
              >
                Rake: ${tournamentDetails?.rake}
              </Typographyx>
              <Divider orientation="vertical" flexItem />
              <Typographyx
                variant="button"
                color="textSecondary"
                display="inline"
                p={1}
              >
                Prize Pool: $
                {Number(
                  tournamentDetails?.user_contributed_prize_pool || 0
                ).toFixed(2)}
              </Typographyx>
              <Divider orientation="vertical" flexItem />
              <Typographyx
                variant="button"
                color="textSecondary"
                display="inline"
                p={1}
              >
                Additional Prize Pool: $
                {Number(
                  tournamentDetails?.additional_prize_pool_payout || 0
                ).toFixed(2)}
              </Typographyx>
              <Divider orientation="vertical" flexItem />
              <Typographyx
                variant="button"
                color="textSecondary"
                display="inline"
                p={1}
              >
                Min Players: {tournamentDetails?.min_players_per_table}
              </Typographyx>
              <Divider orientation="vertical" flexItem />
              <Typographyx
                variant="button"
                color="textSecondary"
                display="inline"
                p={1}
              >
                Max Players:{tournamentDetails?.max_players_per_table}
              </Typographyx>
              <Divider orientation="vertical" flexItem />
              <Typographyx
                variant="button"
                color="textSecondary"
                display="inline"
                p={1}
              >
                Joined: {players.length}
              </Typographyx>
              <Divider orientation="vertical" flexItem />
              <Typographyx
                variant="button"
                color="textSecondary"
                display="inline"
                p={1}
              >
                Status:{" "}
                <Badgex color={tournamentDetails?.status}>
                  {tournamentDetails?.status}
                </Badgex>
              </Typographyx>
            </Grid>
          </Grid>
          <Grid item xs={8}>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Typographyx variant="button" color="textSecondary" pt={3}>
                  Betting Structure
                </Typographyx>
                <PaperTable className={classes.paperTable}>
                  <TableContainer className={classes.tableContainer}>
                    <Table size="small" stickyHeader>
                      <TableHead>
                        <StyledTableRow>
                          <StyledTableCell align="center">
                            Level
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            Small Blind
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            Big Blind
                          </StyledTableCell>
                        </StyledTableRow>
                      </TableHead>
                      <TableBody>
                        {tournamentDetails?.blind_level_and_values?.map(
                          (val, i) => {
                            return (
                              <StyledTableRow key={i}>
                                <StyledTableCell
                                  component="th"
                                  padding="checkbox"
                                  align="center"
                                  scope="row"
                                >
                                  {i + 1}
                                </StyledTableCell>
                                <StyledTableCell
                                  component="th"
                                  align="center"
                                  scope="row"
                                >
                                  {val.smallBlind}
                                </StyledTableCell>
                                <StyledTableCell
                                  component="th"
                                  align="center"
                                  scope="row"
                                >
                                  {val.bigBlind}
                                </StyledTableCell>
                              </StyledTableRow>
                            );
                          }
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </PaperTable>
              </Grid>
              <Grid item xs={6}>
                <Typographyx variant="button" color="textSecondary" pt={3}>
                  Additional Prize Pool Payout Structure
                </Typographyx>
                <PaperTable className={classes.paperTable}>
                  <TableContainer className={classes.tableContainer}>
                    <Table size="small" stickyHeader>
                      <TableHead>
                        <StyledTableRow>
                          <StyledTableCell align="center">
                            Place
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            Awarded
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            Additional Payout
                          </StyledTableCell>
                        </StyledTableRow>
                      </TableHead>
                      <TableBody>
                        {JSON.parse(
                          tournamentDetails?.additional_payout_structure || "[]"
                        )?.map((val, i) => {
                          return (
                            <StyledTableRow key={i}>
                              <StyledTableCell
                                component="th"
                                padding="checkbox"
                                align="center"
                                scope="row"
                              >
                                {i + 1}
                              </StyledTableCell>
                              <StyledTableCell
                                component="th"
                                align="center"
                                scope="row"
                              >
                                {val}%
                              </StyledTableCell>
                              <StyledTableCell
                                component="th"
                                align="center"
                                scope="row"
                              >
                                {tournamentDetails?.has_additional_payout ===
                                "1" ? (
                                  <Yes
                                    style={{ color: green[500] }}
                                    fontSize="small"
                                  />
                                ) : (
                                  <No color="error" fontSize="small" />
                                )}
                              </StyledTableCell>
                            </StyledTableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </PaperTable>
              </Grid>
              <Grid item xs={12}>
                <Typographyx variant="button" color="textSecondary" pt={3}>
                  Players
                </Typographyx>
                <PaperTable className={classes.paperTable}>
                  <TableContainer className={classes.tableContainer}>
                    <Table size="small" stickyHeader>
                      <TableHead>
                        <StyledTableRow>
                          <StyledTableCell align="center">Rank</StyledTableCell>
                          <StyledTableCell align="center">
                            Player
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            Chips
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            Rebuys
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            Addons
                          </StyledTableCell>
                        </StyledTableRow>
                      </TableHead>
                      <TableBody>
                        {players.map((player, i) => {
                          return (
                            <StyledTableRow key={i}>
                              <StyledTableCell
                                component="th"
                                padding="checkbox"
                                align="center"
                                scope="row"
                              >
                                {player.getRank() || "-"}
                              </StyledTableCell>
                              <StyledTableCell
                                component="th"
                                align="center"
                                scope="row"
                              >
                                {player.getUsername()}
                              </StyledTableCell>
                              <StyledTableCell
                                component="th"
                                align="center"
                                scope="row"
                              >
                                {player.getChips()}
                              </StyledTableCell>
                              <StyledTableCell
                                component="th"
                                align="center"
                                scope="row"
                              ></StyledTableCell>
                              <StyledTableCell
                                component="th"
                                align="center"
                                scope="row"
                              ></StyledTableCell>
                            </StyledTableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </PaperTable>
              </Grid>

              {tournamentDetails?.is_flash_mode === "1" &&
                  <Grid item xs={12}>
                   <Typographyx variant="button" color="textSecondary" pt={3}>
                   ADDITIONAL PRIZE POOL PAYOUT VALUES
                 </Typographyx>
                <Grid container spacing={1}>
                  <Grid item xs={6}>
                    <PaperTable className={classes.paperTable}>
                      <TableContainer className={classes.tableContainer}>
                        <Table size="small" stickyHeader>
                          <TableHead>
                            <StyledTableRow>
                              <StyledTableCell align="center">
                                Hand
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                Prize
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                Timer
                              </StyledTableCell>
                            </StyledTableRow>
                          </TableHead>
                          <TableBody>
                            <StyledTableRow>
                              <StyledTableCell
                                component="th"
                                align="center"
                                scope="row"
                              >
                                Royal Flush
                              </StyledTableCell>
                              <StyledTableCell
                                component="th"
                                align="center"
                                scope="row"
                              >
                                {
                                  flashPrizePoolValues?.prizePool?.royal_flush
                                    .prize
                                }
                              </StyledTableCell>
                              <StyledTableCell
                                component="th"
                                align="center"
                                scope="row"
                              >
                                {
                                  flashPrizePoolValues?.prizePool?.royal_flush
                                    .timer
                                }
                              </StyledTableCell>
                            </StyledTableRow>

                            <StyledTableRow>
                              <StyledTableCell
                                component="th"
                                align="center"
                                scope="row"
                              >
                                Straight Flush
                              </StyledTableCell>
                              <StyledTableCell
                                component="th"
                                align="center"
                                scope="row"
                              >
                                {
                                  flashPrizePoolValues?.prizePool
                                    ?.straight_flush.prize
                                }
                              </StyledTableCell>
                              <StyledTableCell
                                component="th"
                                align="center"
                                scope="row"
                              >
                                {
                                  flashPrizePoolValues?.prizePool
                                    ?.straight_flush.timer
                                }
                              </StyledTableCell>
                            </StyledTableRow>

                            <StyledTableRow>
                              <StyledTableCell
                                component="th"
                                align="center"
                                scope="row"
                              >
                                Four of a Kind
                              </StyledTableCell>
                              <StyledTableCell
                                component="th"
                                align="center"
                                scope="row"
                              >
                                {
                                  flashPrizePoolValues?.prizePool
                                    ?.four_of_a_kind.prize
                                }
                              </StyledTableCell>
                              <StyledTableCell
                                component="th"
                                align="center"
                                scope="row"
                              >
                                {
                                  flashPrizePoolValues?.prizePool
                                    ?.four_of_a_kind.timer
                                }
                              </StyledTableCell>
                            </StyledTableRow>

                            <StyledTableRow>
                              <StyledTableCell
                                component="th"
                                align="center"
                                scope="row"
                              >
                                Full house
                              </StyledTableCell>
                              <StyledTableCell
                                component="th"
                                align="center"
                                scope="row"
                              >
                                {
                                  flashPrizePoolValues?.prizePool?.full_house
                                    .prize
                                }
                              </StyledTableCell>
                              <StyledTableCell
                                component="th"
                                align="center"
                                scope="row"
                              >
                                {
                                  flashPrizePoolValues?.prizePool?.full_house
                                    .timer
                                }
                              </StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow>
                              <StyledTableCell
                                component="th"
                                align="center"
                                scope="row"
                              >
                                Flush
                              </StyledTableCell>
                              <StyledTableCell
                                component="th"
                                align="center"
                                scope="row"
                              >
                                {flashPrizePoolValues?.prizePool?.flush.prize}
                              </StyledTableCell>
                              <StyledTableCell
                                component="th"
                                align="center"
                                scope="row"
                              >
                                {flashPrizePoolValues?.prizePool?.flush.timer}
                              </StyledTableCell>
                            </StyledTableRow>
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </PaperTable>
                  </Grid>
                  <Grid item xs={6}>
                    <PaperTable className={classes.paperTable}>
                      <TableContainer className={classes.tableContainer}>
                        <Table size="small" stickyHeader>
                          <TableHead>
                            <StyledTableRow>
                              <StyledTableCell align="center">
                                Hand
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                Prize
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                Timer
                              </StyledTableCell>
                            </StyledTableRow>
                          </TableHead>
                          <TableBody>
                            <StyledTableRow>
                              <StyledTableCell
                                component="th"
                                align="center"
                                scope="row"
                              >
                                Straight
                              </StyledTableCell>
                              <StyledTableCell
                                component="th"
                                align="center"
                                scope="row"
                              >
                                {
                                  flashPrizePoolValues?.prizePool?.straight
                                    .prize
                                }
                              </StyledTableCell>
                              <StyledTableCell
                                component="th"
                                align="center"
                                scope="row"
                              >
                                {
                                  flashPrizePoolValues?.prizePool?.straight
                                    .timer
                                }
                              </StyledTableCell>
                            </StyledTableRow>

                            <StyledTableRow>
                              <StyledTableCell
                                component="th"
                                align="center"
                                scope="row"
                              >
                                Three of a Kind
                              </StyledTableCell>
                              <StyledTableCell
                                component="th"
                                align="center"
                                scope="row"
                              >
                                {
                                  flashPrizePoolValues?.prizePool
                                    ?.three_of_a_kind.prize
                                }
                              </StyledTableCell>
                              <StyledTableCell
                                component="th"
                                align="center"
                                scope="row"
                              >
                                {
                                  flashPrizePoolValues?.prizePool
                                    ?.three_of_a_kind.timer
                                }
                              </StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow>
                              <StyledTableCell
                                component="th"
                                align="center"
                                scope="row"
                              >
                                Two Pair
                              </StyledTableCell>
                              <StyledTableCell
                                component="th"
                                align="center"
                                scope="row"
                              >
                                {
                                  flashPrizePoolValues?.prizePool?.two_pair
                                    .prize
                                }
                              </StyledTableCell>
                              <StyledTableCell
                                component="th"
                                align="center"
                                scope="row"
                              >
                                {
                                  flashPrizePoolValues?.prizePool?.two_pair
                                    .timer
                                }
                              </StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow>
                              <StyledTableCell
                                component="th"
                                align="center"
                                scope="row"
                              >
                                Pair
                              </StyledTableCell>
                              <StyledTableCell
                                component="th"
                                align="center"
                                scope="row"
                              >
                                {flashPrizePoolValues?.prizePool?.pair.prize}
                              </StyledTableCell>
                              <StyledTableCell
                                component="th"
                                align="center"
                                scope="row"
                              >
                                {flashPrizePoolValues?.prizePool?.pair.timer}
                              </StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow>
                              <StyledTableCell
                                component="th"
                                align="center"
                                scope="row"
                              >
                                High Card
                              </StyledTableCell>
                              <StyledTableCell
                                component="th"
                                align="center"
                                scope="row"
                              >
                                {
                                  flashPrizePoolValues?.prizePool?.high_card
                                    .prize
                                }
                              </StyledTableCell>
                              <StyledTableCell
                                component="th"
                                align="center"
                                scope="row"
                              >
                                {
                                  flashPrizePoolValues?.prizePool?.high_card
                                    .timer
                                }
                              </StyledTableCell>
                            </StyledTableRow>
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </PaperTable>
                  </Grid>
                </Grid>
                </Grid>
              }

              {tournamentDetails?.has_additional_payout === "1" && (
                <Grid item xs={12}>

                    <AdditionalPayoutTable additionalPayoutPerHand={additionalPayoutPerHand} addons_permitted={tournamentDetails.addons_permitted} />
                 </Grid>
              )}
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Typographyx variant="button" color="textSecondary">
              Informations
            </Typographyx>
            <Container align="start">
              <CardContent>
                <Typographyx
                  variant="subtitle2"
                  color="textSecondary"
                  display="inline"
                >
                  {"Name: "}
                </Typographyx>
                <Typographyx
                  variant="subtitle1"
                  color="textSecondary"
                  display="inline"
                >
                  {tournamentDetails?.name}
                </Typographyx>
                <Divider />
                <Typographyx
                  variant="subtitle2"
                  color="textSecondary"
                  display="inline"
                >
                  {"Game Type: "}
                </Typographyx>
                <Typographyx
                  variant="subtitle1"
                  color="textSecondary"
                  display="inline"
                >
                  {game_type_labels[tournamentDetails?.game_type]}{" "}
                  {table_type_labels[tournamentDetails?.table_type]}
                </Typographyx>
                <Divider />
                <div className={classes.alignItems}>
                  <Typographyx
                    variant="subtitle2"
                    color="textSecondary"
                    display="inline"
                    pr={1}
                  >
                    {"Flash Mode: "}
                  </Typographyx>
                  <Typographyx
                    variant="subtitle1"
                    color="textSecondary"
                    display="inline"
                  >
                    {tournamentDetails?.is_flash_mode === "1" ? (
                      <Yes style={{ color: green[500] }} fontSize="small" />
                    ) : (
                      <No color="error" fontSize="small" />
                    )}
                  </Typographyx>
                </div>
                <Divider />
                <div className={classes.alignItems}>
                  <Typographyx
                    variant="subtitle2"
                    color="textSecondary"
                    display="inline"
                    pr={1}
                  >
                    {"Single Hand Mode: "}
                  </Typographyx>
                  <Typographyx
                    variant="subtitle1"
                    color="textSecondary"
                    display="inline"
                  >
                    {tournamentDetails?.is_single_hand === "1" ? (
                      <Yes style={{ color: green[500] }} fontSize="small" />
                    ) : (
                      <No color="error" fontSize="small" />
                    )}
                  </Typographyx>
                </div>
                <Divider />
                <Typographyx
                  variant="subtitle2"
                  color="textSecondary"
                  display="inline"
                >
                  {"Starting Chips: "}
                </Typographyx>
                <Typographyx
                  variant="subtitle1"
                  color="textSecondary"
                  display="inline"
                >
                  {tournamentDetails?.buyin_chips}
                </Typographyx>
                <Divider />
              </CardContent>
              <Card>
                <CardContent>
                  <Typographyx
                    variant="body1"
                    color="textSecondary"
                    display="block"
                    py={1}
                  >
                    This tournament is{" "}
                    {!tournamentDetails?.is_open_for_play && "not"} open for
                    play. It is{" "}
                    {tournamentDetails?.is_for_money === "1" && "not"} free to
                    play.
                  </Typographyx>
                  <Typographyx
                    variant="body1"
                    color="textSecondary"
                    display="block"
                    py={2}
                  >
                    Blinds are increased every{" "}
                    {Number(
                      tournamentDetails?.blinds_increase_interval_seconds
                    ) / 60}{" "}
                    minutes.
                  </Typographyx>
                  <Typographyx
                    variant="body1"
                    color="textSecondary"
                    display="block"
                    py={1}
                  >
                    Up to {tournamentDetails?.rebuys_permitted} Rebuys
                    available.
                  </Typographyx>
                  <Typographyx
                    variant="body1"
                    color="textSecondary"
                    display="block"
                    py={2}
                  >
                    Up to {tournamentDetails?.addons_permitted} Addons available
                    after.
                  </Typographyx>
                  {tournamentDetails?.is_single_hand === "1" && (
                    <Typographyx
                      variant="body1"
                      color="textSecondary"
                      display="block"
                      py={2}
                    >
                      <b>Single Hand Mode</b> has been enabled for this
                      tournament. It means the tournament will complete after
                      one hand.
                    </Typographyx>
                  )}
                </CardContent>
              </Card>
            </Container>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
