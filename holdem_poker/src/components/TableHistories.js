import { Box } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Table from "@material-ui/core/Table";
import React, { useEffect, useState } from "react";
import TableBody from "@material-ui/core/TableBody";
import Container from "@material-ui/core/Container";
import TableHead from "@material-ui/core/TableHead";
import Pagination from "@material-ui/lab/Pagination";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import TableContainer from "@material-ui/core/TableContainer";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { useHistory, Link as RouterLink } from "react-router-dom";
import {  makeStyles } from "@material-ui/core/styles";

import Loading from "./fragments/Loading";
import { useStore } from "../contexts/store";
import PaperTable from "./fragments/PaperTable";
import Typographyx from "./fragments/Typographyx";
import useGrpcClient from "../contexts/grpc_client";
import { useSnackBarContext } from "../contexts/snackbar";
import StyledTableCell from './fragments/StyledTableCell';
import StyledTableRow from './fragments/StyledTableRow';
import useLocalStorage from "./utils/hooks";

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

export default function TableHisotories({ tournament_instance_id, ...props }) {
    const classes = useStyles();
    const history = useHistory();
    const grpc_client = useGrpcClient();
    const [, updateStore] = useStore();
    const showSnackBar = useSnackBarContext();

    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [histories, setHistories] = useState(null);
    const [localUser, ] = useLocalStorage("user");
    const on_gameplay_histories_response = function (response) {
        setLoading(false);

        let parsedResponse = JSON.parse(response.getResult());
        setHistories(parsedResponse.payload);
        setCount(parsedResponse.pagination_data.number_of_pages);
    };

    function on_gameplay_histories_error(custom_msg) {
        setLoading(false);

        if (custom_msg) {
            showSnackBar(custom_msg);
        }
    }

    function get_gameplay_histories() {
        setLoading(true);

        if (tournament_instance_id) {
            grpc_client.getGameplayHistories(
                tournament_instance_id,
                on_gameplay_histories_response,
                on_gameplay_histories_error,
                localUser ? false : true
            );
        }
    }

    useEffect(() => {
        if (!histories) {
            get_gameplay_histories();
        }
    //eslint-disable-next-line
    }, [histories]);

    const handlePaginationChange = (event, value) => {
        setPage(value);
    }

    const go_to_hand_history = (gameplay_history_id) => (event) => {
        event.preventDefault();
        if(localUser){
            updateStore("gameplay_history_id", () => gameplay_history_id);
            history.push({
                pathname: "/my_tournaments",
                search: `?tid=${tournament_instance_id}&gid=${gameplay_history_id}`,
            });
        }else{
            updateStore("gameplay_history_id", () => gameplay_history_id);
        history.push({
            pathname: "/simulation_management",
            search: `?tid=${tournament_instance_id}&gid=${gameplay_history_id}`,
        });
        }
        
    };

  return (

        <div className={classes.background}>
        <Container maxWidth="md" align="center" className={classes.root}>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Typographyx variant="h5" color="textSecondary" pt={1.5}>
                        Tournament Hand Histories
                    </Typographyx>
                    <Typographyx variant="subtitle1" color="textSecondary" pb={1.5}>
                        Tournament ID {tournament_instance_id}
                    </Typographyx>
                </Grid>
                <Grid item xs={12}>
                    <Breadcrumbs aria-label="breadcrumb" separator={<NavigateNextIcon fontSize="small" />}>
                        <Link component={RouterLink} color="inherit" to="/my_tournaments">
                            Hand History
                        </Link>
                        <Typographyx color="textPrimary">
                            Tournament ID {tournament_instance_id}
                        </Typographyx>
                    </Breadcrumbs>
                </Grid>
                <Grid item xs={12}>
                    <Card>
                        <PaperTable>
                            <TableContainer component={classes.paper}>
                                <Table>
                                    <TableHead>
                                        <StyledTableRow>
                                        <StyledTableCell>Table ID </StyledTableCell>
                                        <StyledTableCell align="center">Round</StyledTableCell>
                                        <StyledTableCell align="center">Finished Time</StyledTableCell>
                                        <StyledTableCell align="center">Small Blind Username</StyledTableCell>
                                        <StyledTableCell align="center">Big Blind Username</StyledTableCell>
                                        </StyledTableRow>
                                    </TableHead>
                                    {histories && (
                                        <TableBody style={styles.card_content}>
                                        {Object.keys(histories).map((index) => (
                                            <StyledTableRow key={index} hover={true}
                                            onClick={go_to_hand_history(
                                                histories[index].gameplay_history_id
                                            )}
                                            >
                                            <StyledTableCell component="th" scope="row">
                                                {histories[index].table_id}
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                                {histories[index].round}
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                                {
                                                    histories[index].finished ? (
                                                        histories[index].finished
                                                    ) : (
                                                        <i>Not finished yet</i>
                                                    )
                                                }
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                                {histories[index].small_blind_username}
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                                {histories[index].big_blind_username}
                                            </StyledTableCell>
                                            </StyledTableRow>
                                        ))}
                                        </TableBody>
                                    )}
                                </Table>
                            </TableContainer>
                            {
                                histories && histories.length === 0 ? (
                                    <Typographyx variant="subtitle2" pb={5} pt={3}>
                                        There are no tables in this tournament yet
                                    </Typographyx>
                                ) : (
                                    <Box m={2}>
                                        <Pagination count={count} variant="outlined" shape="rounded" page={page} onChange={handlePaginationChange} />
                                    </Box>
                                )
                            }
                            {
                                loading && <Loading />
                            }
                        </PaperTable>
                    </Card>
                </Grid>
            </Grid>
        </Container>
        </div>
    );
}
