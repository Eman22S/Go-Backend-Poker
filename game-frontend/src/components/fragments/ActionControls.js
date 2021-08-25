import React, { useState, useEffect, useCallback } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import PlusIcon from "@material-ui/icons/Add";
import MinusIcon from "@material-ui/icons/Remove";

import Buttonx from "./Buttonx";
import TextFieldx from "./TextFieldx";
import Loading from "./Loading";
import IOSSlider from "./IOSSlider";

import useGrpcClient from "../../contexts/grpc_client";
import { useStore } from "../../contexts/store";
import { useTableState } from "../../contexts/table_state";
import { useSnackBarContext } from "../../contexts/snackbar";

import {
  getMaxRaiseTo,
  getMinRaiseTo,
  toFloat,
  getBettingRoundSum,
} from "../utils/player";
import { getThisTurnRaisesNum } from "../utils/table";
import { canAllin, canRaise, canCall, canCheck } from "../utils/player_actions";

const useStyles = makeStyles((theme) => ({
  center_content: {
    display: "flex",
    justifyContent: "center",
  },
}));

// maximum slider range
const SLIDER_RANGE_MAX = 100;
const SLIDER_RANGE_MIN = 0;

function ActionControls({ on_new_table_state, disable_actions, ...props }) {
  const grpc_client = useGrpcClient();
  const [store, ] = useStore();
  const [tableState, ] = useTableState();
  const showSnackBar = useSnackBarContext();
  const classes = useStyles();

  const [minRaise, setMinRaise] = useState(0);
  const [maxRaise, setMaxRaise] = useState(0);
  const [inRaiseRange, setInRaiseRange] = useState(true);
  const [sliderMin, setSliderMin] = useState(SLIDER_RANGE_MIN);
  const [sliderMax, setSliderMax] = useState(SLIDER_RANGE_MAX);
  const [sliderValue, setSliderValue] = useState(sliderMin);
  const [currentRaise, setCurrentRaise] = useState("");

  // set maximum raise for a player
  useEffect(() => {
    setMaxRaise(
      getMaxRaiseTo(
        tableState?.game_meta.table_type,
        tableState?.game.pot,
        tableState?.game.game_turn,
        tableState?.game.bet,
        tableState?.game.bigblind,
        store.player.md5,
        store.player.chips,
        store.player.bet2do
      )
    );
  }, [
    tableState,
    store
  ]);

  // set minimum raise for a player
  useEffect(() => {
    setMinRaise(
      getMinRaiseTo(
        tableState.game_meta.table_type,
        tableState.game.game_turn,
        tableState.game.bet,
        tableState.game.bigblind,
        tableState.game.raise_data.last_valid_raise,
        store.player.md5,
        store.player.bet2do
      )
    );
  }, [
    tableState.game_meta.table_type,
    tableState.game.game_turn,
    tableState.game.bet,
    tableState.game.bigblind,
    tableState.game.raise_data.last_valid_raise,
    store.player.md5,
    store.player.bet2do,
  ]);

  // set slider minimum and maximum range
  useEffect(() => {
    if (maxRaise - minRaise < SLIDER_RANGE_MAX) {
      setSliderMax(maxRaise);
      setSliderMin(minRaise);
    } else {
      setSliderMax(SLIDER_RANGE_MAX);
      setSliderMin(SLIDER_RANGE_MIN);
    }
  }, [maxRaise, minRaise]);

  /**
   * Button loading states
   */
  const [checkBtnLoading, setCheckBtnLoading] = useState(false);
  const [foldBtnLoading, setFoldBtnLoading] = useState(false);
  const [raiseBtnLoading, setRaiseBtnLoading] = useState(false);
  const [checkFoldBtnLoading, setCheckFoldBtnLoading] = useState(false);
  const [callBtnLoading, setCallBtnLoading] = useState(false);
  const [callAnyBtnLoading, setCallAnyBtnLoading] = useState(false);
  const [allInBtnLoading, setAllInBtnLoading] = useState(false);

  /**
   * button disabling logics
   */
  const callingGrpc =
    checkFoldBtnLoading ||
    foldBtnLoading ||
    raiseBtnLoading ||
    checkFoldBtnLoading ||
    callBtnLoading ||
    callAnyBtnLoading ||
    allInBtnLoading;

  const is_my_turn = store.player?.is_myturn;
  const disable_buttons =
    !is_my_turn || // if not my turn disable all buttons
    callingGrpc || // waiting for grpc response or not
    disable_actions || // if parent component is saying disable actions
    tableState.game.table_action === "winner" || // if winner is being shown
    ((tableState.game.table_action !== "pending" ||
      !tableState.game_meta.is_tournament) &&
      store.player.meta.is_allin);

  const disable_raise =
    disable_buttons ||
    !canRaise(tableState, minRaise, maxRaise, store.player) ||
    !inRaiseRange ||
    raiseBtnLoading;

  const disable_raise_slider = disable_raise || minRaise === maxRaise;

  const disable_minus_raise = disable_raise_slider || sliderValue <= sliderMin;
  const disable_plus_raise = disable_raise_slider || sliderValue >= sliderMax;

  const disable_call =
    disable_buttons || !canCall(tableState, store.player) || callBtnLoading;

  const disable_check =
    disable_buttons || !canCheck(tableState, store.player) || checkBtnLoading;

  const disable_allin =
    disable_buttons || !canAllin(tableState, store.player) || allInBtnLoading;

  /**
   * Handler for raise value input
   * @param {*} event
   */
  const changeCurrentRaise = function (event) {
    let value = event.target.value.trim();

    // in any case the value should be set, since input need to show user change feedback
    setCurrentRaise(value);

    if (!value) {
      setInRaiseRange(false);
      showSnackBar("You need to set value to raise.", "warning");
    } else if (isNaN(value)) {
      setInRaiseRange(false);
      showSnackBar("Please, input a number to raise.", "warning");
    } else {
      // give a hint that raise value is out of range
      if (value < minRaise) {
        setInRaiseRange(false);
        showSnackBar(`${value} is below the minimum raise.`, "warning");
      } else if (value > maxRaise) {
        setInRaiseRange(false);
        showSnackBar(`${value} is above the maximum raise.`, "warning");
      } else {
        setInRaiseRange(true);
        showSnackBar(""); // empty messages removes snackbar, this should be documented
      }

      let newSliderValue = Math.round(((value - minRaise) / maxRaise) * 100);

      if (newSliderValue > sliderMax) {
        setSliderValue(sliderMax);
      } else if (newSliderValue < sliderMin) {
        setSliderValue(sliderMin);
      } else {
        setSliderValue(newSliderValue);
      }
    }
  };

  /**
   * Handler for raise slider change
   * @param {*} event
   * @param {*} value
   */
  function handleSliderChange(event, value) {
    setSliderValue(value);
    updateRaiseFromSliderValue(value);
  }

  /**
   * Update raise input from slider value
   */
  const updateRaiseFromSliderValue = useCallback(
    function (value) {
      let step = value;

      // get player the range which a player is able to raise

      // caclulate the raise amount based on the slider range and player raise ability range
      let raise_amount =
        ((step - sliderMin) * (maxRaise - minRaise)) / (sliderMax - sliderMin) +
        minRaise;

      // round the raise amount to 2 digit places
      raise_amount *= 100;
      raise_amount = Math.round(raise_amount);
      raise_amount = raise_amount / 100;

      // ensure raise amount is not greater than player total chips
      raise_amount = Math.min(raise_amount, store.player.chips);

      // if no need to use decimal places round to integer
      if (!tableState.game_meta.use_decimals) {
        raise_amount = Math.round(raise_amount);
      }

      // update current raise by the calculated amount
      if (!isNaN(raise_amount)) {
        setCurrentRaise(raise_amount);
      }
    },
    [
      minRaise,
      maxRaise,
      sliderMin,
      sliderMax,
      tableState.game_meta.use_decimals,
      store.player.chips,
    ]
  );

  /**
   * Increases or decreases slider value by a step
   * @param {*} plus : whether to increase or decrease the value
   * @param {*} step : how many steps should be changed
   */
  function stepSliderValue(plus = true, step = 1) {
    setSliderValue((prevSliderValue) => {
      let newValue = plus ? prevSliderValue + step : prevSliderValue - step;
      updateRaiseFromSliderValue(newValue);
      return newValue;
    });
  }

  // Change minimum raise value when my turn comes
  // for development purposes, change current raise when player changes
  //!! change it to if only my turn comes logic
  useEffect(() => {
    if (store.player.id === tableState.game_meta.user_id_that_is_up) {
      setSliderValue(sliderMin);
      updateRaiseFromSliderValue(sliderMin);
    }
  }, [
    updateRaiseFromSliderValue,
    sliderMin,
    sliderMax,
    store.player.id,
    tableState.game_meta.user_id_that_is_up,
  ]);

  // make slider range consistent with min and max
  useEffect(() => {
    setSliderValue(sliderMin);
    updateRaiseFromSliderValue(sliderMin);
  }, [sliderMin, sliderMax, updateRaiseFromSliderValue]);

  /**
   * General button handler for a bet action
   */
  function onPlayerAction(action, bet_value, setBtnLoading) {
    setBtnLoading(true);

    grpc_client.sendPlayerAction(
      action,
      bet_value,
      (tableStateResponse) => {
        setBtnLoading(false);
        on_new_table_state(tableStateResponse);
      },
      (custom_msg) => {
        setBtnLoading(false);
        on_grpc_err(custom_msg);
      }
    );
  }

  function on_grpc_err(custom_msg, err) {
    if (custom_msg) {
      showSnackBar(custom_msg);
    }
  }

  /**
   * Button handlers for each bet action
   */
  function on_fold() {
    onPlayerAction("pass", 0, setFoldBtnLoading);
  }

  function on_check() {
    onPlayerAction("check", 0, setCheckBtnLoading);
  }

  function on_check_fold() {
    let action = store.player.bet2do > 0 ? "pass" : "check";
    onPlayerAction(action, 0, setCheckFoldBtnLoading);
  }

  function on_raise_bet() {
    let betting_round_sum = getBettingRoundSum(
      tableState.game.game_turn,
      tableState.game.bet,
      store.player.md5
    );
    let raise_bet = parseFloat(currentRaise) - betting_round_sum;

    onPlayerAction("check", raise_bet, setRaiseBtnLoading);
  }

  function on_call() {
    onPlayerAction("check", store.player.bet2do, setCallBtnLoading);
  }

  function on_call_any() {
    onPlayerAction("check", store.player.bet2do, setCallAnyBtnLoading);
  }

  function on_all_in() {
    onPlayerAction("check", store.player.chips, setAllInBtnLoading);
  }

  /**
   * Get button texts for some bet actions
   */
  function getBtnRaiseText() {
    let raise_str = window._("raise_to");

    if (getThisTurnRaisesNum(tableState) === 0) {
      raise_str = window._("bet");
    }

    if (currentRaise > 0) {
      raise_str = `${raise_str} ${toFloat(currentRaise, store.numberFormat)}`;
    }

    return raise_str;
  }

  function getBtnCallText() {
    let call_str = window._("COM_CAMERONA_CALL");
    if (store.player.bet2do > 0) {
      call_str = `${call_str} ${toFloat(
        store.player.bet2do,
        store.numberFormat
      )}`;
    }

    return call_str;
  }

  return (
    <React.Fragment>
      <Grid container spacing={0} alignItems="center" justify="center">
        <Grid
          item
          xs={4}
          style={{ display: "flex", justifyContent: "space-around" }}
        >
          <Buttonx
            variant="contained"
            color="primary"
            disabled={disable_buttons}
            onClick={on_fold}
            mt={1}
            mb={2}
            endIcon={foldBtnLoading ? <Loading size={20} /> : null}
          >
            Fold
          </Buttonx>

          <Buttonx
            variant="contained"
            color="primary"
            disabled={disable_check}
            onClick={on_check}
            mt={1}
            mb={2}
            endIcon={checkBtnLoading ? <Loading size={20} /> : null}
          >
            Check
          </Buttonx>
        </Grid>

        <Grid item xs={2} className={classes.center_content}>
          <TextFieldx
            value={currentRaise}
            onChange={changeCurrentRaise}
            variant="outlined"
            size="small"
            margin="dense"
            style={{
              width: 62,
              textAlign: "center",
            }}
            InputProps={{ color: "primary" }} // material-ui input component
            inputProps={{
              style: {
                textAlign: "center",
                fontSize: "0.8715rem",
                padding: "0.5em",
              },
            }} // html input element
            mt={1}
            mb={2}
          />
        </Grid>

        <Grid item xs={4}>
          <Grid
            container
            spacing={0}
            style={{ justifyContent: "space-around" }}
          >
            <Grid item xs={2}>
              <Buttonx
                variant="contained"
                color="primary"
                p={0.5}
                style={{ minWidth: 0 }}
                disabled={disable_minus_raise}
                onClick={() => stepSliderValue(false)}
              >
                <MinusIcon />
              </Buttonx>
            </Grid>

            <Grid item xs={6}>
              <IOSSlider
                min={sliderMin}
                max={sliderMax}
                step={1}
                value={sliderValue}
                onChange={handleSliderChange}
                style={{}}
                disabled={disable_raise}
              />
            </Grid>

            <Grid item xs={2}>
              <Buttonx
                variant="contained"
                color="primary"
                p={0.5}
                style={{ minWidth: 0 }}
                disabled={disable_plus_raise}
                onClick={() => stepSliderValue(true)}
              >
                <PlusIcon />
              </Buttonx>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={2} className={classes.center_content}>
          <Buttonx
            variant="contained"
            color="primary"
            disabled={disable_raise}
            onClick={on_raise_bet}
            endIcon={raiseBtnLoading ? <Loading size={20} /> : null}
          >
            {getBtnRaiseText()}
          </Buttonx>
        </Grid>

        <Grid item xs={4} className={classes.center_content}>
          <Buttonx
            variant="contained"
            color="primary"
            style={{ width: "90%" }}
            disabled={disable_buttons}
            onClick={on_check_fold}
            my={1}
            mb={2}
            endIcon={checkFoldBtnLoading ? <Loading size={20} /> : null}
          >
            Check/Fold
          </Buttonx>
        </Grid>

        <Grid item xs={4} className={classes.center_content}>
          <Buttonx
            variant="contained"
            color="primary"
            disabled={disable_call}
            onClick={on_call}
            my={1}
            mb={2}
            style={{ width: "90%" }}
            endIcon={callBtnLoading ? <Loading size={20} /> : null}
          >
            {getBtnCallText()}
          </Buttonx>
        </Grid>

        <Grid item xs={2} className={classes.center_content}>
          <Buttonx
            variant="contained"
            color="primary"
            disabled={disable_call}
            onClick={on_call_any}
            my={1}
            mb={2}
            endIcon={callAnyBtnLoading ? <Loading size={20} /> : null}
          >
            Call Any
          </Buttonx>
        </Grid>

        <Grid item xs={2} className={classes.center_content}>
          <Buttonx
            variant="contained"
            color="primary"
            disabled={disable_allin}
            onClick={on_all_in}
            my={1}
            mb={2}
            endIcon={allInBtnLoading ? <Loading size={20} /> : null}
          >
            All In
          </Buttonx>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default ActionControls;
