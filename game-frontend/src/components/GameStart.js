import React, { useState, useCallback, useEffect } from "react";
import { Link as RouterLink, useHistory } from "react-router-dom";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import InputAdornment from "@material-ui/core/InputAdornment";

import Buttonx from "./fragments/Buttonx";
import TextFieldx from "./fragments/TextFieldx";
import Loading from "./fragments/Loading";
import Copyright from "./fragments/Copyright";

import { useSnackBarContext } from "./../contexts/snackbar";
import { useStore } from "../contexts/store";
import useGrpcClient from "../contexts/grpc_client";

const useStyles = makeStyles((theme) => ({
  main: {
    paddingTop: theme.spacing(4),
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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
  },
}));

const styles = {
  card_content: {
    paddingBottom: 16,
    paddingTop: 8,
  },
};

const table_types = [
  { value: "NO_LIMIT", label: "No Limit" },
  { value: "LIMIT", label: "Limit" },
  { value: "POT_LIMIT", label: "Pot Limit" },
];

const game_types = [
  { value: "texas_holdem", label: "Texas Holdem" },
  { value: "omaha", label: "Omaha" },
  { value: "five_card_stud", label: "Five Card Stud" },
  { value: "five_card_draw", label: "Five Card Draw" },
];

export default function GameStart(props) {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  const showSnackBar = useSnackBarContext();
  const [store, updateStore] = useStore();
  const grpc_client = useGrpcClient();

  const nunet_logo =
    theme.palette.type === "dark" ? "/login_icon_1.png" : "/login_icon_1.png";

  const [gameType, setGameType] = useState("texas_holdem");
  const [tableType, setTableType] = useState("NO_LIMIT");
  const [smallBlindValue, setSmallBlindValue] = useState("10");
  const [tableTimer, setTableTimer] = useState("30");

  const [smallBlindValueError, setSmallBlindValueError] = useState("");
  const [tableTimerError, setTableTimerError] = useState("");

  const [starting, setStarting] = useState(false);
  const [waiting, setWaiting] = useState(false);

  const changeUsing = (valueSetter, validator = (value) => {}) => (event) => {
    const { type, checked } = event.target;
    if (type === "checkbox") {
      valueSetter(checked);
    } else {
      let value = event.target.value.trim();
      valueSetter(value);
      validator(value);
    }
  };

  function validateSmallBlindValue(smallBlindValue) {
    if (smallBlindValue) {
      setSmallBlindValueError("");
    } else {
      setSmallBlindValueError("Small Blind Value is required");
    }
  }

  function validateTableTimer(tableTimer) {
    if (tableTimer) {
      setTableTimerError("");
    } else {
      setTableTimerError("Table timer is required");
    }
  }

  const on_start_new_table_state = useCallback(
    (tableStateResponse) => {
      if (tableStateResponse.game?.table_action !== "pending") {
        grpc_client.unSubscribeTournamentState();

        updateStore("startingTableState", () => tableStateResponse);
        history.push("/gameplay");
      }
    },
    [grpc_client, updateStore, history]
  );

  const make_sng = useCallback(() => {
    grpc_client.makeSng(
      {
        game_type: gameType,
        table_type: tableType,
        small_blind_value: smallBlindValue,
        table_timer: tableTimer,
      },
      (makeSngResponse) => {
        if (makeSngResponse.was_subscribed) {
          let tableStateResponse = { game_meta: {} };
          tableStateResponse.game_meta.tournament_instance_id =
            makeSngResponse.tournament_instance_id;
          tableStateResponse.game_meta.table_instance_id =
            makeSngResponse.table_instance_id;
          updateStore("startingTableState", () => tableStateResponse);
          history.push(`/gameplay/${makeSngResponse.tournament_instance_id}`);
          // setWaiting(true);
          // grpc_client.subscribeTournamentState(
          //   makeSngResponse.tournament_instance_id,
          //   makeSngResponse.table_instance_id,
          //   on_start_new_table_state,
          //   (custom_msg) => {
          //     custom_msg && showSnackBar(custom_msg);
          //     setWaiting(false);
          //   }
          // );
        } else {
          if (makeSngResponse.error_msgs) {
            setStarting(false);

            for (let err of makeSngResponse.error_msgs) {
              showSnackBar(window._(err), "error");
              console.warn("Subscribe tournament error: ", err);
            }
          }
        }
        // updateStore("startingTableState", () => tableStateResponse);
        // history.push("/gameplay");
      },
      (custom_msg) => {
        setStarting(false);
        custom_msg && showSnackBar(custom_msg);
      }
    );
  }, [
    grpc_client,
    gameType,
    tableType,
    tableTimer,
    smallBlindValue,
    showSnackBar,
    updateStore,
    history,
    // on_start_new_table_state,
  ]);

  function startTournament() {
    if (!smallBlindValue) {
      showSnackBar("Small blind value can not be empty.");
      return;
    }
    if (!tableTimer) {
      showSnackBar("Table timer can not be empty.");
      return;
    }
    setStarting(true);

    make_sng();
  }

  function onKeyPress(event) {
    if (event.key === "Enter") {
      startTournament();
    }
  }

  return (
    <div className={classes.background}>
      <Container component="main" maxWidth="xs" className={classes.main}>
        <div className={classes.paper}>
          <img src={nunet_logo} alt="Logo" className={classes.logo} />
          <form className={classes.form} noValidate>
            <Box py={1}>
              <Card>
                <CardHeader
                  className={classes.card_header}
                  title={
                    <Box align="center" pt={2}>
                      <Typography>Tournament Starting Options</Typography>
                    </Box>
                  }
                />
                <CardContent style={styles.card_content}>
                  <TextFieldx
                    id="gameType"
                    select
                    label="Game Type"
                    value={gameType}
                    onChange={changeUsing(setGameType)}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    my={1.5}
                  >
                    {game_types.map((type, index) => (
                      <MenuItem value={type.value} key={index}>
                        {type.label}
                      </MenuItem>
                    ))}
                  </TextFieldx>
                  <TextFieldx
                    id="tableType"
                    select
                    label="Table Type"
                    value={tableType}
                    onChange={changeUsing(setTableType)}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    my={1.5}
                  >
                    {table_types.map((type, index) => (
                      <MenuItem value={type.value} key={index}>
                        {type.label}
                      </MenuItem>
                    ))}
                  </TextFieldx>
                  <TextFieldx
                    value={smallBlindValue}
                    onChange={changeUsing(
                      setSmallBlindValue,
                      validateSmallBlindValue
                    )}
                    onKeyPress={onKeyPress}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="smallBlindValue"
                    label="Small Blind Value"
                    name="smallBlindValue"
                    autoComplete="smallBlindValue"
                    autoFocus
                    my={1.5}
                    error={Boolean(smallBlindValueError)}
                    helperText={smallBlindValueError}
                  />
                  <TextFieldx
                    value={tableTimer}
                    onChange={changeUsing(setTableTimer, validateTableTimer)}
                    onKeyPress={onKeyPress}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="tableTimer"
                    label="Table Timer"
                    name="tableTimer"
                    autoComplete="tableTimer"
                    my={1.5}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">Seconds</InputAdornment>
                      ),
                    }}
                    error={Boolean(tableTimerError)}
                    helperText={tableTimerError}
                  />
                  <Box mt={3} mb={1}>
                    <Buttonx
                      type="button"
                      fullWidth
                      variant="contained"
                      color="primary"
                      onClick={startTournament}
                      disabled={starting}
                      endIcon={
                        starting || waiting ? <Loading size={20} /> : null
                      }
                    >
                      Start Tournament
                    </Buttonx>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </form>
        </div>

        <Box mt={2}>
          <Copyright />
        </Box>
      </Container>
    </div>
  );
}
