import Grid from '@material-ui/core/Grid';
import Table from "@material-ui/core/Table";
import PaperTable from "./fragments/PaperTable";
import Typographyx from './fragments/Typographyx';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import CardContent from "@material-ui/core/CardContent";
import TableContainer from "@material-ui/core/TableContainer";
import React, { useState, useEffect } from 'react';
import {makeStyles, Divider} from '@material-ui/core';
import Yes from '@material-ui/icons/CheckCircle';
import green from '@material-ui/core/colors/green'

import useGrpcClient from "../contexts/grpc_client";
import { useSnackBarContext } from '../contexts/snackbar';
import { table_type_labels, game_type_labels  } from "./utils/constants";
import StyledTableCell from './fragments/StyledTableCell';
import StyledTableRow from './fragments/StyledTableRow';
import Badgex from './fragments/Badgex';
import AdditionalPayoutTable from './fragments/AdditionalPayoutTable';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    minHeight: '100%',
  },
  headerInfo: {
    width: '100%',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.secondary,
    // padding: theme.spacing(1),
    '& svg': {
      margin: theme.spacing(1.5),
    },
    '& hr': {
      margin: theme.spacing(0, 0.5),
    },
  },
  paperTable: {
    flexGrow: 1,
  },
  tableContainer: {
    maxHeight: 480,
    minHeight: 200,
  },
  alignItems: {
    display: "flex",
    alignItems: "center"
  }
}));

