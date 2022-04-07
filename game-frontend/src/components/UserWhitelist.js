import React, { useEffect, useState, Fragment } from "react";

import { makeStyles } from "@material-ui/core/styles";

import Paper from '@material-ui/core/Paper';
import Table from "@material-ui/core/Table";
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
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
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

import Loading from "./fragments/Loading";
import Buttonx from "./fragments/Buttonx";
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


export default function UserWhitelist(props) {
    const classes = useStyles();
    const grpc_client = useGrpcClient();
    const showSnackBar = useSnackBarContext();
    const [searchResult, setSearchResult] = useState([])

    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showConfirmation, setShowConfirmation] = useState(false);

    const on_search_response = function (response) {
        setLoading(false);
        let parsedResponse = JSON.parse(response.getData());

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

    const whitelistUser = (id) => {
        grpc_client.whitelistUser(
            id,
            onWhitelistSuccess,
            on_search_error
        );
    }

    const removeWhitelistUser = () => {
        if (selectedUser) {
            grpc_client.removeWhitelistUser(
                selectedUser.id,
                onRemoveWhitelistSuccess,
                on_search_error
            );
        }
        console.log(selectedUser.id);
        setShowConfirmation(false);
    }

    const onWhitelistSuccess = response => {
        setLoading(false);
        showSnackBar("User whitelisted successfully!.", "success");
        fetchWwhitelistedUsers(false);
    }

    const onRemoveWhitelistSuccess = response => {
        setLoading(false);
        showSnackBar("User removed from whitelist successfully!.", "success");
        fetchWwhitelistedUsers(false);
    }

    const handlePaginationChange = (event, value) => {
        setPage(value);
    }

    const fetchWwhitelistedUsers = (resetPage) => {
        setLoading(true);
        if (resetPage) {
            setPage(1);
        }
        if (username) {
            grpc_client.searchByUsername(
                { username: username, pagination_current_page: page, pagination_items_per_page: 10 },
                on_search_response,
                on_search_error
            );
        }
        else {
            grpc_client.getWhitelistedUsers(
                { pagination_current_page: page, pagination_items_per_page: 10 },
                on_search_response,
                on_search_error
            );
        }
    };

    const handleClose = () => {
        setShowConfirmation(false);
    };

    const onRemoveClicked = (user) => {
        setSelectedUser(user);
        setShowConfirmation(true);
    }

    useEffect(() => {
        fetchWwhitelistedUsers(false);
    // eslint-disable-next-line
    }, [page])

    return (
        <Fragment>
            <Container maxWidth="lg" align="center" className={classes.root}>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Typographyx variant="h6" color="textSecondary" pt={3}>
                            User Whitelist
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
                                    fetchWwhitelistedUsers(true);
                                    ev.preventDefault();
                                }
                                }}
                            />
                            <IconButton className={classes.iconButton} aria-label="search" onClick={()=> fetchWwhitelistedUsers(true) }>
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
                                        <StyledTableCell align="center">Email</StyledTableCell>
                                        <StyledTableCell align="center">Actions</StyledTableCell>
                                    </StyledTableRow>
                                </TableHead>
                                <TableBody style={styles.card_content}>
                                    {
                                        searchResult?.map( user => {
                                            return (
                                                <StyledTableRow key={user.id} hover={true}>
                                                    <StyledTableCell align="center"> { user.username } </StyledTableCell>
                                                    <StyledTableCell align="center"> { user.name } </StyledTableCell>
                                                    <StyledTableCell align="center"> { user.email } </StyledTableCell>
                                                    <StyledTableCell align="center" padding="none">
                                                        {
                                                            user.is_whitelisted ? (
                                                                <Buttonx variant="outlined" bgcolor="secondary.main" onClick={() => onRemoveClicked(user)} >
                                                                    REMOVE FROM WHITELIST
                                                                </Buttonx>
                                                            ) : (
                                                                <Buttonx onClick={()=>whitelistUser(user.id)} variant="contained" color="primary" endIcon={loading ? <Loading size={20} /> : null} >
                                                                    ADD TO WHITELIST
                                                                </Buttonx>
                                                            )
                                                        }
                                                    </StyledTableCell>
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
            <Dialog open={showConfirmation} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title" style={{ color: "#fff" }}>
                    <Typographyx variant="h6" style={{ color: "#fff", textTransform: "inherit" }} >
                        Confirm
                    </Typographyx>

                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to remove user from whitlist?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        No
                    </Button>
                    <Button onClick={() => removeWhitelistUser()} color="primary" autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
}
