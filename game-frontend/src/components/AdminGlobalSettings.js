import React, { useEffect, useState, Fragment } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import useGrpcClient from "../contexts/grpc_client";
import { useSnackBarContext } from "../contexts/snackbar";
import Typographyx from "./fragments/Typographyx";
import TextFieldx from "./fragments/TextFieldx";
import Buttonx from "./fragments/Buttonx";
import { Box, MenuItem, Select } from "@material-ui/core";



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


export default function PlayerAccountManagement(props) {
    const classes = useStyles();
    const grpc_client = useGrpcClient();
    const showSnackBar = useSnackBarContext();
    const [globalSettings, setGlobalSettings] = useState({});
    const [clients, setClients] = useState([]);
    const [sessionTimeout, setSessionTimeout] = useState(86400);
    const [activeTournamentLimit, setActiveTournamentLimit] = useState(0);
    const [processingFeePercentage, setProcessingFeePercentage] = useState(0);
    const [processingFeeValue, setProcessingFeeValue] = useState(0);
    const [experianUsername, setExperianUsername] = useState('');
    const [experianPassword, setExperianPassword] = useState('');
    const [joinAnyParallelTournaments, setJoinAnyParallelTournaments] = useState(0);
    // const [cashBackThreshold, setCashBackThreshold] = useState(0);
    // const [tournamentLimit, setTournamentLimit] = useState("");
    // const [addonsAmount, setAddonsAmount] = useState("");
    // const [tournamentTemplateId, setTournamentTemplateId] = useState("");

    const getGlobalSettings = () => {
        grpc_client.getGlobalSettings((resp) => {
            let global_settings = Object.assign({}, ...JSON.parse(resp));
            setGlobalSettings(global_settings);
            setSessionTimeout(global_settings?.session_timeout || 86400);
            setActiveTournamentLimit(global_settings?.active_tournament_limit || 0);
            setProcessingFeePercentage(global_settings?.processing_fee_percentage || 0);
            setProcessingFeeValue(global_settings?.processing_fee_value || 0);
            setExperianUsername(global_settings?.experian_username || '');
            setExperianPassword(global_settings?.experian_password || '');
            setJoinAnyParallelTournaments(global_settings?.join_any_parallel_tournaments || '')
        }, on_error);
    }

    useEffect(() => {
        getGlobalSettings();
        getClients();
        //eslint-disable-next-line
      }, [])

    const handlesetAlternateUI = (e) => {
        grpc_client.setGlobalSettings({ name: 'use_alternate_ui', value: e.target.checked }, (response) => {
            showSnackBar('Global Setting Updated!', 'success')
            getGlobalSettings();
        }, on_error)
    }
    const handleSetUseExperian = (e) => {
        grpc_client.setGlobalSettings({ name: 'use_experian', value: e.target.checked }, (response) => {
            showSnackBar('Global Setting Updated!', 'success')
            getGlobalSettings();
        }, on_error)
    }

    const getClients = () => {
        grpc_client.getClients({pagination_current_page: 1, pagination_items_per_page: 10},(resp) => {
            let res = JSON.parse(resp.getData());
            setClients(res);
        }, on_error);
    }
    const handleSetWebClientId = (value) => {

        grpc_client.setGlobalSettings({ name: 'web_client_id', value: value }, (response) => {
            showSnackBar('Global Setting Updated!', 'success')
            getGlobalSettings();
        }, on_error)


    }

    const on_error = (custom_msg) => {
        console.log(custom_msg);
        if (custom_msg) {
            showSnackBar(custom_msg);
        }
    }

    const onSessionTimeoutChange = (e) => {
        setSessionTimeout(e.target.value);
    }

    const onActiveTournamentLimitChange = (e) => {
        setActiveTournamentLimit(e.target.value);
    }

    const onProcessingFeePercentageChange = (e) => {
        setProcessingFeePercentage(e.target.value);
    }

    const onProcessingFeeValueChange = (e) => {
        setProcessingFeeValue(e.target.value);
    }

    const onProcessingJoinAnyParallelTournamentsChange = (e) => {
        setJoinAnyParallelTournaments(e.target.value);
    }

    const onExperianUsernameChange = (e) => {
        setExperianUsername(e.target.value);
    }

    const onExperianPasswordChange = (e) => {
        setExperianPassword(e.target.value);
    }

    const handleSetSessionTimeout = (e) => {
        grpc_client.setGlobalSettings({ name: 'session_timeout', value: sessionTimeout }, (response) => {
            showSnackBar('Global Setting Updated!', 'success')
            getGlobalSettings();
        }, on_error)
    }
    const handleSetActiveTournamentLimit = (e) => {
        grpc_client.setGlobalSettings({ name: 'active_tournament_limit', value: activeTournamentLimit }, (response) => {
            showSnackBar('Global Setting Updated!', 'success')
            getGlobalSettings();
        }, on_error)
    }

    const handleSetProcessingFeePercentage = (e) => {
        grpc_client.setGlobalSettings({ name: 'processing_fee_percentage', value: processingFeePercentage }, (response) => {
            showSnackBar('Global Setting Updated!', 'success')
            getGlobalSettings();
        }, on_error)
    }

    const handleSetProcessingJoinAnyParallelTournaments = (e) => {
        grpc_client.setGlobalSettings({ name: 'join_any_parallel_tournaments', value: joinAnyParallelTournaments }, (response) => {
            showSnackBar('Global Setting Updated!', 'success')
            getGlobalSettings();
        }, on_error)
    }

    const handleSetProcessingFeeValue = (e) => {
        grpc_client.setGlobalSettings({ name: 'processing_fee_value', value: processingFeeValue }, (response) => {
            showSnackBar('Global Setting Updated!', 'success')
            getGlobalSettings();
        }, on_error)
    }

    const handleSetExperianUsername = (e) => {
        grpc_client.setGlobalSettings({ name: 'experian_username', value: experianUsername }, (response) => {
            showSnackBar('Global Setting Updated!', 'success')
            getGlobalSettings();
        }, on_error)
    }

    const handleSetExperianPassword = (e) => {
        grpc_client.setGlobalSettings({ name: 'experian_password', value: experianPassword }, (response) => {
            showSnackBar('Global Setting Updated!', 'success')
            getGlobalSettings();
        }, on_error)
    }

    return (
        <Fragment>
            <Container maxWidth="lg" align="center" className={classes.root}>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Typographyx variant="h6" color="textSecondary" pt={3}>
                            Global Settings
                        </Typographyx>
                    </Grid>
                    <Grid item xs={12}>
                        <Container maxWidth="lg" align="center" className={classes.root}>

                            {/* <form
                                className={classes.form}
                                noValidate
                                onSubmit={handleSubmit(onSubmit)}
                            > */}
                            <Box my={4}>
                                <TextFieldx
                                    name={"exprian_username"}
                                    size="small"
                                    variant="outlined"
                                    margin="normal"
                                    placeholder="Username"
                                    required
                                    label={"Experian Username"}
                                    autoComplete={"exprian_username"}
                                    onChange={onExperianUsernameChange}
                                    value={experianUsername}
                                />
                                <Buttonx
                                        onClick={handleSetExperianUsername}
                                        variant="contained"
                                        color="primary"
                                        mx={1}
                                        mt={0.5}
                                    >
                                        Save
                                </Buttonx>
                            </Box>
                            <Box my={4}>
                                <TextFieldx
                                    name={"exprian_password"}
                                    size="small"
                                    variant="outlined"
                                    margin="normal"
                                    placeholder="Password"
                                    required
                                    label={"Experian Password"}
                                    autoComplete={"exprian_password"}
                                    onChange={onExperianPasswordChange}
                                    value={experianPassword}
                                />
                                <Buttonx
                                        onClick={handleSetExperianPassword}
                                        variant="contained"
                                        color="primary"
                                        mx={1}
                                        mt={0.5}
                                    >
                                        Save
                                </Buttonx>
                            </Box>

                            <Grid container spacing={1}>
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={globalSettings.use_experian || false}
                                                onChange={handleSetUseExperian}
                                                name="checkedB"
                                                color="primary"
                                            />
                                        }
                                        label={<Typographyx variant="body2" color="textSecondary">Use Experian Verification on User Sign Up</Typographyx>} />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={globalSettings.use_alternate_ui || false}
                                                onChange={handlesetAlternateUI}
                                                name="checkedB"
                                                color="primary"
                                            />
                                        }
                                        label={<Typographyx variant="body2" color="textSecondary">Use Alternate UI for five card games for template lobby</Typographyx>} />
                                </Grid>
                                {clients && clients.length > 0 && <Grid item xs={12}>
                                    <div style={{display:"flex",justifyContent:"center", alignContent:"center", alignItems:"center"}}>
                                    <Typographyx variant="body2" color="textSecondary" style={{marginRight:"10px"}}>Use Web Client Id for Web Users : </Typographyx><Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={globalSettings.web_client_id}
                                        style={{padding:"10px"}}
                                        onChange={(ev)=>{
                                            handleSetWebClientId(ev.target.value);
                                            ev.preventDefault();
                                        }}
                                        >
                                            {clients && clients.map((client)=>{
                                                return (<MenuItem key ={client.id} value={client.id}>{client.name}</MenuItem>);
                                            })}


                                    </Select>
                                        </div>

                                    <Box my={4}>
                                        <TextFieldx
                                            name={"session_timeout"}
                                            size="small"
                                            variant="outlined"
                                            margin="normal"
                                            placeholder="86400"
                                            required
                                            label={"Session Timout In Seconds"}
                                            autoComplete={"session_timeout"}
                                            onChange={onSessionTimeoutChange}
                                            value={sessionTimeout}
                                        />
                                        <Buttonx
                                                onClick={handleSetSessionTimeout}
                                                variant="contained"
                                                color="primary"
                                                mx={1}
                                                mt={0.5}
                                            >
                                                Save
                                        </Buttonx>
                                    </Box>
                                    {/* <Box my={12}>
                                        <TextFieldx
                                            name={"tournamentTemplateId"}
                                            size="small"
                                            variant="outlined"
                                            margin="normal"
                                            placeholder="1148"
                                            required
                                            label={"Tournament Template Id"}
                                            autoComplete={"tournamentTemplateId"}
                                            onChange={(e)=>{
                                                setTournamentTemplateId(e.target.value)
                                            }}
                                            value={tournamentTemplateId}
                                        />
                                         <TextFieldx
                                            name={"tournamentLimit"}
                                            size="small"
                                            variant="outlined"
                                            margin="normal"
                                            placeholder="1148"
                                            required
                                            label={"Tournament Limit"}
                                            autoComplete={"tournamentLimit"}
                                            onChange={(e)=>{
                                                setTournamentLimit(e.target.value)
                                            }}
                                            value={tournamentLimit}
                                        />
                                         <TextFieldx
                                            name={"addonsAmount"}
                                            size="small"
                                            variant="outlined"
                                            margin="normal"
                                            placeholder="1148"
                                            required
                                            label={"Addons Amount"}
                                            autoComplete={"addonsAmount"}
                                            onChange={(e)=>{
                                                setAddonsAmount(e.target.value)
                                            }}
                                            value={addonsAmount}
                                        />
                                        <Buttonx
                                                onClick={simulateGames}
                                                variant="contained"
                                                color="primary"
                                                mx={1}
                                                mt={0.5}
                                            >
                                                Simulate Games
                                        </Buttonx>
                                    </Box> */}
                                    <Box my={4}>
                                        <TextFieldx
                                            name={"activeTournamentLimit"}
                                            size="small"
                                            variant="outlined"
                                            margin="normal"
                                            placeholder="86400"
                                            required
                                            label={"Concurrent Tournament Limit"}
                                            autoComplete={"activeTournamentLimit"}
                                            onChange={onActiveTournamentLimitChange}
                                            value={activeTournamentLimit}
                                        />
                                        <Buttonx
                                                onClick={handleSetActiveTournamentLimit}
                                                variant="contained"
                                                color="primary"
                                                mx={1}
                                                mt={0.5}
                                            >
                                                Save
                                        </Buttonx>
                                    </Box>
                                    <Box>
                                        <TextFieldx
                                            name={"processing_fee_percentage"}
                                            size="small"
                                            variant="outlined"
                                            margin="normal"
                                            placeholder="0"
                                            required
                                            label={"Processing Fee Percentage"}
                                            autoComplete={"processing_fee_percentage"}
                                            onChange={onProcessingFeePercentageChange}
                                            value={processingFeePercentage}
                                        />
                                        <Buttonx
                                                onClick={handleSetProcessingFeePercentage}
                                                variant="contained"
                                                color="primary"
                                                mx={1}
                                                mt={0.5}
                                            >
                                                Save
                                        </Buttonx>
                                    </Box>
                                    <Box my={4}>
                                        <TextFieldx
                                            name={"processing_fee_value"}
                                            size="small"
                                            variant="outlined"
                                            margin="normal"
                                            placeholder="0"
                                            required
                                            label={"Processing Fee Fixed Amount"}
                                            autoComplete={"processing_fee_value"}
                                            onChange={onProcessingFeeValueChange}
                                            value={processingFeeValue}
                                        />
                                        <Buttonx
                                                onClick={handleSetProcessingFeeValue}
                                                variant="contained"
                                                color="primary"
                                                mx={1}
                                                mt={0.5}
                                            >
                                                Save
                                        </Buttonx>
                                    </Box>

                                    <Box my={4}>
                                        <TextFieldx
                                            name={"join_any_parallel_tournament"}
                                            size="small"
                                            variant="outlined"
                                            margin="normal"
                                            placeholder="Default 1. 0 means no cap"
                                            type="number"
                                            required
                                            label={"Join Any Parallel Games Cap"}
                                            autoComplete={"join_any_parallel_tournament"}
                                            onChange={onProcessingJoinAnyParallelTournamentsChange}
                                            value={joinAnyParallelTournaments}
                                        />
                                        <Buttonx
                                            onClick={handleSetProcessingJoinAnyParallelTournaments}
                                            variant="contained"
                                            color="primary"
                                            mx={1}
                                            mt={0.5}
                                        >
                                            Save
                                        </Buttonx>
                                    </Box>
                                </Grid>}
                                {/* <Grid item xs={12} align="center">
                                        <Grid item xs={6}>
                                            <Buttonx
                                                type="submit"
                                                variant="contained"
                                                color="primary"
                                                mt={1}
                                            >
                                                Save Global Settings
                                        </Buttonx>
                                        </Grid>
                                    </Grid> */}
                            </Grid>
                            {/* </form> */}
                        </Container>
                    </Grid>
                </Grid>
            </Container>
        </Fragment>
    );
}
