import React, { useState, useEffect} from "react";

import { makeStyles } from "@material-ui/core/styles";

import { table_type_labels, game_type_labels } from "../utils/constants";

import Yes from '@material-ui/icons/CheckCircle';
import Active from '@material-ui/icons/PersonPin';
import green from '@material-ui/core/colors/green';
import Badgex from "./Badgex";
import StyledTableCell from './StyledTableCell';
import StyledTableRow from './StyledTableRow';
import { format_dates } from '../../utils/number_utils'



const useStyles = makeStyles( theme => ({
  full: {
    color: theme.palette.error.main
  },
  available: {
    color: theme.palette.success.main
  },
  pointer: {
    cursor: "pointer"
  },
  joined_icon: {
    color: theme.palette.success.main,
    verticalAlign: "bottom",
  }
}))

export default function TournamentRow({ tournament, selected, onClick, ...props }) {
  const classes = useStyles();
  const [alreadyRegistered, setAlreadyRegistered] = useState(
    tournament?.already_registered
  );

  useEffect(() => {
    setAlreadyRegistered(tournament?.already_registered);
}, [tournament]);


  return (
    <StyledTableRow hover={true} selected={selected} onClick={onClick} className={classes.pointer}>
      <StyledTableCell component="th" scope="row" padding="default" style={{whiteSpace:"nowrap"}}>
      {tournament.name} &nbsp;{" "} {alreadyRegistered === "1" && <Active fontSize="small" className={classes.joined_icon} />}
      </StyledTableCell>
      <StyledTableCell align="center" padding="default">
        <Badgex color={tournament.status}>
          {tournament.status}
        </Badgex>
        </StyledTableCell>
      <StyledTableCell align="center" padding="none">
        {tournament.tournament_instance_id}
      </StyledTableCell>
      <StyledTableCell align="center" padding="none" className={parseInt(tournament.max_players_per_table) - parseInt(tournament.seats_occupied) > 0 ? classes.available: classes.full }>
        {parseInt(tournament.max_players_per_table) -
          parseInt(tournament.seats_occupied)}
        /{parseInt(tournament.max_players_per_table)}
      </StyledTableCell>
      <StyledTableCell align="center" padding="none">{tournament.table_timer}</StyledTableCell>
      <StyledTableCell align="center" padding="none">
        {table_type_labels[tournament.table_type]}
      </StyledTableCell>
      <StyledTableCell align="center" padding="none">
        {game_type_labels[tournament.game_type]}
      </StyledTableCell>
      <StyledTableCell align="center" padding="default">
        {tournament.is_flash_mode === "1" ?  <Yes style={{color: green[500]}}/> : <span>No</span> }
      </StyledTableCell>
      <StyledTableCell align="center" padding="default">
        {tournament.has_additional_payout === "1" ? <Yes style={{color: green[500]}}/> :<span>No</span>}
      </StyledTableCell>
      <StyledTableCell align="center" padding="default">
        {tournament.is_single_hand === "1" ? <Yes style={{color: green[500]}}/> : <span>No</span>}
        </StyledTableCell>
        <StyledTableCell align="center" padding="default">
        {tournament.scheduled_start_time ? format_dates(tournament.scheduled_start_time, null, navigator.language) : ''}
        </StyledTableCell><StyledTableCell align="center" padding="default">
        {tournament.actual_start_time ? format_dates(tournament.actual_start_time, tournament.finish_time, navigator.language, '-') : '-'}
        </StyledTableCell>
    </StyledTableRow>
  );
}
