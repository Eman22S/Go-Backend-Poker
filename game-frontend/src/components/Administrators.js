import React, { useEffect, useState, Fragment } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";


import useGrpcAdmin from "../contexts/grpc_client";
import { useSnackBarContext } from "../contexts/snackbar";
import Typographyx from "./fragments/Typographyx";

import PaperTable from "./fragments/PaperTable";
import StyledTableCell from './fragments/StyledTableCell';
import StyledTableRow from './fragments/StyledTableRow';

import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';
import TrackChanges from '@material-ui/icons/TrackChanges';

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
import  Checkbox  from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputBase from "@material-ui/core/InputBase";
import Paper from "@material-ui/core/Paper";
import SearchIcon from '@material-ui/icons/Search';
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
        backgroundColor: theme.palette.background.paper,
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


export default function Administrators(props) {
    const classes = useStyles();
    const grpc_client = useGrpcAdmin();
    const showSnackBar = useSnackBarContext();
    const [admins, setAdmins] = useState([]);
    const [selectedAdmin, setSelectedAdmin] = useState(null);
    const [adminInfo, setAdminInfo] = useState({
        name : "",
        username : "",
        email : "",
        password : "",
        id : null
    });
    const [adminPage, setAdminPage] = useState(1);
    const [adminCount, setAdminCount] = useState(1);
    const [loading,] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [adminOpen, setAdminOpen] = useState(false);
    const [adminRoleOpen, setAdminRoleOpen] = useState(false);
    const [adminRoles, setAdminRoles] = useState([]);
    const [roles, setRoles] = useState([]);
    const [searchTerm, setSearchTerm] = useState(null);
    const {id, name, username, email, password} = adminInfo;

    const handleAdminChange = (event)=>{
        const  {name, value} = event.target;
        setAdminInfo({
            ...adminInfo,
            [name] : value
        });
      }
    const handleAdminClose = () =>{
        setAdminOpen(false);
        setAdminInfo({
            name : "",
            username : "",
            email : "",
            password : "",
            id : null
        })
    }

   const handleAdminRoleClose = () => {
       setAdminRoleOpen(false);
   }
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        if(id){
            updateAdmin();
        }else{
            addAdmin();
        }
        
        setIsLoading(false);
    }
    useEffect(() => {
        getAdmins();
        //eslint-disable-next-line
      }, [adminPage])
      const handleAdminPaginationChange = (event, value) => {
        setAdminPage(value);
      }
      const editAdmin = ( admin)=>{
            setAdminInfo({
                ...adminInfo,
                ...admin
            })
            setAdminOpen(true);
      }
    const getAdmins = (search) => {
        let payload = {pagination_current_page: adminPage, pagination_items_per_page: 10}
        if(search && searchTerm){
            setAdminPage(1);
            payload = {
                ...payload,
                username : searchTerm,
                pagination_current_page:1
            }
        }
        grpc_client.getAdmins(payload,(resp) => {
            let res = JSON.parse(resp.getData());
            setAdmins(res.payload);
            getDistinctRoles();
            if(res.payload){
                setAdminCount(res.pagination_data.number_of_pages);
        
              }
        }, on_error);
    }
    const addAdmin = () => {
        grpc_client.addAdminData({ name: name, email:email, username:username, password:password}, (response) => {
            showSnackBar('Admin Added!', 'success')
            getAdmins();
            setAdminOpen(false);

        }, on_error);
    }

    const updateAdmin = () =>{
        grpc_client.updateAdminData({ id:id, name: name, email:email, username: username }, (response) => {
            showSnackBar('Admin Updated!', 'success');
            getAdmins();
            setAdminOpen(false);

        }, on_error);
    }
    const removeAdmin = (admin) =>{
        grpc_client.removeAdminData(admin.id, (response) => {
            showSnackBar('Admin Removed!', 'success');
            getAdmins();
            setAdminOpen(false);

        }, on_error);
    }

    const getDistinctRoles = () => {
        grpc_client.getDistinctRole({}, (response) => {
            setRoles(JSON.parse(response.getData()));
        }, on_error);
    }

    const getAdminRoles = (admin) =>{
        setSelectedAdmin(admin);
        grpc_client.getAdminRoles({id : admin.id},(response)=>{
            let json_response = JSON.parse(response.getData());
            let roles = json_response.map(role => role.role);
            console.log(roles);

            setAdminRoles(roles);
            setAdminRoleOpen(true);
            setAdminRoles(response.getData());

        })
    }
    const on_error = (custom_msg) => {
        if (custom_msg) {
            showSnackBar(custom_msg);
        }
    }

    return (
        <Fragment>
            <Container maxWidth="lg" align="center" className={classes.root}>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Typographyx variant="h6" color="textSecondary" style={{marginTop:"20px"}}>
                            <span>Administrator List</span>
                            <IconButton aria-label="delete" className={classes.iconButton} style={{float:"right"}} onClick={() => {setAdminOpen(true)}} >
                            <AddIcon />
                        </IconButton>
                        </Typographyx>
                       
                    </Grid>
                    <Grid item xs={12}>
                        <Paper component="form" className={classes.rootSearch}>    
                            <InputBase
                                className={classes.input}
                                placeholder="Search By Username"
                                inputProps={{ 'aria-label': 'search usernames' }}
                                onChange={(e)=>setSearchTerm(e.target.value)}
                                onKeyPress={(ev) => {
                                if (ev.key === 'Enter') {
                                    getAdmins(true);
                                    ev.preventDefault();
                                }
                                }}
                            />
                            <IconButton className={classes.iconButton} aria-label="search" onClick={()=> getAdmins(true) } >
                                <SearchIcon />
                            </IconButton>
                        </Paper>
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
                                                    <StyledTableCell align="center">Username</StyledTableCell>
                                                    <StyledTableCell align="center">Name</StyledTableCell>
                                                    <StyledTableCell align="center">Email</StyledTableCell>

                                                    <StyledTableCell align="center">Action</StyledTableCell>
                                                    </StyledTableRow>
                                                </TableHead>
                                                <TableBody >
                                                    {
                                                    admins && admins.map((admin) => {
                                                        return (
                                                        <StyledTableRow onClick={(event)=>{setSelectedAdmin(admin)}} key={admin.id} hover={true} selected={admin.id === selectedAdmin?.id}>
                                                            <StyledTableCell align="center"> {admin.username} </StyledTableCell>
                                                            <StyledTableCell align="center"> {admin.name} </StyledTableCell>
                                                            <StyledTableCell align="center"> {admin.email} </StyledTableCell>
                                                            <StyledTableCell align="center">
                                                                <React.Fragment>
                                                                
                                                                    <IconButton onClick={() => editAdmin(admin)}>
                                                                        <EditIcon fontSize="small"/>
                                                                    </IconButton>
                                                                        <IconButton aria-label="delete" className={classes.iconButton} onClick={() => {removeAdmin(admin)}} color="secondary">
                                                                         <DeleteIcon />
                                                                        </IconButton>
                                                                        <IconButton aria-label="delete" style={{color:"lightBlue"}} onClick={() => {
                                                                            
                                                                            getAdminRoles(admin);
                                                                            }} color="secondary">
                                                                         <TrackChanges />
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
                                                admins && Object.keys(admins) && Object.keys(admins).length === 0 ? (
                                                    <Container align="center">
                                                    <Typographyx variant="subtitle2">
                                                        No Results.
                                                    </Typographyx>
                                                    </Container>
                                                ) : (
                                                    <Box m={2}>
                                                        <Pagination count={adminCount} size="small" variant="outlined" shape="rounded" page={adminPage} onChange={(handleAdminPaginationChange)} />
                                                    </Box>
                                                    )
                                                }
                                            </TableContainer>
                                        </PaperTable>
                                    </Grid> 
                                </Grid>
                                {/* Create geofence name dialog */}
                                <Dialog open={adminRoleOpen} onClose={handleAdminRoleClose} aria-labelledby="form-dialog-title" classes={{scrollPaper: classes.scrollPaper }} >
                                    <DialogTitle id="form-dialog-title">Update adminstrator roles</DialogTitle>
                                    <DialogContent>
                                    <DialogContentText>
                                        Please select role for administrator :
                                    </DialogContentText>
                                         <div style={{display:"flex", justifyContent:"space-between", flexWrap:"wrap"}}>

                                            {roles && roles.map((role, index) =>{
                                                return(
                                                    <FormControlLabel
                                                    key={index}  
                                                    style={{flexBasis:"30%"}}                                   
                                                    control={ <Checkbox checked={adminRoles.includes(role.role)}    onChange={(event)=>{
                                                        if(event.target.checked){
                                                            grpc_client.addAdminRole({admin_id : selectedAdmin.id,role:event.target.value},(response)=>{
                                                                getAdminRoles(selectedAdmin);
                                                                showSnackBar('Role Added!', 'success')
                                                            })
                                                            
                                                        }else{
                                                            grpc_client.removeAdminRole({admin_id : selectedAdmin.id,role:event.target.value},(response)=>{
                                                                getAdminRoles(selectedAdmin);
                                                                showSnackBar('Role Removed!', 'success')

                                                            })
                                                        }
                                                    }} name={"selectALL"} value={role.role}  color="default" />}
                                                    label={<Typographyx variant="caption" color="textSecondary">{role.role}</Typographyx>}
                                                    />
                                                ) 
                                            })}
                                        </div>
                                   
                                    </DialogContent>
                                    <DialogActions>
                                    
                                    <Buttonx onClick={handleAdminRoleClose} color="primary" disabled={Boolean(isLoading)}
                                                endIcon={isLoading ? <Loading size={20} /> : null}>
                                        Done
                                    </Buttonx>
                                    </DialogActions>
                                </Dialog>
                            
                                {/* Create geofence name dialog */}
                                <Dialog open={adminOpen} onClose={handleAdminClose} aria-labelledby="form-dialog-title" classes={{scrollPaper: classes.scrollPaper }} >
                                    <DialogTitle id="form-dialog-title">{selectedAdmin ? 'Update' : 'Create'} admin</DialogTitle>
                                    <DialogContent>
                                    <DialogContentText>
                                        Please enter a administrator Information :
                                    </DialogContentText>
                                    <input style={{display: "none"}} type="text" name="fakeusernameremembered" />
                                    <input style={{display: "none"}} type="password" name="fakepasswordremembered" />
                                    <TextField
                                        autoFocus
                                        autocomplete="new-password"
                                        margin="dense"
                                        id="name"
                                        label="Admin Name"
                                        type="text"
                                        name="name"
                                        fullWidth
                                        value={name}
                                        onChange={(ev)=>{
                                            handleAdminChange(ev)
                                        }}
                                        
                                    />
                                     <TextField
                                        autoFocus
                                        autocomplete="new-password"
                                        margin="dense"
                                        id="username"
                                        label="Admin User Name"
                                        type="text"
                                        name="username"
                                        fullWidth
                                        value={username}
                                        onChange={(ev)=>{
                                        handleAdminChange(ev)
                                        }}
                                       
                                    />
                                     <TextField
                                        autoFocus
                                        autocomplete="new-password"
                                        margin="dense"
                                        id="email"
                                        label="Admin Email"
                                        type="text"
                                        name="email"
                                        fullWidth
                                        value={email}
                                        onChange={(ev)=>{
                                        handleAdminChange(ev)
                                        }}
                                        
                                    />
                                     {!id && <TextField
                                        autoFocus
                                        autocomplete="new-password"
                                        margin="dense"
                                        id="name"
                                        label="Admin Password"
                                        type="password"
                                        name="password"
                                        fullWidth
                                        value={password}
                                        onChange={(ev)=>{
                                            handleAdminChange(ev)
                                        }}
                                       
                                    />}
                                    </DialogContent>
                                    <DialogActions>
                                    <Button onClick={handleAdminClose} color="primary">
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
    );
}
