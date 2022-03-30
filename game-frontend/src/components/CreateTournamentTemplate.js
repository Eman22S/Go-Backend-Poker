import React, {useState, useEffect, useCallback} from "react";
import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";

import MenuItem from "@material-ui/core/MenuItem";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Pagination from '@material-ui/lab/Pagination';
import InputAdornment from "@material-ui/core/InputAdornment";
import { useForm } from "react-hook-form";

import Buttonx from "./fragments/Buttonx";
import TextFieldx from "./fragments/TextFieldx";
import Copyright from "./fragments/Copyright";
import Typographyx from "./fragments/Typographyx";
import FormHelperText from '@material-ui/core/FormHelperText';

import { useSnackBarContext } from "./../contexts/snackbar";
import useGrpcClient from "../contexts/grpc_client";
import { table_types, game_types, tournament_types } from "./utils/constants";

import IconButton from "@material-ui/core/IconButton";
import RemoveCircle from "@material-ui/icons/RemoveCircle";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import PaperTable from "./fragments/PaperTable";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import StyledTableCell from './fragments/StyledTableCell';
import StyledTableRow from './fragments/StyledTableRow';
import Checkbox from "@material-ui/core/Checkbox";

import CardContent from "@material-ui/core/CardContent";
import { FormControl, FormControlLabel, InputLabel, Select } from "@material-ui/core";
import { DEV_IMAGE_URL } from "../utils/image_utils";
import Button from "@material-ui/core/Button";
import {parseString } from 'xml2js';

const crdsym	= ["2","3",	"4","5","6","7","8","9","10","Jacks","Queens","Kings","Aces"];
// const colsym	= ["Diamond",	"Heart","Spade","Club"];

// initialize rebalancing table algorithm
const rebalancing_table_algorithm = ["AVERAGE", "MAX"];

/**
 * The object that stores the list of the fields that will be checked during on blur or on focus out
 * The first value in the list boolean value : to show weather the error is occured or not
 * The second value in the list is string: the message of the error.
 */
const onBlurErrObject = {
    buyinErr: [false, ""],
    buyinChipsErr: [false, ""],
    minPrizePoolErr: [false, ""],
    rakeErr: [false, ""],
    rebuysRoundStartErr: [false, ""],
    addonsRoundStartErr: [false, ""],
    addonChipsErr: [false, ""],
    addonThresholdErr: [false, ""],
    addonsPermittedErr: [false, ""],
    rebuysPermittedErr: [false, ""],
    smallBlindMaxValueErr: [false, ""],
    scheduledBreaksErr: [false, ""],
    pendingTimeoutSecondsErr: [false, ""],
    tourPlayersMinErr : [false, ""],
    blindsIncreaseIntervalRoundsErr: [false, ""],
    blindsIncreaseIntervalSecondsErr: [false, ""],
    tableTimer: [false, ""],
    timeLimitSecondsErr: [false, ""],
    rebuysRoundEndErr: [false, ""],
    addonsRoundEndErr: [false, ""],
    tourPlayersMaxErr: [false, ""],
    maxPlayersPerTableErr: [false, ""],
    minPlayersPerTableErr: [false, ""],
    prizeAndBlindErr: [],
    additionalPayoutErr: [],
};

const useStyles = makeStyles((theme) => ({
  main: {
    paddingTop: theme.spacing(4),
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  removeIcon: {
    position: "absolute",
    opacity: "1",
    marginTop: "20px"
  },
  logo: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(1),
    width: "40%",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    padding: theme.spacing(0, 2),
  },
  card_header: {
    paddingBottom: 0,
  },
  card_content: {
    paddingBottom: theme.spacing(1),
    paddingTop: theme.spacing(1),
  },
  card: {
    border: "1px solid rgba(255, 255, 255, 0.12)",
  },
  background: {
    backgroundColor: theme.palette.background.default,
    backgroundImage: `url(${theme.backgroundImg.image})`,
    backgroundRepeat:  theme.backgroundImg.repeat
  },

}));

const styles = {
  card_content: {
    marginTop: 16,
    marginBottom: 16,
  },
};

