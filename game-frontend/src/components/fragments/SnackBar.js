import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import IconButton from "@material-ui/core/IconButton";

import { amber, green } from "@material-ui/core/colors";
import Loading from "@material-ui/core/CircularProgress";
import ErrorIcon from "@material-ui/icons/Error";
import InfoIcon from "@material-ui/icons/Info";
import WarningIcon from "@material-ui/icons/Warning";
import SuccessIcon from "@material-ui/icons/CheckCircle";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles(theme => ({
    error: { backgroundColor: theme.palette.error.dark },
    success: { backgroundColor: green[600] },
    info: { backgroundColor: theme.palette.primary.main },
    loading:{ backgroundColor: theme.palette.primary.main },
    warning: { backgroundColor: amber[700] },
    white_text: { color: "white" }, // snackbar content is overriding text style to black in dark theme mode(weird)
    snackbar_message: {
        display: "flex",
        alignItems: "center"
    },
    variant_icon: {
        opacity: 0.9,
        marginRight: theme.spacing(1)
    },
    snackbar_icon: { fontSize: 20, color: "#fff" }, // color set for circular bar progress(loading)
    snackbar_root: {
        [theme.breakpoints.down("xs")]: {
            left: 3,
            right: 3,
            bottom: 3
        }
    }
}));

const variantIcons = {
    success: SuccessIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
    loading: Loading,
};

export default function SnackBar(props) {
    const classes = useStyles();

    // defaults to error variant
    let variant = props.variant || "error";
    let autoHideDuration = props.autoHideDuration || null;

    const Icon = variantIcons[variant];

    return (
        <Snackbar
            className={classes.snackbar_root} // make snackbar more fitting on whole screen on xs devices
            anchorOrigin={{
                vertical: "top",
                horizontal: "right"
            }}
            open={Boolean(props.message)}
            autoHideDuration={autoHideDuration}
            onClose={props.closeSnackBar}
            ClickAwayListenerProps={{ onClickAway: props.closeSnackBar }}
            // TransitionComponent={<Slide direction='up' />}
        >
            <SnackbarContent
                style={{ borderRadius: 0 }} // no rounded corner
                className={`${classes[variant]} ${classes.white_text}`}
                aria-describedby="client-snackbar"
                message={
                    <span
                        id="client-snackbar"
                        className={classes.snackbar_message}
                    >
                        <Icon
                            className={`${classes.snackbar_icon} ${classes.variant_icon}`}
                        />
                        {props.message}
                    </span>
                }
                action={[
                    <IconButton
                        key="close"
                        aria-label="close"
                        color="inherit"
                        onClick={props.closeSnackBar}
                    >
                        <CloseIcon className={classes.snackbar_icon} />
                    </IconButton>
                ]}
            />
        </Snackbar>
    );
}
