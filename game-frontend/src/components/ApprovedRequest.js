import React, { Fragment, useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";

import Table from "@material-ui/core/Table";

import Container from "@material-ui/core/Container";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Pagination from "@material-ui/lab/Pagination";
import useGrpcClient from "../contexts/grpc_client";
import { useSnackBarContext } from "../contexts/snackbar";

import Loading from "./fragments/Loading";
import PaperTable from "./fragments/PaperTable";
import Typographyx from "./fragments/Typographyx";
import StyledTableCell from './fragments/StyledTableCell';
import StyledTableRow from './fragments/StyledTableRow';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      minHeight: '100vh'
    },

}));

export default function ApprovedRequest(props) {

    const classes = useStyles();
    const grpc_client = useGrpcClient();
    const showSnackBar = useSnackBarContext();
    const [searchResult, setSearchResult] = useState([]);

    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(false);

    const on_search_response = function (response) {
        setLoading(false);
        let parsedResponse = JSON.parse(response.getData());
        console.log(parsedResponse);
        setSearchResult(parsedResponse.payload);
        setCount(parsedResponse.pagination_data.number_of_pages);
        if (page > parsedResponse.pagination_data.number_of_pages) {
            setPage(1);
        }
    };

    function on_search_error(custom_msg) {
        setLoading(false);

        if (custom_msg) {
            showSnackBar(custom_msg);
        }
    }

    const handlePaginationChange = (event, value) => {
        setPage(value);
    }

    const fetchApprovedRequest = (resetPage) => {
        setLoading(true);
        if (resetPage) {
            setPage(1);
        }
        grpc_client.getApprovedRequests(
            { pagination_current_page: page, pagination_items_per_page: 10 },
            on_search_response,
            on_search_error
        );
    };

    useEffect(() => {
        fetchApprovedRequest();
        // eslint-disable-next-line
    }, [page]);

    return (
        <Fragment>
            <Container maxWidth="lg" align="center" className={classes.root}>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Typographyx variant="h6" color="textSecondary" pt={3}>
                          Approved Adjustment Requests
                        </Typographyx>
                    </Grid>

                </Grid>
                <Grid item xs={12} style={{minHeight: "400px"}}>
                    <PaperTable className={classes.root}>
                        <TableContainer>
                            <Table stickyHeader>
                                <TableHead>
                                    <StyledTableRow>
                                        <StyledTableCell align="center">ID</StyledTableCell>
                                        <StyledTableCell align="center">User ID</StyledTableCell>
                                        <StyledTableCell align="center">Player Name</StyledTableCell>
                                        <StyledTableCell align="center">Created By Name</StyledTableCell>
                                        <StyledTableCell align="center">Reason</StyledTableCell>

                                        <StyledTableCell align="center">Amount</StyledTableCell>

                                    </StyledTableRow>
                                </TableHead>

                                <TableBody>
                                    {
                                        searchResult?.map( request => {
                                            return (
                                                <StyledTableRow key={request.id} hover={true}>
                                                    <StyledTableCell align="center"> { request.id } </StyledTableCell>
                                                    <StyledTableCell align="center"> { request.player_id } </StyledTableCell>
                                                    <StyledTableCell align="center"> { request.player_name } </StyledTableCell>
                                                    <StyledTableCell align="center"> { request.created_by_name } </StyledTableCell>
                                                    <StyledTableCell align="center"> { request.reason } </StyledTableCell>

                                                    <StyledTableCell align="center"> { request.amount } </StyledTableCell>
                                                </StyledTableRow>
                                            );

                                        })
                                    }
                                </TableBody>
                            </Table>
                            { loading && <Loading pb={5} /> }
                            {
                                searchResult && searchResult.length === 0 ? (
                                    <Typographyx variant="subtitle2" pb={5} pt={3}>
                                        No Results.
                                    </Typographyx>
                                ) : (
                                    <Box m={2}>
                                        <Pagination count={count} variant="outlined" shape="rounded" page={page} onChange={handlePaginationChange} />
                                    </Box>
                                )
                            }
                        </TableContainer>
                    </PaperTable>
                </Grid>
            </Container>

        </Fragment>
    );
}