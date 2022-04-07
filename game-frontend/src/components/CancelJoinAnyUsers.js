import React, { useEffect, useState, Fragment } from "react";

import { makeStyles } from "@material-ui/core/styles";

import Table from "@material-ui/core/Table";
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import Container from "@material-ui/core/Container";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Pagination from "@material-ui/lab/Pagination";
import useGrpcClient from "../contexts/grpc_client";
import { useSnackBarContext } from "../contexts/snackbar";
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Checkbox from '@material-ui/core/Checkbox'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'

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


export default function CancelJoinAnyUsers(props) {
    const classes = useStyles();
    const grpc_client = useGrpcClient();
    const showSnackBar = useSnackBarContext();
    const [searchResult, setSearchResult] = useState([])

    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showConfirmation, setShowConfirmation] = useState(false);

    const [selectAll, setSelectAll] = useState(false);
    const [selectedCount, setSelectedCount] = useState(0);
    const [state, setState] = React.useState({});
    const [showConfirmationMultiple, setShowConfirmationMultiple] = useState(false);
    const [showConfirmationAll, setShowConfirmationAll] = useState(false);
    const [actionBtnLoading, setActionBtnLoading] = useState(false);
    const [actionBtnAllLoading, setActionBtnAllLoading] = useState(false);

    const handleCloseMultiple = () => {
        setShowConfirmationMultiple(false);
    };

    const cancelSelectedUsers = () => {
        setActionBtnLoading(true);
        setShowConfirmationMultiple(false);
        let selectedUsers = Object.entries(state).map((index) => {
            return index[1].id
        }).filter(n=>n);
        setSelectAll(false);
        setState({});
        setSelectedCount(0)
        grpc_client.cancelJoinAnyMultipleUsers(selectedUsers, onSuccess, (errMsg) => errMsg && showSnackBar(errMsg))
    }

    const cancelAllUsers = () => {
        setActionBtnAllLoading(true);
        setShowConfirmationAll(false);
        grpc_client.cancelJoinAnyAllUsers( onSuccess, (errMsg) => errMsg && showSnackBar(errMsg))
    }

    const onSuccess = (response) => {
        if(!response.getStatus()) {
            showSnackBar(response.getErrorsList().join(" \n"));
        }
        fetchJoinAnyUsers(false);
        setActionBtnLoading(false);
        setActionBtnAllLoading(false);
    }

    const onCancelSelected = () => {
        if(selectedCount > 0) {
            setShowConfirmationMultiple(true);
        } else {
            showSnackBar("Please select at least one user!", "warning");
        }
    }

    const onCancelAllSelected = () => {
       setShowConfirmationAll(true);
    }

    const handleChange = (event) => {
        setSelectAll(false)
        if (event.target.checked) {
            setState({
                ...state,
                [event.target.name]: {
                checked: event.target.checked,
                id: event.target.value,
                },
            });
            setSelectedCount(prev => prev + 1)

        } else {
            setState({
                ...state,
                [event.target.name]: { checked: event.target.checked, id: null },
            });
            setSelectedCount(prev => prev - 1)
        }
    };

    const handleSelectAll = (event) => {
        if(event.target.checked) {
            setSelectAll(true);
            setSelectedCount(searchResult.length)
            setState(searchResult.map((user, index) => ({
                    checked: true,
                    id: user.id
            })));
        } else {
            setSelectAll(false);
            setState({});
            setSelectedCount(0)
        }
    }

    const on_get_response = function (response) {
        setLoading(false);
        let parsedResponse = JSON.parse(response.getData());

        setSearchResult(parsedResponse.payload);
        setCount(parsedResponse.pagination_data.number_of_pages);
        if (page > parsedResponse.pagination_data.number_of_pages) {
            setPage(1);
        }
    };

    function on_get_error(custom_msg) {
        setLoading(false);
        if (custom_msg) {
            showSnackBar(custom_msg);
        }
    }

    const handlePaginationChange = (event, value) => {
        setPage(value);
        setState({});
        setSelectAll(false);
    }

    const fetchJoinAnyUsers = (resetPage) => {
        setLoading(true);
        if (resetPage) {
            setPage(1);
            grpc_client.getJoinAnyUsers(
                { pagination_current_page: 1, pagination_items_per_page: 10 },
                on_get_response,
                on_get_error
            );
        } else {
            grpc_client.getJoinAnyUsers(
                { pagination_current_page: page, pagination_items_per_page: 10 },
                on_get_response,
                on_get_error
            );
        }
    };


    const cancelJonAnyForUser = () => {
        if (selectedUser) {
            grpc_client.cancelJoinAny(
                selectedUser.id,
                onDeactivateSuccess,
                on_get_error
            );
        }
        console.log(selectedUser.id);
        setShowConfirmation(false);
    }

    const onDeactivateSuccess = response => {
        setLoading(false);
        showSnackBar("Join any deactivated successfully for user!.", "success");
        fetchJoinAnyUsers(false);
    }

    const handleClose = () => {
        setShowConfirmation(false);
    };

    const handleCloseAll = () => {
        setShowConfirmationAll(false);
    };

    const onCancelClicked = (user) => {
        setSelectedUser(user);
        setShowConfirmation(true);
    }

    useEffect(() => {
        fetchJoinAnyUsers(false);
    // eslint-disable-next-line
    }, [page])

    return (
        <Fragment>
            <Container maxWidth="lg" align="center" className={classes.root}>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Typographyx variant="h6" color="textSecondary" pt={3}>
                            Join Any Users
                        </Typographyx>
                    </Grid>
                    <Grid item xs={12} style={{minHeight: "400px"}}>
                        <PaperTable className={classes.root}>
                            <TableContainer>
                                <Table stickyHeader>
                                    <TableHead>
                                        <StyledTableRow>
                                            <StyledTableCell>
                                                <FormGroup>
                                                    <FormControlLabel
                                                        control={ <Checkbox value={"selectAll"} checked={selectAll} onChange={handleSelectAll} name={"selectALL"} color="default" />}
                                                        label={<Typographyx variant="caption" color="textSecondary"></Typographyx>}
                                                    />
                                                </FormGroup>
                                            </StyledTableCell>
                                            <StyledTableCell align="center">Username</StyledTableCell>
                                            <StyledTableCell align="center">Name</StyledTableCell>
                                            <StyledTableCell align="center">Email</StyledTableCell>
                                            <StyledTableCell align="center">Joined Tournaments</StyledTableCell>
                                            <StyledTableCell align="right" style={{whiteSpace:"nowrap"}}>
                                                <Buttonx variant="outlined" bgcolor="secondary.main" mx={1} onClick={onCancelSelected} disabled={actionBtnLoading} endIcon={actionBtnLoading ? <Loading size={20} /> : null}>
                                                    Deactivate Selected ({selectedCount})
                                                </Buttonx>
                                                <Buttonx variant="outlined" bgcolor="secondary.main" onClick={onCancelAllSelected} disabled={actionBtnAllLoading} endIcon={actionBtnAllLoading ? <Loading size={20} /> : null}>
                                                    Deactivate All
                                                </Buttonx>
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    </TableHead>
                                    <TableBody style={styles.card_content}>
                                        {
                                            searchResult?.map( (user, index) => {
                                                return (
                                                    <StyledTableRow key={user.id} hover={true}>
                                                        <StyledTableCell component="th" scope="row" align="center">
                                                            <FormGroup row>
                                                                <FormControlLabel
                                                                    control={ <Checkbox value={user.id} checked={state[index]?.checked || selectAll} onChange={handleChange} name={index} color="default" />}
                                                                />
                                                            </FormGroup>
                                                        </StyledTableCell>
                                                        <StyledTableCell align="center"> { user.username } </StyledTableCell>
                                                        <StyledTableCell align="center"> { user.name } </StyledTableCell>
                                                        <StyledTableCell align="center"> { user.email } </StyledTableCell>
                                                        <StyledTableCell align="center"> { user.joined_tournaments } / {user.max_num_tournaments} </StyledTableCell>
                                                        <StyledTableCell align="right">
                                                        <Buttonx variant="outlined" mx={1} bgcolor="secondary.main" onClick={() => onCancelClicked(user)} >
                                                                Deactivate
                                                            </Buttonx>
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
                        Are you sure you want to deactivate join any for the user?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        No
                    </Button>
                    <Button onClick={() => cancelJonAnyForUser()} color="primary" autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog open={showConfirmationMultiple} onClose={handleCloseMultiple} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title" style={{ color: "#fff" }}>
                    <Typographyx variant="h6" style={{ color: "#fff", textTransform: "inherit" }} >
                        Confirm
                    </Typographyx>

                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to deactivate join any for  the selected {selectedCount} users?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseMultiple} color="primary">
                        No
                    </Button>
                    <Button onClick={cancelSelectedUsers} color="primary" autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog open={showConfirmationAll} onClose={handleCloseAll} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title" style={{ color: "#fff" }}>
                    <Typographyx variant="h6" style={{ color: "#fff", textTransform: "inherit" }} >
                        Confirm
                    </Typographyx>

                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to DEACTIVATE Join Any for ALL USERS?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseAll} color="primary">
                        No
                    </Button>
                    <Button onClick={cancelAllUsers} color="secondary" autoFocus>
                        Yes, I'm sure
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
}
