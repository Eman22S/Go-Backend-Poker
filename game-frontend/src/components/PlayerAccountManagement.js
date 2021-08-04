import React, { useEffect, useState, Fragment } from "react";

import { makeStyles } from "@material-ui/core/styles";

import Paper from '@material-ui/core/Paper';
import Table from "@material-ui/core/Table";
import Dialog from '@material-ui/core/Dialog';
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
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

import Loading from "./fragments/Loading";
import Buttonx from "./fragments/Buttonx";
import PaperTable from "./fragments/PaperTable";
import Typographyx from "./fragments/Typographyx";
import StyledTableCell from './fragments/StyledTableCell';
import StyledTableRow from './fragments/StyledTableRow';
import { format_currency } from '../utils/number_utils'
import UpdateUserBalance from "./fragments/UpdateUserBalance";

const updateTypes = ['Credit', 'Deduct'];


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
  

export default function PlayerAccountManagement(props) {
    const classes = useStyles();
    const grpc_client = useGrpcClient();
    const showSnackBar = useSnackBarContext();
    const [searchResult, setSearchResult] = useState([])

    const [page, setPage] = useState(1);
    const [updateType, setUpdateType] = useState(null);
    const [count, setCount] = useState(0);
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(false);
    const [btnLoading, setBtnLoading] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showBalanceUpdateDialog, setShowBalanceUpdateDialog] = useState(false);

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

    const handlePaginationChange = (event, value) => {
        setPage(value);
    }

    const fetchUsers = (resetPage) => {
        setLoading(true);
        if (resetPage) {
            setPage(1);
        }
        grpc_client.searchByUsername(
            { username: username, pagination_current_page: page, pagination_items_per_page: 10 },
            on_search_response,
            on_search_error
        );
    };

    const handleClose = () => {
        setShowBalanceUpdateDialog(false);
    };

    const updateBalanceClicked = (user, updateType) => {
        setSelectedUser(user);
        setUpdateType(updateType)
        setShowBalanceUpdateDialog(true);
    }

    useEffect(() => {
        fetchUsers(false);
    // eslint-disable-next-line
    }, [page])

    const handleUpdateBalance = (data) => {
        setBtnLoading(true)
        if(updateType === updateTypes[0]) {
            data.user_id = selectedUser.id
            grpc_client.updatePlayerAccountBalance(data, () => {
                setSelectedUser(null);
                setUpdateType(null)
                setBtnLoading(false)
                handleClose()
                fetchUsers(false);
                showSnackBar(updateType + ' Successful!', 'success')
            }, (customMsg) => customMsg && showSnackBar(customMsg))
        } else {
            let newData = {
                cash_amount: -1 * Number(data.cash_amount),
                points_amount: -1 * Number(data.points_amount),
                update_message: data.update_message,
                user_id: selectedUser.id
            }
            grpc_client.updatePlayerAccountBalance(newData, () => {
                setSelectedUser(null);
                setUpdateType(null)
                setBtnLoading(false)
                handleClose()
                fetchUsers(false);
                showSnackBar(updateType + ' Successful!', 'success')
            }, (customMsg) => customMsg && showSnackBar(customMsg))
        }
    }

    return (
        <Fragment>
            <Container maxWidth="lg" align="center" className={classes.root}>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Typographyx variant="h6" color="textSecondary" pt={3}>
                            Update Player Balance
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
                                    fetchUsers(true);
                                    ev.preventDefault();
                                }
                                }}
                            />
                            <IconButton className={classes.iconButton} aria-label="search" onClick={()=> fetchUsers(true) }>
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
                                        <StyledTableCell align="center">Cash in Account</StyledTableCell>
                                        <StyledTableCell align="center">Points in Account</StyledTableCell>
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
                                                    <StyledTableCell align="center"> { format_currency(user.cash_in_account) } </StyledTableCell>
                                                    <StyledTableCell align="center"> { format_currency(user.points_in_account).replace("$", '') } </StyledTableCell>
                                                    <StyledTableCell align="center" padding="none">
                                                        {updateTypes.map(val => (
                                                            <Buttonx variant="outlined" bgcolor={val === 'Credit' ? "primary.main" : "secondary.main"} onClick={() => updateBalanceClicked(user, val)} m={1} >
                                                                {val}
                                                            </Buttonx>
                                                        ))}
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
            <Dialog open={showBalanceUpdateDialog} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title" style={{ color: "#fff" }}>
                    <Typographyx variant="h6" style={{ color: "#fff", textTransform: "inherit" }} >
                        Update Player Balance
                    </Typographyx>
                    
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <UpdateUserBalance onSubmit={handleUpdateBalance} type={updateType} onCancel={handleClose} loading={btnLoading}/>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </Fragment>
    );
}
