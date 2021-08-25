import React, { useEffect, useState, Fragment } from "react";

import { makeStyles } from "@material-ui/core/styles";

import Paper from '@material-ui/core/Paper';
import Table from "@material-ui/core/Table";

import SearchIcon from '@material-ui/icons/Search';
import Container from "@material-ui/core/Container";
import InputBase from '@material-ui/core/InputBase';
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Pagination from "@material-ui/lab/Pagination";
import IconButton from "@material-ui/core/IconButton";
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
  container: {
    minHeight: 480,
    maxHeight: 720,
  },
  input: {
    marginLeft: theme.spacing(1),
    padding: 2,
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  rootSearch: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
}));

const styles = {
    card_content: {
      paddingBottom: 1,
      paddingTop: 1,
    },
}; 
  

export default function ActiveUsers(props) {
    const classes = useStyles();
    const grpc_client = useGrpcClient();
    const showSnackBar = useSnackBarContext();
    const [searchResult, setSearchResult] = useState([])

    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);
    const [username, setUsername] = useState("");
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

    const fetchActiveUsers = (resetPage) => {
        setLoading(true);
        if (resetPage) {
            setPage(1);
        }
        if (username) {
            grpc_client.getActiveUsers(
                { username : username, pagination_current_page: page, pagination_items_per_page: 10 },
                on_search_response,
                on_search_error
            );
        }
        else {
            grpc_client.getActiveUsers(
                { pagination_current_page: page, pagination_items_per_page: 10 },
                on_search_response,
                on_search_error
            );
        }
    };

    



    useEffect(() => {
        fetchActiveUsers()
    // eslint-disable-next-line
    }, [page])

    return (
        <Fragment>
            <Container maxWidth="lg" align="center" className={classes.root}>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Typographyx variant="h6" color="textSecondary" pt={3}>
                           Current Active Users
                        </Typographyx>
                    </Grid>

                    <Grid item xs={12}>
                        <Paper component="form" className={classes.rootSearch}>    
                            <InputBase
                                className={classes.input}
                                placeholder="Search By Username"
                                inputProps={{ 'aria-label': 'search usernames' }}
                                onChange={(e)=>setUsername(e.target.value)}
                                onKeyPress={(ev) => {
                                if (ev.key === 'Enter') {
                                    fetchActiveUsers(true);
                                    ev.preventDefault();
                                }
                                }}
                            />
                            <IconButton className={classes.iconButton} aria-label="search" onClick={()=> fetchActiveUsers(true) }>
                                <SearchIcon />
                            </IconButton>
                        </Paper>
                    </Grid>
                </Grid>
                <Grid item xs={12} style={{minHeight: "400px"}}>
                    <PaperTable className={classes.root}>
                        <TableContainer>
                            <Table stickyHeader>
                                <TableHead>
                                    <StyledTableRow>
                                        <StyledTableCell align="center">Username</StyledTableCell>
                                        <StyledTableCell align="center">Name</StyledTableCell>
                                        <StyledTableCell align="center">Client</StyledTableCell>
                                        <StyledTableCell align="center">Session started at</StyledTableCell>

                                    </StyledTableRow>
                                </TableHead>
                                <TableBody style={styles.card_content}>
                                    {
                                        searchResult?.map( user => {
                                            return (
                                                <StyledTableRow key={user.id} hover={true}>
                                                    <StyledTableCell align="center"> { user.username } </StyledTableCell>
                                                    <StyledTableCell align="center"> { user.name } </StyledTableCell>
                                                    <StyledTableCell align="center"> { user.client } </StyledTableCell>
                                                    <StyledTableCell align="center"> { user.created } </StyledTableCell>

                                                </StyledTableRow>
                                            )
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
