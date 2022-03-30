import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";

import { useForm, Controller } from "react-hook-form";

import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";

import useGrpcClient from "../contexts/grpc_client";
import { useSnackBarContext } from "../contexts/snackbar";
import PaperTable from "./fragments/PaperTable";
import Loading from "./fragments/Loading";
import Typographyx from "./fragments/Typographyx";
import Buttonx from "./fragments/Buttonx";
import StyledTableCell from './fragments/StyledTableCell';
import StyledTableRow from './fragments/StyledTableRow';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    backgroundColor: theme.palette.background.default,
   },
  background: {
    backgroundColor: theme.palette.background.paper,
    margin: theme.spacing(2),

  },
  default_background: {
    //backgroundColor: theme.palette.background.paper,
    backgroundImage: `url(${theme.backgroundImg.image})`,
    backgroundRepeat:  theme.backgroundImg.repeat
  },
}));

const styles = {};

export default function AccountStatements({ ...props }) {
  const classes = useStyles();
  const grpc_client = useGrpcClient();
  const showSnackBar = useSnackBarContext();

  const [deposits, setDeposits] = useState(null);
  const [pendingDeposits, setPendingDeposits] = useState(null);
  const [withdrawals, setWithdrawals] = useState(null);
  const [adjustments, setAdjustments] = useState(null);
  const [sessions, setSessions] = useState(null);
  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    errors,
    control,
  } = useForm({
    defaultValues: {
      // react-hook-form needs values set here to work with default values properly
      startDate: new Date(new Date().setMonth(new Date().getMonth() - 1)), // a month ago
      endDate: new Date(), // today
    },
  });

  const onFormSubmit = (data) => {
    setLoading(true);

    grpc_client.getAccountStatements(
      data,
      on_statements_response,
      on_statements_error
    );
  };

  const on_statements_error = (custom_msg) => {
    setLoading(false);

    if (custom_msg) {
      showSnackBar(custom_msg);
    }
  };

  const on_statements_response = (response) => {
    setLoading(false);

    setDeposits(JSON.parse(response.getDeposits()));
    setPendingDeposits(JSON.parse(response.getPendingDeposits()));
    setWithdrawals(JSON.parse(response.getWithdrawals()));
    setAdjustments(JSON.parse(response.getAdjustments()));
    setSessions(JSON.parse(response.getSessions()));

  };

  return (
    <div className={classes.default_background}>
    <Container component="main" maxWidth="md" align="center" className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Card className={classes.background}>
            <CardHeader
              title={
                <Typographyx variant="h6">
                  Get Account Statements Report
                </Typographyx>
              }
            />
            <CardContent>
              <form onSubmit={handleSubmit(onFormSubmit)} noValidate>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <Controller
                        as={
                          <KeyboardDatePicker
                            disableToolbar
                            disableFuture
                            autoOk
                            variant="inline"
                            inputVariant="outlined"
                            format="MM/dd/yyyy"
                            margin="normal"
                            fullWidth
                            style={{ marginTop: "8px" }}
                            InputLabelProps={{ style: { width: "initial" } }} // fix  messy bootstrap on label
                            id="startDate"
                            label="Start Date"
                            KeyboardButtonProps={{
                              "aria-label": "change start date",
                            }}
                            error={Boolean(errors.startDate)}
                            helperText={errors.startDate?.message}
                          />
                        }
                        name="startDate"
                        rules={{
                          required: "Start date is required.",
                          validate: {
                            isDate: (value) =>
                              !isNaN(value.getTime()) || "Invalid start date.",
                            notFuture: (value) =>
                              value < new Date() || "Future date is invalid.",
                          },
                        }}
                        control={control}
                      />
                    </MuiPickersUtilsProvider>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <Controller
                        as={
                          <KeyboardDatePicker
                            disableToolbar
                            disableFuture
                            autoOk
                            variant="inline"
                            inputVariant="outlined"
                            format="MM/dd/yyyy"
                            margin="normal"
                            fullWidth
                            style={{ marginTop: "8px" }}
                            InputLabelProps={{ style: { width: "initial" } }} // fix  messy bootstrap on label
                            id="endDate"
                            label="End Date"
                            KeyboardButtonProps={{
                              "aria-label": "change end date",
                            }}
                            error={Boolean(errors.endDate)}
                            helperText={errors.endDate?.message}
                          />
                        }
                        name="endDate"
                        rules={{
                          required: "End date is required.",
                          validate: {
                            isDate: (value) =>
                              !isNaN(value.getTime()) || "Invalid end date.",
                            notFuture: (value) =>
                              value < new Date() || "Future date is invalid.",
                          },
                        }}
                        control={control}
                      />
                    </MuiPickersUtilsProvider>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Buttonx
                      type="submit"
                      variant="contained"
                      color="primary"
                      my={1}
                      py={1}
                      fullWidth
                      disabled={Boolean(loading)}
                      endIcon={loading ? <Loading size={20} /> : null}
                    >
                      Get Report
                    </Buttonx>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Grid>

        {adjustments && (
          <React.Fragment>
            <Grid item xs={12}>
              <Typographyx variant="h6" color="textSecondary" pt={3}>
                Adjustments
              </Typographyx>
            </Grid>
            <Grid item xs={12}>
              {adjustments.length === 0 ? (
                <Typographyx variant="subtitle2" pb={5} pt={3}>
                  No adjustments for specified time period
                </Typographyx>
              ) : (
                <PaperTable>
                  <TableContainer component={classes.paper}>
                    <Table>
                      <TableHead>
                        <StyledTableRow>
                          <StyledTableCell align="center">ID</StyledTableCell>
                          <StyledTableCell align="center">Date</StyledTableCell>
                          <StyledTableCell align="center">
                            Amount
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            Reason
                          </StyledTableCell>
                        </StyledTableRow>
                      </TableHead>
                      <TableBody style={styles.card_content}>
                        {adjustments.map((value, index) => (
                          <StyledTableRow key={index} hover={true}>
                            <StyledTableCell
                              component="th"
                              scope="row"
                              align="center"
                            >
                              {value.id}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              {value.date_created}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              {value.amount}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              {value.reason}
                            </StyledTableCell>
                          </StyledTableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </PaperTable>
              )}
            </Grid>
          </React.Fragment>
        )}

        {deposits && (
          <React.Fragment>
            <Grid item xs={12}>
              <Typographyx variant="h6" color="textSecondary" pt={3}>
                Deposits
              </Typographyx>
            </Grid>
            <Grid item xs={12}>
              {deposits.length === 0 ? (
                <Typographyx variant="subtitle2" pb={5} pt={3}>
                  No deposits for specified time period
                </Typographyx>
              ) : (
                <PaperTable>
                  <TableContainer component={classes.paper}>
                    <Table>
                      <TableHead>
                        <StyledTableRow>
                          <StyledTableCell align="center">ID</StyledTableCell>
                          <StyledTableCell align="center">Date</StyledTableCell>
                          <StyledTableCell align="center">
                            Amount
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            Method
                          </StyledTableCell>
                          <StyledTableCell align="center">Financial Institution</StyledTableCell>
                          <StyledTableCell align="center">
                            Account
                          </StyledTableCell>
                        </StyledTableRow>
                      </TableHead>
                      <TableBody style={styles.card_content}>
                        {deposits.map((deposit, index) => (
                          <StyledTableRow key={index} hover={true}>
                            <StyledTableCell
                              component="th"
                              scope="row"
                              align="center"
                            >
                              {deposit.id}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              {deposit.date_created}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              {deposit.amount} $
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              {deposit.payment_method}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              {deposit.fi_name}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              {deposit.acct_last4}
                            </StyledTableCell>
                          </StyledTableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </PaperTable>
              )}
            </Grid>
          </React.Fragment>
        )}

        {withdrawals && (
          <React.Fragment>
            <Grid item xs={12}>
              <Typographyx variant="h6" color="textSecondary" pt={3}>
                Withdrawals
              </Typographyx>
            </Grid>
            <Grid item xs={12}>
              {withdrawals.length === 0 ? (
                <Typographyx variant="subtitle2" pb={5} pt={2}>
                  No withdrawals for specified time period
                </Typographyx>
              ) : (
                <PaperTable>
                  <TableContainer component={classes.paper}>
                    <Table>
                      <TableHead>
                        <StyledTableRow>
                          <StyledTableCell align="center">ID</StyledTableCell>
                          <StyledTableCell align="center">Date</StyledTableCell>
                          <StyledTableCell align="center">
                            Amount
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            Status
                          </StyledTableCell>
                        </StyledTableRow>
                      </TableHead>
                      <TableBody style={styles.card_content}>
                        {withdrawals.map((withdraw, index) => (
                          <StyledTableRow key={index} hover={true}>
                            <StyledTableCell
                              component="th"
                              scope="row"
                              align="center"
                            >
                              {withdraw.id}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              {withdraw.date_created}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              {withdraw.amount}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              {withdraw.action}
                            </StyledTableCell>
                          </StyledTableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </PaperTable>
              )}
            </Grid>
          </React.Fragment>
        )}

        {pendingDeposits && pendingDeposits.length > 0 && (
          <React.Fragment>
            <Grid item xs={12}>
              <Typographyx variant="h6" color="textSecondary" pt={3}>
                Pending Deposits
              </Typographyx>
            </Grid>
            <Grid item xs={12}>
              <PaperTable>
                <TableContainer component={classes.paper}>
                  <Table>
                    <TableHead>
                      <StyledTableRow>
                        <StyledTableCell align="center">ID</StyledTableCell>
                        <StyledTableCell align="center">Date</StyledTableCell>
                        <StyledTableCell align="center">Amount</StyledTableCell>
                        <StyledTableCell align="center">Method</StyledTableCell>
                        <StyledTableCell align="center">
                          Account
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          Routing Number
                        </StyledTableCell>
                      </StyledTableRow>
                    </TableHead>
                    <TableBody style={styles.card_content}>
                      {pendingDeposits.map((deposit, index) => (
                        <StyledTableRow key={index} hover={true}>
                          <StyledTableCell
                            component="th"
                            scope="row"
                            align="center"
                          >
                            {deposit.id}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {deposit.created}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {deposit.amount}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {deposit.institution}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {deposit.account_number}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {deposit.routing_number}
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </PaperTable>
            </Grid>
          </React.Fragment>
        )}

        {sessions && (
          <React.Fragment>
            <Grid item xs={12}>
              <Typographyx variant="h6" color="textSecondary" pt={3}>
                Table Sessions
              </Typographyx>
            </Grid>
            <Grid item xs={12}>
              <PaperTable>
                <TableContainer component={classes.paper}>
                  <Table>
                    <TableHead>
                      <StyledTableRow>
                        <StyledTableCell align="center">
                          Table Session
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          Amount Wagered
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          Amount Won
                        </StyledTableCell>
                      </StyledTableRow>
                    </TableHead>
                    <TableBody style={styles.card_content}>
                      {Object.keys(sessions).map((index) => (
                        <StyledTableRow key={index} hover={true}>
                          <StyledTableCell component="th" scope="row">
                            {index}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {sessions[index].wagered}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {sessions[index].won}
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </PaperTable>

              {sessions.length === 0 && (
                <Typographyx variant="subtitle2" pb={5} pt={3}>
                  No sessions for specified time period
                </Typographyx>
              )}
            </Grid>
          </React.Fragment>
        )}
      </Grid>
    </Container>
    </div>
  );
}
