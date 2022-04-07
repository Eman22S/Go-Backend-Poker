import React, { useState, useCallback, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import Pagination from "@material-ui/lab/Pagination";
import Box from "@material-ui/core/Box";
import { useStore } from "../contexts/store";

import Typographyx from "../components/fragments/Typographyx";
import PaperTable from "./fragments/PaperTable";
import Loading from "./fragments/Loading";
import StyledTableCell from './fragments/StyledTableCell';
import StyledTableRow from './fragments/StyledTableRow';
import Badgex from "./fragments/Badgex";

import { makeStyles } from "@material-ui/core/styles";
import useGrpcClient from '../contexts/grpc_client';
import { useSnackBarContext } from '../contexts/snackbar';

import { table_type_labels, game_type_labels } from "./utils/constants";

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: '100vh',
        backgroundColor: theme.palette.background.default,
    },
    background: {
        backgroundColor: theme.palette.background.paper,
        //margin: theme.spacing(2),
        backgroundImage: `url(${theme.backgroundImg.image})`,
        backgroundRepeat:  theme.backgroundImg.repeat
    },
    row: {
      padding: '20px'
    }
}));

const styles = {
  card_content: {
    paddingBottom: 1,
    paddingTop: 1,
  },
};

export const ActiveFiveTurboTournaments = () => {

    const classes = useStyles();
    const history = useHistory();

    const grpc_client = useGrpcClient();
    const [, updateStore] = useStore();

    const showSnackBar = useSnackBarContext();

    const [loading, setLoading] = useState(false);
    const [joining, setJoining] = useState(false);
    const [waiting, ] = useState(false);

    const [tournaments, setTournaments] = useState(null);
    const [selectedTournament, setSelectedTournament] = useState(null);

    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);

    const get_tournaments = useCallback(
        function () {
            setLoading(true);

            const data = {
                status: [],
                pagination_current_page: page,
                pagination_items_per_page: 10
            };

            grpc_client.getPlayerTournaments(data, on_tournaments_response, on_tournaments_error)
        //eslint-disable-next-line
        }, [])

    const on_tournaments_response = function (response) {
        setLoading(false);
        console.log(response)
        let parsed_touranments = JSON.parse(response.getResult());
        console.log('response',parsed_touranments)

        setTournaments(parsed_touranments.payload);
        setCount(parsed_touranments.pagination_data.number_of_pages);
    };

    function on_tournaments_error(custom_msg) {
        setLoading(false);

        if (custom_msg) {
          showSnackBar(custom_msg);
        }
    }

    function join_tournament(tournament_instance_id) {
      return (event) => {
        setSelectedTournament(tournament_instance_id);
        setJoining(true);

        grpc_client.joinTournament(
          tournament_instance_id,
          0,
          on_join_response,
          on_join_error
        );
      };
    }

    const on_join_response = function (joinResponse) {
      setJoining(false);

      if (joinResponse.was_subscribed) {
        let tableStateResponse = {
          game_meta: {
            tournament_instance_id: joinResponse.tournament_instance_id,
            table_instance_id: joinResponse.table_instance_id,
          },
        };
        updateStore("startingTableState", () => tableStateResponse);
       history.push(`/gameplay/${joinResponse.tournament_instance_id}`);

      } else {
        if (joinResponse.error_msgs) {
          setSelectedTournament(false);
          for (let err of joinResponse.error_msgs) {
            showSnackBar(window._(err), "error");
            console.warn("Subscribe tournament error: ", err);
          }
        }
      }
    };

    function on_join_error(custom_msg) {
      setSelectedTournament(null);
      setJoining(false);

      if (custom_msg) {
        showSnackBar(custom_msg);
      }
    }

    // On Pagination Changed
    const handlePaginationChange = (event, value) => {
        setPage(value);
    }

    useEffect(() => {
        get_tournaments();
    }, [get_tournaments]);

    return (
      <div className={classes.background}>
        <Container component="main" maxWidth="lg" align="center" className={classes.root}>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Typographyx variant="h6" color="textSecondary" pt={3}>
                        Active Five Turbo Tournaments
                    </Typographyx>
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
                                    </StyledTableRow>
                                </TableHead>
                                {
                                    tournaments && !loading && (
                                        <TableBody style={styles.card_content}>
                                            {Object.keys(tournaments).map((index) => (
                                                <StyledTableRow
                                                    key={index}
                                                    hover={true}
                                                    onClick={join_tournament(
                                                      tournaments[index].tournament_instance_id
                                                    )}
                                                >
                                                    <StyledTableCell component="th" scope="row" className={classes.row}>
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
                                                </StyledTableRow>
                                            ))}
                                        </TableBody>
                                    )
                                }
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
    );
}