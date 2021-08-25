import React, { useEffect, useState, useCallback } from "react";
import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";

import FormControlLabel from "@material-ui/core/FormControlLabel";

import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import Box from "@material-ui/core/Box";
import Pagination from '@material-ui/lab/Pagination';
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import Icon from "@material-ui/core/Icon";
import Divider from "@material-ui/core/Divider";
import green from '@material-ui/core/colors/green';
import Yes from '@material-ui/icons/CheckCircle';
import No from '@material-ui/icons/Cancel';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';

import Checkbox from "@material-ui/core/Checkbox";
import useGrpcClient from "../contexts/grpc_client";
import { useSnackBarContext } from "../contexts/snackbar";
import {
  template_options,
} from "./utils/constants";
import PaperTable from "./fragments/PaperTable";
import Loading from "./fragments/Loading";
import Typographyx from "./fragments/Typographyx";
import Buttonx from "./fragments/Buttonx";
import TournamentTemplateRow from "./fragments/TournamentTemplateRow";
import StyledTableCell from './fragments/StyledTableCell';
import StyledTableRow from './fragments/StyledTableRow';

import TournamentDetailsAdmin from "./TournamentDetailsAdmin";
import { useConfirm } from 'material-ui-confirm';
import xmlJson from "xml2js";
const builder = new xmlJson.Builder();

const useStyles = makeStyles((theme) => ({
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
    //backgroundColor: theme.palette.background.paper,
    backgroundImage: `url(${theme.backgroundImg.image})`,
    backgroundRepeat:  theme.backgroundImg.repeat  
  },
  container: {
    maxHeight: 630,
    minHeight: 630,
    position: "relative"
  },
  pagination: {
    position: "absolute",
    bottom: 0,
  },
  lobbyCardRow : {
    display:"flex",
    justifyContent:"space-between",
    padding: "10px 0",
  },
  lobbyCardBtn:{
    width:"100%", 
    marginBottom:"15px",
    borderRadius:"20px",
    border:"2px solid #ffd06a",
    display:"inline-block",
    padding:"5px 0",
    transition:"all .3s",
    transform:"translateY(0)",
    "&:hover": {
      transform:"translateY(-4px)"
    },
    "&:active":{
        transform:"translateY(-2px)"
    }
  }
}));

const styles = {
  card_content: {
    paddingBottom: 1,
    paddingTop: 1,
  },
};

