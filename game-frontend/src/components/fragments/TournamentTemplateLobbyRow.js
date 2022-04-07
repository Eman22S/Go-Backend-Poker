
import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import StyledTableCell from '../../components/fragments/StyledTableCell';
import StyledTableRow from '../../components/fragments/StyledTableRow';
import { game_type_labels, table_type_labels  } from "../../components/utils/constants";
import Yes from '@material-ui/icons/CheckCircle';
import green from '@material-ui/core/colors/green'

const useStyles = makeStyles((theme) => ({
    background: {
        backgroundColor: theme.palette.background.default,
    },
    pointer: {
        cursor: "pointer"
    }
}));


const TournamentTemplateLobbyRow = ({ tournamentTemplate, selected, onClick, ...props }) => {
    const classes = useStyles();




    /**
     * Format Tournament Template name
     */
    const getTournamentTemplateGameType = () => {
        if (isFiveCardDrawTurboMode()) {
            return `${game_type_labels[tournamentTemplate.game_type]} Turbo Mode`;
        }
        else {
            return game_type_labels[tournamentTemplate.game_type];
        }
    }

    /**
     * Is Five Card Draw ()
     */
    const isFiveCardDrawTurboMode = () => {
        return tournamentTemplate.game_type === "five_card_draw" && tournamentTemplate.is_turbo_mode === "1";
    }

    return (
        <Fragment>
            <StyledTableRow hover={true} selected={selected} onClick={onClick} className={classes.pointer}>
                <StyledTableCell align="center">
                    { tournamentTemplate.name }
                </StyledTableCell>
                <StyledTableCell align="center">
                    { getTournamentTemplateGameType() }
                </StyledTableCell>
                <StyledTableCell align="center">
                    { table_type_labels[tournamentTemplate.table_type] }
                </StyledTableCell>
                <StyledTableCell align="center">
                    { tournamentTemplate.buyin }
                </StyledTableCell>
                <StyledTableCell align="center">
                    {   tournamentTemplate.buyin_chips }
                </StyledTableCell>
                <StyledTableCell align="center">
                    { tournamentTemplate.is_flash_mode === "1" ? <Yes style={{color: green[500]}}/> : "No" }
                </StyledTableCell>
                <StyledTableCell align="center">
                    { tournamentTemplate.has_additional_payout === "1" ?  <Yes style={{color: green[500]}}/> : "No" }
                </StyledTableCell>
                <StyledTableCell align="center">
                    { tournamentTemplate.is_single_hand === "1" ?  <Yes style={{color: green[500]}}/> : "No" }
                </StyledTableCell>
            </StyledTableRow>
        </Fragment>
    );
};

export default TournamentTemplateLobbyRow;