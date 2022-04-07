import React, { useState, useCallback, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import useGrpcClient from "./contexts/grpc_client";
import { is_logged_in, logout } from "./utils/auth_utils";

import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typographyx from "./components/fragments/Typographyx";

import Typography from "@material-ui/core/Typography";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

import { withStore } from "./contexts/store";
import { AssetPathsContext } from "./contexts/asset_paths";
import { SnackBarContext } from "./contexts/snackbar";

import GamePlay from "./components/GamePlay";
import SnackBar from "./components/fragments/SnackBar";
import Login from "./components/guest/Login";
import Signup from "./components/guest/Signup";
import Layout from "./components/Layout";
import ForgotPassword from "./components/guest/ForgotPassword";
import Admin from "./components/Admin";
import AdminLogin from "./components/guest/AdminLogin";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ConfirmProvider } from 'material-ui-confirm';
import GamePlayAlternate from "./components/GamePlayAlternate";
import useLocalStorage from "./components/utils/hooks";
import md5 from "md5";
import { DEV_IMAGE_URL } from "./utils/image_utils";
// non dark mode theme
// const light_theme = createMuiTheme({
//   primary: {
//     main: "#2e9ad6",
//   },
// });

// dark mode theme
let theme={
  palette: {
    type: "dark",
    primary: {
      main: "#2e9ad6",
    },
    background: {
      dark: "#00102c",
      paper: "#0a2042", // dark blueblackish
      default: "#1c3254",
      light: "#233655", // calculated lighter shade of above default
      // light: "#3b4d68", // calculated more lighter shade of above default
    },
    action: {
      hover: "rgba(33, 150, 243, 0.5)", // blue most UI primary color
      // hoverOpacity: 0.5, // hoverOpacity don't work weird
      selected: "rgb(33, 150, 243)",
      // selectedOpacity: 0.2,
    },
  },
  overrides: {
    MuiTableRow: {
      root: {
        "&$selected, &$selected:hover": {
          // Mui implemenatation doesn't use theme action.selected color, weird
          backgroundColor: "rgb(33, 150, 243)", //theme.palette.action.selected
        },
        "&:nth-of-type(odd)": {
          "&$selected, &$selected:hover": {
            // Mui implemenatation doesn't use theme action.selected color, weird
            backgroundColor: "rgb(33, 150, 243)", //theme.palette.action.selected
          },
        },
        "&:nth-of-type(even)": {
          "&$selected, &$selected:hover": {
            // Mui implemenatation doesn't use theme action.selected color, weird
            backgroundColor: "rgb(33, 150, 243)", //theme.palette.action.selected
          },
        },
      },
    },

    MuiCssBaseline: {
      '@global': {
        /*html: {
          width: "50% !important",
        },*/
      },
    },

  },
  typography: {
    fontFamily: [
      'Roboto',
    ].join(','),
  },

  backgroundImg:{
    image: '',
    repeat:'',
  }
}





// available themes
// const available_themes = {
//   light: light_theme,
//   dark: dark_theme,
// };

/**
 * get user location from browser using the html geolocation api
 * @param {function} callback : a callback function that accepts two parameters - first : error object, second: geolocation object
 */
const getLocation = (callback) => {
  if (navigator && navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        callback(null, position);
      },
      (error) => {
        callback(error);
      }
    );
  } else {
    let errorObj = new Error("Geolocation is not supported in this browser!");
    errorObj.code = 0;
    callback(errorObj);
  }
};

