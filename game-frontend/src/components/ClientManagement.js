import React, { useEffect, useState, Fragment } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";


import useGrpcClient from "../contexts/grpc_client";
import { useSnackBarContext } from "../contexts/snackbar";
import Typographyx from "./fragments/Typographyx";

import PaperTable from "./fragments/PaperTable";
import StyledTableCell from './fragments/StyledTableCell';
import StyledTableRow from './fragments/StyledTableRow';

import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/AddCircle';

import Table from "@material-ui/core/Table";
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import Box from "@material-ui/core/Box";
import Pagination from "@material-ui/lab/Pagination";
import Loading from "./fragments/Loading";
import TextField from '@material-ui/core/TextField';
import Buttonx from './fragments/Buttonx';
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        minHeight: '100vh'
    },
    paper: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    background: {
        //backgroundColor: theme.palette.background.paper,
        backgroundImage: `url(${theme.backgroundImg.image})`,
        backgroundRepeat:  theme.backgroundImg.repeat
    },
}));


export default function ClientManagement(props) {
    const classes = useStyles();
    const grpc_client = useGrpcClient();
    const showSnackBar = useSnackBarContext();
    const [clients, setClients] = useState([]);
    const [selectedClient, setSelectedClient] = useState(null);
    const [clientName, setClientName] = useState(null);
    const [clientPage, setClientPage] = useState(1);
    const [clientCount, setClientCount] = useState(1);
    const [loading,] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [clientOpen, setClientOpen] = useState(false);



    const handleClientChange = (event)=>{
        let {value} = event.target;
        setClientName(value);
      }
    const handleClientClose = () =>{
        setClientOpen(false);
    }

    useEffect(()=>{
        if(selectedClient){
            setClientName(selectedClient.name);
        }else{
            setClientName("");
        }
    },[selectedClient]);
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        if(selectedClient){
            updateClient(clientName);
        }else{
            addClient(clientName);
        }

        setIsLoading(false);
        setSelectedClient(null);
        setClientName(null);
    }
    useEffect(() => {
        getClients();
        //eslint-disable-next-line
      }, [clientPage])
      const handleClientPaginationChange = (event, value) => {
        setClientPage(value);
      }
      const editClient = ( client)=>{
            setSelectedClient(client);
            setClientOpen(true);
      }
    const getClients = () => {
        grpc_client.getClientData({pagination_current_page: clientPage, pagination_items_per_page: 10},(resp) => {
            let res = JSON.parse(resp.getData());
            setClients(res.payload);

            if(res.payload){
                setClientCount(res.pagination_data.number_of_pages);

              }
        }, on_error);
    }
    const addClient = (name) => {
        grpc_client.addClientData({ name: name}, (response) => {
            showSnackBar('Client Added!', 'success')
            getClients();
            setClientOpen(false);

        }, on_error);
    }

    const updateClient = (name) =>{
        grpc_client.updateClientData({ id:selectedClient.id, name: name }, (response) => {
            showSnackBar('Client Updated!', 'success');
            getClients();
            setClientOpen(false);

        }, on_error);
    }
    const removeClient = (client) =>{
        grpc_client.removeClientData({ id:client.id }, (response) => {
            showSnackBar('Client Removed!', 'success');
            getClients();
            setClientOpen(false);

        }, on_error);
    }
    const on_error = (custom_msg) => {
        if (custom_msg) {
            showSnackBar(custom_msg);
        }
    }

    return (
        <div className={classes.background}>
            <Fragment>
            <Container maxWidth="lg" align="center" className={classes.root}>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Typographyx variant="h6" color="textSecondary" style={{marginTop:"20px"}}>
                            <span>Client List</span>


                            <IconButton aria-label="delete" className={classes.iconButton} style={{float:"right"}} onClick={() => {setClientOpen(true)}} >
                            <AddIcon />
                        </IconButton>
                        </Typographyx>
                        <div>


                        </div>


                    </Grid>
                    <Grid item xs={12}>
                        <Container maxWidth="lg" align="center" className={classes.root}>
                            {/* <form
                                className={classes.form}
                                noValidate
                                onSubmit={handleSubmit(onSubmit)}
                            > */}
                            <Grid container spacing={1}>
                                <Grid item xs={12}>
                                    <Grid item xs={12}>
                                        <PaperTable className={classes.root}>
                                            <TableContainer>
                                                <Table stickyHeader size="small">
                                                <TableHead>
                                                    <StyledTableRow>
                                                    <StyledTableCell align="center">ID</StyledTableCell>
                                                    <StyledTableCell align="center">Name</StyledTableCell>
                                                    <StyledTableCell align="center">Action</StyledTableCell>
                                                    </StyledTableRow>
                                                </TableHead>
                                                <TableBody >
                                                    {
                                                    clients && clients.map((client) => {
                                                        return (
                                                        <StyledTableRow onClick={(event)=>{setSelectedClient(client)}} key={client.id} hover={true} selected={client.id === selectedClient?.id}>
                                                            <StyledTableCell align="center"> {client.id} </StyledTableCell>
                                                            <StyledTableCell align="center"> {client.name} </StyledTableCell>
                                                            <StyledTableCell align="center">
                                                                <React.Fragment>

                                                                    <IconButton onClick={() => editClient(client)}>
                                                                        <EditIcon fontSize="small"/>
                                                                    </IconButton>
                                                                        <IconButton aria-label="delete" className={classes.iconButton} onClick={() => {removeClient(client)}} color="secondary">
                                                                         <DeleteIcon />
                                                                        </IconButton>
                                                                </React.Fragment>
                                                            </StyledTableCell>
                                                        </StyledTableRow>
                                                        )
                                                    })
                                                    }
                                                </TableBody>
                                                </Table>
                                                {loading && <Loading pb={5} />}
                                                {
                                                clients && Object.keys(clients) && Object.keys(clients).length === 0 ? (
                                                    <Container align="center">
                                                    <Typographyx variant="subtitle2">
                                                        No Results.
                                                    </Typographyx>
                                                    </Container>
                                                ) : (
                                                    <Box m={2}>
                                                        <Pagination count={clientCount} size="small" variant="outlined" shape="rounded" page={clientPage} onChange={(handleClientPaginationChange)} />
                                                    </Box>
                                                    )
                                                }
                                            </TableContainer>
                                        </PaperTable>
                                    </Grid>
                                </Grid>
                                {/* Create geofence name dialog */}
                                <Dialog open={clientOpen} onClose={handleClientClose} aria-labelledby="form-dialog-title" classes={{scrollPaper: classes.scrollPaper }} >
                                    <DialogTitle id="form-dialog-title">{selectedClient ? 'Update' : 'Create'} client</DialogTitle>
                                    <DialogContent>
                                    <DialogContentText>
                                        Please enter a client name :
                                    </DialogContentText>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="name"
                                        label="Client Name"
                                        type="text"
                                        name="Client"
                                        fullWidth
                                        value={clientName}
                                        onChange={(ev)=>{
                                        handleClientChange(ev)
                                        }}
                                        onKeyPress={(ev)=>{
                                        if (ev.key === 'Enter') {
                                            handleSubmit();
                                            ev.preventDefault();
                                        }
                                        }}
                                    />
                                    </DialogContent>
                                    <DialogActions>
                                    <Button onClick={handleClientClose} color="primary">
                                        Cancel
                                    </Button>
                                    <Buttonx onClick={handleSubmit} color="primary" disabled={Boolean(isLoading)}
                                                endIcon={isLoading ? <Loading size={20} /> : null}>
                                        Submit
                                    </Buttonx>
                                    </DialogActions>
                                </Dialog>
                            </Grid>
                            {/* </form> */}
                        </Container>

                    </Grid>
                </Grid>
            </Container>
        </Fragment>
        </div>
    );
}
