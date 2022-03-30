import React, { useEffect, useState, Fragment } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";


import useGrpcComponentPermission from "../contexts/grpc_client";
import { useSnackBarContext } from "../contexts/snackbar";
import Typographyx from "./fragments/Typographyx";

import PaperTable from "./fragments/PaperTable";
import StyledTableCell from './fragments/StyledTableCell';
import StyledTableRow from './fragments/StyledTableRow';

import IconButton from "@material-ui/core/IconButton";
import TrackChanges from '@material-ui/icons/TrackChanges';


import Table from "@material-ui/core/Table";
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import Box from "@material-ui/core/Box";
import Pagination from "@material-ui/lab/Pagination";
import Loading from "./fragments/Loading";
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


export default function ComponentPermissionistrators(props) {
    const classes = useStyles();
    const grpc_client = useGrpcComponentPermission();
    const showSnackBar = useSnackBarContext();
    const [componentPermissions, setComponentPermissions] = useState([]);
    const [selectedComponentPermission, setSelectedComponentPermission] = useState(null);

    const [componentPermissionPage, setComponentPermissionPage] = useState(1);
    const [componentPermissionCount, setComponentPermissionCount] = useState(1);
    const [loading,] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [componentPermissionOpen, setComponentPermissionOpen] = useState(false);
    const [componentPermissionRoles, setComponentPermissionRoles] = useState([]);
    const [roles, setRoles] = useState([]);
    const [component, setComponent] = useState(null);

    const handleComponentPermissionClose = () =>{
        setComponentPermissionOpen(false);

    }


   //handle the update
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        updateComponentPermission();

        setIsLoading(false);
    }
    useEffect(() => {
        getComponentPermissions();
        //eslint-disable-next-line
      }, [componentPermissionPage])
      const handleComponentPermissionPaginationChange = (event, value) => {
        setComponentPermissionPage(value);
      }
      //set the selected component and parse the roles associted with it
      const selectComponentPermission = (componentPermission)=>{
            setSelectedComponentPermission(componentPermission);
            let roles = componentPermission.role.split(",");
            setComponentPermissionRoles(roles);
            setComponentPermissionOpen(true);
      }
      //get all component permisison paginated
    const getComponentPermissions = (search) => {
        let payload = {pagination_current_page: componentPermissionPage, pagination_items_per_page: 10}
        if(search){
            payload = {...payload, component : component, pagination_current_page:1 }
            setComponentPermissionPage(1);
        }
        grpc_client.getComponentPermissionData(payload,(resp) => {
            let res = JSON.parse(resp.getData());
            setComponentPermissions(res.payload);
            getDistinctRoles();
            if(res.payload){
                setComponentPermissionCount(res.pagination_data.number_of_pages);

            }
        }, on_error);
    }
    //update the component roles by parsing the selected roles
    const updateComponentPermission = () =>{
        console.log(componentPermissionRoles);
        let roles = componentPermissionRoles.filter((permission=>permission !== "")).join(",");

        grpc_client.updateComponentPermissionData({ id:selectedComponentPermission.id, component: selectedComponentPermission.component, roles:roles }, (response) => {
            showSnackBar('Component Permission Updated!', 'success');
            getComponentPermissions();
            setComponentPermissionOpen(false);

        }, on_error);
    }

    // get distinct roles
    const getDistinctRoles = () => {
        grpc_client.getDistinctRole({}, (response) => {
            setRoles(JSON.parse(response.getData()));
        }, on_error);
    }
    //handle error
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
                            <span>Component Permission List</span>

                        </Typographyx>

                    </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper component="form" className={classes.rootSearch}>
                            <InputBase
                                className={classes.input}
                                placeholder="Search By Component"
                                inputProps={{ 'aria-label': 'search usernames' }}
                                onChange={(e)=>setComponent(e.target.value)}
                                onKeyPress={(ev) => {
                                if (ev.key === 'Enter') {
                                    getComponentPermissions(true);
                                    ev.preventDefault();
                                }
                                }}
                            />
                            <IconButton className={classes.iconButton} aria-label="search" onClick={()=> getComponentPermissions(true) } >
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
                                                    <StyledTableCell align="center">Name</StyledTableCell>
                                                    <StyledTableCell align="center">Role</StyledTableCell>

                                                    <StyledTableCell align="center">Action</StyledTableCell>
                                                    </StyledTableRow>
                                                </TableHead>
                                                <TableBody >
                                                    {
                                                    componentPermissions && componentPermissions.map((componentPermission) => {
                                                        return (
                                                        <StyledTableRow onClick={(event)=>{setSelectedComponentPermission(componentPermission)}} key={componentPermission.id} hover={true} selected={componentPermission.id === selectedComponentPermission?.id}>
                                                            <StyledTableCell align="center"> {componentPermission.component} </StyledTableCell>
                                                            <StyledTableCell align="center"> {componentPermission.role} </StyledTableCell>

                                                            <StyledTableCell align="center">
                                                                <React.Fragment>

                                                                        <IconButton aria-label="delete" style={{color:"lightBlue"}} onClick={() => {

                                                                            selectComponentPermission(componentPermission);
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
                                                componentPermissions && Object.keys(componentPermissions) && Object.keys(componentPermissions).length === 0 ? (
                                                    <Container align="center">
                                                    <Typographyx variant="subtitle2">
                                                        No Results.
                                                    </Typographyx>
                                                    </Container>
                                                ) : (
                                                    <Box m={2}>
                                                        <Pagination count={componentPermissionCount} size="small" variant="outlined" shape="rounded" page={componentPermissionPage} onChange={(handleComponentPermissionPaginationChange)} />
                                                    </Box>
                                                    )
                                                }
                                            </TableContainer>
                                        </PaperTable>
                                    </Grid>
                                </Grid>
                                {/* Create geofence name dialog */}
                                <Dialog open={componentPermissionOpen} onClose={handleComponentPermissionClose} aria-labelledby="form-dialog-title" classes={{scrollPaper: classes.scrollPaper }} >
                                    <DialogTitle id="form-dialog-title">Update Component Permission Roles</DialogTitle>
                                    <DialogContent>
                                    <DialogContentText>
                                        Please select roles allowed for components :
                                    </DialogContentText>
                                       {roles && <FormControlLabel
                                            control={ <Checkbox value={"selectAll"} checked={componentPermissionRoles.length === roles.length}    onChange={(e)=>{
                                                if(e.target.checked){
                                                    setComponentPermissionRoles([...roles.map(role=> role.role)]);
                                                }else{
                                                    setComponentPermissionRoles([]);
                                                }
                                            }} name={"selectALL"}  color="default" />}
                                            label={<Typographyx variant="caption" color="textSecondary">Select All</Typographyx>}
                                            />}
                                        <div style={{display:"flex", justifyContent:"space-between", flexWrap:"wrap"}}>
                                            {roles && roles.map((role, index) =>{
                                                return(

                                                    <FormControlLabel
                                                    key={index}
                                                    style={{flexBasis:"30%"}}
                                                    control={ <Checkbox checked={componentPermissionRoles.includes(role.role)}    onChange={(e)=>{
                                                        if(e.target.checked){
                                                        setComponentPermissionRoles([
                                                            ...componentPermissionRoles,
                                                            role.role
                                                        ])
                                                        }else{
                                                            let temp_permission = componentPermissionRoles;
                                                            let index = temp_permission.indexOf(role.role);
                                                            temp_permission.splice(index, 1);
                                                            console.log(temp_permission);
                                                        setComponentPermissionRoles([
                                                            ...temp_permission
                                                        ])
                                                        }
                                                    }} name={"selectALL"} value={role.role}  color="default" />}
                                                    label={<Typographyx variant="caption" color="textSecondary">{role.role}</Typographyx>}
                                                    />
                                                )
                                            })}
                                        </div>
                                    </DialogContent>
                                    <DialogActions>
                                    <Buttonx onClick={handleComponentPermissionClose} color="primary" disabled={Boolean(isLoading)}
                                                endIcon={isLoading ? <Loading size={20} /> : null}>
                                        Cancel
                                    </Buttonx>
                                    <Buttonx onClick={handleSubmit} color="primary" disabled={Boolean(isLoading)}
                                                endIcon={isLoading ? <Loading size={20} /> : null}>
                                        Done
                                    </Buttonx>
                                    </DialogActions>
                                </Dialog>

                          </Grid>
                            {/* </form> */}
                        </Container>

                    </Grid>

            </Container>
        </Fragment>
    );
}