const TournamentTemplateDetail = ({ id, ...props }) => {
  const classes = useStyles();
  const grpcClient = useGrpcClient();
  const showSnackBar = useSnackBarContext();
  const [waitingUsers, setWaitingUsers] = useState([]);
  const [blindLevelAndValues, setBlindLevelAndValues] = useState([]);
  // const [additionalPayoutBuyin, setAdditionalPayoutBuyin] = useState([]);
  const [additionalPayoutPerHand, setAdditionalPayoutPerHand] = useState(null);
  const [flashPrizePoolValues, setFlashPrizePoolValues] = useState(null);
  const [additionalPayoutStructure, setAdditionalPayoutStructure] = useState([]);
  const [tournamentTemplateDetail, setTournamentTemplateDetail] = useState(null);
  
  useEffect(() => {
    grpcClient.getTournamentTemplateDetail(
      id, 
      onGetTournamnetDetailChange, 
      onGetTournamentDetailFailure);
      //eslint-disable-next-line
    }, []);
    
    const onGetTournamnetDetailChange = (response) => {
      let templateDetail = JSON.parse(response.getTournamentTempalteDetail()); 
      setTournamentTemplateDetail(templateDetail);
      let flash_prize_pools = templateDetail.flash_prize_pool_values; 
      if (flash_prize_pools) {
        let flashPrize = JSON.parse(flash_prize_pools);
        setFlashPrizePoolValues(flashPrize);
      }
      let blindValues = JSON.parse(templateDetail.blind_level_and_values);
      setBlindLevelAndValues(blindValues.blindValues);
      
      let payoutStructure = JSON.parse(templateDetail.additional_payout_structure);
      setAdditionalPayoutStructure(payoutStructure);
      
      let additionalPlayerPayout = templateDetail?.additional_player_payout;
      
      // setAdditionalPayoutBuyin(additionalPlayerPayout?.buyin ? additionalPlayerPayout.buyin : []);
      setAdditionalPayoutPerHand(additionalPlayerPayout);
      
      let waitingUsers = JSON.parse(response.getWaitingUsers());
      setWaitingUsers(waitingUsers);
    } 
    
    const onGetTournamentDetailFailure = (error) => {
      if (error) {
        showSnackBar(error);
      }
    }
    
    return (
      <div className={`${classes.root}`}>
      <Container maxWidth="lg" align="center">
      <Grid container spacing={1}>
      <Grid item xs={12}>
      <Typographyx variant="h6" color="textSecondary" pt={3}>
      Template Details
      </Typographyx>
      </Grid>
      <Grid item xs={12}>
      <Grid container spacing={1}>
      <Grid item xs={6}>
      <Container align="start">
      <CardContent style={classes.cardContent}>
      <Typographyx variant="subtitle2" color="textSecondary" display="inline">
      <b> {"Name: "} </b>
      </Typographyx>
      <Typographyx variant="subtitle1" color="textSecondary" display="inline">
      {tournamentTemplateDetail?.name} 
      </Typographyx>
      <Divider />
      <Typographyx variant="subtitle2" color="textSecondary" display="inline">
      <b> {"Game Type: "} </b>
      </Typographyx>
      <Typographyx variant="subtitle1" color="textSecondary" display="inline">
      {game_type_labels[tournamentTemplateDetail?.game_type]}  {table_type_labels[tournamentTemplateDetail?.table_type]} 
      </Typographyx>
      <Divider />
      <Typographyx variant="subtitle2" color="textSecondary" display="inline">
      <b> {"Status: "} </b>
      </Typographyx>
      <Typographyx variant="subtitle1" color="textSecondary" display="inline">
      <Badgex color={tournamentTemplateDetail?.status}>{tournamentTemplateDetail?.status}</Badgex>
      </Typographyx>
      <Divider />
      <div className={classes.alignItems}>
      <Typographyx variant="subtitle2" color="textSecondary" display="inline" pr={1}>
      {"Flash Mode: "}
      </Typographyx>
      <Typographyx variant="subtitle1" color="textSecondary" display="inline" >
      {tournamentTemplateDetail?.is_flash_mode  === '1' ? <Yes style={{color: green[500]}} fontSize="small"/> : "No"  }
      </Typographyx>
      </div>
      <Divider />
      <div className={classes.alignItems}>
      <Typographyx variant="subtitle2" color="textSecondary" display="inline" pr={1}>
      {"Single Hand Mode: "}
      </Typographyx>
      <Typographyx variant="subtitle1" color="textSecondary" display="inline">
      {tournamentTemplateDetail?.is_single_hand  === '1' ? <Yes style={{color: green[500]}} fontSize="small"/> : "No"  }
      </Typographyx>
      </div>
      <Divider />
      <Typographyx variant="subtitle2" color="textSecondary" display="inline">
      <b>{"Starting Chips: "}</b>
      </Typographyx>
      <Typographyx variant="subtitle1" color="textSecondary" display="inline">
      {tournamentTemplateDetail?.buyin_chips}
      </Typographyx>
      <Divider />
      </CardContent>
      </Container>
      </Grid>
      <Grid item xs={6}>
      <Container align="start">
      <CardContent style={classes.cardContent}>
      <Typographyx variant="subtitle2" color="textSecondary" display="inline">
      <b> {"Buy In: "} </b>
      </Typographyx>
      <Typographyx variant="subtitle1" color="textSecondary" display="inline">
      ${ tournamentTemplateDetail?.buyin }
      </Typographyx>
      <Divider />
      <Typographyx variant="subtitle2" color="textSecondary" display="inline">
      <b> {"Rake: "} </b>
      </Typographyx>
      <Typographyx variant="subtitle1" color="textSecondary" display="inline">
      ${ tournamentTemplateDetail?.rake }
      </Typographyx>
      <Divider />
      <Typographyx variant="subtitle2" color="textSecondary" display="inline">
      <b> {"Prize Pool: "} </b>
      </Typographyx>
      <Typographyx variant="subtitle1" color="textSecondary" display="inline">
      ${ Number(tournamentTemplateDetail?.user_contributed_prize_pool || 0).toFixed(2) }
      </Typographyx>
      <Divider />
      <Typographyx variant="subtitle2" color="textSecondary" display="inline">
      <b>{"Additional Prize Pool: "}</b>
      </Typographyx>
      <Typographyx variant="subtitle1" color="textSecondary" display="inline">
      ${ Number(tournamentTemplateDetail?.additional_prize_pool_payout || 0).toFixed(2) }
      </Typographyx>
      <Divider />
      <Typographyx variant="subtitle2" color="textSecondary" display="inline">
      <b>{"Min Players: "}</b>
      </Typographyx>
      <Typographyx variant="subtitle1" color="textSecondary" display="inline">
      { tournamentTemplateDetail?.min_players_per_table }
      </Typographyx>
      <Divider />
      <Typographyx variant="subtitle2" color="textSecondary" display="inline">
      <b>{"Max Players: "}</b>
      </Typographyx>
      <Typographyx variant="subtitle1" color="textSecondary" display="inline">
      { tournamentTemplateDetail?.max_players_per_table }
      </Typographyx>
      <Divider />
      </CardContent>
      </Container>
      </Grid>
      </Grid>
      </Grid>
      <Grid item xs={12}>
      <Grid container spacing={1}>
      
      
      <Grid item xs={4}>
      <Typographyx variant="button" color="textSecondary" pt={3}>
      Waiting Players
      </Typographyx>
      <PaperTable className={classes.paperTable}>
      <TableContainer className={classes.tableContainer}>
      <Table size="small" stickyHeader>
      <TableHead>
      <StyledTableRow>
      <StyledTableCell align="center">#</StyledTableCell>
      <StyledTableCell align="center">Name</StyledTableCell>
      </StyledTableRow>
      </TableHead>
      <TableBody>
      {
        waitingUsers && waitingUsers.length > 0 ? (
          waitingUsers?.map((value, index) => (
            <StyledTableRow key={index}>
            <StyledTableCell component="th" align="center" scope="row">
            { index }
            </StyledTableCell>
            <StyledTableCell component="th" align="center" scope="row">
            { value.name }
            </StyledTableCell>
            </StyledTableRow>
            ))
            ) : (
              <StyledTableRow >
              <StyledTableCell component="th" align="center" scope="row" colSpan={3}>
              No waiting users!
              </StyledTableCell>
              </StyledTableRow>
              )                  
            }
            </TableBody>
            </Table>
            </TableContainer>
            </PaperTable>
            </Grid>
            
            <Grid item xs={4}>
            <Typographyx variant="button" color="textSecondary" pt={3}>
            Betting Structure
            </Typographyx>
            <PaperTable className={classes.paperTable}>
            <TableContainer className={classes.tableContainer}>
            <Table size="small" stickyHeader>
            <TableHead>
            <StyledTableRow>
            <StyledTableCell align="center">Level</StyledTableCell>
            <StyledTableCell align="center">Small Blind</StyledTableCell>
            <StyledTableCell align="center">Big Blind</StyledTableCell>
            </StyledTableRow>
            </TableHead>
            <TableBody>
            {
              blindLevelAndValues && blindLevelAndValues.length > 0 ? (
                blindLevelAndValues?.map((value, i)=>{
                  return (
                    <StyledTableRow key={i}>
                    <StyledTableCell component="th" padding="checkbox" align="center" scope="row">
                    {i+1}
                    </StyledTableCell>
                    <StyledTableCell component="th" align="center" scope="row">
                    {value.smallBlind}
                    </StyledTableCell>
                    <StyledTableCell component="th" align="center" scope="row">
                    {value.bigBlind}
                    </StyledTableCell>
                    </StyledTableRow>
                    )})
                    ) : (
                      <StyledTableRow >
                      <StyledTableCell component="th" align="center" scope="row" colSpan={3}>
                      No betting structures found!
                      </StyledTableCell>
                      </StyledTableRow>
                      )
                      
                    }
                    </TableBody>
                    </Table>
                    </TableContainer>
                    </PaperTable>
                    </Grid>
                    
                    <Grid item xs={4}>
                    <Typographyx variant="button" color="textSecondary" pt={3}>
                    Additional Prize Pool Payout Structure
                    </Typographyx>
                    <PaperTable className={classes.paperTable}>
                    <TableContainer className={classes.tableContainer}>
                    <Table size="small" stickyHeader>
                    <TableHead>
                    <StyledTableRow>
                    <StyledTableCell align="center">Place</StyledTableCell>
                    <StyledTableCell align="center">Awarded</StyledTableCell>
                    <StyledTableCell align="center">Additional Payout</StyledTableCell>
                    </StyledTableRow>
                    </TableHead>
                    <TableBody>
                    {
                      additionalPayoutStructure && additionalPayoutStructure.length > 0 ? (
                        additionalPayoutStructure?.map((value, index) => (
                          <StyledTableRow key={index}>
                          <StyledTableCell component="th" padding="checkbox" align="center" scope="row">
                          {index + 1}
                          </StyledTableCell>
                          <StyledTableCell component="th" align="center" scope="row">
                          {value}%
                          </StyledTableCell>
                          <StyledTableCell component="th" align="center" scope="row">
                          {tournamentTemplateDetail?.has_additional_payout === '1' ? "Yes" : "No"}
                          </StyledTableCell>
                          </StyledTableRow>
                          ))
                          ) : (
                            <StyledTableRow >
                            <StyledTableCell component="th" align="center" scope="row" colSpan={3}>
                            No additioonal prize pool payout structure!
                            </StyledTableCell>
                            </StyledTableRow>
                            )
                            
                          }
                          </TableBody>
                          </Table>
                          </TableContainer>
                          </PaperTable>
                          </Grid>
                          
                          </Grid>
                          </Grid>    
                          
                          
                          
                          
                          {
                            tournamentTemplateDetail?.has_additional_payout === '1' && 
                            <Grid item xs={12}>
                            <AdditionalPayoutTable additionalPayoutPerHand={additionalPayoutPerHand} addons_permitted={tournamentTemplateDetail.addons_permitted} />
                            
                            </Grid> 
                          }
                          
                          {
                            tournamentTemplateDetail?.is_flash_mode === '1' &&  <Grid item xs={12}>
                            <Box m={4}>
                            <Typographyx variant="button" color="textSecondary" pt={3}>
                            ADDITIONAL PRIZE POOL PAYOUT VALUES
                            </Typographyx>
                            
                            <PaperTable className={classes.paperTable}>
                            <TableContainer className={classes.tableContainer}>
                            <Table size="small" stickyHeader>
                            <TableHead>
                            <StyledTableRow>
                            <StyledTableCell align="center">
                            Hand
                            </StyledTableCell>
                            <StyledTableCell align="center">
                            Prize
                            </StyledTableCell>
                            <StyledTableCell align="center">
                            Timer
                            </StyledTableCell>
                            </StyledTableRow>
                            </TableHead>
                            <TableBody>
                            <StyledTableRow>
                            <StyledTableCell
                            component="th"
                            align="center"
                            scope="row"
                            >
                            Royal Flush
                            </StyledTableCell>
                            <StyledTableCell
                            component="th"
                            align="center"
                            scope="row"
                            >
                            {
                              flashPrizePoolValues?.prizePool?.royal_flush
                              .prize
                            }
                            </StyledTableCell>
                            <StyledTableCell
                            component="th"
                            align="center"
                            scope="row"
                            >
                            {
                              flashPrizePoolValues?.prizePool?.royal_flush
                              .timer
                            }
                            </StyledTableCell>
                            </StyledTableRow>
                            
                            <StyledTableRow>
                            <StyledTableCell
                            component="th"
                            align="center"
                            scope="row"
                            >
                            Straight Flush
                            </StyledTableCell>
                            <StyledTableCell
                            component="th"
                            align="center"
                            scope="row"
                            >
                            {
                              flashPrizePoolValues?.prizePool
                              ?.straight_flush.prize
                            }
                            </StyledTableCell>
                            <StyledTableCell
                            component="th"
                            align="center"
                            scope="row"
                            >
                            {
                              flashPrizePoolValues?.prizePool
                              ?.straight_flush.timer
                            }
                            </StyledTableCell>
                            </StyledTableRow>
                            
                            <StyledTableRow>
                            <StyledTableCell
                            component="th"
                            align="center"
                            scope="row"
                            >
                            Four of a Kind
                            </StyledTableCell>
                            <StyledTableCell
                            component="th"
                            align="center"
                            scope="row"
                            >
                            {
                              flashPrizePoolValues?.prizePool
                              ?.four_of_a_kind.prize
                            }
                            </StyledTableCell>
                            <StyledTableCell
                            component="th"
                            align="center"
                            scope="row"
                            >
                            {
                              flashPrizePoolValues?.prizePool
                              ?.four_of_a_kind.timer
                            }
                            </StyledTableCell>
                            </StyledTableRow>
                            
                            <StyledTableRow>
                            <StyledTableCell
                            component="th"
                            align="center"
                            scope="row"
                            >
                            Full house
                            </StyledTableCell>
                            <StyledTableCell
                            component="th"
                            align="center"
                            scope="row"
                            >
                            {
                              flashPrizePoolValues?.prizePool?.full_house
                              .prize
                            }
                            </StyledTableCell>
                            <StyledTableCell
                            component="th"
                            align="center"
                            scope="row"
                            >
                            {
                              flashPrizePoolValues?.prizePool?.full_house
                              .timer
                            }
                            </StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow>
                            <StyledTableCell
                            component="th"
                            align="center"
                            scope="row"
                            >
                            Flush
                            </StyledTableCell>
                            <StyledTableCell
                            component="th"
                            align="center"
                            scope="row"
                            >
                            {flashPrizePoolValues?.prizePool?.flush.prize}
                            </StyledTableCell>
                            <StyledTableCell
                            component="th"
                            align="center"
                            scope="row"
                            >
                            {flashPrizePoolValues?.prizePool?.flush.timer}
                            </StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow>
                            <StyledTableCell
                            component="th"
                            align="center"
                            scope="row"
                            >
                            Straight
                            </StyledTableCell>
                            <StyledTableCell
                            component="th"
                            align="center"
                            scope="row"
                            >
                            {
                              flashPrizePoolValues?.prizePool?.straight
                              .prize
                            }
                            </StyledTableCell>
                            <StyledTableCell
                            component="th"
                            align="center"
                            scope="row"
                            >
                            {
                              flashPrizePoolValues?.prizePool?.straight
                              .timer
                            }
                            </StyledTableCell>
                            </StyledTableRow>
                            
                            <StyledTableRow>
                            <StyledTableCell
                            component="th"
                            align="center"
                            scope="row"
                            >
                            Three of a Kind
                            </StyledTableCell>
                            <StyledTableCell
                            component="th"
                            align="center"
                            scope="row"
                            >
                            {
                              flashPrizePoolValues?.prizePool
                              ?.three_of_a_kind.prize
                            }
                            </StyledTableCell>
                            <StyledTableCell
                            component="th"
                            align="center"
                            scope="row"
                            >
                            {
                              flashPrizePoolValues?.prizePool
                              ?.three_of_a_kind.timer
                            }
                            </StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow>
                            <StyledTableCell
                            component="th"
                            align="center"
                            scope="row"
                            >
                            Two Pair
                            </StyledTableCell>
                            <StyledTableCell
                            component="th"
                            align="center"
                            scope="row"
                            >
                            {
                              flashPrizePoolValues?.prizePool?.two_pair
                              .prize
                            }
                            </StyledTableCell>
                            <StyledTableCell
                            component="th"
                            align="center"
                            scope="row"
                            >
                            {
                              flashPrizePoolValues?.prizePool?.two_pair
                              .timer
                            }
                            </StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow>
                            <StyledTableCell
                            component="th"
                            align="center"
                            scope="row"
                            >
                            Pair
                            </StyledTableCell>
                            <StyledTableCell
                            component="th"
                            align="center"
                            scope="row"
                            >
                            {flashPrizePoolValues?.prizePool?.pair.prize}
                            </StyledTableCell>
                            <StyledTableCell
                            component="th"
                            align="center"
                            scope="row"
                            >
                            {flashPrizePoolValues?.prizePool?.pair.timer}
                            </StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow>
                            <StyledTableCell
                            component="th"
                            align="center"
                            scope="row"
                            >
                            High Card
                            </StyledTableCell>
                            <StyledTableCell
                            component="th"
                            align="center"
                            scope="row"
                            >
                            {
                              flashPrizePoolValues?.prizePool?.high_card
                              .prize
                            }
                            </StyledTableCell>
                            <StyledTableCell
                            component="th"
                            align="center"
                            scope="row"
                            >
                            {
                              flashPrizePoolValues?.prizePool?.high_card
                              .timer
                            }
                            </StyledTableCell>
                            </StyledTableRow>
                            </TableBody>
                            </Table>
                            </TableContainer>
                            </PaperTable>
                            </Box>
                            </Grid>
                            
                            
                          }
                          
                          </Grid>  
                          </Container>
                          </div>
                          );
                          
                        };
                        
                        export default TournamentTemplateDetail;