export default function CreateTournamentTemplate(props) {
  const classes = useStyles();
  const history = useHistory();
  const showSnackBar = useSnackBarContext();

  const [tempValues, setTempValues] = useState(
      props.temp
          ? props.temp
          : {
            gameType: game_types[0].value,
            tableType: table_types[0].value,
            tournamentType: tournament_types[0].value,
            rebalancingTableAlgorithm: rebalancing_table_algorithm[0],
          }
  );

  const grpc_client = useGrpcClient();
  const [prizePoolPage, setPrizePoolPage] = useState(1);
  const [prizePoolCount, setPrizePoolCount] = useState(0);
  const [useAdditionalPrizePoolOnly, setUseAdditionalPrizePoolOnly] = useState(false);
  const [uniqueDeck, setUniqueDeck] = useState(false);
  const [instantPayout, settInstantPayout] = useState(false);//double t
  const [wildcardEnabled, setWildcardEnabled] = useState(false);
  const [isForMoney, setIsForMoney] = useState(false);
  const [useDecimals, setUseDecimals] = useState(false);
  const [chipsInPenny, setChipsInPenny] = useState(false);
  const [wildcardValue, setWildcardValue] = useState(0);
  const [pairMixedAddonPlayers, setPairMiexedAddonPlayers] = useState(false);
  const [tournamentImage, setTournamentImage] = useState("");
  const [tempImage, setTempImage] = useState(null);
  const [gameType, setGameType] = useState(props.temp ? props.temp.gameType : game_types[0].value);
  const [tableType, setTableType] = useState(props.temp ? props.temp.tableType : table_types[0].value);
  const [tournamentType, setTournamentType] = useState(props.temp ? props.temp.type : tournament_types[0].value);
  const [rebalancingTableAlgorithm, setRebalancingTableAlgorithm] = useState(props.temp ? props.temp.rebalancingTableAlgorithm: rebalancing_table_algorithm[0]);
  const [selectedAddon, setSelectedAddon] = useState(0);
  const [hardCapEnabled, setHardCapEnabled] = useState(false);
  const [usernamePrivacyEnabled, setUsernamePrivacyEnabled] = useState(false);
  const [showRemoveIcon, setRemoveIcon] = useState(false);
  const [revealCardsAfterAction, setRevealCardsAfterAction] = useState(false);
  const [regExp, setRegExp] = useState(/^[0-9\b]+$/);
  const [onBlurErr, setOnBlurErr] = useState(onBlurErrObject);
  const [anteErr, setAnteErr] = useState([false, ""])
   // const default_tournament_type = [props.temp[0].tournament_type : tournament_types[0].value] ; // first one is thet
  useEffect(() => {
    if (props.temp) {
      //eslint-disable-next-line
      setUniqueDeck(props.temp.unique_deck === "1");
      //eslint-disable-next-line
      settInstantPayout(props.temp.instant_payout === "1");
      //eslint-disable-next-line
      setWildcardEnabled(props.temp.wildcards_enabled === "1");
      setWildcardValue(Number(props.temp.wildcard_value || 0));
      //eslint-disable-next-line
      setIsForMoney(props.temp.isForMoney === "1");
      setUseDecimals(props.temp.useDecimals === "1");
      //eslint-disable-next-line
      setChipsInPenny(props.temp.chips_in_penny === "1");
      setGameType(props.temp.gameType);
      //eslint-disable-next-line
      setPairMiexedAddonPlayers(props.temp.pair_mixed_addon_players === "1");
      //eslint-disable-next-line
      setHardCapEnabled(props.temp.hard_cap_enabled === "1");
      //eslint-disable-next-line
      setUsernamePrivacyEnabled(props.temp.username_privacy === "1");
      //eslint-disable-next-line
      setRevealCardsAfterAction(props.temp.reveal_cards_after_action === "1");
      if (props.temp.tournament_image) {
        let temp_img_src = DEV_IMAGE_URL + props.temp.tournament_image.replace("./", "/");
        setTempImage(temp_img_src);
        setTournamentImage(props.temp.tournament_image);
      }
      if(props.temp.table_type){
        setTableType(props.temp.table_type);
      }
      else if(props.temp.tableType){
        setTableType(props.temp.tableType);
      }

      if(props.temp.type || props.temp.tournamentType){
        setTournamentType(props.temp.type ? props.temp.type : props.temp.tournamentType);
      }

      if(props.temp.rebalancingTableAlgorithm){
        setRebalancingTableAlgorithm(props.temp.rebalancingTableAlgorithm);
      }
      else if(props.temp.rebalancing_table_algorithm){
        setRebalancingTableAlgorithm(props.temp.rebalancing_table_algorithm);
      }

    }
    else if(Object.keys(tempValues).length > 3){
      //eslint-disable-next-line
      setUniqueDeck(tempValues.unique_deck === "1");
      //eslint-disable-next-line
      settInstantPayout(tempValues.instant_payout === "1");
      //eslint-disable-next-line
      setWildcardEnabled(tempValues.wildcards_enabled === "1");
      setWildcardValue(Number(tempValues.wildcard_value || 0));
      //eslint-disable-next-line
      setIsForMoney(tempValues.isForMoney === "1");
      setUseDecimals(tempValues.useDecimals === "1");
      //eslint-disable-next-line
      setChipsInPenny(tempValues.chips_in_penny === "1");
      setGameType(tempValues.gameType);
      //eslint-disable-next-line
      setPairMiexedAddonPlayers(tempValues.pair_mixed_addon_players === "1");
      //eslint-disable-next-line
      setHardCapEnabled(tempValues.hard_cap_enabled === "1");
      //eslint-disable-next-line
      setUsernamePrivacyEnabled(tempValues.username_privacy === "1");
      //eslint-disable-next-line
      setRevealCardsAfterAction(tempValues.reveal_cards_after_action === "1");
      setUseAdditionalPrizePoolOnly(tempValues.use_additional_payout_only === "1");
      setSelectedAdditionalPayoutId(tempValues.additional_payout_id);
      setSelectedPayoutId(tempValues.prize_pool_payout_id);
      setTournamentType(tempValues.type ? tempValues.type : tempValues.tournamentType);
      setGameType(tempValues.gameType);
      setRebalancingTableAlgorithm(tempValues.rebalancingTableAlgorithm);
    }
  }, [props.temp, tempValues])
  const {
    register,
    handleSubmit,
    errors,
    setValue,
  } = useForm({
    // react-hook-form needs values set here to work with default values properly
    defaultValues: tempValues,
  });

  const create_tour_temp_response = function (response) {
    // let parsed_histories = JSON.parse(response.getResult());
    showSnackBar("Tournament template created successfully.", "success");
    history.push("/admin");
  };

  function create_tour_temp_error(custom_msg) {
    if (custom_msg) {
      showSnackBar(custom_msg);
    }
  }

  const onSubmit = (data) => {

    // check weather the each and every field is without error or not
    var err = false;
    for (const field in onBlurErr){
      if (field === "prizeAndBlindErr" && onBlurErr["prizeAndBlindErr"].length !== 0) {
        err = true;
      } else if (field === "additionalPayoutErr" && onBlurErr["additionalPayoutErr"].length !== 0) {
        err = true;
      } else if (onBlurErr[field][0] == true){
        err = true;
      }
    }
    if (anteErr[0] === true) {
      err = true;
    }

    if (err){
      showSnackBar("please error is occurring!", "error");
    }
    else {

    if(gameType == 'five_card_stud' && tableType == 'NO_LIMIT'){
      showSnackBar("Table type NO_LIMIT is not allowed for five card stud game ", "error");
      return;
    }

    if(data.min_players_per_table && data.min_players_per_table < 2){
      return showSnackBar("Minimum value for min players per table is 2!");
    }

    if(data.min_players_per_table && parseInt(data.min_players_per_table) > parseInt(data.max_players_per_table)){
      return showSnackBar("Minimum players table can't be greater than maximum players per table!");
    }

    if (!selectedAdditionalPayoutId && !tempValues.to_update) {
      return showSnackBar("Please select one Additional Prize Pool Payout!");
    }

    if (!selectedPayoutId && !useAdditionalPrizePoolOnly && !tempValues.to_update) {
      return showSnackBar("Please select one Prize Pool Payout!");
    }
    data.additionalPayout = selectedAdditionalPayoutId;
    data.prizePayout = selectedPayoutId;
    //set payout to null if only using additional prizepool

    data.useAdditionalPayoutOnly = useAdditionalPrizePoolOnly ? "1" : "0";
    data.uniqueDeck = uniqueDeck ? "1" : "0";
    data.instantPayout = instantPayout ? "1" : "0";
    data.wildcards_enabled = wildcardEnabled ? "1" : "0";
    data.chips_in_penny = chipsInPenny ? "1" : "0";
    data.is_for_money = isForMoney ? "1" : "0";
    data.use_decimals = useDecimals ? "1" : "0";
    data.wildcard_value = wildcardValue ? wildcardValue.toString() : '';
    data.pair_mixed_addon_players = pairMixedAddonPlayers ? "1" : "0";
    data.hard_cap_enabled = hardCapEnabled ? "1" : "0";
    data.username_privacy = usernamePrivacyEnabled ? "1" : "0";
    data.reveal_cards_after_action = revealCardsAfterAction ? "1" : "0";
    data.rebalancing_table_algorithm = rebalancingTableAlgorithm;

    if(gameType != "five_card_stud")
    {
      data.blindLevels = JSON.stringify({
        blindValues: smallBlindLevels.map((level) => ({
          smallBlind: Number(level.smallBlind),
          bigBlind: Number(level.bigBlind),
        })),
      });
    }
    else
    {

      data.blindLevels = JSON.stringify({
        blindValues: smallBlindLevels.map((level) => ({
          smallBlind: Number(smallBlind),
          bigBlind: Number(smallBlind),
        })),
      });
    }

    let prizePool = {}
    flashPrizePool.map(hand => {
      prizePool[hand.name.toLowerCase().replace(/ /g, "_")] = {
        prize: Number(hand.value),
        timer: Number(hand.timer)
      }
      return null;
    })

    data.flashPrizePool = JSON.stringify({
      prizePool
    })

    let additionalPayoutPerHandListNewCopy = [...additionalPayoutPerHandList];
    additionalPayoutPerHandList.map(
        (additionalPayoutPerHand, index) => {
          if (additionalPayoutPerHand.every((item => item.value === ""))) {
            let modified = JSON.parse(JSON.stringify(additionalPayoutPerHandList[0]))
            additionalPayoutPerHandListNewCopy[index] = modified
          }
          return null;
        }
    );

    setAdditionalPayoutPerHandList(additionalPayoutPerHandListNewCopy)


    let additionalHandPayoutList = [];
    additionalPayoutPerHandListNewCopy.map(
        (additionalPayoutPerHandList, index) => {
          let additionalHandPayout = {}
          additionalPayoutPerHandList.map(hand => {
            additionalHandPayout[hand.name.toLowerCase().replace(/ /g, "_")] = Number(hand.value);
            return null;
          });
          additionalHandPayoutList.push(additionalHandPayout)
          return null;
        }
    )

    let hand = additionalHandPayoutList.slice()[0]
    additionalHandPayoutList.shift()
    let hands = {}
    additionalHandPayoutList.map((hand, index) => {
      hands[index + 2] = hand
      return null;
    })
    data.additionalPayoutPlayer = JSON.stringify({
      hand,
      hands
    });

    data.tournamentImage = tournamentImage;
    if (tempValues.to_update) {
      grpc_client.updateTournamentTemplate(
          tempValues.id,
          data,
          () => {
            showSnackBar("Tournament template Updated successfully.", "success");
            history.push("/admin");
          },
          create_tour_temp_error
      );
    } else {
      grpc_client.createTournamentTemplate(
          data,
          create_tour_temp_response,
          create_tour_temp_error
      );
    }
   }
  };

  const validateFlashPrizeValue = (flashPrizes) => {
    let current_value = null;
    let value_in_order = true;
    flashPrizes.forEach((hand, key) => {
      if(parseInt(current_value) && parseInt(hand.value) > parseInt(current_value)){
        value_in_order = false;
        return;
      }
      current_value = parseInt(hand.value);
    });

    return value_in_order;
  }

  const validateAdditionalPayout = (hands) => {
    return hands.royal_flush >= hands.straight_flush
      && hands.straight_flush >= hands.four_of_a_kind
      && hands.four_of_a_kind >= hands.four_aces
      && hands.four_aces >= hands.four_fives_through_kings
      && hands.four_fives_through_kings >= hands.four_twos_threes_or_fours
      && hands.four_twos_threes_or_fours >= hands.full_house
      && hands.full_house >= hands.flush
      && hands.flush >= hands.straight
      && hands.straight >= hands.three_of_a_kind
      && hands.three_of_a_kind >= hands.two_pair
      && hands.two_pair >= hands.jacks_or_better
      && hands.jacks_or_better >= hands.pair
      && hands.pair >= hands.one_jack_or_better
      && hands.one_jack_or_better >= hands.high_card;
  }

  /**
   * Function to check weather the number is non-negative float or not
   *
   * @param String name : name of the field
   * @param Object e: the event triggered
   * @param Boolean equalToZero: to check weather the number can be equal to zero or not
   * @return Boolean: true or false value, weather the number is non-negative float or not
  */
  const validateNonNegativeFloat = (name, e, equalToZero, fieldErr) => {
      // check weather number is less than 0 or less than or equal to zero
      let _value = parseFloat(e.target.value);
      let _check = equalToZero?_value<0:_value<=0;
      if (e.target.value === ""){
          setOnBlurErr(prevState => ({
            ...prevState,
            [fieldErr]: [false, ""],
          }));
      } else if(isNaN(e.target.value) || _check){
          setOnBlurErr(prevState => ({
            ...prevState,
            [fieldErr]: [true, "should be non-negative float number & greater than 0"],
          }));
      } else {
          setOnBlurErr(prevState => ({
            ...prevState,
            [fieldErr]: [false, ""],
          }));
      }
  }

  /**
   * Function to check weather the number is non-negative number or not
   *
   * @param String name : name of the field
   * @param Object e: the event triggered
   * @param Boolean equalToZero: to check weather the number can be equal to zero or not
   * @return Boolean: true or false value, weather the number is non-negative integer or not
  */
  const validateNonNegativeInteger = (name, e, equalToZero, fieldErr) => {
      // check weather number is less than 0 or less than or equal to zero
      let _value = parseInt(e.target.value);
      let _check = equalToZero?_value<0:_value<=0;
      if (e.target.value === "") {
            setOnBlurErr(prevState => ({
              ...prevState,
              [fieldErr]: [false, ""],
            }));
      } else if (isNaN(e.target.value) || _check || !regExp.test(e.target.value)) {
            setOnBlurErr(prevState => ({
              ...prevState,
              [fieldErr]: [true, "value should be non-negative integer"],
            }));
      } else if (name === "table_timer" && _value < 15){
            setOnBlurErr(prevState => ({
              ...prevState,
              [fieldErr]: [true, "It should be greater than or equal to 15"],
            }));
      } else if(name === "min_players_per_table" && (_value < 2 || _value > 10)){
            setOnBlurErr(prevState => ({
              ...prevState,
              [fieldErr]: [true, "Minium players per table should be atleast 2 and less than 10"],
            }));
      } else {
            setOnBlurErr(prevState => ({
              ...prevState,
              [fieldErr]: [false, ""],
            }));
      }
  }


  // use this handler so material-ui select can work with react-hook-form
  const changeSelectUsing = (name) => (e) => {
    setValue(name, e.target.value);
    if (name === "gameType") {
      let _gameType = e.target.value;
      if(_gameType == 'five_card_stud' && tableType == 'NO_LIMIT'){
        showSnackBar("Table type selected is NO_LIMIT which is not allowed for five card stud please change it first", 'error');
        return;
      }
      setGameType(e.target.value);
    }

    if(name === "tableType"){
      let _tableType = e.target.value;
      if(_tableType == 'NO_LIMIT'){
        if(gameType == 'five_card_stud'){
          showSnackBar("Table type NO_LIMIT is not allowed for five card stud game ", "error");
          return;
        }
        setValue('table_max_num_raises', 'NO_LIMIT');
      }
      else{
        if(tempValues){
          setValue('table_max_num_raises', tempValues.tableMaxNumRaises);
        }
        else{
          setValue('table_max_num_raises', 0);
        }
      }

      setTableType(e.target.value);

    }
    if(name === "tournamentType"){
      setTournamentType(e.target.value);
    }

    if (name === "rebalancing_table_algorithm") {
        setRebalancingTableAlgorithm(e.target.value);
    }

  };

  /**
  *  The Function to be called during on focus out or (on blur)
  * @param String fieldErr : the name of field error in the useState that helps to store the error message
  */
  const focusOutFunction2 = (fieldErr) => (e) => {
      let name = e.target.name;
      setValue(name, e.target.value);

      if (name === "buyin" || name === "rake"  ||
          name === "buyin_chips" || name === "addon_chips"
          )
        {
            validateNonNegativeFloat(name, e, false, fieldErr);
        }

      if (name === "min_prize_pool_value" || name === "scheduled_breaks" ||
          name === "small_blind_max_value")
        {
            validateNonNegativeFloat(name, e, true, fieldErr);
        }

      if (name === "table_timer"      || name === "time_limit_seconds" ||
          name === "blinds_increase_interval_rounds" ||
          name === "blinds_increase_interval_seconds"
          ){
              validateNonNegativeInteger(name, e, false, fieldErr);
        }

      if (
          name === "addon_threshold" || name === "rebuys_permitted" ||
          name === "rebuys_round_start" || name === "addons_permitted" ||
          name === "addons_round_start" || name === "min_players_per_table" ||
          name === "tour_players_min" || name === "pending_timeout_seconds")  {
            validateNonNegativeInteger(name, e, true, fieldErr);
      }

      if (name === "table_max_num_raises") {
        if(tableType==="NO_LIMIT"){
            showSnackBar("Table max num raises is not needed for NO limit table type");
        } else {
            validateNonNegativeInteger(name, e, false, fieldErr);
        }
      }
  }

  /**
  *  The Function to be called during on focus out or (on blur) esp for the end or maximum field
  * @param String otherFieldId : the id of the start/minimum value to be compared with,
  * @param String fieldErr : the name of field error in the useState that helps to store the error message
  */
  const focusOutFunction = (otherFieldId, fieldErr) => (e) => {
      let name = e.target.name;
      let _tobe_compared_field = ["rebuys_round_end", "addons_round_end", "tour_players_max", "max_players_per_table"];
      let _value = parseInt(e.target.value);
      let equalToZero = true;
      let _check = equalToZero?_value<0:_value<=0;
      if (e.target.value === "") {
          setOnBlurErr(prevState => ({
            ...prevState,
            [fieldErr]: [false, ""],
          }));
      } else if (isNaN(e.target.value) || _check || !regExp.test(e.target.value)) {
          setOnBlurErr(prevState => ({
            ...prevState,
            [fieldErr]: [true, "value should be non-negative integer"],
          }));
      } else if(_tobe_compared_field.includes(name)) {
          let _first_class = ["rebuys_round_end", "addons_round_end"];
          let _end_value = parseFloat(e.target.value);
          let _start_value = document.querySelector("#"+otherFieldId).value;
          if ( _start_value === "") {
              setOnBlurErr(prevState => ({
                ...prevState,
                [otherFieldId+"Err"]: [true, "This should be entered first!"],
              }));
          } else if(name === "max_players_per_table" && _end_value > 10) {
              setOnBlurErr(prevState => ({
                ...prevState,
                [fieldErr]: [true, "Maximum players per table should be less than 10"],
              }));
          } else if( _end_value < parseFloat(_start_value)){
              let _errorMsg = _first_class.includes(name)?"should be greater than the start value":"should be greater than the minimum players";
              setOnBlurErr(prevState => ({
                ...prevState,
                [fieldErr]: [true, _errorMsg],
              }));
          }  else {
              setOnBlurErr(prevState => ({
                ...prevState,
                [fieldErr]: [false, ""],
              }));
          }
      } else {
          setOnBlurErr(prevState => ({
            ...prevState,
            [fieldErr]: [false, ""],
          }));
      }
    };

  const isAddon0Valid = (index) => {
    if (index === 0) {
      return true;
    } else {
      return !additionalPayoutPerHandList[0].some(item => item.value === "")
    }
  };


  const changeNumberOfAddon = () => (e) => {
    let currentVal = parseInt(e.target.value) || 0;
      //eslint-disable-next-line
      if (currentVal === 0) {

        if (additionalPayoutPerHandList.length > 1) {
          setPreviousAdditionalPayoutPerHandList(additionalPayoutPerHandList)
          let newAdditionalPayoutBuyin = []
          newAdditionalPayoutBuyin.push(additionalPayoutPerHandList[0])
          setSelectedAddon(0);
          setAdditionalPayoutPerHandList(newAdditionalPayoutBuyin)
        }
      } else if ((currentVal + 1) > additionalPayoutPerHandList.length) {

        if (previousAdditionalPayoutPerHandList.length > 1 && (currentVal + 1) < previousAdditionalPayoutPerHandList.length) {
          let k = previousAdditionalPayoutPerHandList.length - currentVal;
          setAdditionalPayoutPerHandList(
              previousAdditionalPayoutPerHandList.slice(0, currentVal + 1)
          )
        } else {
          let k = (currentVal + 1) - additionalPayoutPerHandList.length
          if (additionalPayoutPerHandList.length === 1 && previousAdditionalPayoutPerHandList.length > 1) {
            k = (currentVal + 1) - previousAdditionalPayoutPerHandList.length
          }
          let newAdditionalPayoutBuyin = []
          for (let i = 0; i < k; i++) {
            newAdditionalPayoutBuyin.push([
              {name: "Royal flush", value: ""},
              {name: "Straight flush", value: ""},
              {name: "Four of a kind", value: ""},
              {name: "Four Aces", value: ""},
              {name: "Four Fives Through Kings", value: ""},
              {name: "Four Twos Threes or Fours", value: ""},
              {name: "Full house", value: ""},
              {name: "Flush", value: ""},
              {name: "Straight", value: ""},
              {name: "Three of a kind", value: ""},
              {name: "Two pair", value: ""},
              {name: "Jacks or Better", value: ""},
              {name: "Pair", value: ""},
              {name: "One Jack or Better", value: ""},
              {name: "High card", value: ""},
            ])
          }
          if (additionalPayoutPerHandList.length === 1 && previousAdditionalPayoutPerHandList.length > 1) {
            setAdditionalPayoutPerHandList(
                previousAdditionalPayoutPerHandList.concat(newAdditionalPayoutBuyin)
            )
          } else {
            setAdditionalPayoutPerHandList(
                additionalPayoutPerHandList.concat(newAdditionalPayoutBuyin)
            )
          }
        }
      }
  };

  const changeSelectedAddon = () => (e) => {

    setSelectedAddon(e.target.value);
    if (additionalPayoutPerHandList[e.target.value].every((item => item.value === ""))) {
      let additionalPayoutPerHandListCopy = [...additionalPayoutPerHandList];
      let modified = JSON.parse(JSON.stringify(additionalPayoutPerHandList[0]))
      additionalPayoutPerHandListCopy[e.target.value] = modified
      setAdditionalPayoutPerHandList(additionalPayoutPerHandListCopy)
    }
  };

  // custom register material-ui select so that they can work with react-hook-from properly
  useEffect(() => {
    register({name: "gameType"});
    register({name: "tableType"});
    register({name: "tournamentType"});
    register({name: "additionalPayout"});
    register({name: "rebalancingTableAlgorithm"});

  }, [register]);

  //Dynamic number of levels and small blinds values
  const [smallBlindLevels, setSmallBlindLevels] = useState( Object.keys(tempValues).length > 3 ? [] :[
    {smallBlind: "", bigBlind: ""},
    {smallBlind: "", bigBlind: ""},
    {smallBlind: "", bigBlind: ""}
  ]);

  //Add a level with a different small blinds value
  const addLevel = () => {
    setSmallBlindLevels((prevSBL) => [
      ...prevSBL,
      {smallBlind: "", bigBlind: ""},
    ]);
  };

  //Remove a certain level but leave at least one level
  const removeLevel = (index) => () => {
    setSmallBlindLevels((prevSBL) =>
        prevSBL.length > 1
            ? [...prevSBL.filter((item, idx) => idx !== index)]
            : prevSBL
    );
  };

  //onchange handler for small blind value levels
  let smallBlind = 0;
  const onSBLevelChange = (index) => (e) => {
    e.persist();
    if(gameType !== "five_card_stud") {
      setSmallBlindLevels((prevSBL) =>
          prevSBL.map((item, idx) =>
              index !== idx
                  ? item
                  : {smallBlind: e.target.value, bigBlind: item.bigBlind}
          )
        );
    } else {
      smallBlind = e.target.value;
    }
  };


  //onchange handler for big blind value levels
  const onBBLevelChange = (index) => (e) => {
    e.persist();
    setSmallBlindLevels((prevSBL) =>
        prevSBL.map((item, idx) =>
            index !== idx
                ? item
                : {smallBlind: item.smallBlind, bigBlind: e.target.value}
        )
    );
  };

  //Handle prize pool
  const [flashPrizePool, setFlashPrizePool] = useState([
    {label: "Royal flush", name: "royal_flush", value: "", timer: ""},
    {label: "Straight flush", name: "straight_flush", value: "", timer: ""},
    {label: "Four of a kind", name: "four_of_a_kind", value: "", timer: ""},
    // { name: "Four Aces", value: "",timer:"" },
    // { name: "Four Fives Through Kings", value: "",timer:"" },
    // { name: "Four Twos Threes or Fours", value: "",timer:"" },
    {label: "Full house", name: "full_house", value: "", timer: ""},
    {label: "Flush", name: "flush", value: "", timer: ""},
    {label: "Straight", name: "straight", value: "", timer: ""},
    {label: "Three of a kind", name: "three_of_a_kind", value: "", timer: ""},
    {label: "Two pair", name: "two_pair", value: "", timer: ""},
    // { name: "Jacks or Better", value: "",timer:"" },
    {label: "Pair", name: "pair", value: "", timer: ""},
    // { name: "One Jack or Better", value: "",timer:"" },
    {label: "High card", name: "high_card", value: "", timer: ""},
  ]);


  useEffect(() => {
    if (tempValues.prizePoolValues) {
      let prizePool = JSON.parse(tempValues.prizePoolValues)?.prizePool;
      let blindLevels = tempValues.blindLevels && tempValues.blindLevels !== "" ? JSON.parse(tempValues.blindLevels)?.blindValues : [];

      setFlashPrizePool([
        {name: "royal_flush", value: prizePool?.royal_flush?.prize || "", timer: prizePool?.royal_flush?.timer || ""},
        {
          name: "straight_flush",
          value: prizePool?.straight_flush?.prize || "",
          timer: prizePool?.straight_flush?.timer || ""
        },
        {
          name: "four_of_a_kind",
          value: prizePool?.four_of_a_kind?.prize || "",
          timer: prizePool?.four_of_a_kind?.timer || ""
        },
        // { name: "Four Aces",  value: prizePool?.four_aces?.prize || "", timer: prizePool?.four_aces?.timer || ""  },
        // { name: "Four Fives Through Kings",  value: prizePool?.four_fives_through_kings?.prize || "", timer: prizePool?.four_fives_through_kings?.timer || ""  },
        // { name: "Four Twos Threes or Fours",  value: prizePool?.four_twos_threes_or_fours?.prize || "", timer: prizePool?.four_twos_threes_or_fours?.timer || ""  },
        {name: "full_house", value: prizePool?.full_house?.prize || "", timer: prizePool?.full_house?.timer || ""},
        {name: "flush", value: prizePool?.flush?.prize || "", timer: prizePool?.flush?.timer || ""},
        {name: "straight", value: prizePool?.straight?.prize || "", timer: prizePool?.straight?.timer || ""},
        {
          name: "three_of_a_kind",
          value: prizePool?.three_of_a_kind?.prize || "",
          timer: prizePool?.three_of_a_kind?.timer || ""
        },
        {name: "two_pair", value: prizePool?.two_pair?.prize || "", timer: prizePool?.two_pair?.timer || ""},
        // { name: "Jacks or Better",  value: prizePool?.jacks_or_better?.prize || "", timer: prizePool?.jacks_or_better?.timer || ""  },
        {name: "pair", value: prizePool?.pair?.prize || "", timer: prizePool?.pair?.timer || ""},
        // { name: "One Jack or Better",  value: prizePool?.one_jack_or_better?.prize || "", timer: prizePool?.one_jack_or_better?.timer || ""  },
        {name: "high_card", value: prizePool?.high_card?.prize || "", timer: prizePool?.high_card?.timer || ""},
      ])
      setSmallBlindLevels(blindLevels);

      grpc_client.getTournamentTemplateDetailAdmin(
          tempValues.id,
          (response) => {
            let templateDetail = JSON.parse(response.getTournamentTempalteDetail());
            setSelectedAdditionalPayoutId(templateDetail.additional_prize_pool_payout_id)
            setSelectedPayoutId(templateDetail.prize_pool_payout_id)
            setAdditionalPayoutBuyin(templateDetail?.additional_player_payout?.buyin ? templateDetail?.additional_player_payout?.buyin : additionalPayoutBuyin);
            let tempAdditionalPayoutPerHand = [
              {
                name: "royal_flush",
                value: templateDetail?.additional_player_payout?.hand?.royal_flush ? templateDetail.additional_player_payout.hand.royal_flush : ""
              },
              {
                name: "straight_flush",
                value: templateDetail?.additional_player_payout?.hand?.straight_flush ? templateDetail.additional_player_payout.hand.straight_flush : ""
              },
              {
                name: "four_of_a_kind",
                value: templateDetail?.additional_player_payout?.hand?.four_of_a_kind ? templateDetail.additional_player_payout.hand.four_of_a_kind : ""
              },
              {
                name: "four_aces",
                value: templateDetail?.additional_player_payout?.hand?.four_aces ? templateDetail.additional_player_payout.hand.four_aces : ""
              },
              {
                name: "four_fives_through_kings",
                value: templateDetail?.additional_player_payout?.hand?.four_fives_through_kings ? templateDetail.additional_player_payout.hand.four_fives_through_kings : ""
              },
              {
                name: "four_twos_threes_or_fours",
                value: templateDetail?.additional_player_payout?.hand?.four_twos_threes_or_fours ? templateDetail.additional_player_payout.hand.four_twos_threes_or_fours : ""
              },
              {
                name: "full_house",
                value: templateDetail?.additional_player_payout?.hand?.full_house ? templateDetail.additional_player_payout.hand.full_house : ""
              },
              {
                name: "flush",
                value: templateDetail?.additional_player_payout?.hand?.flush ? templateDetail.additional_player_payout.hand.flush : ""
              },
              {
                name: "straight",
                value: templateDetail?.additional_player_payout?.hand?.straight ? templateDetail.additional_player_payout.hand.straight : ""
              },
              {
                name: "three_of_a_kind",
                value: templateDetail?.additional_player_payout?.hand?.three_of_a_kind ? templateDetail.additional_player_payout.hand.three_of_a_kind : ""
              },
              {
                name: "two_pair",
                value: templateDetail?.additional_player_payout?.hand?.two_pair ? templateDetail.additional_player_payout.hand.two_pair : ""
              },
              {
                name: "jacks_or_better",
                value: templateDetail?.additional_player_payout?.hand?.jacks_or_better ? templateDetail.additional_player_payout.hand.jacks_or_better : ""
              },
              {
                name: "pair",
                value: templateDetail?.additional_player_payout?.hand?.pair ? templateDetail.additional_player_payout.hand.pair : ""
              },
              {
                name: "one_jack_or_better",
                value: templateDetail?.additional_player_payout?.hand?.one_jack_or_better ? templateDetail.additional_player_payout.hand.one_jack_or_better : ""
              },
              {
                name: "high_card",
                value: templateDetail?.additional_player_payout?.hand?.high_card ? templateDetail.additional_player_payout.hand.high_card : ""
              },
            ];
            setAdditionalPayoutPerHand(tempAdditionalPayoutPerHand);

            if (templateDetail?.additional_player_payout && !('hands' in templateDetail.additional_player_payout)) {
              let tempAdditionalPayoutBuyin = (templateDetail?.additional_player_payout?.buyin ? templateDetail?.additional_player_payout?.buyin : additionalPayoutBuyin)
              let additionalPayoutPerHandListNew = [];
              tempAdditionalPayoutBuyin.map((buyin) => {
                additionalPayoutPerHandListNew.push([
                  {
                    name: "royal_flush",
                    value: parseInt(tempAdditionalPayoutPerHand[0].value) * parseFloat(buyin.payout)
                  },
                  {
                    name: "straight_flush",
                    value: parseInt(tempAdditionalPayoutPerHand[1].value) * parseFloat(buyin.payout)
                  },
                  {
                    name: "four_of_a_kind",
                    value: parseInt(tempAdditionalPayoutPerHand[2].value) * parseFloat(buyin.payout)
                  },
                  {name: "four_aces", value: parseInt(tempAdditionalPayoutPerHand[3].value) * parseFloat(buyin.payout)},
                  {
                    name: "four_fives_through_kings",
                    value: parseInt(tempAdditionalPayoutPerHand[4].value) * parseFloat(buyin.payout)
                  },
                  {
                    name: "four_twos_threes_or_fours",
                    value: parseInt(tempAdditionalPayoutPerHand[5].value) * parseFloat(buyin.payout)
                  },
                  {
                    name: "full_house",
                    value: parseInt(tempAdditionalPayoutPerHand[6].value) * parseFloat(buyin.payout)
                  },
                  {name: "flush", value: parseInt(tempAdditionalPayoutPerHand[7].value) * parseFloat(buyin.payout)},
                  {name: "straight", value: parseInt(tempAdditionalPayoutPerHand[8].value) * parseFloat(buyin.payout)},
                  {
                    name: "three_of_a_kind",
                    value: parseInt(tempAdditionalPayoutPerHand[9].value) * parseFloat(buyin.payout)
                  },
                  {name: "two_pair", value: parseInt(tempAdditionalPayoutPerHand[10].value) * parseFloat(buyin.payout)},
                  {
                    name: "jacks_or_better",
                    value: parseInt(tempAdditionalPayoutPerHand[11].value) * parseFloat(buyin.payout)
                  },
                  {name: "pair", value: parseInt(tempAdditionalPayoutPerHand[12].value) * parseFloat(buyin.payout)},
                  {
                    name: "one_jack_or_better",
                    value: parseInt(tempAdditionalPayoutPerHand[13].value) * parseFloat(buyin.payout)
                  },
                  {
                    name: "high_card",
                    value: parseInt(tempAdditionalPayoutPerHand[14].value) * parseFloat(buyin.payout)
                  },
                ])
                return null;
              })

              setAdditionalPayoutPerHandList(additionalPayoutPerHandListNew);

            } else if ('hands' in templateDetail?.additional_player_payout) {
              let additionalPayoutPerHandListNew = [];
              let tempAdditionalPayoutPerHand = [
                {
                  name: "royal_flush",
                  value: templateDetail?.additional_player_payout?.hand?.royal_flush ? templateDetail.additional_player_payout.hand.royal_flush : ""
                },
                {
                  name: "straight_flush",
                  value: templateDetail?.additional_player_payout?.hand?.straight_flush ? templateDetail.additional_player_payout.hand.straight_flush : ""
                },
                {
                  name: "four_of_a_kind",
                  value: templateDetail?.additional_player_payout?.hand?.four_of_a_kind ? templateDetail.additional_player_payout.hand.four_of_a_kind : ""
                },
                {
                  name: "four_aces",
                  value: templateDetail?.additional_player_payout?.hand?.four_aces ? templateDetail.additional_player_payout.hand.four_aces : ""
                },
                {
                  name: "four_fives_through_kings",
                  value: templateDetail?.additional_player_payout?.hand?.four_fives_through_kings ? templateDetail.additional_player_payout.hand.four_fives_through_kings : ""
                },
                {
                  name: "four_twos_threes_or_fours",
                  value: templateDetail?.additional_player_payout?.hand?.four_twos_threes_or_fours ? templateDetail.additional_player_payout.hand.four_twos_threes_or_fours : ""
                },
                {
                  name: "full_house",
                  value: templateDetail?.additional_player_payout?.hand?.full_house ? templateDetail.additional_player_payout.hand.full_house : ""
                },
                {
                  name: "flush",
                  value: templateDetail?.additional_player_payout?.hand?.flush ? templateDetail.additional_player_payout.hand.flush : ""
                },
                {
                  name: "straight",
                  value: templateDetail?.additional_player_payout?.hand?.straight ? templateDetail.additional_player_payout.hand.straight : ""
                },
                {
                  name: "three_of_a_kind",
                  value: templateDetail?.additional_player_payout?.hand?.three_of_a_kind ? templateDetail.additional_player_payout.hand.three_of_a_kind : ""
                },
                {
                  name: "two_pair",
                  value: templateDetail?.additional_player_payout?.hand?.two_pair ? templateDetail.additional_player_payout.hand.two_pair : ""
                },
                {
                  name: "jacks_or_better",
                  value: templateDetail?.additional_player_payout?.hand?.jacks_or_better ? templateDetail.additional_player_payout.hand.jacks_or_better : ""
                },
                {
                  name: "pair",
                  value: templateDetail?.additional_player_payout?.hand?.pair ? templateDetail.additional_player_payout.hand.pair : ""
                },
                {
                  name: "one_jack_or_better",
                  value: templateDetail?.additional_player_payout?.hand?.one_jack_or_better ? templateDetail.additional_player_payout.hand.one_jack_or_better : ""
                },
                {
                  name: "high_card",
                  value: templateDetail?.additional_player_payout?.hand?.high_card ? templateDetail.additional_player_payout.hand.high_card : ""
                },
              ]
              additionalPayoutPerHandListNew.push(tempAdditionalPayoutPerHand);

              let obj = templateDetail.additional_player_payout.hands;
              Object.keys(obj).map((key) => {
                let tempAdditionalPayoutPerHand = [
                  {name: "royal_flush", value: obj[key].royal_flush},
                  {name: "straight_flush", value: obj[key].straight_flush},
                  {name: "four_of_a_kind", value: obj[key].four_of_a_kind},
                  {name: "four_aces", value: obj[key].four_aces},
                  {name: "four_fives_through_kings", value: obj[key].four_fives_through_kings},
                  {name: "four_twos_threes_or_fours", value: obj[key].four_twos_threes_or_fours},
                  {name: "full_house", value: obj[key].full_house},
                  {name: "flush", value: obj[key].flush},
                  {name: "straight", value: obj[key].straight},
                  {name: "three_of_a_kind", value: obj[key].three_of_a_kind},
                  {name: "two_pair", value: obj[key].two_pair},
                  {name: "jacks_or_better", value: obj[key].jacks_or_better},
                  {name: "pair", value: obj[key].pair},
                  {name: "one_jack_or_better", value: obj[key].one_jack_or_better},
                  {name: "high_card", value: obj[key].high_card},
                ]
                additionalPayoutPerHandListNew.push(tempAdditionalPayoutPerHand);
                return null;
              })
              setAdditionalPayoutPerHandList(additionalPayoutPerHandListNew);

            }


          },
          (error) => {
            if (error) {
              showSnackBar(error);
            }
          });
    }
    //eslint-disable-next-line
  }, [tempValues])

  //onchange handler for flash prize pool
  const onPrizePoolChange = (e) => {
      // first validate the number entering it should be >=0
      e.persist();
      setFlashPrizePool((prevSBL) => prevSBL.map(item => {
        if (item.name === e.target.name) item.value = e.target.value
        return item;
      }))
  };

  const onPrizeAndBlindBlur = (e) => {
      // check weather number is less than 0 or less than or equal to zero
      var name = e.target.name;
      let _value = parseInt(e.target.value);
      let array_error = onBlurErr.prizeAndBlindErr;
      if (e.target.value === ""){
          document.querySelector("#"+name).textContent = "";
          if (array_error.includes(name)) {
            var indx = array_error.indexOf(name);
            array_error.splice(indx, 1)
          }
          setOnBlurErr(prevState => ({
            ...prevState,
            ["prizeAndBlindErr"]: array_error,
          }));
      }else if (isNaN(e.target.value) || _value < 0 || !regExp.test(e.target.value)) {
          document.querySelector("#"+name).textContent = "should be non-negative integer";
          if (array_error.includes(name)){
          } else {
            array_error.push(name);
          }
          setOnBlurErr(prevState => ({
            ...prevState,
            ["prizeAndBlindErr"]: array_error,
          }));
      } else {
          document.querySelector("#"+name).textContent = "";
          if (array_error.includes(name)) {
            var indx = array_error.indexOf(name);
            array_error.splice(indx, 1)
          }
          setOnBlurErr(prevState => ({
            ...prevState,
            ["prizeAndBlindErr"]: array_error,
          }));
      }
  }

  const onBlurAnte = (e) => {
    // check weather number is less than 0 or less than or equal to zero
    var name = e.target.name;
    let _value = parseInt(e.target.value);
    if (e.target.value === ""){
        setAnteErr([false, ""])
    }else if (isNaN(e.target.value) || _value < 0 || !regExp.test(e.target.value)) {
        setAnteErr([true, "value should be non negative number and greater than 0"])
    } else {
        setAnteErr([false, ""])
    }
  }

  //onchange handler for flash prize pool timer
  //todo comon  someone need to refcator this code  (:
  const onPrizePoolTimerChange = (e) => {
    // first validate, it should be positive numbers >= 0
    e.persist();
      setFlashPrizePool((prevSBL) => prevSBL.map(item => {
        if (item.name + '_timer' === e.target.name) item.timer = e.target.value
        return item;
    }))
  };

  const [percentages, setPercentages] = useState([]);
  const [selectedAdditionalPayoutId, setSelectedAdditionalPayoutId] = useState(null);
  const [selectedPayoutId, setSelectedPayoutId] = useState(null);
  useEffect(() => {
    grpc_client.getPayoutStructure({
      pagination_current_page: prizePoolPage,
      pagination_items_per_page: 10
    }, (response) => {
      let parsedResponse = JSON.parse(response);
      setPercentages(parsedResponse.payload);
      setPrizePoolCount(parsedResponse.pagination_data.number_of_pages);
    }, (error) => {
      if (error) {
        showSnackBar(error);
      }
    })

  }, [prizePoolPage, grpc_client, showSnackBar,tempValues])

  const handleChangeAdditonalPayout = (id) => (event) => {
    setSelectedAdditionalPayoutId(id);
  }

  const handleChangePayout = (id) => (event) => {
    setSelectedPayoutId(id);
  }
  //Handle additional payout per hand
  //eslint-disable-next-line
  const [additionalPayoutPerHand, setAdditionalPayoutPerHand] = useState([
    {name: "royal_flush", label: "Royal flush", value: ""},
    {name: "straight_flush", label: "Straight flush", value: ""},
    {name: "four_of_a_kind", label: "Four of a kind", value: ""},
    {name: "four_aces", label: "Four Aces", value: ""},
    {name: "four_fives_through_kings", label: "Four Fives Through Kings", value: ""},
    {name: "four_twos_threes_or_fours", label: "Four Twos Threes or Fours", value: ""},
    {name: "full_house", label: "Full house", value: ""},
    {name: "flush", label: "Flush", value: ""},
    {name: "straight", label: "Straight", value: ""},
    {name: "three_of_a_kind", label: "Three of a kind", value: ""},
    {name: "two_pair", label: "Two pair", value: ""},
    {name: "jacks_or_better", label: "Jacks or Better", value: ""},
    {name: "pair", label: "Pair", value: ""},
    {name: "one_jack_or_better", label: "One Jack or Better", value: ""},
    {name: "high_card", label: "High card", value: ""},
  ]);
  const [additionalPayoutPerHandList, setAdditionalPayoutPerHandList] = useState([[
    {name: "royal_flush", label: "Royal flush", value: ""},
    {name: "straight_flush", label: "Straight flush", value: ""},
    {name: "four_of_a_kind", label: "Four of a kind", value: ""},
    {name: "four_aces", label: "Four Aces", value: ""},
    {name: "four_fives_through_kings", label: "Four Fives Through Kings", value: ""},
    {name: "four_twos_threes_or_fours", label: "Four Twos Threes or Fours", value: ""},
    {name: "full_house", label: "Full house", value: ""},
    {name: "flush", label: "Flush", value: ""},
    {name: "straight", label: "Straight", value: ""},
    {name: "three_of_a_kind", label: "Three of a kind", value: ""},
    {name: "two_pair", label: "Two pair", value: ""},
    {name: "jacks_or_better", label: "Jacks or Better", value: ""},
    {name: "pair", label: "Pair", value: ""},
    {name: "one_jack_or_better", label: "One Jack or Better", value: ""},
    {name: "high_card", label: "High card", value: ""},
  ]]);

  const [previousAdditionalPayoutPerHandList, setPreviousAdditionalPayoutPerHandList] = useState([[]]);


  // todo this method should be refactred
  //onchange handler for additional payout
  const onAddtionalPayoutPerHandChange = (e) => {
    // firs check validation, they should be non negative floats(>0)
    e.persist();
    let additionalPayoutPerHandListCopy = [...additionalPayoutPerHandList]
    let a = [...additionalPayoutPerHandListCopy[selectedAddon]]
    a = a.map(item => {
      if (item.name === e.target.name) {
        item.value = e.target.value
      }
      return item;
    })
    additionalPayoutPerHandListCopy[selectedAddon] = a;
    //additionalPayoutPerHandListCopy[selectedAddon][e.target.name] = e.target.value
    setAdditionalPayoutPerHandList(additionalPayoutPerHandListCopy)

    /*setAdditionalPayoutPerHand((prev) => prev.map(item => {
      if(item.name === e.target.name) item.value = e.target.value
      return item;
    }))*/
  };

  const onAddtionalPayoutPerHandBlur = (e) => {
      // check weather number is less than 0 or less than or equal to zero
      var name = e.target.name;
      let _value = parseInt(e.target.value);
      let array_error = onBlurErr.additionalPayoutErr;
      if (e.target.value === ""){
          document.querySelector("#"+name+"_additional").textContent = "";
          if (array_error.includes(name+"_additional")) {
            var indx = array_error.indexOf(name+"_additional");
            array_error.splice(indx, 1)
          }
          setOnBlurErr(prevState => ({
            ...prevState,
            ["additionalPayoutErr"]: array_error,
          }));
      }else if (isNaN(e.target.value) || _value < 0 || !regExp.test(e.target.value)) {
          document.querySelector("#"+name+"_additional").textContent = "should be non-negative integer";
          if (array_error.includes(name+"_additional")){
          } else {
            array_error.push(name+"_additional");
          }
          setOnBlurErr(prevState => ({
            ...prevState,
            ["additionalPayoutErr"]: array_error,
          }));
      } else {
          document.querySelector("#"+name+"_additional").textContent = "";
          if (array_error.includes(name+"_additional")) {
            var indx = array_error.indexOf(name+"_additional");
            array_error.splice(indx, 1)
          }
          setOnBlurErr(prevState => ({
            ...prevState,
            ["additionalPayoutErr"]: array_error,
          }));
      }
  }

  //Dynamic number buyin ranges and corresponding payout
  const [additionalPayoutBuyin, setAdditionalPayoutBuyin] = useState([
    {buyin: "1", addon: "", payout: ""},
  ]);

  const handlePrizePoolPaginationChange = (event, value) => {
    setPrizePoolPage(value);
  }

  const handleImageChange = e => {

    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = function () {
      setTournamentImage(btoa(reader.result));
      setRemoveIcon(true);
    };
    reader.onerror = function () {
      setRemoveIcon(false);
    };
    reader.onabort = function () {
      setRemoveIcon(false);
    }
    reader.readAsBinaryString(file);

    let reader2 = new FileReader();
    reader2.onloadend = () => {
      setTempImage(reader2.result);
      setRemoveIcon(true);
    };
    reader2.readAsDataURL(file);
    e.target.value = "";
  }

  const handleXmlChange = e => {
    const file = e.target.files[0];
    const allowedFileType = /(\.xml|)$/i;
    if (!allowedFileType.exec(file)) {
      showSnackBar("File extension not supported!.", "error");
    } else {
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = function () {
        const xmlAsString = reader.result;
        parseString(xmlAsString, {trim: true, explicitRoot:false, explicitArray:false}, function (err, result){
          if(err)  showSnackBar("Please Upload the Correct Document !.", "error");
          /**
           * if data is exported as table_type set tableType z
           */
          const formattedJson = stringfyJson(result);
          populateXmlValue(formattedJson);

        });
      };
    }
  }

  const populateFlashPrizePools = flashPrizePools => {
    let prizePool = flashPrizePools.prizePool;
      setFlashPrizePool([
        {name: "royal_flush", value: prizePool?.royal_flush?.prize || "", timer: prizePool?.royal_flush?.timer || ""},
        {
          name: "straight_flush",
          value: prizePool?.straight_flush?.prize || "",
          timer: prizePool?.straight_flush?.timer || ""
        },
        {
          name: "four_of_a_kind",
          value: prizePool?.four_of_a_kind?.prize || "",
          timer: prizePool?.four_of_a_kind?.timer || ""
        },{name: "full_house", value: prizePool?.full_house?.prize || "", timer: prizePool?.full_house?.timer || ""},
        {name: "flush", value: prizePool?.flush?.prize || "", timer: prizePool?.flush?.timer || ""},
        {name: "straight", value: prizePool?.straight?.prize || "", timer: prizePool?.straight?.timer || ""},
        {
          name: "three_of_a_kind",
          value: prizePool?.three_of_a_kind?.prize || "",
          timer: prizePool?.three_of_a_kind?.timer || ""
        },
        {name: "two_pair", value: prizePool?.two_pair?.prize || "", timer: prizePool?.two_pair?.timer || ""},
        {name: "pair", value: prizePool?.pair?.prize || "", timer: prizePool?.pair?.timer || ""},
        {name: "high_card", value: prizePool?.high_card?.prize || "", timer: prizePool?.high_card?.timer || ""},
      ])
  }


  const populateXmlValue = resultJson => {
      setTempValues({...resultJson,
        gameType: resultJson.gameType ? resultJson.gameType : resultJson.game_type,
        tableType: resultJson.tableType ? resultJson.tableType : resultJson.table_type,
      });

      if(resultJson.flash_prize_pool_values){
        populateFlashPrizePools(resultJson.flash_prize_pool_values);
      }

      let blindLevels = resultJson.blindLevels;
      if(!blindLevels){
        blindLevels = resultJson.blind_level_and_values ;
      }

      if(resultJson.game_type){
        setGameType(resultJson.game_type);
      }
      else if(resultJson.gameType){
        setGameType(resultJson.gameType)
      }


      if(resultJson.table_type){
        setTableType(resultJson.table_type);
      }
      else if(resultJson.tableType){
        setTableType(resultJson.tableType)
      }

      if(resultJson.type){
        setTournamentType(resultJson.type);
      }
      else if(resultJson.tournamentType){
        setTournamentType(resultJson.tournamentType);
      }

      if(resultJson.rebalancingTableAlgorithm){
        setRebalancingTableAlgorithm(resultJson.rebalancingTableAlgorithm);
      }
      else if(resultJson.rebalancing_table_algorithm){
        setRebalancingTableAlgorithm(resultJson.rebalancing_table_algorithm);
      }


  }

  const stringfyJson = useCallback((result)=>{
    for (const [key, value] of Object.entries(result)) {
      if(key ==="flash_prize_pool_values"){
        const {prizePool} = value;
        let tempPrizePool = [
          {label: "Royal flush",name: "royal_flush", value: prizePool['royal_flush'].prize, timer: prizePool['royal_flush'].timer,},
          {label: "Straight flush",name: "straight_flush", value: prizePool['straight_flush'].prize, timer: prizePool['straight_flush'].timer,},
          {label: "Four of a kind",name: "four_of_a_kind",value: prizePool['four_of_a_kind'].prize, timer: prizePool['four_of_a_kind'].timer,},
          {label: "Full house",name: "full_house", value: prizePool['full_house'].prize, timer: prizePool['full_house'].timer,},
          {label: "Flush",name: "flush",value: prizePool['flush'].prize, timer: prizePool['flush'].timer,},
          {label: "Straight",name: "straight",value: prizePool['straight'].prize, timer: prizePool['straight'].timer},
          {label: "Three of a kind",name: "three_of_a_kind", value: prizePool['three_of_a_kind'].prize, timer: prizePool['three_of_a_kind'].timer,},
          {label: "Pair",name: "pair",value: prizePool['pair'].prize, timer: prizePool['pair'].timer},
          {label: "High card",name: "high_card", value: prizePool['high_card'].prize, timer: prizePool['high_card'].timer},
        ];
        setFlashPrizePool(tempPrizePool);
      }
      else if(key === "blind_level_and_values" ){
        const {blindValues } = value;
        setSmallBlindLevels([blindValues])
      }else if(key === "additional_player_payout"){
        const {hand,hands = []} =  value;
        let additionalPayoutPerHandListNew = [];
        let tempAdditionalPayoutPerHand = [
          { label: "Royal flush", name: "royal_flush", value: hand['royal_flush']},
          { label: "Straight flush", name: "straight_flush", value: hand['straight_flush']},
          { label: "Four of a kind",name: "four_of_a_kind", value: hand['four_of_a_kind']},
          { label: "Four Aces", name: "four_aces", value: hand['four_aces']},
          { label: "Four Fives Through Kings",name: "four_fives_through_kings", value: hand['four_fives_through_kings']},
          { label: "Four Twos Threes or Fours",name: "four_twos_threes_or_fours", value: hand['four_twos_threes_or_fours']},
          { label: "Full house",name: "full_house", value: hand['full_house']},
          { label: "Flush", name: "flush", value: hand['flush']},
          { label: "Straight", name: "straight", value: hand['straight']},
          { label: "Three of a kind", name: "three_of_a_kind", value: hand['three_of_a_kind']},
          { label: "Two pair", name: "two_pair", value: hand['two_pair']},
          { label: "Jacks or Better", name: "jacks_or_better", value: hand['jacks_or_better']},
          { label: "Pair", name: "pair", value: hand['pair']},
          { label: "One Jack or Better", name: "one_jack_or_better", value: hand['one_jack_or_better']},
          { label: "High card", name: "high_card", value: hand['high_card']},
        ];
        additionalPayoutPerHandListNew.push(tempAdditionalPayoutPerHand);
        if(hands.length){
          hands.forEach((hand) => {
            let tempHands = [
              { label: "Royal flush", name: "royal_flush", value: hand['royal_flush']},
              { label: "Straight flush", name: "straight_flush", value: hand['straight_flush']},
              { label: "Four of a kind",name: "four_of_a_kind", value: hand['four_of_a_kind']},
              { label: "Four Aces", name: "four_aces", value: hand['four_aces']},
              { label: "Four Fives Through Kings",name: "four_fives_through_kings", value: hand['four_fives_through_kings']},
              { label: "Four Twos Threes or Fours",name: "four_twos_threes_or_fours", value: hand['four_twos_threes_or_fours']},
              { label: "Full house",name: "full_house", value: hand['full_house']},
              { label: "Flush", name: "flush", value: hand['flush']},
              { label: "Straight", name: "straight", value: hand['straight']},
              { label: "Three of a kind", name: "three_of_a_kind", value: hand['three_of_a_kind']},
              { label: "Two pair", name: "two_pair", value: hand['two_pair']},
              { label: "Jacks or Better", name: "jacks_or_better", value: hand['jacks_or_better']},
              { label: "Pair", name: "pair", value: hand['pair']},
              { label: "One Jack or Better", name: "one_jack_or_better", value: hand['one_jack_or_better']},
              { label: "High card", name: "high_card", value: hand['high_card']},
            ];
            additionalPayoutPerHandListNew.push(tempHands);
          });
        }
        setAdditionalPayoutPerHandList(additionalPayoutPerHandListNew);
      }
      else{
        setValue(key, value)
      }
    }
    return result;
    //eslint-disable-next-line
  } ,[]);
  const onRemoveIcon = (e) =>{
    e.preventDefault();
    setTempImage("");
    setTournamentImage("");
    setRemoveIcon(false);
  }

  return (
      <div className={classes.background}>
        <Container
            component="main"
            maxWidth="lg"
            align="center"
            className={classes.main}
        >
          <div className={classes.paper}>
            <form
                className={classes.form}
                noValidate
                onSubmit={handleSubmit(onSubmit)}
            >
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Typographyx variant="h6" color="textSecondary">
                    Create Tournament Template
                  </Typographyx>
                </Grid>

                <Grid item xs={12}>
                  <Card>
                    <CardContent style={styles.card_content}>
                      <Grid container spacing={1}>
                        <Grid Grid item xs={4}  style={{display: 'grid' , marginBottom: '10px'}}>

                          {tempImage ? <img src={tempImage} style={{width:"200px", height:"200px", marginBottom:"10px",}} alt="Tournament Logo" /> :
                              <img src="http://img1.wikia.nocookie.net/__cb20130901213905/battlebears/images/9/98/Team-icon-placeholder.png" alt="placeholder"  style={{width:"200px", height:"200px", marginBottom:"10px",}}/>}
                          <label htmlFor="upload-photo" >
                            <input id="upload-photo" type="file" onChange={handleImageChange} style={{marginBottom:"20px", display: 'none'}}/>
                            <Button color="primary" variant={"contained"} component={"span"}>
                              Choose File
                            </Button>
                          </label>

                          {showRemoveIcon || tempImage ? <HighlightOffIcon onClick={onRemoveIcon} color={"primary"} fontSize={"med"}  style={{position: "absolute", zIndex: "1000"}}/> : null}

                        </Grid>
                        <Grid Grid item xs={4}>
                          <Container
                              component="main"
                              maxWidth="lg"
                              align="center"
                          >
                            <label htmlFor="upload-xml" >
                              <input id="upload-xml" type="file" onChange={handleXmlChange} style={{marginBottom:"20px", display: 'none'}}/>
                              <Button color="secondary" variant={"contained"} component={"span"}>
                                Import Template XML
                              </Button>
                            </label>
                          </Container>
                        </Grid>
                      </Grid>
                      <Grid container spacing={1}>
                        <Grid item xs={4}>
                          <TextFieldx
                              select={true}
                              name="tableType"
                              defaultValue={[
                                props.temp
                                    ? tempValues.tableType
                                    : table_types[0].value,
                              ]}
                              size="small"
                              variant="outlined"
                              margin="normal"
                              placeholder="NO_LIMIT"
                              value={[tableType]}
                              required
                              fullWidth
                              id="tableType"
                              label="Table Type"
                              autoComplete="tableType"
                              autoFocus
                              my={0.5}
                              onChange={changeSelectUsing("tableType")}
                              error={Boolean(errors.tableType)}
                              helperText={errors.tableType?.message}
                          >
                            {table_types.map((type, index) => (
                                <MenuItem value={type.value} key={index}>
                                  {type.label}
                                </MenuItem>
                            ))}
                          </TextFieldx>

                          <TextFieldx
                              name="name"
                              size="small"
                              variant="outlined"
                              margin="normal"
                              placeholder="TRN"
                              defaultValue={props.temp?.name}
                              required
                              fullWidth
                              id="name"
                              label="Tournament Name"
                              autoComplete="name"
                              autoFocus
                              my={0.5}
                              inputRef={register({
                                required: "Tournament name is required.",
                              })}
                              error={Boolean(errors.name)}
                              helperText={errors.name?.message}
                              InputLabelProps={{shrink : true}}
                          />
                          <TextFieldx
                              name="buyin"
                              size="small"
                              variant="outlined"
                              margin="normal"
                              placeholder="1"
                              required
                              fullWidth
                              id="buyin"
                              label="Buyin"
                              defaultValue={props.temp?.buyin}
                              autoComplete="buyin"
                              autoFocus
                              my={0.5}
                              inputRef={register({
                                required: "Buyin is required.",
                              })}
                              onBlur={focusOutFunction2("buyinErr")}
                              error={onBlurErr.buyinErr[0] || Boolean(errors.buyin)}
                              helperText={onBlurErr.buyinErr[0]?onBlurErr.buyinErr[1]:errors.buyin?.message}
                              InputLabelProps={{shrink : true}}
                          />
                          <TextFieldx
                              name="buyin_chips"
                              size="small"
                              variant="outlined"
                              margin="normal"
                              placeholder="5000"
                              required
                              fullWidth
                              id="buyinChips"
                              label="Buyin Chips Value"
                              autoComplete="buyinChips"
                              defaultValue={props.temp?.buyinChips}
                              autoFocus
                              my={0.5}
                              inputRef={register({
                                required: "Buyin chips value is required.",
                              })}
                              onBlur={focusOutFunction2("buyinChipsErr")}
                              error={onBlurErr.buyinChipsErr[0] || Boolean(errors.buyinChips)}
                              helperText={onBlurErr.buyinChipsErr[0]?onBlurErr.buyinChipsErr[1]:errors.buyinChips?.message}
                              InputLabelProps={{shrink : true}}
                          />
                          <TextFieldx
                              name="min_prize_pool_value"
                              size="small"
                              variant="outlined"
                              margin="normal"
                              placeholder="0"
                              required
                              fullWidth
                              id="minPrizePoolValue"
                              label="Min Prize Pool Value"
                              autoComplete="minPrizePoolValue"
                              defaultValue={props.temp?.minPrizePoolValue}
                              autoFocus
                              my={0.5}
                              inputRef={register({
                                required: "Min prize pool value is required.",
                              })}
                              onBlur={focusOutFunction2("minPrizePoolErr")}
                              error={onBlurErr.minPrizePoolErr[0] || Boolean(errors.minPrizePoolValue)}
                              helperText={onBlurErr.minPrizePoolErr[0]?onBlurErr.minPrizePoolErr[1]:errors.minPrizePoolValue?.message}
                              InputLabelProps={{shrink : true}}
                          />
                          <TextFieldx
                              name="blinds_increase_interval_seconds"
                              size="small"
                              variant="outlined"
                              margin="normal"
                              placeholder="60"
                              required
                              fullWidth
                              id="blindsIncreaseIntervalSeconds"
                              label="Blind Increase Interval Seconds"
                              autoComplete="blindsIncreaseIntervalSeconds"
                              defaultValue={props.temp?.blindsIncreaseIntervalSeconds}
                              autoFocus
                              my={0.5}
                              inputRef={register({
                                required:
                                    "Blind increase interval seconds is required.",
                              })}
                              onBlur={focusOutFunction2("blindsIncreaseIntervalSecondsErr")}
                              error={onBlurErr.blindsIncreaseIntervalSecondsErr[0] || Boolean(errors.blindsIncreaseIntervalSeconds)}
                              helperText={onBlurErr.blindsIncreaseIntervalSecondsErr[0]?onBlurErr.blindsIncreaseIntervalSecondsErr[1]:errors.blindsIncreaseIntervalSeconds?.message}
                              InputLabelProps={{shrink : true}}
                          />
                          <TextFieldx
                              name="blinds_increase_interval_rounds"
                              size="small"
                              variant="outlined"
                              margin="normal"
                              placeholder="1000"
                              required
                              fullWidth
                              id="blindsIncreaseIntervalRounds"
                              label="Blind Increase Interval Rounds Value"
                              autoComplete="blindsIncreaseIntervalRounds"
                              defaultValue={props.temp?.blindsIncreaseIntervalRounds}
                              autoFocus
                              my={0.5}
                              inputRef={register({
                                required:
                                    "Blind increase interval rounds value is required.",
                              })}
                              onBlur={focusOutFunction2("blindsIncreaseIntervalRoundsErr")}
                              error={
                                onBlurErr.blindsIncreaseIntervalRoundsErr[0] || Boolean(errors.blindsIncreaseIntervalRounds)
                              }
                              helperText={
                                onBlurErr.blindsIncreaseIntervalRoundsErr[0]?onBlurErr.blindsIncreaseIntervalRoundsErr[1]:errors.blindsIncreaseIntervalRounds?.message
                              }
                              InputLabelProps={{shrink : true}}
                          />

                          <TextFieldx
                              name="rake"
                              size="small"
                              variant="outlined"
                              margin="normal"
                              required
                              placeholder="0"
                              fullWidth
                              id="rake"
                              label="Rake Value"
                              autoComplete="rake"
                              defaultValue={props.temp?.rake}
                              autoFocus
                              my={0.5}
                              inputRef={register({
                                required: "Rake value is required.",
                              })}
                              onBlur={focusOutFunction2("rakeErr")}
                              error={onBlurErr.rakeErr[0] || Boolean(errors.rake)}
                              helperText={onBlurErr.rakeErr[0]?onBlurErr.rakeErr[1]:errors.rake?.message}
                              InputLabelProps={{shrink : true}}
                          />

                          <TextFieldx
                              name="rebuys_permitted"
                              size="small"
                              variant="outlined"
                              margin="normal"
                              placeholder="0"
                              required
                              fullWidth
                              id="rebuysPermitted"
                              label="Rebuys Permitted"
                              autoComplete="rebuysPermitted"
                              defaultValue={props.temp?.rebuysPermitted}
                              autoFocus
                              my={0.5}
                              inputRef={register({
                                required: "Rebuys permitted is required.",
                              })}
                              onBlur={focusOutFunction2("rebuysPermittedErr")}
                              error={onBlurErr.rebuysPermittedErr[0] || Boolean(errors.rebuysPermitted)}
                              helperText={onBlurErr.rebuysPermittedErr[0]?onBlurErr.rebuysPermittedErr[1]:errors.rebuysPermitted?.message}
                              InputLabelProps={{shrink : true}}
                          />
                          <TextFieldx
                              name="addons_permitted"
                              size="small"
                              variant="outlined"
                              margin="normal"
                              placeholder="0"
                              required
                              fullWidth
                              id="addonsPermitted"
                              label="#Of Addons Permitted"
                              autoComplete="addonsPermitted"
                              defaultValue={props.temp?.addonsPermitted}
                              autoFocus
                              my={0.5}
                              inputRef={register({
                                required: "Number of addons permitted is required.",
                              })}
                              onChange={changeNumberOfAddon()}
                              onBlur={focusOutFunction2("addonsPermittedErr")}
                              error={onBlurErr.addonsPermittedErr[0] || Boolean(errors.addonsPermitted)}
                              helperText={onBlurErr.addonsPermittedErr[0]?onBlurErr.addonsPermittedErr[1]:errors.addonsPermitted?.message}
                              InputLabelProps={{shrink : true}}
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <TextFieldx
                              select={true}
                              name="gameType"
                              defaultValue={[props.temp ? tempValues.gameType : game_types[0].value]}
                              size="small"
                              variant="outlined"
                              margin="normal"
                              placeholder="texas_holdem"
                              required
                              fullWidth
                              value={[gameType]}
                              id="gameType"
                              label="Game Type"
                              autoComplete="gameType"
                              autoFocus
                              my={0.5}
                              onChange={changeSelectUsing("gameType")}
                              error={Boolean(errors.gameType)}
                              helperText={errors.gameType?.message}
                              InputLabelProps={{shrink : true}}
                          >
                            {game_types.map((type, index) => (
                                <MenuItem value={type.value} key={index}>
                                  {type.label}
                                </MenuItem>
                            ))}
                          </TextFieldx>

                          <TextFieldx
                              name="rebuys_round_start"
                              size="small"
                              variant="outlined"
                              margin="normal"
                              placeholder="0"
                              required
                              fullWidth
                              id="rebuysRoundStart"
                              label="Rebuys Rounds Start Value"
                              autoComplete="rebuysRoundStart"
                              defaultValue={props.temp?.rebuysRoundStart}
                              autoFocus
                              my={0.5}
                              inputRef={register({
                                required: "Rebuys rounds start value is required.",
                              })}
                              onBlur={focusOutFunction2("rebuysRoundStartErr")}
                              error={onBlurErr.rebuysRoundStartErr[0] || Boolean(errors.rebuysRoundStart)}
                              helperText={onBlurErr.rebuysRoundStartErr[0]?onBlurErr.rebuysRoundStartErr[1]:errors.rebuysRoundStart?.message}
                              InputLabelProps={{shrink : true}}
                          />
                          <TextFieldx
                              name="rebuys_round_end"
                              size="small"
                              variant="outlined"
                              margin="normal"
                              placeholder="0"
                              required
                              fullWidth
                              id="rebuysRoundEnd"
                              label="Rebuys Round End Value"
                              autoComplete="rebuysRoundEnd"
                              defaultValue={props.temp?.rebuysRoundEnd}
                              autoFocus
                              my={0.5}
                              inputRef={register({
                                required: "Rebuys round end value is required.",
                              })}
                              onBlur={focusOutFunction("rebuysRoundStart", "rebuysRoundEndErr")}
                              error={onBlurErr.rebuysRoundEndErr[0] || Boolean(errors.rebuysRoundEnd)}
                              helperText={onBlurErr.rebuysRoundEndErr[0]?onBlurErr.rebuysRoundEndErr[1]:errors.rebuysRoundEnd?.message}
                              InputLabelProps={{shrink : true}}
                          />
                          <TextFieldx
                              name="addons_round_start"
                              size="small"
                              variant="outlined"
                              margin="normal"
                              placeholder="0"
                              required
                              fullWidth
                              id="addonsRoundStart"
                              label="Addons RoundStart Value"
                              autoComplete="addonsRoundStart"
                              defaultValue={props.temp?.addonsRoundStart}
                              autoFocus
                              my={0.5}
                              inputRef={register({
                                required: "Addons round start value is required.",
                              })}
                              onBlur={focusOutFunction2("addonsRoundStartErr")}
                              error={onBlurErr.addonsRoundStartErr[0] || Boolean(errors.addonsRoundStart)}
                              helperText={onBlurErr.addonsRoundStartErr[0]?onBlurErr.addonsRoundStartErr[1]:errors.addonsRoundStart?.message}
                              InputLabelProps={{shrink : true}}
                          />
                            <TextFieldx
                                name="addon_chips"
                                size="small"
                                variant="outlined"
                                margin="normal"
                                placeholder="5000"
                                required
                                fullWidth
                                id="addonChips"
                                label="Addon Chips Value"
                                autoComplete="addonChips"
                                defaultValue={pairMixedAddonPlayers ? 0 : props.temp?.addonChips}
                                autoFocus
                                my={0.5}
                                inputRef={register({
                                  required: "Addon chips value is required.",
                                })}
                                onBlur={focusOutFunction2("addonChipsErr")}
                                error={onBlurErr.addonChipsErr[0] || Boolean(errors.addonChips)}
                                helperText={onBlurErr.addonChipsErr[0]?onBlurErr.addonChipsErr[1]:errors.addonChips?.message}
                                InputLabelProps={{shrink : true}}
                            />
                          <TextFieldx
                              name="addon_threshold"
                              size="small"
                              variant="outlined"
                              margin="normal"
                              placeholder="0"
                              required
                              fullWidth
                              id="addonThreshold"
                              label="Addon Threshold Value"
                              autoComplete="addonThreshold"
                              defaultValue={props.temp?.addonThreshold}
                              autoFocus
                              my={0.5}
                              inputRef={register({
                                required: "Addon threshold value is required.",
                              })}
                              onBlur={focusOutFunction2("addonThresholdErr")}
                              error={onBlurErr.addonThresholdErr[0] || Boolean(errors.addonThreshold)}
                              helperText={onBlurErr.addonThresholdErr[0]?onBlurErr.addonThresholdErr[1]:errors.addonThreshold?.message}
                              InputLabelProps={{shrink : true}}
                          />
                          <TextFieldx
                              name="addons_round_end"
                              size="small"
                              variant="outlined"
                              margin="normal"
                              placeholder="0"
                              required
                              fullWidth
                              id="addonsRoundEnd"
                              label="Addons Round End Value"
                              autoComplete="addonsRoundEnd"
                              defaultValue={props.temp?.addonsRoundEnd}
                              autoFocus
                              my={0.5}
                              inputRef={register({
                                required: "Addons round end value is required.",
                              })}
                              onBlur={focusOutFunction("addonsRoundStart", "addonsRoundEndErr")}
                              error={onBlurErr.addonsRoundEndErr[0] || Boolean(errors.addonsRoundEnd)}
                              helperText={onBlurErr.addonsRoundEndErr[0]?onBlurErr.addonsRoundEndErr[1]:errors.addonsRoundEnd?.message}
                              InputLabelProps={{shrink : true}}
                          />
                          <TextFieldx
                              name="scheduled_breaks"
                              size="small"
                              variant="outlined"
                              margin="normal"
                              placeholder="1"
                              fullWidth
                              id="scheduledBreaks"
                              label="Scheduled Breaks Value"
                              autoComplete="scheduledBreaks"
                              defaultValue={props.temp?.scheduledBreaks}
                              autoFocus
                              my={0.5}
                              inputRef={register()}
                              onBlur={focusOutFunction2("scheduledBreaksErr")}
                              error={onBlurErr.scheduledBreaksErr[0] || Boolean(errors.scheduledBreaks)}
                              helperText={onBlurErr.scheduledBreaksErr[0]?onBlurErr.scheduledBreaksErr[1]:errors.scheduledBreaks?.message}
                              InputLabelProps={{shrink : true}}
                          />
                          <TextFieldx
                              name="time_limit_seconds"
                              size="small"
                              variant="outlined"
                              margin="normal"
                              placeholder="3600"
                              required
                              fullWidth
                              id="timeLimitSeconds"
                              label="TimeLimitSeconds Value"
                              autoComplete="timeLimitSeconds"
                              defaultValue={props.temp?.timeLimitSeconds}
                              autoFocus
                              my={0.5}
                              inputRef={register({
                                required: "Time limit seconds value is required.",
                              })}
                              onBlur={focusOutFunction2("timeLimitSecondsErr")}
                              error={onBlurErr.timeLimitSecondsErr[0] || Boolean(errors.timeLimitSeconds)}
                              helperText={onBlurErr.timeLimitSecondsErr[0]?onBlurErr.timeLimitSecondsErr[1]:errors.timeLimitSeconds?.message}
                              InputLabelProps={{shrink : true}}
                          />
                          <TextFieldx
                              name="min_players_per_table"
                              size="small"
                              variant="outlined"
                              margin="normal"
                              placeholder="2"
                              required
                              fullWidth
                              id="minPlayersPerTable"
                              label="Min Players PerTable Value"
                              autoComplete="minPlayersPerTable"
                              defaultValue={props.temp?.minPlayersPerTable}
                              autoFocus
                              my={0.5}
                              inputRef={register({
                                required:
                                    "Min players per table value is required.",
                              })}
                              onBlur={focusOutFunction2("minPlayersPerTableErr")}
                              error={onBlurErr.minPlayersPerTableErr[0] || Boolean(errors.minPlayersPerTable)}
                              helperText={onBlurErr.minPlayersPerTableErr[0]?onBlurErr.minPlayersPerTableErr[1]:errors.minPlayersPerTable?.message}
                              InputLabelProps={{shrink : true}}
                          />

                        </Grid>
                        <Grid item xs={4}>
                          <TextFieldx
                              name="pending_timeout_seconds"
                              size="small"
                              variant="outlined"
                              margin="normal"
                              placeholder="0"
                              required
                              fullWidth
                              id="pendingTimeoutSeconds"
                              label="Pending Timeout Value"
                              autoComplete="pendingTimeoutSeconds"
                              defaultValue={props.temp?.pendingTimeoutSeconds}
                              autoFocus
                              my={0.5}
                              inputRef={register({
                                required: "Pending timeout value is required.",
                              })}
                              onBlur={focusOutFunction2("pendingTimeoutSecondsErr")}
                              error={onBlurErr.pendingTimeoutSecondsErr[0] || Boolean(errors.pendingTimeoutSeconds)}
                              helperText={onBlurErr.pendingTimeoutSecondsErr[0]?onBlurErr.pendingTimeoutSecondsErr[1]:errors.pendingTimeoutSeconds?.message}
                              InputLabelProps={{shrink : true}}
                          />
                          <TextFieldx
                              name="small_blind_max_value"
                              size="small"
                              variant="outlined"
                              margin="normal"
                              placeholder="10000"
                              required
                              fullWidth
                              id="smallBlindMaxValue"
                              label="Small Blind Max Value"
                              autoComplete="smallBlindMaxValue"
                              defaultValue={props.temp?.smallBlindMaxValue}
                              autoFocus
                              my={0.5}
                              inputRef={register({
                                required: "Small blind max value is required.",
                              })}
                              onBlur={focusOutFunction2("smallBlindMaxValueErr")}
                              error={onBlurErr.smallBlindMaxValueErr[0] || Boolean(errors.smallBlindMaxValue)}
                              helperText={onBlurErr.smallBlindMaxValueErr[0]?onBlurErr.smallBlindMaxValueErr[1]:errors.smallBlindMaxValue?.message}
                              InputLabelProps={{shrink : true}}
                          />
                          <TextFieldx
                              name="table_timer"
                              size="small"
                              variant="outlined"
                              margin="normal"
                              placeholder="30"
                              required
                              fullWidth
                              id="tableTimer"
                              label="Table Timer"
                              autoComplete="tableTimer"
                              defaultValue={props.temp?.tableTimer}
                              autoFocus
                              my={0.5}
                              inputRef={register({
                                required: "Table timer is required.",
                              })}
                              onBlur={focusOutFunction2("tableTimer")}
                              error={onBlurErr.tableTimer[0] || Boolean(errors.tableTimer)}
                              helperText={onBlurErr.tableTimer[0]?onBlurErr.tableTimer[1]:errors.tableTimer?.message}
                              InputLabelProps={{shrink : true}}
                          />
                          <TextFieldx
                              name="tour_players_min"
                              size="small"
                              variant="outlined"
                              margin="normal"
                              placeholder="0"
                              required
                              fullWidth
                              id="tourPlayersMin"
                              label="Tour Players Min"
                              autoComplete="tourPlayersMin"
                              defaultValue={props.temp?.tourPlayersMin}
                              autoFocus
                              my={0.5}
                              inputRef={register({
                                required: "Tour players min is required.",
                              })}
                              onBlur={focusOutFunction2("tourPlayersMinErr")}
                              error={onBlurErr.tourPlayersMinErr[0] || Boolean(errors.tourPlayersMin)}
                              helperText={onBlurErr.tourPlayersMinErr[0]?onBlurErr.tourPlayersMinErr[1]:errors.tourPlayersMin?.message}
                              InputLabelProps={{shrink : true}}
                          />

                          <TextFieldx
                              name="tour_players_max"
                              size="small"
                              variant="outlined"
                              margin="normal"
                              placeholder="999"
                              required
                              fullWidth
                              id="tourPlayersMax"
                              label="Tour Players Max"
                              autoComplete="tourPlayersMax"
                              defaultValue={props.temp?.tourPlayersMax}
                              autoFocus
                              my={0.5}
                              inputRef={register({
                                required: "Tour players max is required.",
                              })}
                              onBlur={focusOutFunction("tourPlayersMin", "tourPlayersMaxErr")}
                              error={onBlurErr.tourPlayersMaxErr[0] || Boolean(errors.tourPlayersMax)}
                              helperText={onBlurErr.tourPlayersMaxErr[0]?onBlurErr.tourPlayersMaxErr[1]:errors.tourPlayersMax?.message}
                              InputLabelProps={{shrink : true}}
                          />
                          <TextFieldx
                              select={true}
                              name="type"
                              defaultValue={[
                                props.temp
                                    ? tempValues.tournamentType
                                    : tournament_types[0].value,
                              ]}
                              size="small"
                              variant="outlined"
                              margin="normal"
                              placeholder="SIT_N_GO"
                              value={tournamentType}
                              required
                              fullWidth
                              id="tournamentType"
                              label="Tournament Type"
                              autoComplete="tournamentType"
                              autoFocus
                              my={0.5}
                              onChange={changeSelectUsing("tournamentType")}
                              InputLabelProps={{shrink : true}}
                          >
                            {tournament_types.map((type, index) => (
                                <MenuItem value={type.value} key={index}>
                                  {type.label}
                                </MenuItem>
                            ))}
                          </TextFieldx>
                          <TextFieldx
                              name="table_max_num_raises"
                              size="small"
                              variant="outlined"
                              margin="normal"
                              placeholder="5"
                              required
                              fullWidth
                              id="tableMaxNumRaises"
                              label="Table Max Num Raises"
                              autoComplete="tableMaxNumRaises"
                              readOnly={tableType === "NO_LIMIT"}
                              value={tableType==="NO_LIMIT"?0:props.temp?.tableMaxNumRaises}
                              my={0.5}
                              inputRef={register({
                                required: "Table max num raises is required.",
                              })}
                              onChange={changeSelectUsing("table_max_num_raises")}
                              error={Boolean(errors.tableMaxNumRaises)}
                              helperText={errors.tableMaxNumRaises?.message}
                              InputLabelProps={{shrink : true}}
                          />
                          <TextFieldx
                              select={true}
                              name="rebalancing_table_algorithm"
                              defaultValue={[
                                props.temp
                                    ? tempValues.rebalancingTableAlgorithm
                                    : rebalancing_table_algorithm[0],
                              ]}
                              size="small"
                              variant="outlined"
                              margin="normal"
                              placeholder="AVERAGE"
                              value={rebalancingTableAlgorithm}
                              required
                              fullWidth
                              id="rebalancingTableAlgorithm"
                              label="Rebalancing Table Algorithm"
                              autoComplete="rebalancingTableAlgorithm"
                              autoFocus
                              my={0.5}
                              onChange={changeSelectUsing("rebalancing_table_algorithm")}
                              InputLabelProps={{shrink : true}}
                          >
                            {rebalancing_table_algorithm.map((type, index) => (
                                <MenuItem value={type} key={index}>
                                  {type}
                                </MenuItem>
                            ))}
                          </TextFieldx>
                          <TextFieldx
                              name="status"
                              size="small"
                              variant="outlined"
                              margin="normal"
                              placeholder="ACTIVE"
                              required
                              fullWidth
                              id="status"
                              label="Status"
                              autoComplete="status"
                              readOnly
                              value={"ACTIVE"}
                              defaultValue={props.temp?.status}
                              autoFocus
                              my={0.5}
                              inputRef={register({
                                required: "Status is required.",
                              })}
                              error={Boolean(errors.status)}
                              helperText={errors.status?.message}
                              InputLabelProps={{shrink : true}}
                          />

                          <TextFieldx
                              name="max_players_per_table"
                              size="small"
                              variant="outlined"
                              margin="normal"
                              placeholder="2"
                              required
                              fullWidth
                              id="maxPlayersPerTable"
                              label="Max Players PerTable Value"
                              autoComplete="maxPlayersPerTable"
                              defaultValue={props.temp?.maxPlayersPerTable}
                              autoFocus
                              my={0.5}
                              inputRef={register({
                                required:
                                    "Max players per table value is required.",
                              })}
                              onBlur={focusOutFunction("minPlayersPerTable", "maxPlayersPerTableErr")}
                              error={onBlurErr.maxPlayersPerTableErr[0] || Boolean(errors.maxPlayersPerTable)}
                              helperText={onBlurErr.maxPlayersPerTableErr[0]?onBlurErr.maxPlayersPerTableErr[1]:errors.maxPlayersPerTable?.message}
                              InputLabelProps={{shrink : true}}
                          />

                        </Grid>
                      </Grid>
                      <Grid>
                        <Grid item xs={12}>
                          <div>
                          {/*isForMoney*/}
                          <FormControlLabel
                                control={
                                  <Checkbox
                                      checked={isForMoney}
                                      onChange={()=>setIsForMoney(!isForMoney)}
                                      name="checkedIsForMoney"
                                      color="primary"
                                  />
                                }
                                label={<Typographyx variant="button" color="textSecondary">Is For Money</Typographyx>}
                           />
                          {/*useDecimals*/}
                          <FormControlLabel
                                control={
                                  <Checkbox
                                      checked={useDecimals}
                                      onChange={()=>setUseDecimals(!useDecimals)}
                                      name="useDecimals"
                                      color="primary"
                                  />
                                }

                                label={<Typographyx variant="button" color="textSecondary">Use Decimals</Typographyx>}
                            />

                            <FormControlLabel
                                control={
                                  <Checkbox
                                      checked={chipsInPenny}
                                      onChange={()=>setChipsInPenny(!chipsInPenny)}
                                      name="checkedBWildcard"//this seems the same with the name of wildcard
                                      color="primary"
                                  />
                                }

                                label={<Typographyx variant="button" color="textSecondary">Chips in Penny</Typographyx>}
                            />
                            {gameType && (gameType === "five_card_stud" || gameType === "five_card_draw") &&
                            <>

                              <FormControlLabel
                                  control={
                                    <Checkbox
                                        checked={uniqueDeck}
                                        onChange={()=>setUniqueDeck(!uniqueDeck)}
                                        name="checkedB"
                                        color="primary"
                                    />
                                  }

                                  label={<Typographyx variant="button" color="textSecondary">Use Unique Deck For Each Player</Typographyx>}
                              />
                            </>
                            }
                            {gameType && (gameType === "five_card_stud" || gameType === "five_card_draw") &&
                            <>

                              <FormControlLabel
                                  control={
                                    <Checkbox
                                        checked={instantPayout}
                                        onChange={()=>settInstantPayout(!instantPayout)}
                                        name="checkedB"
                                        color="primary"
                                    />
                                  }

                                  label={<Typographyx variant="button" color="textSecondary">Instant Payout</Typographyx>}
                              />
                            </>
                            }
                            {gameType && (gameType === "five_card_stud" || gameType === "five_card_draw") &&
                            <>

                              <FormControlLabel
                                  control={
                                    <Checkbox
                                        checked={revealCardsAfterAction}
                                        onChange={()=>setRevealCardsAfterAction(!revealCardsAfterAction)}
                                        name="checkedBreveal"
                                        color="primary"
                                    />
                                  }

                                  label={<Typographyx variant="button" color="textSecondary">Reveal Opponents' Cards After User Performs Action</Typographyx>}
                              />
                            </>
                            }
                            <FormControlLabel
                                control={
                                  <Checkbox
                                      checked={pairMixedAddonPlayers}
                                      onChange={()=>setPairMiexedAddonPlayers(!pairMixedAddonPlayers)}
                                      name="checkedBpairplayers"
                                      color="primary"
                                  />
                                }

                                label={<Typographyx variant="button" color="textSecondary">Pair Players With Different Addons</Typographyx>}
                            />
                            <FormControlLabel
                                control={
                                  <Checkbox
                                      checked={wildcardEnabled}
                                      onChange={()=>setWildcardEnabled(!wildcardEnabled)}
                                      name="checkedBWildcard"
                                      color="primary"
                                  />
                                }

                                label={<Typographyx variant="button" color="textSecondary">Enable Wildcards</Typographyx>}
                            />
                            {
                              wildcardEnabled &&
                              <FormControl>
                                <InputLabel id="demo-simple-select-label">Wild Card</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={wildcardValue}
                                    style={{width: "85px"}}
                                    required
                                    onChange={(ev)=>{
                                      setWildcardValue(ev.target.value);
                                      ev.preventDefault();
                                    }}
                                >

                                  {crdsym.map((sym, index) =>{
                                    return (
                                        <MenuItem key={index} value={index}>{sym}</MenuItem>

                                    );
                                  })}

                                </Select>
                              </FormControl>
                            }
                          </div>
                          <div>
                            <FormControlLabel
                                control={
                                  <Checkbox
                                      checked={usernamePrivacyEnabled}
                                      onChange={()=>setUsernamePrivacyEnabled(!usernamePrivacyEnabled)}
                                      name="checkedBUsernameprivacy"
                                      color="primary"
                                  />
                                }

                                label={<Typographyx variant="button" color="textSecondary">Enable Username Privacy</Typographyx>}
                            />
                            <FormControlLabel
                                control={
                                  <Checkbox
                                      checked={hardCapEnabled}
                                      onChange={()=>setHardCapEnabled(!hardCapEnabled)}
                                      name="checkedBhardcap"
                                      color="primary"
                                  />
                                }

                                label={<Typographyx variant="button" color="textSecondary">Enable Hard Cap</Typographyx>}
                            />
                          </div>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12}>

                  <Card>
                    <CardContent style={styles.card_content}>
                      <Grid item xs={12}>
                        <Typographyx variant="button" color="textSecondary">
                          Prize Pool Payout Percentages
                        </Typographyx>
                      </Grid>
                      <PaperTable className={classes.root}>
                        <TableContainer className={classes.container}>
                          <Table size="small">
                            <TableHead>
                              <StyledTableRow>
                                <StyledTableCell align="center"></StyledTableCell>
                                <StyledTableCell align="center">
                                  Minimum # of Players
                                </StyledTableCell>
                                <StyledTableCell align="center">Maximum # of Players</StyledTableCell>
                                <StyledTableCell align="center">Prize Pool Payout Break Down</StyledTableCell>
                              </StyledTableRow>
                            </TableHead>
                            <TableBody style={styles.card_content}>
                              {percentages && percentages.map((val)=> (
                                  <StyledTableRow
                                      key={val.id}
                                      hover={true}
                                      onClick={handleChangePayout(val.id)}
                                      selected={selectedPayoutId === val.id}
                                  >
                                    <StyledTableCell
                                        component="th"
                                        scope="row"
                                        align="justify"
                                        padding="checkbox"
                                    >
                                      <Checkbox
                                          checked={selectedPayoutId === val.id}
                                          onChange={handleChangePayout(val.id)}
                                          name={''}
                                          color="default"
                                      />
                                    </StyledTableCell>
                                    <StyledTableCell align="right" padding="checkbox">
                                      {val.num_players_min}
                                    </StyledTableCell>
                                    <StyledTableCell align="right" padding="checkbox">
                                      {val.num_players_max}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                                      {val.percentages.split("{")[1].split(";").map((v, i)=> i % 2 !== 0 ? v.split(":")[1] : null).filter(n => n).map((percent, index) => {
                                        return(
                                            <div key={val.id+index} style={{width:`${percent - 0.5}%`, border:"solid 1px", display: "inline-block"}}>{percent}{"%"}</div>
                                        )
                                      })}
                                    </StyledTableCell>
                                  </StyledTableRow>
                              ))}
                            </TableBody>
                          </Table>
                          {
                            percentages && percentages.length === 0 ? (
                                <Typographyx variant="subtitle2" pb={5} pt={3}>
                                  No additional prize pool found.
                                </Typographyx>
                            ) : (
                                <Box m={2}>
                                  <Pagination count={prizePoolCount} variant="outlined" shape="rounded" page={prizePoolPage} onChange={handlePrizePoolPaginationChange} />
                                </Box>
                            )
                          }
                        </TableContainer>
                      </PaperTable>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                      control={
                        <Checkbox
                            value={useAdditionalPrizePoolOnly}
                            checked={useAdditionalPrizePoolOnly}
                            onChange={()=>setUseAdditionalPrizePoolOnly(!useAdditionalPrizePoolOnly)}
                            name="checkedB"
                            color="primary"
                        />
                      }

                      label={<Typographyx variant="button" color="textSecondary">Use additional prize pool as the entire prize</Typographyx>}
                  />
                  <Card>
                    <CardContent style={styles.card_content}>
                      <Grid item xs={12}>
                        <Typographyx variant="button" color="textSecondary">
                          Additional Prize Pool Payout Percentages
                        </Typographyx>
                      </Grid>
                      <PaperTable className={classes.root}>
                        <TableContainer className={classes.container}>
                          <Table size="small">
                            <TableHead>
                              <StyledTableRow>
                                <StyledTableCell align="center"></StyledTableCell>
                                <StyledTableCell align="center">
                                  Minimum # of Players
                                </StyledTableCell>
                                <StyledTableCell align="center">Maximum # of Players</StyledTableCell>
                                <StyledTableCell align="center">Additonal Prize Pool Payout Break Down</StyledTableCell>
                              </StyledTableRow>
                            </TableHead>
                            <TableBody style={styles.card_content}>
                              {percentages && percentages.map((val)=> (
                                  <StyledTableRow
                                      key={val.id}
                                      hover={true}
                                      onClick={handleChangeAdditonalPayout(val.id)}
                                      selected={selectedAdditionalPayoutId === val.id}
                                  >
                                    <StyledTableCell
                                        component="th"
                                        scope="row"
                                        align="justify"
                                        padding="checkbox"
                                    >
                                      <Checkbox
                                          checked={selectedAdditionalPayoutId === val.id}
                                          onChange={handleChangeAdditonalPayout(val.id)}
                                          name={''}
                                          color="default"
                                      />
                                    </StyledTableCell>
                                    <StyledTableCell align="right" padding="checkbox">
                                      {val.num_players_min}
                                    </StyledTableCell>
                                    <StyledTableCell align="right" padding="checkbox">
                                      {val.num_players_max}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                                      {val.percentages.split("{")[1].split(";").map((v, i)=> i % 2 !== 0 ? v.split(":")[1] : null).filter(n => n).map((percent, index) => {
                                        return(
                                            <div key={val.id+index} style={{width:`${percent - 0.5}%`, border:"solid 1px", display: "inline-block"}}>{percent}{"%"}</div>
                                        )
                                      })}
                                    </StyledTableCell>
                                  </StyledTableRow>
                              ))}
                            </TableBody>
                          </Table>
                          {
                            percentages && percentages.length === 0 ? (
                                <Typographyx variant="subtitle2" pb={5} pt={3}>
                                  No additional prize pool found.
                                </Typographyx>
                            ) : (
                                <Box m={2}>
                                  <Pagination count={prizePoolCount} variant="outlined" shape="rounded" page={prizePoolPage} onChange={handlePrizePoolPaginationChange} />
                                </Box>
                            )
                          }
                        </TableContainer>
                      </PaperTable>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={8}>
                  <Grid container spacing={1}>
                    <Card>
                      <CardContent style={styles.card_content}>
                        <Grid container spacing={1}>
                          <Grid item xs={12}>
                            <Typographyx variant="button" color="textSecondary">
                              Flash Prize Pool and Countdown Timer
                            </Typographyx>
                          </Grid>
                          <Grid item xs={12}>
                            <Grid container spacing={1}>

                              {flashPrizePool.map( hand => {
                                return (
                                    <React.Fragment key={hand.name}>
                                      <Grid item xs={4}>
                                        <TextFieldx
                                            name={hand.name}
                                            size="small"
                                            variant="outlined"
                                            margin="normal"
                                            placeholder="100"
                                            required
                                            fullWidth
                                            label={hand.label}
                                            autoComplete={hand.label}
                                            autoFocus
                                            my={0.8}
                                            ml={0.5}
                                            inputRef={register({
                                              required: hand.label+" minute value is required.",
                                            })}
                                            onChange={onPrizePoolChange}
                                            onBlur={onPrizeAndBlindBlur}
                                            value={hand.value}
                                            error={Boolean(
                                                errors[hand.label]
                                            )}
                                            helperText={
                                              errors[hand.label]
                                                  ?.message
                                            }
                                            InputLabelProps={{shrink : true}}
                                        />
                                        <FormHelperText error={true} id={hand.name}></FormHelperText>
                                      </Grid>
                                      <Grid item xs={2}>

                                        <TextFieldx
                                            name={hand.name+"_timer"}
                                            size="small"
                                            variant="outlined"
                                            margin="normal"
                                            placeholder="5"
                                            required
                                            fullWidth
                                            label={"Timer"}
                                            autoComplete={hand.label+" timer"}
                                            autoFocus
                                            my={0.8}
                                            mr={1}
                                            inputRef={register({
                                              required: hand.label+" timer minute value is required.",
                                            })}
                                            onChange={onPrizePoolTimerChange}
                                            onBlur={onPrizeAndBlindBlur}
                                            value={hand.timer}
                                            error={Boolean(
                                                errors[hand.name+"timer"]
                                            )}
                                            helperText={
                                              errors[hand.name+"timer"]
                                                  ?.message
                                            }
                                            InputLabelProps={{shrink : true}}
                                        />
                                        <FormHelperText error={true} id={hand.name+"_timer"}></FormHelperText>
                                      </Grid>
                                    </React.Fragment>
                                );
                              })}
                            </Grid>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>

                  </Grid>
                </Grid>
                <Grid item xs={4}>
                  <Card style={{maxHeight:'400px', minHeight:'400px', overflowY:"scroll", oveflowX:"hidden"}}>
                    <CardContent style={styles.card_content}>
                      <Grid container spacing={1}>
                        <Grid item xs={12}>

                          {gameType === 'five_card_stud' ?
                          <Typographyx variant="button" color="textSecondary">
                              ANTE
                            </Typographyx>:
                          <Buttonx
                              type="button"
                              variant="contained"
                              color="primary"
                              fullWidth
                              mb={1}
                              onClick={addLevel}
                              disabled={gameType === "five_card_stud"}
                          >
                            Add Blind Level
                          </Buttonx> }

                        </Grid>
                        {gameType !== 'five_card_stud' ?
                        <Grid item xs={12}>
                          {smallBlindLevels?.map((value, index) => {
                            let level = index + 1;
                            return (
                                <div key={value + index}>
                                  <TextFieldx
                                      name={"smallBlindStartingValueLevel" + level}
                                      size="small"
                                      variant="outlined"
                                      margin="normal"
                                      placeholder="10"
                                      required
                                      fullWidth
                                      label={`Level ${level} Small Blind Value`}
                                      autoComplete="smallBlindStartingValue"
                                      autoFocus
                                      my={1}
                                      inputRef={register({
                                        required: "Small blind value is required.",
                                      })}
                                      onChange={onSBLevelChange(index)}
                                      onBlur={onPrizeAndBlindBlur}
                                      value={value.smallBlind}
                                      error={Boolean(
                                          errors["smallBlindStartingValueLevel" + level]
                                      )}
                                      helperText={
                                        errors["smallBlindStartingValueLevel" + level]
                                            ?.message
                                      }
                                      InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                              <IconButton
                                                  onClick={removeLevel(index)}
                                                  color="primary"
                                                  component="span"
                                              >
                                                <RemoveCircle />
                                              </IconButton>
                                            </InputAdornment>
                                        ),
                                      }}
                                      InputLabelProps={{shrink : true}}
                                  />
                                  <FormHelperText error={true} id={"smallBlindStartingValueLevel" + level}></FormHelperText>
                                  <TextFieldx
                                      name={"bigBlindStartingValueLevel" + level}
                                      size="small"
                                      variant="outlined"
                                      margin="normal"
                                      placeholder="10"
                                      required
                                      fullWidth
                                      label={`Level ${level} Big Blind Value`}
                                      autoComplete="bigBlindStartingValue"
                                      autoFocus
                                      mb={2}
                                      inputRef={register({
                                        required: "Big blind value is required.",
                                      })}
                                      onChange={onBBLevelChange(index)}
                                      onBlur={onPrizeAndBlindBlur}
                                      value={value.bigBlind}
                                      error={Boolean(
                                          errors["bigBlindStartingValueLevel" + level]
                                      )}
                                      helperText={
                                        errors["bigBlindStartingValueLevel" + level]
                                            ?.message
                                      }
                                      InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                              <IconButton
                                                  onClick={removeLevel(index)}
                                                  color="primary"
                                                  component="span"
                                              >
                                                <RemoveCircle />
                                              </IconButton>
                                            </InputAdornment>
                                        ),
                                      }}
                                      InputLabelProps={{shrink : true}}
                                  />
                                  <FormHelperText error={true} id={"bigBlindStartingValueLevel" + level}></FormHelperText>
                                </div>
                            );
                          })}
                        </Grid>
                        :
                        <div>
                        <TextFieldx
                                      name={"ante"}
                                      size="big"
                                      variant="outlined"
                                      margin="normal"
                                      placeholder="10"
                                      required
                                      fullWidth
                                      label="Ante"
                                      autoComplete="smallBlindStartingValue"
                                      autoFocus
                                      my={1}
                                      inputRef={register({
                                        required: "Ante value is required.",
                                      })}
                                      onChange={onSBLevelChange(0)}
                                      onBlur={onBlurAnte}
                                      error={anteErr[0]}
                                      helperText={anteErr[1]}
                                      InputLabelProps={{shrink : true}}
                                  />
                        </div> }

                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={1}>
                    <Card>
                      <CardContent style={styles.card_content}>
                        <Grid container spacing={1}>
                          <Grid item xs={12}>
                            <Typographyx variant="button" color="textSecondary">
                              Additional Payout Based on Player Hand
                            </Typographyx>
                          </Grid>
                          <Grid item xs={4}></Grid>
                          <Grid xs={4}>
                            <TextFieldx
                                select={true}
                                name="Bets"
                                size="small"
                                variant="outlined"
                                margin="normal"
                                placeholder="SIT_N_GO"
                                required
                                fullWidth
                                id="addon"
                                label="Bets"
                                autoComplete="tournamentType"
                                autoFocus
                                my={0.5}
                                onChange={changeSelectedAddon()}
                                defaultValue={0}
                                InputLabelProps={{shrink : true}}
                            >
                              {
                                additionalPayoutPerHandList.map((value, index) => (
                                    <MenuItem value={index} key={index} disabled={!isAddon0Valid(index)}>

                                    {(index === 0) ? 1 + " Buyin":

                                      [(index === 1) ? 1 + " Buyin and " + 1 + " add-on":

                                        [(index === (additionalPayoutPerHandList.length -1)) ? 1 + " Buyin and "+(additionalPayoutPerHandList.length -2)+ " addons" :

                                          1 + " Buyin and "+ (index-1) + " addons"
                                        ]
                                      ]
                                    }

                                    </MenuItem>
                                ))}
                            </TextFieldx>
                          </Grid>
                          <Grid item xs={12}>
                            <Grid container spacing={1}>
                              {additionalPayoutPerHandList[selectedAddon].map( hand => {
                                return (
                                    <React.Fragment key={hand.name}>
                                      <Grid item xs={4}>
                                        <TextFieldx
                                            name={hand.name}
                                            size="small"
                                            variant="outlined"
                                            margin="normal"
                                            placeholder="100"
                                            required
                                            fullWidth
                                            label={hand.name}
                                            autoComplete={hand.label}
                                            autoFocus
                                            my={0.8}
                                            ml={0.5}
                                            inputRef={register({
                                              required: hand.label+" minute value is required.",
                                            })}
                                            onChange={onAddtionalPayoutPerHandChange}
                                            onBlur={onAddtionalPayoutPerHandBlur}
                                            value={hand.value}
                                            error={Boolean(
                                                errors[hand.label]
                                            )}
                                            helperText={
                                              errors[hand.label]
                                                  ?.message
                                            }
                                            InputLabelProps={{shrink : true}}
                                        />
                                        <FormHelperText error={true} id={hand.name+"_additional"}></FormHelperText>
                                      </Grid>
                                    </React.Fragment>
                                );
                              })}
                            </Grid>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>

                    <Grid item xs={3}></Grid>
                    <Grid item xs={6}>
                      <Buttonx
                          type="submit"
                          variant="contained"
                          color="primary"
                          fullWidth
                          mt={1}
                      >
                        {tempValues.to_update ? "Update Template" : "Create Template"}
                      </Buttonx>
                    </Grid>
                  </Grid>
                </Grid>

              </Grid>
            </form>
          </div>
          <Box mt={2}>
            <Copyright />
          </Box>
        </Container>
      </div>
  );
}