function App(props) {


  const dark_theme = createMuiTheme(theme);

  const [DEFAULT_THEME, setDEFAULT_THEME] = useState(dark_theme);

  const DEFAULT_NOTIFICATION_VARIANT = "error"; // defaults to error notifications
  const grpc_client = useGrpcClient();

  const [assetPaths, ] = useState({
    cardPath: `${process.env.REACT_APP_HOST}/components/com_camerona/assets/carddecks/`,
    soundPath: `${process.env.REACT_APP_HOST}/components/com_camerona/assets/sounds/`,
    imagePath: `${process.env.REACT_APP_HOST}/components/com_camerona/assets/images/`,
    themePath: `themes/default`,
  });

  // notification states

  // notification message texts(also if falsy no notifications)
  const [message, setMessage] = useState("");
  // variant could be a string of: error | warning | success | info
  const [variant, setVariant] = useState(DEFAULT_NOTIFICATION_VARIANT);
  const [autoHideDuration, setAutoHideDuration] = useState(null);

  const [tosUpdates, setTOSUpdates] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [agree, setAgree] = useState(false);
  const [localUser, setLocalUser] = useLocalStorage("user");


  const handleClose = () => {
    if (agree) {
      setOpen(false);
      grpc_client.acceptTOS(
        (response) => {
          window.location.reload();
        },
        (custom_msg) => {
          custom_msg && showSnackBar(custom_msg);
        }
      );
    } else {
      showSnackBar("You must agree to the terms to continue.");
    }
  };

  /**
   * Closes snackbar notifications
   */
  const closeSnackBar = useCallback(function () {
    setMessage("");
  }, []);

  /**
   * Shows snackbar of message based on type of message
   * @param {str} message : a text message to be shown on snackbar
   * @param {str} variant : type of message: error | info | warn | success | loading
   */
  const showSnackBar = useCallback(
    function (message, variant, autoHideDuration = 0) {
      setMessage(message);
      if (variant && typeof variant === "string") {
        setVariant(variant);
      } else {
        setVariant(DEFAULT_NOTIFICATION_VARIANT);
      }
      if(autoHideDuration > 0) {
        setAutoHideDuration(autoHideDuration);
      } else {
        setAutoHideDuration(null);
      }
    },
    [DEFAULT_NOTIFICATION_VARIANT]
  );
  //TODO:
  // get location from browser {there is error.code to check the type of the error}
  useEffect(() => {
    let tempTheme = theme


    grpc_client.getAllUiSettings((resp) => {
      let ui_settings = Object.assign({}, ...JSON.parse(resp));
      console.log(ui_settings);

      let hasBackgroundImg = false;
      let opacity = "CC";//"D9";
      if(ui_settings.backgroundImg){// && ui_settings.backgroundRepeat){
        hasBackgroundImg = true
      }
      console.log("hasBackgroundImg " + hasBackgroundImg);





      if(ui_settings.backgroundDark){
        tempTheme.palette.background.dark = ui_settings.backgroundDark;

      }
      if(ui_settings.backgroundLight){
        tempTheme.palette.background.light =ui_settings.backgroundLight;

      }
      if(ui_settings.backgroundDefault){
        tempTheme.palette.background.default = ui_settings.backgroundDefault;

      }
      if(ui_settings.backgroundPaper){
        tempTheme.palette.background.paper = ui_settings.backgroundPaper;

      }
      if(ui_settings.primaryColor){
        tempTheme.palette.primary.main = ui_settings.primaryColor;
        tempTheme.palette.action.hover = ui_settings.primaryColor+"80";

      }

      if(ui_settings.selectedColor){
        tempTheme.palette.action.selected = ui_settings.selectedColor;



        tempTheme.overrides.MuiTableRow.root =  {
          "&$selected, &$selected:hover": {
            backgroundColor: ui_settings.selectedColor
          },
          "&:nth-of-type(odd)": {
            "&$selected, &$selected:hover": {
              backgroundColor: ui_settings.selectedColor
            },
          },
          "&:nth-of-type(even)": {
            "&$selected, &$selected:hover": {
              backgroundColor: ui_settings.selectedColor
            },
          },
        }





      }
      if(ui_settings.fontFamily){
        tempTheme.typography.fontFamily = [ui_settings.fontFamily,].join(',')
      }


      if(ui_settings.backgroundImg){
        let temp_img_src = DEV_IMAGE_URL + ui_settings.backgroundImg.replace("./","/");
        theme.backgroundImg.image = temp_img_src;
      }


      if(ui_settings.backgroundRepeat){
        theme.backgroundImg.repeat = ui_settings.backgroundRepeat;
      }


      /*
      if(ui_settings.customCss){
        console.log("customCss!!!")
        //console.log(ui_settings.customCss)
        let a = "{"+ui_settings.customCss.replace(/(\r\n|\n|\r)/gm, "")+"}";
        a = a.replaceAll("'",'"')
        //console.log(a)
        var badJson = a;
        var correctJson = badJson.replace(/(['"])?([a-z0-9A-Z_]+)(['"])?:/g, '"$2": ');
        console.log(correctJson);
        console.log(JSON.parse(correctJson));

        let customCssObj = JSON.parse(correctJson);
        tempTheme.overrides.MuiCssBaseline['@global'] = customCssObj;

      }*/



      if(hasBackgroundImg){
        tempTheme.overrides.MuiTableRow.root =  {
          "&$selected, &$selected:hover": {
            backgroundColor: ui_settings.selectedColor+opacity
          },
          "&:nth-of-type(odd)": {
            "&$selected, &$selected:hover": {
              backgroundColor: ui_settings.selectedColor+opacity
            },
          },
          "&:nth-of-type(even)": {
            "&$selected, &$selected:hover": {
              backgroundColor: ui_settings.selectedColor+opacity
            },
          },
        }



        tempTheme.palette.background.dark +=opacity;
        tempTheme.palette.background.light +=opacity;
        tempTheme.palette.background.default +=opacity;
        tempTheme.palette.background.paper +=opacity;
        tempTheme.palette.primary.main +=opacity;
        tempTheme.palette.action.selected +=opacity;


      }




      console.log("tempTheme")
      console.log(tempTheme)




      const new_theme = createMuiTheme(tempTheme);
      setDEFAULT_THEME(new_theme);
    }, (()=>{}));



    console.log(theme)
    console.log("--")
    console.log(tempTheme)



    if (is_logged_in() && window.location.pathname !== "/login") {
      grpc_client.checkForUpdates(
        (response) => {
          let data = JSON.parse(response.getData());
          if (data?.has_pending_investigation) {
            showSnackBar("Your account is being investigated!");

          }
          if (data?.is_suspended) {
            showSnackBar("Your account has been suspended!");
          }
          if (data?.block) {
            showSnackBar("Your account has been blocked!");
          }
          if (data?.is_closed) {
            showSnackBar("Your account has been deactivated!");
          }

          setLocalUser({id: localUser.id, md5: md5(localUser.id), username: localUser.username, last_login: localUser.last_login, ...data});

          if(data?.is_suspended || data?.block || data?.is_closed) {
            grpc_client.logout(() => {
              logout();
            }, (error) => {
                if (error) {
                    showSnackBar(error);
                }
                logout();
            });
          }

          if (!data?.has_agreed_to_tos) {
            setTOSUpdates(data?.tos_updates);
            setOpen(true);
          } else {
            getLocation((error, position) => {
              let data = {
                data: {
                  location: {
                    result: {
                      latitude: 36.1699, //position?.coords?.latitude,
                      longitude: -115.1398, //position?.coords?.longitude
                    },
                  },
                  device: {
                    result: {
                      platform: "web",
                    },
                  },
                  version: {
                    result: {
                      version: "25_0",
                    },
                  },
                },
              };
              if (error) {
                let error_message = "Unable to get location!";
                switch (error.code) {
                  case 0:
                    error_message += " Your browser is not supported.";
                    break;
                  case error.PERMISSION_DENIED:
                    error_message +=
                      " Please make sure to allow the location permission. Location is needed for verification purposes.";
                    break;
                  case error.POSITION_UNAVAILABLE:
                    error_message +=
                      " Your location is not currently unavailable.";
                    break;
                  case error.TIMEOUT:
                    error_message +=
                      " Timed out while trying to get your location";
                    break;
                  default:
                    break;
                }
                showSnackBar(error_message);
              }
              if (is_logged_in()) {
                grpc_client.sendGeolocationData(
                  data,
                  () => {},
                  (custom_msg) => custom_msg && showSnackBar(custom_msg)
                );
              }
            });
          }
        },
        (custom_msg) => {
          custom_msg && showSnackBar(custom_msg);
        }
      );
    }
    //eslint-disable-next-line
  }, [grpc_client, showSnackBar,]);

  return (
    <React.Fragment

    >

      <MuiThemeProvider theme={DEFAULT_THEME} >
      <CssBaseline />

        <AssetPathsContext.Provider value={assetPaths}>
        <ConfirmProvider
      defaultOptions={{
        confirmationButtonProps: { autoFocus: true }
      }}
    >
            <SnackBarContext.Provider value={showSnackBar}>
              <div className="App"     >
                {/* All pages will be put here based on their url */}
                <Router>
                  <Switch>
                    <Route path="/gameplay" component={GamePlay} exact />
                    <Route path="/gameplay_alt" component={GamePlayAlternate} exact />
                    <Route path="/gameplay/:id" component={GamePlay} exact />
                    <Route path="/login" component={Login} />
                    <Route path="/forgot" component={ForgotPassword} />
                    <Route path="/signup" component={Signup} />
                    <Route path="/admin/login" component={AdminLogin} />
                    <Route path="/admin" component={Admin} />
                    <Route path="/create_tournament_template" component={Admin} />
                    <Route path="/template_list" component={Admin} />
                    <Route path="/create_payout_template" component={Admin} />
                    <Route path="/user_whitelist" component={Admin} />
                    <Route path="/account_balance" component={Admin} />
                    <Route path="/active_users" component={Admin} />
                    <Route path="/bots" component={Admin} />

                    <Route path="/administrators" component={Admin} />

                    <Route path="/player_geofencing" component={Admin} />
                    <Route path="/hand_tests" component={Admin} />
                    <Route path="/permissions" component={Admin}/>
                    <Route path="/requests" component={Admin}/>

                    <Route path="/settings" component={Admin} />
                    <Route path="/client_management" component={Admin} />
                    <Route path="/simulation_management" component={Admin} />
                    <Route path="/cash_back_settings" component={Admin} />
                    <Route path="/geopoll" component={Admin}/>

                    {/* <Route path="/tournament_details/:id" component={TournamentDetails}/> */}
                    <Route path="/cancel_tournaments" component={Admin} />
                    <Route path="/cancel_join_any" component={Admin} />
                    <Route path="/templates" component={Admin} />
                    <Route path="/users" component={Admin} />
                    <Route path="/tournaments" component={Admin} />
                    <Route path="/players" component={Admin} />
                    <Route path="/" component={Layout} />{" "}
                    {/* This route and component should be the last */}
                  </Switch>
                </Router>
                {tosUpdates && (
                  <Dialog
                    aria-labelledby="simple-dialog-title"
                    scroll="paper"
                    fullWidth={true}
                    maxWidth="md"
                    open={open}
                    PaperProps={{ style: { alignItems: "center" } }}
                  >
                    <DialogTitle
                      id="simple-dialog-title"
                      disableTypography={true}
                    >
                      <Typographyx
                        variant="h6"
                        style={{ color: "#fff", textTransform: "inherit" }}
                      >
                        We have updated our{" "}
                        {Object.values(tosUpdates)
                          .map((val) => val.title)
                          .join(", ")}
                      </Typographyx>
                    </DialogTitle>
                    <DialogContent>
                      {Object.values(tosUpdates).map((tos, idx) => {
                        return (
                          <React.Fragment key={tos.title + idx}>
                            <div
                              dangerouslySetInnerHTML={{ __html: tos.introtext }}
                            />
                            <div
                              dangerouslySetInnerHTML={{ __html: tos.fulltext }}
                            />
                          </React.Fragment>
                        );
                      })}
                    </DialogContent>
                    <DialogContent style={{ overflowY: "visible" }}>
                      <Grid item xs={12}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              value="allowExtraEmails"
                              label="Start"
                              color="primary"
                              name="agree"
                              checked={agree}
                              onChange={(e) => setAgree(e.target.checked)}
                            />
                          }
                          label={
                            <Typography
                              variant="caption"
                              style={{ color: "white" }}
                            >
                              I agree with the{" "}
                              {Object.values(tosUpdates)
                                .map((val) => val.title)
                                .join(", ")}
                            </Typography>
                          }
                          style={{ width: "initial" }} // need to override some bootstrap css
                        />
                      </Grid>
                    </DialogContent>
                    <DialogActions>
                      <Button autoFocus onClick={handleClose} color="primary">
                        Continue
                      </Button>
                    </DialogActions>
                  </Dialog>
                )}
              </div>
            </SnackBarContext.Provider>

            <SnackBar
              message={message}
              closeSnackBar={closeSnackBar}
              variant={variant}
              autoHideDuration={autoHideDuration}
            />
            </ConfirmProvider>
        </AssetPathsContext.Provider>
      </MuiThemeProvider>
    </React.Fragment>
  );
}

export default withStore(App);
