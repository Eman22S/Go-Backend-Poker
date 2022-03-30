import React, { useState,useEffect  } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
import { useForm } from "react-hook-form";

import PaperTable from "./fragments/PaperTable";
import Pagination from '@material-ui/lab/Pagination';
import Buttonx from "./fragments/Buttonx";
import TextFieldx from "./fragments/TextFieldx";
import Copyright from "./fragments/Copyright";
import Typographyx from "./fragments/Typographyx";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import StyledTableCell from './fragments/StyledTableCell';
import StyledTableRow from './fragments/StyledTableRow';
import Checkbox from "@material-ui/core/Checkbox";


import { useSnackBarContext } from "./../contexts/snackbar";
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
    minHeight: '100vh',
    backgroundImage: `url(${theme.backgroundImg.image})`,
    backgroundRepeat:  theme.backgroundImg.repeat
  },
}));

const styles = {
  card_content: {
    marginTop: 16,
    marginBottom: 16,
  },
};

export default function CreatePrizePayoutTemplate(props) {
  const classes = useStyles();

  const showSnackBar = useSnackBarContext();
  const grpc_client = useGrpcClient();
  const [prizePoolPage, setPrizePoolPage] = useState(1);
  const [prizePoolCount, setPrizePoolCount] = useState(0)

  const [percentagesList, setPercentagesList] = useState([]);
  const [selectedPayoutId, setSelectedPayoutId] = useState(null);

  useEffect(() => {
    getPayoutStructure();
    //eslint-disable-next-line
  }, [prizePoolPage, grpc_client, showSnackBar])


  const getPayoutStructure = () => {
    grpc_client.getPayoutStructure({
      pagination_current_page: prizePoolPage,
      pagination_items_per_page: 10
    }, (response) => {
      let parsedResponse = JSON.parse(response);
      console.log("parsedResponse")
      console.log(parsedResponse)
      setPercentagesList(parsedResponse.payload);
      setPrizePoolCount(parsedResponse.pagination_data.number_of_pages);
    }, (error) => {
      if (error) {
        showSnackBar(error);
    }
    })

  }

  const {
    register,
    handleSubmit,
    errors,
  } = useForm({
    // react-hook-form needs values set here to work with default values properly
    defaultValues: [],
  });

  const create_prize_payout_response = function (response) {
    // let parsed_histories = JSON.parse(response.getResult());
    showSnackBar("Prize Prize Pool Payout Percentage Template created successfully.", "success");
    //grpc_client.getPayoutStructure(()=>{}, ()=>{});
    //history.push("/admin");
    getPayoutStructure();
  };

  function create_prize_payout_error(custom_msg) {
    if (custom_msg) {
      showSnackBar(custom_msg);
    }
  }

  const onSubmit = (data) => {

    let payoutStructure = "a:"+data.winners+":{"
    let totalPercentage = percentages.reduce((a,b) => a + parseInt(b),0);
    if(totalPercentage <= 100){
         payoutStructure += percentages.map( (val,i) => {
          return `i:${i};i:${val};`
        }).join("") + "}"

        data.payoutStructure = payoutStructure;
        console.log("data");
        console.log(data)
        grpc_client.addPayoutStructure(
          data,
          create_prize_payout_response,
          create_prize_payout_error
        );
    } else{
      showSnackBar("Prize Prize Pool Payout Total Percentages Should be less than or equal to 100%.", "error");
    }

  };

  //Dynamic number of levels and small blinds values
  const [percentages, setPercentages] = useState([100]);

  const [minPlayer, setMinPlayer] = useState(1);
  const [maxPlayer, setMaxPlayer] = useState(1);
  const [, setWinners] = useState(1);

  const handleWinnersChanged = (e) => {
    e.persist();
    setWinners(Number(e.target.value));
    setPercentages(prevPercentage => {
      if(Number(e.target.value) > prevPercentage.length) {
        let newVal = [...prevPercentage, ...Array(Number(e.target.value) - prevPercentage.length).fill(0)];
        return newVal;
      } else {
        return prevPercentage.slice(0, Number(e.target.value));
      }
    })
  }

  const handlePercentageChange = (value, index) => {
    setPercentages( prevPercentage => prevPercentage.map((oldValue, i) => i !== index ? oldValue : value));
  }

  const handlePrizePoolPaginationChange = (event, value) => {
    setPrizePoolPage(value);
  }

  const handleChangePayout = (id) => (event) => {
    setSelectedPayoutId(id);
  }
  const handlePayoutDelete = ()  => {
    console.log("selected payout id  " + selectedPayoutId);
    grpc_client.deletePrizePoolPayout(
      selectedPayoutId,
      (response) =>{
        if(response.getSuccess()){
          getPayoutStructure()
        }else{
          showSnackBar(response.getMessage())
        }
        console.log("payout response !");
        console.log(response.getMessage())
        console.log(response.getSuccess())

      },
      (error) => {
        if (error){
          console.log("error")
          console.log(error)
        }
      }

    );
  }

  return (
    <div className={classes.background}>
      <Container
        component="main"
        maxWidth="lg"
        align="center"
        className={classes.main}
      >
        <div className={classes.paper}>
          <form
            className={classes.form}
            noValidate
            onSubmit={handleSubmit(onSubmit)}
          >
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Typographyx variant="h6" color="textSecondary">
                  Create Prize Pool Payout Template
                </Typographyx>
              </Grid>

              <Grid item xs={12}>
                <Card>
                  <CardContent style={styles.card_content}>
                    <Grid container spacing={1}>
                      <Grid item xs={4}>
                        <TextFieldx
                            name="minPlayers"
                            size="small"
                            variant="outlined"
                            margin="normal"
                            placeholder="1"
                            required
                            fullWidth
                            id="minPlayers"
                            type='number'
                            inputProps={{
                              min: 0,
                              max: maxPlayer,
                            }}
                            defaultValue={1}
                            label="Min # of Players"
                            autoComplete="minPlayers"
                            autoFocus
                            my={0.5}
                            inputRef={register({
                              required: "Minimum number of players is required.",
                            })}
                            onChange={(e=>{setMinPlayer(e.target.value)})}
                            error={Boolean(errors.name)}
                            helperText={errors.name?.message}
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <TextFieldx
                            name="maxPlayers"
                            size="small"
                            variant="outlined"
                            margin="normal"
                            placeholder="5"
                            type='number'
                            defaultValue={1}
                            inputProps={{
                              min: minPlayer,
                            }}
                            required
                            fullWidth
                            id="maxPlayers"
                            label="Max # of Players"
                            autoComplete="maxPlayers"
                            autoFocus
                            my={0.5}
                            inputRef={register({
                              required: "Maximum number of players is required.",
                            })}
                            onChange={(e=>{setMaxPlayer(e.target.value)})}
                            error={Boolean(errors.name)}
                            helperText={errors.name?.message}
                          />
                        </Grid><Grid item xs={4}>
                          <TextFieldx
                            name="winners"
                            size="small"
                            variant="outlined"
                            margin="normal"
                            placeholder="5"
                            type='number'
                            defaultValue={1}
                            inputProps={{
                              min: 0,
                              max: maxPlayer,
                            }}
                            required
                            fullWidth
                            id="winners"
                            label="# of Prize Winners"
                            autoComplete="winners"
                            autoFocus
                            my={0.5}
                            inputRef={register({
                              required: "Number of winning players is required.",
                            })}
                            onChange={handleWinnersChanged}
                            error={Boolean(errors.name)}
                            helperText={errors.name?.message}
                          />
                        </Grid>
                        <Grid item xs={12} >
                          <hr />
                        </Grid>
                        {percentages.map((val, i) => (
                          <Grid item xs={4} key={i}>
                            <TextFieldx
                              name={"percentage"+i}
                              size="small"
                              variant="outlined"
                              margin="normal"
                              placeholder="5"
                              type='number'
                              value={val}
                              required
                              fullWidth
                              id={"percentage"+i}
                              label={`# ${i+1} Prize Percentage`}
                              autoComplete={"percentage"+i}
                              my={0.5}
                              inputRef={register({
                                required: "Prize Percentage is required.",
                              })}
                              onChange={(e)=>{handlePercentageChange(e.target.value, i)}}
                              error={Boolean(errors.name)}
                              helperText={errors.name?.message}
                            />
                          </Grid>
                        ))}
                        <Grid item xs={12} align="center">
                            <Grid item xs={6}>
                              <Buttonx
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                mt={1}
                                >
                                Create Template
                              </Buttonx>
                            </Grid>
                        </Grid>
                      </Grid>
                  </CardContent>
                </Card>
              </Grid>
              </Grid>


              <Grid item xs={12}>

              <Card>
                <CardContent style={styles.card_content}>
                  <Grid item xs={12}>
                      <Typographyx variant="button" color="textSecondary">
                        Prize Pool Payout Percentages
                      </Typographyx>
                  </Grid>
                  <PaperTable className={classes.root}>
                    <TableContainer className={classes.container}>
                      <Table size="small">
                        <TableHead>
                          <StyledTableRow>
                          <StyledTableCell align="center"></StyledTableCell>
                            <StyledTableCell align="center">
                              Minimum # of Players
                            </StyledTableCell>
                            <StyledTableCell align="center">Maximum # of Players</StyledTableCell>
                            <StyledTableCell align="center"># of Prize Winners</StyledTableCell>
                            <StyledTableCell align="center">Additonal Prize Pool Payout Break Down</StyledTableCell>
                          </StyledTableRow>
                        </TableHead>
                        <TableBody style={styles.card_content}>
                          {percentagesList && percentagesList.map((val)=> (
                              <StyledTableRow
                                key={val.id}
                                hover={true}
                                onClick={handleChangePayout(val.id)}
                                selected={selectedPayoutId === val.id}
                              >
                                  <StyledTableCell
                                    component="th"
                                    scope="row"
                                    align="justify"
                                    padding="checkbox"
                                  >
                                    <Checkbox
                                      checked={selectedPayoutId === val.id}
                                      onChange={handleChangePayout(val.id)}
                                      name={''}
                                      color="default"
                                    />
                                  </StyledTableCell>
                                <StyledTableCell align="center" padding="checkbox">
                                  {val.num_players_min}
                                </StyledTableCell>
                                <StyledTableCell align="center" padding="checkbox">
                                  {val.num_players_max}
                                </StyledTableCell>
                                <StyledTableCell align="center" padding="checkbox">
                                {val.percentages.split("{")[1].split(";").map((v, i)=> i % 2 !== 0 ? v.split(":")[1] : null).filter(n => n).length}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                  {val.percentages.split("{")[1].split(";").map((v, i)=> i % 2 !== 0 ? v.split(":")[1] : null).filter(n => n).map((percent, index) => {
                                    return(
                                      <div key={val.id+index} style={{width:`${percent - 0.5}%`, border:"solid 1px", display: "inline-block"}}>{percent}{"%"}</div>
                                    )
                                  })}
                                </StyledTableCell>
                              </StyledTableRow>
                            ))}
                        </TableBody>
                      </Table>
                      {
                        percentages && percentages.length === 0 ? (
                          <Typographyx variant="subtitle2" pb={5} pt={3}>
                              No additional prize pool found.
                          </Typographyx>
                        ) : (
                          <Box m={2}>
                              <Pagination count={prizePoolCount} variant="outlined" shape="rounded" page={prizePoolPage} onChange={handlePrizePoolPaginationChange} />
                          </Box>
                        )
                      }
                    </TableContainer>
                  </PaperTable>
                  <Grid item xs={12} align="center">
                    <Grid item xs={4}>
                      <Buttonx
                        variant="contained"
                        color="primary"
                        fullWidth
                        mt={1}
                        disabled={selectedPayoutId==null}
                        onClick={handlePayoutDelete}
                        >
                        Delete
                      </Buttonx>
                    </Grid>
                  </Grid>
                </CardContent>
                </Card>
            </Grid>

          </form>
        </div>
        <Box mt={2}>
          <Copyright />
        </Box>
      </Container>
    </div>
  );
}
