import React, { useEffect, useState } from "react";

import { Link as RouterLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";

import Typographyx from "./fragments/Typographyx";
import Buttonx from "./fragments/Buttonx";
import TextFieldx from "./fragments/TextFieldx";
import Loading from "./fragments/Loading";
import useGrpcClient from "../contexts/grpc_client";
import { useSnackBarContext } from "../contexts/snackbar";

import dropin from "braintree-web-drop-in";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh'
    
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    padding: theme.spacing(0, 2),
  },
  background: {
    backgroundColor: theme.palette.background.paper,
  },

  default_background: {
    //backgroundColor: theme.palette.background.paper,
    backgroundImage: `url(${theme.backgroundImg.image})`,
    backgroundRepeat:  theme.backgroundImg.repeat   
  },



  card_content: {
    padding: theme.spacing(1),
  },
  dropin_container: {
    label: {
      float: "none",
    },
  },
}));

export default function DepositWithdrawal({updateBalance, ...props }) {
  const classes = useStyles();
  const grpc_client = useGrpcClient();
  const showSnackBar = useSnackBarContext();

  const [agreeDeposit, setAgreeDeposit] = useState(false);
  const [agreeWithdrawal, setAgreeWithdrawal] = useState(false);
  const [depositBtnLoading, setDepositBtnLoading] = useState(false);
  const [withdrawalBtnLoading, setWithdrawalBtnLoading] = useState(false);

  const [processingFeePercentage, setProcessingFeePercentage] = useState(0);
  const [processingFeeValue, setProcessingFeeValue] = useState(0);

  
  
  const depositDisabled = !agreeDeposit || depositBtnLoading;
  const withdrawalDisabled = !agreeWithdrawal || withdrawalBtnLoading;

  const [totalDepositStr, setTotalDepositeStr] = useState(0);
  const [paymentClientInitializing, setPaymentClientInitializing] = useState(
    false
  );

  const changeUsing = (valueSetter, validator) => (event) => {
    const { type, checked } = event.target;
    if (type === "checkbox") {
      valueSetter(checked);
    } else {
      let value = event.target.value.trim();
      valueSetter(value);
      validator && validator(value);
    }
  };

  const {
    register,
    handleSubmit,
    errors,
  } = useForm();

  const {
    register: registerForWithdrawal,
    handleSubmit: handleSubmitForWithdrawal,
    errors: errorsForWithdrawal,
  } = useForm();

  function on_deposit_error(custom_msg, err) {
    setDepositBtnLoading(false);

    custom_msg && showSnackBar(custom_msg);

    // clearing selected payment method
    dropinInstance.clearSelectedPaymentMethod();
  }

  function on_withdrawal_error(custom_msg, err) {
    setWithdrawalBtnLoading(false);

    custom_msg && showSnackBar(custom_msg);
  }

  function on_deposit_response(response) {
    setDepositBtnLoading(false);

    if (response.getSuccess()) {
      updateBalance();
      showSnackBar("Your deposit has been settled successfully.", "success");
    } else {
      showSnackBar("Your deposit request has failed. Please, try again.");
    }

    // clearing selected payment method
    dropinInstance.clearSelectedPaymentMethod();
  }

  const getGlobalSettings = () => {
    grpc_client.getGlobalSettings((resp) => {
        let settings = Object.assign({}, ...JSON.parse(resp));
        console.log("!settings");
        console.log(settings)
        setProcessingFeeValue(parseFloat(settings.processing_fee_value))
        setProcessingFeePercentage(parseFloat(settings.processing_fee_percentage))
       
    }, () => {});
  }
  useEffect(() => {
    getGlobalSettings();
// eslint-disable-next-line
  }, []);


  const handleDepositChange = () => (e) => {
      let currentVal = parseFloat(e.target.value) || 0;

      if(currentVal === 0 ){
        setTotalDepositeStr(0)
      }else{
        // let total =  currentVal + (currentVal * (processingFeePercentage/100) ) + processingFeeValue
        // total = total.toFixed(2)
        let fee = Math.max((currentVal * (processingFeePercentage/100) ) + processingFeeValue, 0);
        setTotalDepositeStr(fee.toFixed(2))
      }

  }

  function on_withdrawal_response(response) {
    setWithdrawalBtnLoading(false);
    console.log("response");
    console.log(response);
    const success = response.getSuccess();
    //const errors = response.getErrorsList();

    if (success) {
      updateBalance();
      showSnackBar(
        "Your withdrawal request has started successfully.",
        "success"
      );
    /*} else if (errors?.length) {
      showSnackBar(errors[0]);*/
    } else {
      showSnackBar("Your withdrawal request has failed. Please, try again.");
    }
  }

  const onDepositSubmit = (data) => {
    setDepositBtnLoading(true);

    if (dropinInstance) {
      dropinInstance.requestPaymentMethod(function (err, payload) {
        if (err) {
          setDepositBtnLoading(false);
          if (err["name"] === "DropinError") {
            showSnackBar(
              `${err["message"]} Please, set payment method accordingly.`
            );
          } else {
            showSnackBar(
              "Something went wrong while trying to connect with payment services. Please, try again."
            );
          }
          return;
        }

        if (payload.nonce) {
          data.nonce = payload.nonce;
          data.amount = Number(data.amount) + Number(totalDepositStr || 0); 

          grpc_client.makeDeposit(data, on_deposit_response, on_deposit_error);
        } else {
          setDepositBtnLoading(false);
          showSnackBar(
            "Something went wrong while trying to connect with payment services. Please, try again."
          );
        }
      });
    } else {
      setDepositBtnLoading(false);
      showSnackBar(
        "Payment method could not be set. Please, try reloading the page."
      );
      return;
    }
  };

  const onWithdrawalSubmit = (data) => {
    setWithdrawalBtnLoading(true);

    grpc_client.makeWithdrawal(
      data,
      on_withdrawal_response,
      on_withdrawal_error
    );
  };

  // const onCaptureDepositSubmit = (data) => {
  //   /**
  //    * Testing for deposit transaction id
  //    * dHJhbnNhY3Rpb25fbjJ6dGEwdHQ
  //    * dHJhbnNhY3Rpb25fYnozY3QwOWs
  //    */
  //   grpc_client.captureProcessedDeposit(
  //     { transaction_id: "dHJhbnNhY3Rpb25fbjJ6dGEwdHQ" },
  //     on_deposit_response,
  //     on_deposit_error
  //   );
  // };

  const [dropinInstance, setDropinInstance] = useState(null);

  // const requestPaymentMethod = useCallback(() => {
  //   if (dropinInstance) {
  //     dropinInstance.requestPaymentMethod(function (err, payload) {
  //       if (err) {
  //         return;
  //       }

  //       if (payload.nonce) {
  //         grpc_client.vaultPaymentMethod(
  //           payload.nonce,
  //           (response) => {
  //             const success = response.getSuccess();
  //             if (success) {
  //               showSnackBar(
  //                 "Payment method verified successfully.",
  //                 "success"
  //               );
  //             } else {
  //               showSnackBar(
  //                 "Payment method verification failed. Please, check your inputs and try again."
  //               );
  //             }
  //           },
  //           (custom_msg, err) => {
  //             showSnackBar(custom_msg);
  //           }
  //         );
  //       } else {
  //       }
  //     });
  //   }
  // }, [dropinInstance]);

  useEffect(() => {
    setPaymentClientInitializing(true);
    grpc_client.getClientToken(
      (response) => {
        setPaymentClientInitializing(false);

        // get client token from server
        const clientToken = response.getToken();

        // initialize dropin UI with client token
        dropin.create(
          {
            authorization: clientToken, // "sandbox_8h6t4kq3_g4qp45jgyssz4ytx",
            container: "#dropin-container",
            // vaultManager: true,
            paypal: {
              flow: "vault",
            },
            venmo: {
              allowNewBrowserTab: false,
            },
          },
          function (err, dropinInstance) {
            if (err) {
              return;
            }

            setDropinInstance(dropinInstance);
          }
        );
      },
      (custom_msg, err) => {
        setPaymentClientInitializing(false);
        if (custom_msg) {
          showSnackBar(custom_msg);
        } else {
          showSnackBar(
            "Unable to inititate payment service. Please, reload page and try again."
          );
        }
      }
    );
  }, [grpc_client, showSnackBar]);

  return (

    <div className={classes.default_background}>
    <Container component="main" maxWidth="md" align="center" className={classes.root}>
      <Box my={1}>
        <Typographyx variant="h6" color="textSecondary" pt={3}>
          Set Payment Method
        </Typographyx>
        {paymentClientInitializing && <Loading />}
        <div id="dropin-container" className={classes.dropin_container}></div>
      </Box>

      <Grid container spacing={2} style={{ paddingTop: 16 }}>
        <Grid item xs={6}>
          <Card className={classes.background}>
            <CardHeader
              title={<Typographyx variant="h6">Deposit Cash</Typographyx>}
            />
            <CardContent>
              <form onSubmit={handleSubmit(onDepositSubmit)} noValidate>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12}>
                    <TextFieldx
                      name="amount"
                      variant="outlined"
                      fullWidth
                      id="amount"
                      label="Amount"
                      autoComplete="amount"
                      my={1}
                      inputRef={register({
                        required: "Amount is required.",
                        pattern: {
                          value: /^\d+(\.\d+)?$/,
                          message: "Invalid amount.",
                        },
                      })}
                      error={Boolean(errors.amount)}
                      helperText={errors.amount?.message}
                      onChange={handleDepositChange()}
                    />


                    <Typographyx align="left" ml={1}>Processing Fee: {totalDepositStr}</Typographyx>
                  </Grid>

                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          value="allowExtraEmails"
                          label="Start"
                          color="primary"
                          name="agree"
                          checked={agreeDeposit}
                          onChange={changeUsing(setAgreeDeposit)}
                        />
                      }
                      label={
                        <Typographyx
                          variant="caption"
                          style={{ color: "white" }}
                        >
                          I agree with
                          <span> </span>
                          <Link
                            to="/legalTerms"
                            underline="hover"
                            component={RouterLink}
                          >
                            Terms of Service
                          </Link>
                          <span> & </span>
                          <Link
                            to="/legalTerms/privacyPolicy"
                            title="Privacy Policy "
                            component={RouterLink}
                          >
                            Privacy Policy
                          </Link>
                        </Typographyx>
                      }
                      style={{ width: "100%", justifyContent: "center" }} // need to override some bootstrap css
                    ></FormControlLabel>

                    <Box mt={3} mb={1}>
                      <Buttonx
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        disabled={Boolean(depositDisabled)}
                        endIcon={
                          depositBtnLoading ? <Loading size={20} /> : null
                        }
                      >
                        Deposit Cash
                      </Buttonx>
                    </Box>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={6}>
          <Card className={classes.background}>
            <CardHeader
              title={<Typographyx variant="h6">Withdrawal Cash</Typographyx>}
            />
            <CardContent>
              <form
                onSubmit={handleSubmitForWithdrawal(onWithdrawalSubmit)}
                noValidate
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12}>
                    <TextFieldx
                      name="amount"
                      autoComplete="amount"
                      variant="outlined"
                      required
                      fullWidth
                      id="amount"
                      label="Amount"
                      my={1}
                      inputRef={registerForWithdrawal({
                        required: "Amount is required.",
                        pattern: {
                          value: /^\d+(\.\d+)?$/,
                          message: "Invalid amount.",
                        },
                      })}
                      error={Boolean(errorsForWithdrawal.amount)}
                      helperText={errorsForWithdrawal.amount?.message}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          value="allowExtraEmails"
                          label="Start"
                          color="primary"
                          name="agreeWithdrawal"
                          checked={agreeWithdrawal}
                          onChange={changeUsing(setAgreeWithdrawal)}
                        />
                      }
                      label={
                        <Typographyx
                          variant="caption"
                          style={{ color: "white" }}
                        >
                          I agree with
                          <span> </span>
                          <Link
                            to="/legalTerms"
                            underline="hover"
                            component={RouterLink}
                          >
                            Terms of Service
                          </Link>
                          <span> & </span>
                          <Link
                            to="/legalTerms/privacyPolicy"
                            title="Privacy Policy "
                            component={RouterLink}
                          >
                            Privacy Policy
                          </Link>
                        </Typographyx>
                      }
                      style={{ width: "100%", justifyContent: "center" }} // need to override some bootstrap css
                    ></FormControlLabel>

                    <Box mt={3} mb={1}>
                      <Buttonx
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        disabled={Boolean(withdrawalDisabled)}
                        endIcon={
                          withdrawalBtnLoading ? <Loading size={20} /> : null
                        }
                      >
                        Withdrawal Cash
                      </Buttonx>
                    </Box>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
    </div>);
}
