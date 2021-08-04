import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        minHeight: '100vh'
    },

    bullet: {
        display: "inline-block",
        margin: "0 2px",
        transform: "scale(0.8)",
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    main: {
        paddingTop: theme.spacing(2),
    },
    paper: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
        card_header: {
        paddingBottom: 6,
        paddingInlineStart: 4,
    },
        background: {
        backgroundColor: theme.palette.background.paper,
    },
}));


export const styles = {
    card_content: {
        paddingBottom: 1,
        paddingTop: 1,
    },
};