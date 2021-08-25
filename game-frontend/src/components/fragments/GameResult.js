 
import React,{useState} from 'react';
import {makeStyles } from '@material-ui/core';

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import PaperTable from "./PaperTable";
import StyledTableRow from "./StyledTableRow";
import StyledTableCell from "./StyledTableCell";
import ArrowRight from '@material-ui/icons/ArrowRight';
import ArrowLeft from '@material-ui/icons/ArrowLeft';
// import ArrowBack from '@material-ui/icons/ArrowBack';
import IconButton  from '@material-ui/core/IconButton';
// import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
    paperTable: {
      flexGrow: 1,
    },
    tableContainer: {
      maxHeight: 500,
    },
    card_width_expanded:{
      width:"70%",
      overflowX:"hidden",
      float:'right'
    },
    card_width_all:{
      width:"100%",
      overflowX:"hidden",
      float:'right'
    },
    card_width:{
      width:"100%"
    }
  }));

export default function GameResult({players, isFlashMode, hasAdditionalPayout, showStandardPayout,showAll,isFiveCardDrawTurboMode, isHistory, ...props}){
    const classes = useStyles();

    const [expanded, setExpanded] = useState(showAll ? true : false);


    return(

          <div className={isFiveCardDrawTurboMode?(expanded?showAll ? classes.card_width_all:classes.card_width_expanded:classes.card_width):""}>
          <PaperTable className={classes.paperTable}>
            <TableContainer className={classes.tableContainer}>
              <Table size="small" stickyHeader>
                <TableHead>
                  <StyledTableRow>
                    <StyledTableCell align="center">Rank</StyledTableCell>
                    <StyledTableCell align="center">Player</StyledTableCell>
        
                    { ((isFiveCardDrawTurboMode && expanded) || !isFiveCardDrawTurboMode) ? 
                      isFlashMode ?
                      <React.Fragment>
                          {
                            showStandardPayout && 
                            <React.Fragment>
                              <StyledTableCell align="center">Prize Pool Payout</StyledTableCell>
                              <StyledTableCell align="center">Prize Pool Payout Percentage</StyledTableCell>
                            </React.Fragment>
                          }
                          <StyledTableCell align="center"> Additional Prize Pool Payout</StyledTableCell>
                          <StyledTableCell align="center">Additional Prize Pool Payout Percentage</StyledTableCell>
                      </React.Fragment> 
                      :
                      <React.Fragment>
                        <StyledTableCell align="center">Prize Pool Payout</StyledTableCell>
                        <StyledTableCell align="center">Prize Pool Payout Percentage</StyledTableCell>
                      </React.Fragment>
                      
                    :""}

                    {(hasAdditionalPayout && expanded && isFiveCardDrawTurboMode) || (hasAdditionalPayout && !isFiveCardDrawTurboMode)?
                    <React.Fragment>
                        <StyledTableCell align="center">Additional Payout Based on Hand</StyledTableCell>
                        <StyledTableCell align="center">Payout Hand</StyledTableCell>
                    </React.Fragment>
                    :""
                    }
                    {
                      isHistory ? 
                      <React.Fragment>
                        <StyledTableCell align="center">Rake</StyledTableCell>
                        <StyledTableCell align="center">Addons Used</StyledTableCell>
                      </React.Fragment>:""
                    }

                    
                    <StyledTableCell align="center">Total Won</StyledTableCell>
                  </StyledTableRow>
                </TableHead>
                <TableBody>
                {players.map((player, i)=>{
                  let hand = player.additional_payout_winning_hand;
                  if(hand){
                      hand = "<div>"+hand.slice(0,hand.indexOf("<"))+"<br />"+hand.slice(hand.indexOf("<"))+"</div>"
                  }
                  return (
                    <StyledTableRow hover={true} key={player.username}>
                      <StyledTableCell component="th" padding="checkbox" align="center" scope="row">
                        {i+1}
                      </StyledTableCell>
                      <StyledTableCell component="th" align="center" scope="row">
                          {player.username}
                      </StyledTableCell>
                      { ((expanded & isFiveCardDrawTurboMode) || !isFiveCardDrawTurboMode) ?
                        isFlashMode ?
                          <React.Fragment>
                            { showStandardPayout && 
                              <React.Fragment>
                                <StyledTableCell component="th" align="center" scope="row">
                                  ${player.payout}
                                </StyledTableCell>
                                <StyledTableCell component="th" align="center" scope="row">
                                  {player.payout_percentage}%
                                </StyledTableCell>
                              </React.Fragment>
                            }
                              <StyledTableCell component="th" align="center" scope="row">
                                  ${Number(player.flash_mode_payout).toFixed(2)}
                              </StyledTableCell>
                              <StyledTableCell component="th" align="center" scope="row">
                                  {Number(player.flash_mode_payout_percentage).toFixed(2)} %
                              </StyledTableCell>
                          </React.Fragment> 
                          : 
                          <React.Fragment>
                            <StyledTableCell component="th" align="center" scope="row">
                                ${player.payout}
                            </StyledTableCell>
                            <StyledTableCell component="th" align="center" scope="row">
                              {player.payout_percentage}%
                            </StyledTableCell>
                          </React.Fragment>
                      :""}
                      {((expanded && hasAdditionalPayout && isFiveCardDrawTurboMode) || (hasAdditionalPayout && !isFiveCardDrawTurboMode) )&&
                        <React.Fragment>
                            <StyledTableCell component="th" align="center" scope="row">
                                ${Number(player.additional_payout_hand).toFixed(2)}
                            </StyledTableCell>
                            <StyledTableCell component="th" align="center" scope="row">
                                <div dangerouslySetInnerHTML={{__html: hand}}>
                                </div>
                            </StyledTableCell>
                        </React.Fragment> 
                      }
                       {
                      isHistory ? 
                      <React.Fragment>
                        <StyledTableCell align="center">${Number(player.rake).toFixed(2)}</StyledTableCell>
                        <StyledTableCell align="center">{player.addons_used}</StyledTableCell>
                      </React.Fragment>:""
                    }
                        <StyledTableCell component="th" align="center" scope="row">
                            ${Number(player.total_payout_amount).toFixed(2)}
                        </StyledTableCell>
                    </StyledTableRow>
                  )})}
                </TableBody>
                <TableBody>
                  <StyledTableRow>
                      <StyledTableCell component="th" align="center" scope="row">
                      </StyledTableCell>
                    { ((expanded & isFiveCardDrawTurboMode) || !isFiveCardDrawTurboMode) && 
                    <React.Fragment>

                      <StyledTableCell component="th" align="center" scope="row">
                      </StyledTableCell>
                      <StyledTableCell component="th" align="center" scope="row">
                      </StyledTableCell>
                    </React.Fragment>
                    }
                    {
                      ((hasAdditionalPayout && expanded)||(hasAdditionalPayout && !isFiveCardDrawTurboMode)) &&
                      <React.Fragment>
                        <StyledTableCell component="th" align="center" scope="row">
                        </StyledTableCell>
                        <StyledTableCell component="th" align="center" scope="row">
                        </StyledTableCell>
                      </React.Fragment>
                    }
                    {
                      isFlashMode && showStandardPayout  &&
                      <React.Fragment>
                        <StyledTableCell component="th" align="center" scope="row">
                        </StyledTableCell>
                        <StyledTableCell component="th" align="center" scope="row">
                        </StyledTableCell>
                      </React.Fragment>
                    }
                    <StyledTableCell component="th" align="center" scope="row">
                      <b>Total Payout:</b> 
                    </StyledTableCell>
                    <StyledTableCell component="th" align="center" scope="row">
                      <b>${Number(props.totalPayout).toFixed(2)}</b>
                    </StyledTableCell>
                  </StyledTableRow>

                </TableBody>
              </Table>
            </TableContainer>
          
            {
              isFiveCardDrawTurboMode ?
              <IconButton
              style={{position:"absolute", bottom:"10px", right:"0"}}
                onClick={()=>{ setExpanded(!expanded)}}
              >
              {expanded ? <ArrowRight/>:<ArrowLeft/>  }
              </IconButton> 
              :""
            }
          </PaperTable>
          </div>
    )
}