export default function TournamentTemplateList(props) {
  const classes = useStyles();
  const history = useHistory();

  const grpc_client = useGrpcClient();

  const showSnackBar = useSnackBarContext();
  const confirm = useConfirm();

  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [lbtnLoading, setLbtnLoading] = useState(false);
  const [dbtnLoading, ] = useState(false);
  const [exportbtnLoading, setExportbtnLoading] = useState(false);
  const [tournamentTemps, setTournamentTemps] = useState([]);
  const [detail, setDetail] = useState(0);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [state, setState] = React.useState({
    0: {
      checked: false,
      id: null,
    },
    1: {
      checked: false,
      id: null,
    },
    2: {
      checked: false,
      id: null,
    },
    3: {
      checked: false,
      id: null,
    },
    4: {
      checked: false,
      id: null,
    },
    5: { count: 0 },
  });

  const handleChange = (event) => {
    if (event.target.checked) {
      setState({
        ...state,
        [event.target.name]: {
          checked: event.target.checked,
          id: event.target.value,
        },
        5: { count: state[5].count + 1 },
      });
    } else {
      setState({
        ...state,
        [event.target.name]: { checked: event.target.checked, id: null },
        5: { count: state[5].count - 1 },
      });
    }
  };

  const [checkboxState, setCheckboxState] = React.useState(false);
  const [singleHand, setSingleHand] = React.useState(false);

  const [payoutCheckboxState, setPayoutCheckboxState] = React.useState(false);

  const handleChangeCheckbox = (event) => {
    if(!event.target.checked) {
      setCheckboxState(event.target.checked);
    } else {
      setCheckboxState(event.target.checked);
      setSingleHand(!event.target.checked);
    }
  };

  const handleChangePayoutCheckbox = (event) => {
    setPayoutCheckboxState(event.target.checked);
  };

  const handleSingleHandCheckbox = (event) => {
    if(!event.target.checked) {
      setSingleHand(event.target.checked);
    } else {
      setSingleHand(event.target.checked);
      setCheckboxState(!event.target.checked);
    }
  };
  const can_launch =
    !(
      state[0].checked ||
      state[1].checked ||
      state[2].checked ||
      state[3].checked ||
      state[4].checked
    ) || lbtnLoading;
  //eslint-disable-next-line
  const can_duplicate = !(state[5].count == 1);

  const on_tournaments_temp_response = function (response) {
    setLoading(false);
    let parsedResponse = JSON.parse(response.getResult());
    let tournament_templates = parsedResponse.payload;

    console.log('Tournament Template ', tournament_templates);
    setTournamentTemps(tournament_templates);
    setCount(parsedResponse.pagination_data.number_of_pages);
  };

  function on_tournaments_temp_error(custom_msg) {
    setLoading(false);

    if (custom_msg) {
      showSnackBar(custom_msg);
    }
  }

  const get_tournaments = useCallback(() => {
    setLoading(true);
    grpc_client.getTournamentTemplateList(
      {
        pagination_current_page: page,
        pagination_items_per_page: 5
      },
      on_tournaments_temp_response,
      on_tournaments_temp_error
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [grpc_client, page]);

  const empty_state = {
    0: { checked: false, id: null },
    1: { checked: false, id: null },
    2: { checked: false, id: null },
    3: { checked: false, id: null },
    4: { checked: false, id: null },
    5: { count: 0 },
  };

  // On Pagination Changed
  const handlePaginationChange = (event, value) => {
    setPage(value);
  }

  const launch_tour_temp_response = function (response) {
    let launch_tour_temp_response = JSON.parse(response.getResult());
    setLbtnLoading(false);
    for (let id in launch_tour_temp_response) {

      if (launch_tour_temp_response[id].was_launched === true) {
        showSnackBar("tournament is launched Successfully .", "success");
        setState(empty_state);
      } else {
        showSnackBar("tournament is launch unsuccessful. Please, try again");
      }
    }
  };
  const delete_template = () => {
    let ids = [];
    Object.entries(state).map((index) => {
      if (index[1].checked) {
          ids.push(tournamentTemps[index[0]].id);
      }
      return ids;
    });
    confirm({ description: 'Remove tournament template and cancel all active and pending tournament instances?' })
    .then(() => { 
      grpc_client.removeTournamentTemplate(
        ids,
        (response)=>{
          get_tournaments();
        },
        (custom_msg) => {
          setLbtnLoading(false);
          custom_msg && showSnackBar(custom_msg);
        }
      );
   
  })
   
  }


  const duplicate_temp = () => {
    let temp = {};
    Object.entries(state).map((index) => {
      if (index[1].checked) {
        for (let id in tournamentTemps[index[0]]) {
          temp = {
            ...temp,
            [template_options[id]]: tournamentTemps[index[0]][id],
          };
        }
      }
      return temp;
    });
    setState(empty_state);
    console.log("temp", temp);
    history.push("/templates/create_tournament_template", temp);
  };
  const update_temp = () => {
    let temp = {};
    Object.entries(state).map((index) => {
      if (index[1].checked) {
        for (let id in tournamentTemps[index[0]]) {
          temp = {
            ...temp,
            [template_options[id]]: tournamentTemps[index[0]][id],
          };
        }
      }
      return temp;
    });
    temp.to_update = true;
    setState(empty_state);
    history.push("/templates/create_tournament_template", temp);
  };

  const tour_detail = (index) => (event) => setDetail(index);
  
  const launch_tour = () => {
    setLbtnLoading(true);
    let ids = {};
    Object.entries(state).map((index) => {
      if (index[1].checked) {
        ids = {
          ...ids,
          [tournamentTemps[index[0]].id]: tournamentTemps[index[0]].name,
        };
      }
      return ids;
    });
    grpc_client.launchTournament(
      {
        ids,
        is_flash_mode: checkboxState,
        has_additional_payout: payoutCheckboxState,
        is_single_hand: singleHand,
      },
      launch_tour_temp_response,
      (custom_msg) => {
        setLbtnLoading(false);
        custom_msg && showSnackBar(custom_msg);
      }
    );
  };

  const exportAsXml = () =>{
    setExportbtnLoading(true);
    Object.entries(state).map((index) => {
      if (index[1].checked) {
          const tempId =index[1].id;
         grpc_client.getTournamentTemplateDetailAdmin(tempId, async (response) => {
          let templateDetail = await JSON.parse(response.getTournamentTempalteDetail());
           if("flash_prize_pool_values" in templateDetail && typeof templateDetail["flash_prize_pool_values"] === "string"){
             templateDetail["flash_prize_pool_values"] = JSON.parse(templateDetail['flash_prize_pool_values'])
           }
           if("blind_level_and_values" in templateDetail  && typeof templateDetail["blind_level_and_values"] === "string"){
             templateDetail["blind_level_and_values"] = JSON.parse(templateDetail['blind_level_and_values'])
           }
           if("additional_player_payout" in templateDetail){
             if(typeof templateDetail["additional_player_payout"] === "string"){
               templateDetail["additional_player_payout"] = JSON.parse(templateDetail["additional_player_payout"]);
             }
             const {hands} =  templateDetail["additional_player_payout"];
             templateDetail["additional_player_payout"]['hands'] = flatNestedObj(hands);
           }
           const xml = await builder.buildObject(templateDetail);
           exportFun(xml,templateDetail.name);
           setExportbtnLoading(false);
        }, (error) =>{
           showSnackBar("Error while exporting  Tournament Template");
           setExportbtnLoading(false);
        });
      }
      setExportbtnLoading(false)
      return null;
    });
  }

  function flatNestedObj(obj) {
    const newObj = [];
    for(const key in obj){
      newObj.push(obj[key]);
    }
    return newObj

  }

  const exportFun = (xml, fileName) =>{
      const url = window.URL.createObjectURL(
          new Blob([xml]),
      );
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute(
          'download',
          `${fileName}.xml`,
      );
      // Append to html link element page
      document.body.appendChild(link);
      // Start download
      link.click();
      // Clean up and remove the link
      link.parentNode.removeChild(link);


  }
  const onDetailsOpen = tournament => {
    return (event) => {
      setDetailsOpen(true);
    }
  }

  const onDetailsClose = () => {
    setDetailsOpen(false);
  }

  useEffect(() => {
    get_tournaments();
  }, [get_tournaments]);

  return (
    <div className={classes.background}>
    <Container maxWidth="xl" className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typographyx variant="h6" color="textSecondary" pt={3}>
            Tournament Template
          </Typographyx>
        </Grid>

        <Grid item xs={8}>
          <PaperTable className={classes.root}>
            <TableContainer className={classes.container}>
              <Table>
                <TableHead>
                  <StyledTableRow>
                    <StyledTableCell align="center">Temp ID</StyledTableCell>
                    <StyledTableCell align="center">Image </StyledTableCell>
                    <StyledTableCell align="center">Name </StyledTableCell>
                    <StyledTableCell align="center">Buyin</StyledTableCell>
                    <StyledTableCell align="center">Prize Pool</StyledTableCell>
                    <StyledTableCell align="center">
                      Buyin Chips
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      Blind Increase (sec)
                    </StyledTableCell>
                    <StyledTableCell align="center">Table Type</StyledTableCell>
                    <StyledTableCell align="center">Type</StyledTableCell>
                    <StyledTableCell align="center">Game Type</StyledTableCell>
                    <StyledTableCell align="center">Visible in Lobby</StyledTableCell>
                  </StyledTableRow>
                </TableHead>
                <TableBody style={styles.card_content}>
                  {tournamentTemps &&
                    Object.keys(tournamentTemps).map((index) => (
                      <TournamentTemplateRow
                        key={index}
                        index={index}
                        checked={state[index].checked}
                        template={tournamentTemps[index]}
                        selected={detail === index}
                        onClick={tour_detail(index)}
                        onCheckboxChange={handleChange}>

                      </TournamentTemplateRow>
                      
                    ))}
                </TableBody>
              </Table>
                {loading && <Loading />}
              <Box m={2} className={classes.pagination}>
                  <Pagination count={count} variant="outlined" shape="rounded" page={page} onChange={handlePaginationChange} />
              </Box>
            </TableContainer>
          </PaperTable>
          <Grid container spacing={1}>
            <Grid item xs={2}>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                mt={1.5}
                mb={1}
              >
                <FormControlLabel
                  color="textSecondary"
                  control={
                    <Checkbox
                      checked={checkboxState}
                      onChange={handleChangeCheckbox}
                      name="flash"
                      color="primary"
                    />
                  }
                  label={<Typographyx color="textSecondary">FLASH</Typographyx>}
                />
              </Box>
            </Grid>
            <Grid item xs={3}>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                mt={1.5}
                mb={1}
              >
                <FormControlLabel
                  color="textSecondary"
                  control={
                    <Checkbox
                      checked={singleHand}
                      onChange={handleSingleHandCheckbox}
                      name="flash"
                      color="primary"
                    />
                  }
                  label={
                    <Typographyx color="textSecondary">SINGLE HAND</Typographyx>
                  }
                />
              </Box>
            </Grid>
            <Grid item xs={3}>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                mt={1.5}
                mb={1}
              >
                <FormControlLabel
                  color="textSecondary"
                  control={
                    <Checkbox
                      checked={payoutCheckboxState}
                      onChange={handleChangePayoutCheckbox}
                      name="additional_payout"
                      color="primary"
                    />
                  }
                  label={
                    <Typographyx color="textSecondary">
                      Additional Payout
                    </Typographyx>
                  }
                />
              </Box>
            </Grid>
            </Grid>
            <Grid container spacing={2}>
            <Grid item xs={2}>
              <Box mt={3} mb={1} mx={0}>
                <Buttonx
                  onClick={launch_tour}
                  disabled={can_launch}
                  fullWidth
                  variant="contained"
                  color="primary"
                  endIcon={lbtnLoading ? <Loading size={20} /> : null}
                >
                  Launch
                </Buttonx>
              </Box>
            </Grid>
            <Grid item xs={2}>
              <Box mt={3} mb={1}>
                <Buttonx
                  onClick={duplicate_temp}
                  disabled={can_duplicate}
                  fullWidth
                  variant="contained"
                  color="primary"
                  endIcon={dbtnLoading ? <Loading size={20} /> : null}
                >
                  Duplicate
                </Buttonx>
              </Box>
            </Grid>
            <Grid item xs={2}>
              <Box mt={3} mb={1}>
                <Buttonx
                  onClick={delete_template}
                  disabled={can_duplicate}
                  fullWidth
                  variant="contained"
                  color="danger"
                  endIcon={dbtnLoading ? <Loading size={20} /> : null}
                >
                  Delete
                </Buttonx>
              </Box>
            </Grid>
            <Grid item xs={2}>
              <Box mt={3} mb={1}>
                <Buttonx
                  onClick={update_temp}
                  disabled={can_duplicate}
                  fullWidth
                  variant="contained"
                  color="danger"
                  endIcon={dbtnLoading ? <Loading size={20} /> : null}
                >
                  Update
                </Buttonx>
              </Box>
            </Grid>
              <Grid item xs={2}>
                <Box mt={3} mb={1}>
                  <Buttonx
                      onClick={exportAsXml}
                      disabled={can_launch}
                      fullWidth
                      variant="contained"
                      color="secondary"
                      endIcon={exportbtnLoading ? <Loading size={20} /> : null}
                  >
                    Export as XML
                  </Buttonx>
                </Box>
              </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          {(tournamentTemps && tournamentTemps[detail]) && (
            <React.Fragment>
              <Card>
                <CardHeader
                  avatar={
                    <Avatar aria-label="tournament-id">
                      {tournamentTemps[detail].id}
                    </Avatar>
                  }
                  title={<div>{tournamentTemps[detail].name}</div>}
                  subheader={<div>{tournamentTemps[detail].game_type}</div>}
                 />
                 <Container>
                   <CardContent>
                     <div className={classes.lobbyCardRow}>
                       <Typographyx variant="subtitle2" style={{display: "flex", alignItems: "center"}}>
                         <Icon className="fa" color="primary" style={{marginRight: "16px"}}>attach_money</Icon>
                         {"Buyin: "}
                       </Typographyx>
                       <Typographyx>{tournamentTemps[detail].buyin}</Typographyx>
                     </div>
                     <Divider />
                     <div className={classes.lobbyCardRow}>
                       <Typographyx variant="subtitle2" style={{display: "flex", alignItems: "center"}}>
                         <Icon className="fa" color="primary" style={{marginRight: "16px"}}>bookmark_border</Icon>
                         {"Rake: "}
                       </Typographyx>
                       <Typographyx>{tournamentTemps[detail].rake}</Typographyx>
                     </div>
                     <Divider />
                     <div className={classes.lobbyCardRow}>
                       <Typographyx variant="subtitle2" style={{display: "flex", alignItems: "center"}}>
                         <Icon className="fa" color="primary" style={{marginRight: "16px"}}>leaderboards</Icon>
                         {"Starting Chips: "}
                       </Typographyx>
                       <Typographyx>{tournamentTemps[detail].buyin_chips}</Typographyx>
                     </div>
                     <Divider />
                     <div className={classes.lobbyCardRow}>
                       <Typographyx variant="subtitle2" style={{display: "flex", alignItems: "center"}}>
                         <Icon className="fa" color="primary" style={{marginRight: "16px"}}>table_chart</Icon>
                         {"Table Type: "}
                       </Typographyx>
                       <Typographyx>{tournamentTemps[detail].table_type}</Typographyx>
                     </div>
                     <Divider />
                     <div className={classes.lobbyCardRow}>
                       <Typographyx variant="subtitle2" style={{display: "flex", alignItems: "center"}}>
                         <Icon className="fa" color="primary" style={{marginRight: "16px"}}>account_balance_wallet</Icon>
                         {"Is for Money: "}
                       </Typographyx>
                       <Typographyx>
                         {
                           tournamentTemps[detail].is_for_money === '1'
                             ? <Yes style={{ color: green[500] }} fontSize="small" />
                             : <No color="error" fontSize="small" />
                         }
                        </Typographyx>
                      </div>
                    <Divider />
                  </CardContent>
                </Container>
                <CardActions>
                  <Container>
                    <Buttonx
                      className={classes.lobbyCardBtn}
                      variant="outlined"
                      onClick={onDetailsOpen(tournamentTemps[detail])}
                      m={0.25}
                    >Details</Buttonx>
                  </Container>
                </CardActions>
              </Card>
              <Dialog onClose={onDetailsClose} fullWidth={true} maxWidth="lg" aria-labelledby="customized-dialog-title" open={detailsOpen}>
                <DialogTitle id="customized-dialog-title" onClose={onDetailsClose} className={classes.background}>
                  <Typographyx color="textSecondary">{tournamentTemps[detail].name}</Typographyx>
                </DialogTitle>
                <DialogContent className={classes.background}>
                  <TournamentDetailsAdmin tournament={tournamentTemps[detail]} />
                </DialogContent>
                {/*<DialogActions className={classes.background}>
                  <Button autoFocus onClick={onDetailsClose} color="primary">
                    Close
                  </Button>
                  <Button autoFocus onClick={onConfirm} color="primary">
                    Join
                  </Button>
                </DialogActions>*/}
              </Dialog>
            </React.Fragment>
          )}
        </Grid>
      </Grid>
    </Container>
    </div>
  );
}
