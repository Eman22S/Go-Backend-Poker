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
import Yes from "@material-ui/icons/CheckCircle";
import No from "@material-ui/icons/Cancel";
import green from "@material-ui/core/colors/green";
import StyledTableCell from "./fragments/StyledTableCell";
import StyledTableRow from "./fragments/StyledTableRow";

import { table_type_labels, game_type_labels } from "./utils/constants";

import { useSnackBarContext } from "./../contexts/snackbar";
import useGrpcClient from "../contexts/grpc_client";

const useStyles = makeStyles(theme => ({
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
    maxHeight: 300,
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
  const [tournament, setTournament] = useState({});
  const [flashPrizePoolValues, setFlashPrizePoolValues] = useState({});
  const [additionalPayoutPerHand, setAdditionalPayoutPerHand] = useState(null);
  const grpc_client = useGrpcClient();

  const blindValues = () => {
    const blindLevelAndValues = tournament.blind_level_and_values
      ? JSON.parse(tournament.blind_level_and_values)
      : [];

    return blindLevelAndValues?.blindValues
      ? blindLevelAndValues.blindValues
      : [];
  };

  useEffect(() => {
    setTournament(props.tournament);
    getTournamentDetail(props.tournament.id);
    // eslint-disable-next-line
  }, [props]);

  const getTournamentDetail = (tournamentID) =>{
    grpc_client.getTournamentTemplateDetailAdmin(
      tournamentID,
      (response) => {

        let templateDetail = JSON.parse(response.getTournamentTempalteDetail());
        console.log('templateDetail');
        console.log(JSON.parse(templateDetail.flash_prize_pool_values));
        if (templateDetail?.additional_payout_structure){
          setTournament({
            ...props.tournament,
            additional_payout_structure : templateDetail.additional_payout_structure
          })

          setAdditionalPayoutPerHand(templateDetail?.additional_player_payout?.hand ? templateDetail.additional_player_payout?.hand : null)

        }

        if(templateDetail?.flash_prize_pool_values){
          setFlashPrizePoolValues(JSON.parse(templateDetail.flash_prize_pool_values));
        }
      },
      (error) => {
        if (error) {
          showSnackBar(error);
      }
      });
  }

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
                Buy In: ${tournament?.buyin}
              </Typographyx>
              <Divider orientation="vertical" flexItem />
              <Typographyx
                variant="button"
                color="textSecondary"
                display="inline"
                p={1}
              >
                Rake: ${tournament?.rake}
              </Typographyx>
              <Divider orientation="vertical" flexItem />
              <Typographyx
                variant="button"
                color="textSecondary"
                display="inline"
                p={1}
              >
                Prize Pool: $
                {Number(tournament?.user_contributed_prize_pool || 0).toFixed(
                  2
                )}
              </Typographyx>
              <Divider orientation="vertical" flexItem />
              <Typographyx
                variant="button"
                color="textSecondary"
                display="inline"
                p={1}
              >
                Additional Prize Pool: $
                {Number(tournament?.additional_prize_pool_payout || 0).toFixed(
                  2
                )}
              </Typographyx>
              <Divider orientation="vertical" flexItem />
              <Typographyx
                variant="button"
                color="textSecondary"
                display="inline"
                p={1}
              >
                Min Players: {tournament?.min_players_per_table}
              </Typographyx>
              <Divider orientation="vertical" flexItem />
              <Typographyx
                variant="button"
                color="textSecondary"
                display="inline"
                p={1}
              >
                Max Players:{tournament?.max_players_per_table}
              </Typographyx>
              <Divider orientation="vertical" flexItem />
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
                        {blindValues().map((val, i) => {
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
                        })}
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
                          tournament?.additional_payout_structure || "[]"
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
                                {tournament?.has_additional_payout === "1" ? (
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
                <Typographyx variant="button" color="textSecondary">
                  Additional Information
                </Typographyx>
              </Grid>
              <Grid item xs={6}>
                <Container align="start">
                  <CardContent>
                    <div className={classes.alignItems}>
                      <Typographyx
                        variant="subtitle2"
                        color="textSecondary"
                        display="inline"
                        pr={1}
                      >
                        {"Rebuys Permitted: "}
                      </Typographyx>
                      <Typographyx
                        variant="subtitle1"
                        color="textSecondary"
                        display="inline"
                      >
                        {tournament?.rebuys_permitted === "1" ? (
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
                        {"Addons Permitted: "}
                      </Typographyx>
                      <Typographyx
                        variant="subtitle1"
                        color="textSecondary"
                        display="inline"
                      >
                        {/* eslint-disable-next-line */}
                        {tournament?.addons_permitted != 0 ? (
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
                        {"Addons Threshold: "}
                      </Typographyx>
                      <Typographyx
                        variant="subtitle1"
                        color="textSecondary"
                        display="inline"
                      >
                        {tournament?.addon_threshold}
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
                        {"Rebuys Round Start: "}
                      </Typographyx>
                      <Typographyx
                        variant="subtitle1"
                        color="textSecondary"
                        display="inline"
                      >
                        {tournament?.rebuys_round_start}
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
                        {"Rebuys Round End: "}
                      </Typographyx>
                      <Typographyx
                        variant="subtitle1"
                        color="textSecondary"
                        display="inline"
                      >
                        {tournament?.rebuys_round_end}
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
                        {"Addons Round Start: "}
                      </Typographyx>
                      <Typographyx
                        variant="subtitle1"
                        color="textSecondary"
                        display="inline"
                      >
                        {tournament?.addons_round_start}
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
                        {"Addons Round End: "}
                      </Typographyx>
                      <Typographyx
                        variant="subtitle1"
                        color="textSecondary"
                        display="inline"
                      >
                        {tournament?.addons_round_end}
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
                        {"Scheduled Breaks: "}
                      </Typographyx>
                      <Typographyx
                        variant="subtitle1"
                        color="textSecondary"
                        display="inline"
                      >
                        {tournament?.scheduled_breaks === "1" ? (
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
                        {"Time Limit (Seconds): "}
                      </Typographyx>
                      <Typographyx
                        variant="subtitle1"
                        color="textSecondary"
                        display="inline"
                      >
                        {tournament?.time_limit}
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
                        {"Pending Timeout (Seconds): "}
                      </Typographyx>
                      <Typographyx
                        variant="subtitle1"
                        color="textSecondary"
                        display="inline"
                      >
                        {tournament?.pending_timeout_seconds}
                      </Typographyx>
                    </div>
                  </CardContent>
                </Container>
              </Grid>
              <Grid item xs={6}>
                <Container align="start">
                  <CardContent>
                    <div className={classes.alignItems}>
                      <Typographyx
                        variant="subtitle2"
                        color="textSecondary"
                        display="inline"
                        pr={1}
                      >
                        {"Small Blind Starting Value: "}
                      </Typographyx>
                      <Typographyx
                        variant="subtitle1"
                        color="textSecondary"
                        display="inline"
                      >
                        {tournament?.small_blind_starting_value}
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
                        {"Small Blind Max Value: "}
                      </Typographyx>
                      <Typographyx
                        variant="subtitle1"
                        color="textSecondary"
                        display="inline"
                      >
                        {tournament?.small_blind_max_value}
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
                        {"Table Timer: "}
                      </Typographyx>
                      <Typographyx
                        variant="subtitle1"
                        color="textSecondary"
                        display="inline"
                      >
                        {tournament?.table_timer}
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
                        {"Tour Players Min: "}
                      </Typographyx>
                      <Typographyx
                        variant="subtitle1"
                        color="textSecondary"
                        display="inline"
                      >
                        {tournament?.tour_players_min}
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
                        {"Tour Players Max: "}
                      </Typographyx>
                      <Typographyx
                        variant="subtitle1"
                        color="textSecondary"
                        display="inline"
                      >
                        {tournament?.tour_players_max}
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
                        {"Blind Increase (Seconds): "}
                      </Typographyx>
                      <Typographyx
                        variant="subtitle1"
                        color="textSecondary"
                        display="inline"
                      >
                        {tournament?.blinds_increase_interval_seconds}
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
                        {"Blind Increase Interval Rounds: "}
                      </Typographyx>
                      <Typographyx
                        variant="subtitle1"
                        color="textSecondary"
                        display="inline"
                      >
                        {tournament?.blinds_increase_interval_rounds}
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
                        {"Table Max Num Raises: "}
                      </Typographyx>
                      <Typographyx
                        variant="subtitle1"
                        color="textSecondary"
                        display="inline"
                      >
                        {tournament?.table_max_num_raises}
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
                        {"Rebalancing Table Algorithm: "}
                      </Typographyx>
                      <Typographyx
                        variant="subtitle1"
                        color="textSecondary"
                        display="inline"
                      >
                        {tournament?.rebalancing_table_algorithm}
                      </Typographyx>
                    </div>
                  </CardContent>
                </Container>
              </Grid>


              <Grid item xs={12}>
                  <Typographyx variant="button" color="textSecondary" pt={3}>
                  ADDITIONAL PRIZE POOL PAYOUT (FLASH MODE PAYOUT)
                  </Typographyx>
                  <Grid container spacing={1}>

              <Grid item xs={6}>
                  <PaperTable className={classes.paperTable}>
                      <TableContainer className={classes.tableContainer}>
                          <Table size="small" stickyHeader>
                              <TableHead>
                                  <StyledTableRow>
                                      <StyledTableCell align="center">Hand</StyledTableCell>
                                      <StyledTableCell align="center">Prize</StyledTableCell>
                                      <StyledTableCell align="center">Timer</StyledTableCell>
                                  </StyledTableRow>
                              </TableHead>
                              <TableBody>
                                  <StyledTableRow >
                                      <StyledTableCell component="th" align="center" scope="row">
                                          Royal Flush
                                      </StyledTableCell>
                                      <StyledTableCell component="th" align="center" scope="row">
                                          { flashPrizePoolValues?.prizePool?.royal_flush.prize}
                                      </StyledTableCell>
                                      <StyledTableCell component="th" align="center" scope="row">
                                          { flashPrizePoolValues?.prizePool?.royal_flush.timer }
                                      </StyledTableCell>

                                  </StyledTableRow>

                                  <StyledTableRow >
                                  <StyledTableCell component="th" align="center" scope="row">
                                          Straight Flush
                                      </StyledTableCell>
                                      <StyledTableCell component="th" align="center" scope="row">
                                          { flashPrizePoolValues?.prizePool?.straight_flush.prize}
                                      </StyledTableCell>
                                      <StyledTableCell component="th" align="center" scope="row">
                                          { flashPrizePoolValues?.prizePool?.straight_flush.timer }
                                      </StyledTableCell>
                                  </StyledTableRow>

                                  <StyledTableRow >
                                  <StyledTableCell component="th" align="center" scope="row">
                                          Four of a Kind
                                      </StyledTableCell>
                                     <StyledTableCell component="th" align="center" scope="row">
                                          { flashPrizePoolValues?.prizePool?.four_of_a_kind.prize}
                                      </StyledTableCell>
                                      <StyledTableCell component="th" align="center" scope="row">
                                          { flashPrizePoolValues?.prizePool?.four_of_a_kind.timer }
                                      </StyledTableCell>
                                  </StyledTableRow>

                                  <StyledTableRow>
                                  <StyledTableCell component="th" align="center" scope="row">
                                          Full house
                                      </StyledTableCell>
                                      <StyledTableCell component="th" align="center" scope="row">
                                          { flashPrizePoolValues?.prizePool?.full_house.prize}
                                      </StyledTableCell>
                                      <StyledTableCell component="th" align="center" scope="row">
                                          { flashPrizePoolValues?.prizePool?.full_house.timer }
                                      </StyledTableCell>
                                  </StyledTableRow>
                                  <StyledTableRow>
                                  <StyledTableCell component="th" align="center" scope="row">
                                          Flush
                                      </StyledTableCell>
                                      <StyledTableCell component="th" align="center" scope="row">
                                          { flashPrizePoolValues?.prizePool?.flush.prize}
                                      </StyledTableCell>
                                      <StyledTableCell component="th" align="center" scope="row">
                                          { flashPrizePoolValues?.prizePool?.flush.timer }
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
                                      <StyledTableCell align="center">Hand</StyledTableCell>
                                      <StyledTableCell align="center">Prize</StyledTableCell>
                                      <StyledTableCell align="center">Timer</StyledTableCell>
                                  </StyledTableRow>
                              </TableHead>
                              <TableBody>
                                  <StyledTableRow >
                                      <StyledTableCell component="th" align="center" scope="row">
                                          Straight
                                      </StyledTableCell>
                                      <StyledTableCell component="th" align="center" scope="row">
                                          { flashPrizePoolValues?.prizePool?.straight.prize}
                                      </StyledTableCell>
                                      <StyledTableCell component="th" align="center" scope="row">
                                          { flashPrizePoolValues?.prizePool?.straight.timer }
                                      </StyledTableCell>
                                  </StyledTableRow>

                                  <StyledTableRow >
                                      <StyledTableCell component="th" align="center" scope="row">
                                          Three of a Kind
                                      </StyledTableCell>
                                      <StyledTableCell component="th" align="center" scope="row">
                                          { flashPrizePoolValues?.prizePool?.three_of_a_kind.prize}
                                      </StyledTableCell>
                                      <StyledTableCell component="th" align="center" scope="row">
                                          { flashPrizePoolValues?.prizePool?.three_of_a_kind.timer }
                                      </StyledTableCell>
                                      </StyledTableRow>
                                  <StyledTableRow>
                                      <StyledTableCell component="th" align="center" scope="row">
                                          Two Pair
                                      </StyledTableCell>
                                      <StyledTableCell component="th" align="center" scope="row">
                                          { flashPrizePoolValues?.prizePool?.two_pair.prize}
                                      </StyledTableCell>
                                      <StyledTableCell component="th" align="center" scope="row">
                                          { flashPrizePoolValues?.prizePool?.two_pair.timer }
                                      </StyledTableCell>
                                  </StyledTableRow>
                                  <StyledTableRow >
                                      <StyledTableCell component="th" align="center" scope="row">
                                          Pair
                                      </StyledTableCell>
                                      <StyledTableCell component="th" align="center" scope="row">
                                          { flashPrizePoolValues?.prizePool?.pair.prize}
                                      </StyledTableCell>
                                      <StyledTableCell component="th" align="center" scope="row">
                                          { flashPrizePoolValues?.prizePool?.pair.timer }
                                      </StyledTableCell>
                                    </StyledTableRow>
                                    <StyledTableRow>
                                      <StyledTableCell component="th" align="center" scope="row">
                                          High Card
                                      </StyledTableCell>
                                      <StyledTableCell component="th" align="center" scope="row">
                                          { flashPrizePoolValues?.prizePool?.high_card.prize}
                                      </StyledTableCell>
                                      <StyledTableCell component="th" align="center" scope="row">
                                          { flashPrizePoolValues?.prizePool?.high_card.timer }
                                      </StyledTableCell>
                                  </StyledTableRow>

                              </TableBody>
                          </Table>
                      </TableContainer>
                  </PaperTable>
              </Grid>
              </Grid>
              </Grid>


              <Grid item xs={12}>
                  <Typographyx variant="button" color="textSecondary" pt={3}>
                  ADDITIONAL PAYOUT BASED ON PLAYER HAND
                  </Typographyx>
                  <PaperTable className={classes.paperTable}>
                      <TableContainer className={classes.tableContainer}>
                          <Table size="small" stickyHeader>
                              <TableHead>
                                  <StyledTableRow>
                                      <StyledTableCell align="center">Hand</StyledTableCell>
                                      <StyledTableCell align="center">Payout</StyledTableCell>
                                      <StyledTableCell align="center">Hand</StyledTableCell>
                                      <StyledTableCell align="center">Payout</StyledTableCell>
                                  </StyledTableRow>
                              </TableHead>
                              <TableBody>
                                  <StyledTableRow >
                                      <StyledTableCell component="th" align="center" scope="row">
                                          Royal Flush
                                      </StyledTableCell>
                                      <StyledTableCell component="th" align="center" scope="row">
                                          { additionalPayoutPerHand?.royal_flush ? additionalPayoutPerHand.royal_flush : 0 }
                                      </StyledTableCell>
                                      <StyledTableCell component="th" align="center" scope="row">
                                          Straight Flush
                                      </StyledTableCell>
                                      <StyledTableCell component="th" align="center" scope="row">
                                          { additionalPayoutPerHand?.straight_flush ? additionalPayoutPerHand.straight_flush : 0 }
                                      </StyledTableCell>
                                  </StyledTableRow>
                                  <StyledTableRow >
                                      <StyledTableCell component="th" align="center" scope="row">
                                          Four of a Kind
                                      </StyledTableCell>
                                      <StyledTableCell component="th" align="center" scope="row">
                                          { additionalPayoutPerHand?.four_of_a_kind ? additionalPayoutPerHand.four_of_a_kind : 0 }
                                      </StyledTableCell>
                                      <StyledTableCell component="th" align="center" scope="row">
                                          Full house
                                      </StyledTableCell>
                                      <StyledTableCell component="th" align="center" scope="row">
                                          { additionalPayoutPerHand?.full_house ? additionalPayoutPerHand.full_house : 0 }
                                      </StyledTableCell>
                                  </StyledTableRow>
                                  <StyledTableRow >
                                      <StyledTableCell component="th" align="center" scope="row">
                                          Four Aces
                                      </StyledTableCell>
                                      <StyledTableCell component="th" align="center" scope="row">
                                          { additionalPayoutPerHand?.four_aces ? additionalPayoutPerHand.four_aces : 0 }
                                      </StyledTableCell>
                                      <StyledTableCell component="th" align="center" scope="row">
                                          Four Fives Through Kings
                                      </StyledTableCell>
                                      <StyledTableCell component="th" align="center" scope="row">
                                          { additionalPayoutPerHand?.four_fives_through_kings ? additionalPayoutPerHand.four_fives_through_kings : 0 }
                                      </StyledTableCell>
                                  </StyledTableRow>
                                  <StyledTableRow >
                                      <StyledTableCell component="th" align="center" scope="row">
                                          Four Fives Through Kings
                                      </StyledTableCell>
                                      <StyledTableCell component="th" align="center" scope="row">
                                          { additionalPayoutPerHand?.four_twos_threes_or_fours ? additionalPayoutPerHand.four_twos_threes_or_fours : 0 }
                                      </StyledTableCell>
                                      <StyledTableCell component="th" align="center" scope="row">
                                          Flush
                                      </StyledTableCell>
                                      <StyledTableCell component="th" align="center" scope="row">
                                          { additionalPayoutPerHand?.flush ? additionalPayoutPerHand.flush : 0 }
                                      </StyledTableCell>
                                  </StyledTableRow>
                                  <StyledTableRow >
                                      <StyledTableCell component="th" align="center" scope="row">
                                          Straight
                                      </StyledTableCell>
                                      <StyledTableCell component="th" align="center" scope="row">
                                          { additionalPayoutPerHand?.straight ? additionalPayoutPerHand.straight : 0 }
                                      </StyledTableCell>
                                      <StyledTableCell component="th" align="center" scope="row">
                                          Three of a Kind
                                      </StyledTableCell>
                                      <StyledTableCell component="th" align="center" scope="row">
                                          { additionalPayoutPerHand?.three_of_a_kind ? additionalPayoutPerHand.three_of_a_kind : 0 }
                                      </StyledTableCell>
                                  </StyledTableRow>
                                  <StyledTableRow >
                                      <StyledTableCell component="th" align="center" scope="row">
                                          Two Pair
                                      </StyledTableCell>
                                      <StyledTableCell component="th" align="center" scope="row">
                                          { additionalPayoutPerHand?.two_pair ? additionalPayoutPerHand.two_pair : 0 }
                                      </StyledTableCell>
                                      <StyledTableCell component="th" align="center" scope="row">
                                          Pair
                                      </StyledTableCell>
                                      <StyledTableCell component="th" align="center" scope="row">
                                          { additionalPayoutPerHand?.pair ? additionalPayoutPerHand.pair : 0 }
                                      </StyledTableCell>
                                  </StyledTableRow>
                                  <StyledTableRow >
                                      <StyledTableCell component="th" align="center" scope="row">
                                          Jacks or Better
                                      </StyledTableCell>
                                      <StyledTableCell component="th" align="center" scope="row">
                                          { additionalPayoutPerHand?.jacks_or_better ? additionalPayoutPerHand.jacks_or_better : 0 }
                                      </StyledTableCell>
                                      <StyledTableCell component="th" align="center" scope="row">
                                          One Jack or Better
                                      </StyledTableCell>
                                      <StyledTableCell component="th" align="center" scope="row">
                                          { additionalPayoutPerHand?.one_jack_or_better ? additionalPayoutPerHand.one_jack_or_better : 0 }
                                      </StyledTableCell>
                                  </StyledTableRow>
                                  <StyledTableRow >
                                      <StyledTableCell component="th" align="center" scope="row">
                                          High Card
                                      </StyledTableCell>
                                      <StyledTableCell component="th" align="center" scope="row">
                                          { flashPrizePoolValues?.prizePool?.high_card.prize}
                                      </StyledTableCell>
                                      <StyledTableCell component="th" align="center" scope="row">
                                          { flashPrizePoolValues?.prizePool?.high_card.timer }
                                      </StyledTableCell>
                                  </StyledTableRow>
                              </TableBody>
                          </Table>
                      </TableContainer>
                  </PaperTable>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Typographyx variant="button" color="textSecondary">
              Basic Information
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
                  {tournament?.name}
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
                  {game_type_labels[tournament?.game_type]}{" "}
                  {table_type_labels[tournament?.table_type]}
                </Typographyx>
                <Divider />
                <div>
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
                    {tournament?.buyin_chips}
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
                    {"Table Type: "}
                  </Typographyx>
                  <Typographyx
                    variant="subtitle1"
                    color="textSecondary"
                    display="inline"
                  >
                    {tournament?.table_type}
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
                    {"Tournament Type: "}
                  </Typographyx>
                  <Typographyx
                    variant="subtitle1"
                    color="textSecondary"
                    display="inline"
                  >
                    {tournament?.type}
                  </Typographyx>
                </div>
              </CardContent>
              <Card>
                <CardContent>
                  <Typographyx
                    variant="body1"
                    color="textSecondary"
                    display="block"
                    py={1}
                  >
                    This tournament is {!tournament?.is_open_for_play && "not"}{" "}
                    open for play. It is{" "}
                    {tournament?.is_for_money === "1" && "not"} free to play.
                  </Typographyx>
                  <Typographyx
                    variant="body1"
                    color="textSecondary"
                    display="block"
                    py={2}
                  >
                    Blinds are increased every{" "}
                    {Number(tournament?.blinds_increase_interval_seconds) / 60}{" "}
                    minutes.
                  </Typographyx>
                  <Typographyx
                    variant="body1"
                    color="textSecondary"
                    display="block"
                    py={1}
                  >
                    Up to {tournament?.rebuys_permitted} Rebuys available.
                  </Typographyx>
                  <Typographyx
                    variant="body1"
                    color="textSecondary"
                    display="block"
                    py={2}
                  >
                    Up to {tournament?.addons_permitted} Addons available.
                  </Typographyx>
                  {tournament?.is_single_hand === "1" && (
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
