import React, { Fragment, useEffect, useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typographyx from "./fragments/Typographyx";
import useGrpcClient from "../contexts/grpc_client";
import { useSnackBarContext } from "../contexts/snackbar";
import { Box, MenuItem, Select } from "@material-ui/core";
import TextFieldx from "./fragments/TextFieldx";
import Buttonx from "./fragments/Buttonx";

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
}));

const CashBackSettings = () => {

    const classes = useStyles();
    const grpc_client = useGrpcClient();
    const showSnackBar = useSnackBarContext();
    const [globalSettings, setGlobalSettings] = useState({});
    const [clients, setClients] = useState([]);
    const [cashBackClient, setCashBackClient] = useState("0");

    const getClients = () => {
        grpc_client.getClients({pagination_current_page: 1, pagination_items_per_page: 10},(resp) => {
            let res = JSON.parse(resp.getData());
            setClients(res);
        }, on_error);
    }

    const getGlobalSettings = () => {
        grpc_client.getGlobalSettings((resp) => {
            let settings = Object.assign({}, ...JSON.parse(resp));

            setGlobalSettings(settings?.cash_back_settings || {});
            setCashBackClient(settings?.cash_back_client);

        }, on_error);
    }

    const on_error = (custom_msg) => {
        if (custom_msg) {
            showSnackBar(custom_msg);
        }
    }

    const onCashBackPercentage = (index, value) => {
        let val = parseFloat(value);
        let temp_settings = globalSettings[index] || {};
        if(temp_settings) {
            temp_settings.percentage = val;
        } else {
            temp_settings = {
                percentage: val,
                threshold: 0
            }
        }

        setGlobalSettings({...globalSettings, [index]: temp_settings});
    }

    const onCashBackPercentageThreshold = (index, value) => {
        let val = parseFloat(value);
        let temp_settings = globalSettings[index] || {};

        if(temp_settings) {
            temp_settings.threshold = val;
        } else {
            temp_settings = {
                percentage: 0,
                threshold: val
            }
        }
        setGlobalSettings({...globalSettings, [index]: temp_settings});
    }

    const handleSetCashBackClientId = (value) => {

        grpc_client.setGlobalSettings({ name: 'cash_back_client', value: value }, (response) => {
            showSnackBar('Global Setting Updated!', 'success')
            getGlobalSettings();
        }, on_error)


    }

    const handleSave = () => {
        grpc_client.setGlobalSettings({ name: 'cash_back_settings', value: globalSettings }, (response) => {
            showSnackBar('Cash Back Setting Updated!', 'success')
            getGlobalSettings();
        }, on_error)
    }


    useEffect(() => {
        getClients();
        getGlobalSettings();
        //eslint-disable-next-line
    }, []);

    return (
        <Fragment>
            <Container maxWidth="lg" align="center" className={classes.root}>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Typographyx variant="h6" color="textSecondary" pt={3}>
                            Daily Cash Back Global Settings
                        </Typographyx>
                    </Grid>
                    <Grid item xs={12}>
                        <Container maxWidth="lg" align="center" className={classes.root}>
                            <Grid container direction="row" justify="center" alignContent="center" alignItems="center">
                                <Grid item xs={4} >
                                    <Box my={5}>
                                        <div style={{display:"flex",justifyContent:"space-evenly", alignContent:"center", alignItems:"center"}}>
                                            <Typographyx variant="body2" color="textSecondary" style={{marginRight:"10px", width: '120px'}}>
                                                Cash Back Clients :
                                            </Typographyx>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="cash-back-select"
                                                value={cashBackClient}
                                                style={{padding:"10px"}}
                                                onChange={(ev)=>{
                                                    handleSetCashBackClientId(ev.target.value);
                                                    ev.preventDefault();
                                                }}
                                                >
                                                    <MenuItem value="0">All Clients</MenuItem>
                                                    {clients && clients.map((client)=>{
                                                        return (<MenuItem key ={client.id} value={client.id}>{client.name}</MenuItem>);
                                                    })}


                                            </Select>
                                        </div>
                                    </Box>
                                </Grid>
                            </Grid>
                            <Box my={5}>
                                <div style={{display:"flex",justifyContent:"space-evenly", alignContent:"center", alignItems:"center"}}>
                                    <Typographyx variant="body2" color="textSecondary" style={{marginRight:"10px", width: '120px'}}>
                                        Global Settings
                                    </Typographyx>
                                    <TextFieldx
                                        name={"cashBackPercentage_global"}
                                        size="small"
                                        variant="outlined"
                                        margin="normal"
                                        placeholder="0"
                                        required
                                        label={"Cash back %"}
                                        autoComplete={"cashBackPercentage"}
                                        onChange={(e) => onCashBackPercentage("global", e.target.value)}
                                        value={globalSettings?.global?.percentage !== undefined? globalSettings?.global?.percentage : '0'}
                                        type="number"
                                        inputProps={{
                                            inputProps: {
                                                max: 100,
                                                min: 0
                                            }
                                        }}
                                    />

                                    <TextFieldx
                                        name={"cashBackThreshold_global"}
                                        size="small"
                                        variant="outlined"
                                        margin="normal"
                                        placeholder="0"
                                        required
                                        label={"Cash back threshold"}
                                        autoComplete={"cashBackThreshold"}
                                        onChange={(e) => onCashBackPercentageThreshold("global", e.target.value)}
                                        value={globalSettings?.global?.threshold !== undefined? globalSettings?.global?.threshold : ''}
                                        type="number"
                                        inputProps={{
                                            min: 0
                                        }}
                                    />
                                </div>
                            </Box>
                            {
                                clients && clients.length > 0 && clients.map((client, index) => {
                                    return (
                                        <Box my={5} key={index}>
                                            <div style={{display:"flex",justifyContent:"space-evenly", alignContent:"center", alignItems:"center"}}>
                                                <Typographyx variant="body2" color="textSecondary" style={{marginRight:"10px", width: '120px'}}>
                                                    {client.name} Settings
                                                </Typographyx>
                                                <TextFieldx
                                                    name={`cashBackPercentage_${client.id}`}
                                                    size="small"
                                                    variant="outlined"
                                                    margin="normal"
                                                    placeholder="0"
                                                    required
                                                    label={"Cash back %"}
                                                    autoComplete={"cashBackPercentage"}
                                                    onChange={(e) => onCashBackPercentage(client.id, e.target.value)}
                                                    value={globalSettings[client.id]?.percentage !== undefined? globalSettings[client.id]?.percentage : ''}
                                                    type="number"
                                                    inputProps={{
                                                        inputProps: {
                                                            max: 100,
                                                            min: 0
                                                        }
                                                    }}
                                                />

                                                <TextFieldx
                                                    name={`cashBackThreshold_${client.id}`}
                                                    size="small"
                                                    variant="outlined"
                                                    margin="normal"
                                                    placeholder="0"
                                                    required
                                                    label={"Cash back threshold"}
                                                    autoComplete={"cashBackThreshold"}
                                                    onChange={(e) => onCashBackPercentageThreshold(client.id, e.target.value)}
                                                    value={globalSettings[client.id]?.threshold !== undefined? globalSettings[client.id]?.threshold : ''}
                                                    type="number"
                                                    inputProps={{
                                                        min: 0
                                                    }}
                                                />
                                            </div>
                                        </Box>
                                    );
                                })
                            }
                            <Grid item xs={12}>
                                <Grid item xs={2}>
                                    <Buttonx
                                        onClick={handleSave}
                                        variant="contained"
                                        color="primary"
                                        mx={1}
                                        mt={0.5}
                                    >
                                            Save
                                    </Buttonx>
                                </Grid>
                            </Grid>
                        </Container>
                    </Grid>

                </Grid>
            </Container>
        </Fragment>
    )
}

export default CashBackSettings;