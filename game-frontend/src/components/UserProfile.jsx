import React, { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import DateFnsAdapter from "@date-io/date-fns";

import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { MenuItem, Select } from "@material-ui/core";
import InputLabel from '@material-ui/core/InputLabel';

import Typographyx from "./fragments/Typographyx";
import useGrpcClient from "../contexts/grpc_client";
import { useSnackBarContext } from "../contexts/snackbar";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  label: {
    fontSize: 14,
  },
  value: {
    fontSize: 24,
  },
  pos: {
    marginBottom: 12,
  },
  disabled: {
    "&$disabled": {
      backgroundColor: "#0A2042",
    },
  },
});
const UserProfile = () => {
  const [user, setUser] = useState({});
  const [editing, setEditing] = useState(false);
  const [working, setWorking] = useState(false);
  const [clients, setClients] = useState([]);
  const classes = useStyles();
  const { register, handleSubmit, errors, reset } = useForm();
  const dateFns = new DateFnsAdapter();
  const snackbar = useSnackBarContext();
  const grpc_client = useGrpcClient();

  const grpcClient = useGrpcClient();

  const getUser = useCallback(
    function () {
      grpcClient.getUserInfo(onGetUser, onGetUserError);
    },
    //eslint-disable-next-line
    [grpcClient]
  );

  const onGetUser = function (response) {
    const responseUser = {
      firstName: response.getFirstName(),
      lastName: response.getLastName(),
      email: response.getEmail(),
      address: response.getAddress(),
      dob: dateFns.format(
        dateFns.date(response.getDateOfBirth()),
        "yyyy-MM-dd"
      ),
      phone: response.getPhone(),
      processingFeePercent: response.getProcessingFeePercentage(),
      processingFeeValue: response.getProcessingFeeValue()
      //user_rewards_id : response.getUserRewardsId()
    };

    console.log(responseUser);

    let rewardObj = JSON.parse(response.getUserRewardsId());
    let newObj  = Object.assign({}, ...rewardObj);
    setClientRewardData(newObj);
    setClientRewardListTemp(rewardObj)


    setUser(responseUser);
    reset(responseUser);
  };

  const onGetUserError = function (error) {
    console.log(error);
  };

  const beginEdit = () => setEditing(true);

  const cancelEdit = () => setEditing(false);

  const resetForm = () => reset(user);

  const onSubmit = data => {
    console.log("submitted", data);
    setWorking(true);

    // Format the date string to the correct format
    data.dob = dateFns.format(dateFns.date(data.dob), "MM-dd-yyyy");

    data.user_rewards_id = JSON.stringify(clientRewardData)
    console.log("on submit")
    console.log(data)


    grpcClient.updateUserInfo(data, onUpdateResponse, onUpdateError);
  };

  const [selectedClient, setSelectedClient] = useState("");
  const [clientRewardData, setClientRewardData] = useState({});
  const [clientRewardListTemp, setClientRewardListTemp] = useState([]);

  const [clientRewardList, setClientRewardList] = useState([]);

  const [currentRewardId, setCurrentRewardId] = useState("");


  const handleClientChange = (value) => {
    setSelectedClient(value);

    if (clientRewardData[value]){
      setCurrentRewardId(clientRewardData[value])
    }else{
      setCurrentRewardId("")
    }
  }

  const handleRewardChange = (e) => {
    let value = e.target.value
    setCurrentRewardId(value);
    console.log("reward "+value)
    if(selectedClient){
      let data = clientRewardData;
      data[selectedClient] = value;
      setClientRewardData(data)
      console.log(data)
    }

    //selectedClient?clientRewardData[selectedClient]?clientRewardData[selectedClient]:"":""

  }


  const getClients = () => {
    grpc_client.getClients({pagination_current_page: 1, pagination_items_per_page: 10},(resp) => {
        let res = JSON.parse(resp.getData());
        setClients(res);
        getUser();
    }, ()=>{
      console.log("error")
    });
  }


  useEffect(() => {

    let rewardList = []
    console.log("???")
    clientRewardListTemp.map((value)=>{
      let client_id = Object.keys(value)[0];
      console.log("client id "+client_id)
      console.log(clients)
      console.log(value)
      console.log(value[client_id])
      var filteredClients = clients.filter((obj) => {
          return (obj.id === client_id);
      });
      console.log(filteredClients);
      let obj = {
        reward_id:value[client_id]
      }

      //eslint-disable-next-line
      if(client_id == 0){
        obj["client_name"] = "Default"
      }
      else if(filteredClients.length > 0){
        obj["client_name"] = filteredClients[0].name
      }else{
        obj["client_name"] = ""
      }

      rewardList.push(obj)
      return obj;
    })
    setClientRewardList(rewardList)

}, [clients,clientRewardListTemp]);


  const onUpdateResponse = response => {
    if (response.getStatus() === "204") {
      snackbar("User information updated successfully.", "success");
      setEditing(false);
      setWorking(false);
      getUser();
    }
  };

  const onUpdateError = error => {
    setWorking(false);
    snackbar("Failed to update user information. Please try again!");
  };



  useEffect(() => {
    getClients();
    //getUser();
    //eslint-disable-next-line
  }, []);//[getUser]);

  return (
    <React.Fragment>
      <Container maxWidth="lg" align="left">
        <Grid item xs={12}>
          <Typographyx
            className={classes.pos}
            variant="h6"
            color="textSecondary"
          >
            User Profile
          </Typographyx>
        </Grid>
        <Grid item xs={12}>
          <Card className={classes.root}>
            {!editing ? (
              <React.Fragment>
                <CardContent>
                  <div className={classes.pos}>
                    <Typography className={classes.label} color="textSecondary">
                      First Name
                    </Typography>
                    <Typography
                      className={classes.value}
                      color="textPrimary"
                      component="h2"
                    >
                      {user.firstName || "---"}
                    </Typography>
                  </div>
                  <div className={classes.pos}>
                    <Typography className={classes.label} color="textSecondary">
                      Last Name
                    </Typography>
                    <Typography
                      className={classes.value}
                      color="textPrimary"
                      component="h2"
                    >
                      {user.lastName || "---"}
                    </Typography>
                  </div>
                  <div className={classes.pos}>
                    <Typography className={classes.label} color="textSecondary">
                      Email
                    </Typography>
                    <Typography
                      className={classes.value}
                      color="textPrimary"
                      component="h2"
                    >
                      {user.email}
                    </Typography>
                  </div>
                  <div className={classes.pos}>
                    <Typography className={classes.label} color="textSecondary">
                      Address
                    </Typography>
                    <Typography
                      className={classes.value}
                      color="textPrimary"
                      component="h2"
                    >
                      {user.address || "---"}
                    </Typography>
                  </div>
                  <div className={classes.pos}>
                    <Typography className={classes.label} color="textSecondary">
                      Date of Birth
                    </Typography>
                    <Typography
                      className={classes.value}
                      color="textPrimary"
                      component="h2"
                    >
                      {user.dob || "---"}
                    </Typography>
                  </div>
                  <div className={classes.pos}>
                    <Typography className={classes.label} color="textSecondary">
                      Phone
                    </Typography>
                    <Typography
                      className={classes.value}
                      color="textPrimary"
                      component="h2"
                    >
                      {user.phone || "---"}
                    </Typography>
                  </div>
                  <div className={classes.pos}>
                    <Typography className={classes.label} color="textSecondary">
                       Rewards ID
                    </Typography>

                  <Grid  item xs={6}>
                    <TableContainer component={Paper}>
                      <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell>Client</TableCell>
                            <TableCell align="right">Reward id</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {clientRewardList.map((row) => (
                            <TableRow key={row.client_name}>
                              <TableCell component="th" scope="row">
                                {row.client_name}
                              </TableCell>
                              <TableCell align="right">{row.reward_id}</TableCell>
                              { console.log(row)}
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>

                    </Grid>


                    <Typography
                      className={classes.value}
                      color="textPrimary"
                      component="h2"
                    >
                      {/*user.user_rewards_id || ""*/}
                    </Typography>
                  </div>
                </CardContent>
                <CardActions>
                  <Button type="button" onClick={beginEdit} variant="outlined">
                    Edit
                  </Button>
                </CardActions>
              </React.Fragment>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={8}>
                      <TextField
                        disabled
                        InputProps={{
                          classes: {
                            disabled: classes.disabled,
                          },
                        }}
                        name="firstName"
                        variant="outlined"
                        fullWidth
                        id="firstName"
                        label="First Name"
                        autoComplete="firstName"
                        my={1}
                        inputRef={register({
                          required: "Last name is required.",
                          pattern: {
                            value: /^([a-zA-Z \-'\s]{1,32}){1}$/,
                            message: "Invalid first name.",
                          },
                        })}
                        error={Boolean(errors.firstName)}
                        helperText={errors.firstName?.message}
                      />
                    </Grid>
                    <Grid item xs={8}>
                      <TextField
                        disabled
                        InputProps={{
                          classes: {
                            disabled: classes.disabled,
                          },
                        }}
                        name="lastName"
                        variant="outlined"
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        autoComplete="lastName"
                        my={1}
                        inputRef={register({
                          required: "Last name is required.",
                          pattern: {
                            value: /^([a-zA-Z \-'\s]{1,32}){1}$/,
                            message: "Invalid last name.",
                          },
                        })}
                        error={Boolean(errors.lastName)}
                        helperText={errors.lastName?.message}
                      />
                    </Grid>
                    <Grid item xs={8}>
                      <TextField
                        name="email"
                        variant="outlined"
                        fullWidth
                        id="email"
                        label="Email"
                        autoComplete="email"
                        my={1}
                        inputRef={register({
                          required: "Email cannot be blank.",
                          pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: "Invalid email address",
                          },
                        })}
                        error={Boolean(errors.email)}
                        helperText={errors.email?.message}
                      />
                    </Grid>
                    <Grid item xs={8}>
                      <TextField
                        disabled
                        InputProps={{
                          classes: {
                            disabled: classes.disabled,
                          },
                        }}
                        name="address"
                        variant="outlined"
                        fullWidth
                        id="address"
                        label="Address"
                        autoComplete="address"
                        my={1}
                        inputRef={register}
                        error={Boolean(errors.address)}
                        helperText={errors.address?.message}
                      />
                    </Grid>
                    <Grid item xs={8}>
                      <TextField
                        disabled
                        InputProps={{
                          classes: {
                            disabled: classes.disabled,
                          },
                        }}
                        name="dob"
                        variant="outlined"
                        fullWidth
                        id="dob"
                        type="date"
                        label="Date of Birth"
                        my={1}
                        inputRef={register({
                          required: "Date of Birth is required.",
                        })}
                        error={Boolean(errors.dob)}
                        helperText={errors.dob?.message}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={8}>
                      <TextField
                        name="phone"
                        variant="outlined"
                        fullWidth
                        id="phone"
                        label="Phone Number"
                        autoComplete="phone"
                        my={1}
                        inputRef={register({
                          required: "Phone cannot be blank.",
                          pattern: {
                            //eslint-disable-next-line
                            value: /^(?:(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d?)\)?)?[\-\.\ \\\/]?)?((?:\(?\d{1,}\)?[\-\.\ \\\/]?){0,})(?:[\-\.\ \\\/]?(?:#|ext\.?|extension|x)[\-\.\ \\\/]?(\d+))?$/i,
                            message: "Invalid phone number",
                          },
                        })}
                        error={Boolean(errors.phone)}
                        helperText={errors.phone?.message}
                      />
                    </Grid>
                    <Grid item xs={8}>
                    <InputLabel id="demo-simple-select-readonly-label">Clients</InputLabel>

                        <Select
                            labelId="demo-simple-select-readonly-label"
                            id="demo-simple-select-readonly"
                            value={selectedClient}
                            onChange={(ev)=>{
                                handleClientChange(ev.target.value);
                                ev.preventDefault();
                            }}
                            >
                                <MenuItem value="0">Default</MenuItem>
                                {clients && clients.map((client)=>{
                                    return (<MenuItem key ={client.id} value={client.id}>{client.name}</MenuItem>);
                                })}


                        </Select>

                    </Grid>
                    <Grid item xs={8}>
                      <TextField
                        name="user_rewards_id"
                        variant="outlined"
                        fullWidth
                        id="user_rewards_id"
                        label="Rewards ID"
                        autoComplete="user_rewards_id"
                        my={1}
                        value={currentRewardId}
                        onChange={handleRewardChange}
                        error={Boolean(errors.user_rewards_id)}
                        helperText={errors.user_rewards_id?.message}
                        />
                    </Grid>
                  </Grid>
                </CardContent>
                <CardActions>
                  <React.Fragment>
                    <Button
                      disabled={working}
                      type="submit"
                      variant="contained"
                      color="primary"
                    >
                      Update
                    </Button>
                    <Button
                      disabled={working}
                      onClick={resetForm}
                      variant="contained"
                    >
                      Reset
                    </Button>
                    <Button
                      disabled={working}
                      onClick={cancelEdit}
                      variant="outlined"
                    >
                      Cancel
                    </Button>
                  </React.Fragment>
                </CardActions>
              </form>
            )}
          </Card>
        </Grid>
      </Container>
    </React.Fragment>
  );
};

export default UserProfile;
