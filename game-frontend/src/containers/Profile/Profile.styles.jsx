import { Tabs, Tab } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        minHeight: '100vh',
    },
    tabs: {
        borderRight: `1px solid white`,
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
    container: {
        maxHeight: 480,
    },
}));

export const VerticalTabs = withStyles(theme => ({
    flexContainer: {
        flexDirection: 'column'
    },
    indicator: {
        display: 'none',
    }
}))(Tabs);

export const MyTab = withStyles(theme => ({
    selected: {
        color: 'white',
        borderBottom: '2px solid white'
    }
}))(Tab);
