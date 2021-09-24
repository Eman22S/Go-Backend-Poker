import React, { useEffect, useState, Fragment } from "react";


import { makeStyles } from "@material-ui/core/styles";

import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";



import useGrpcClient from "../contexts/grpc_client";
import { useSnackBarContext } from "../contexts/snackbar";
import PaperTable from "./fragments/PaperTable";
import Loading from "./fragments/Loading";
import Typographyx from "./fragments/Typographyx";
import UnpositionedCard from "./fragments/UnpositionedCard";
import StyledTableCell from './fragments/StyledTableCell';
import StyledTableRow from './fragments/StyledTableRow';
import IconButton from "@material-ui/core/IconButton";
import AddIcon from '@material-ui/icons/Add';


import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Buttonx from './fragments/Buttonx';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
// import Badge  from "@material-ui/core/Badge";
import Chip  from "@material-ui/core/Chip";
import Pagination from "@material-ui/lab/Pagination";
import TextFieldx from "./fragments/TextFieldx";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/FormControl";
import { transformCards } from "./utils/data-transformer";
import { numberCardClass } from "./utils/constants";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    overflow: "hidden",
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
  default_background: {
    backgroundColor: theme.palette.background.default,
    backgroundImage: `url(${theme.backgroundImg.image})`,
    backgroundRepeat:  theme.backgroundImg.repeat  
  },
  iconButton: {
    margin: theme.spacing(0),
  },

  form_row:{
    display:"flex",
    justifyContent:"space-between",
    padding:"10px 20px"

  },
  flex_row:{
    display:"flex",
    alignItems:"center",
    justifyContent:"space-between"  
  },
  stat_btn:{
    border:"solid 2px lightBlue",
    padding:"10px 20px"
  }

}));

const styles = {
  card_content: {
    paddingBottom: 1,
    paddingTop: 1,
  },
};


export default function SpecificHandTest({  ...props }) {
  const crdsym	= ["2","3",	"4","5","6","7","8","9","10","Jack","Queen","King","Ace"];
	const colsym	= ["Diamond",	"Heart","Spade","Club"];
  const classes = useStyles();
    //to do deck representing labels
    //import from history
    //deck clear
  const grpc_client = useGrpcClient();

  const showSnackBar = useSnackBarContext();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);  
  const [openStat, setOpenStat] = useState(false);
  
  const [cardNumber, setCardNumber] = useState(-1);
  const [cardSymbol, setCardSymbol] = useState(-1)

  const [numberOfPlayers, setNumberOfPlayers] = useState(2);
  const [players, setPlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null)
  const [deck, setDeck] = useState([]);

  const [histories, setHistories] = useState([]);
  const [selectedHistoryId, setSelectedHistoryId] = useState(null);

  const [page, setPage] = useState(1);
  const [count, setCount] = useState(1);
  
  const handleChange = (event, value) => {
    setPage(value);
  };
  const game_types = [
    { value: "texas_holdem", label: "Texas Hold'em" },
    { value: "five_card", label: "Five Card" },
  ]
  const game_type_values = {
    TEXAS_HOLDEM : "texas_holdem",
    FIVE_CARD : "five_card"
  }
  const [stats, setStats] = useState(null);
  const [cardToUpdate, setCardToUpdate] = useState(null);
  const [gameType, setGameType] = useState(game_types[0].value);
  const [uniqueDeck, setUniqueDeck] = useState(false);
  const [additionalChecks, setAddtionalChecks] = useState(false);
  const [wildcardEnabled, setWildcardEnabled] = useState(false);
  const [wildcardValue, setWildcardValue] = useState(0);
  const [playersDeck, setPlayersDeck] = useState([]);
  const [metaData, setMetaData] = useState({
        flop0:0,
        flop1:0,
        flop2:0,
        river:0,
        turn:0
    });

  const [, setWinning] = useState({
    winning_first_hand: 0,
    winning_second_card : 0
  });
  const [playerDescription, setPlayerDescription] = useState(null);

  const [winnerCards, setWinnerCards] = useState(null);
  const {flop0, flop1, flop2, river, turn} = metaData;
  

  const setupDeck = () =>{
    setSelectedHistoryId(null);
    if(uniqueDeck){
      for (var i =0; i < numberOfPlayers; i ++){
        console.log("set up");
        
        grpc_client.getNewDeck({}, (response)=>{
          let temp = playersDeck;
          temp.push(JSON.parse(response)[0]);
          setPlayersDeck([...temp])
        }, on_grpc_error)

      }
      grpc_client.getNewDeck({}, handle_deck_response, on_grpc_error)

    }else{
      console.log("Elseee");
      grpc_client.getNewDeck({}, handle_deck_response, on_grpc_error)

    }
  }


  const handle_deck_response = (response)=>{
   const DeckData = response.toObject().cardsList
    setDeck(DeckData)
  }

  useEffect(()=>{
    setupDeck();
    //eslint-disable-next-line
  },[uniqueDeck])


 
  useEffect(()=>{
    if(deck && deck.length === 52 && players && players.length >= 2){
      setUpTable()
    }
    //eslint-disable-next-line
  },[deck]);


  useEffect(()=>{

    let playersData = players;
    while(playersData.length < numberOfPlayers){
        // let temp_deck = deck;
        playersData.push({cards : [0,0]})
    }
    while (playersData.length > numberOfPlayers){
      playersData.pop();
    }
    setPlayers([...playersData]);
    setupDeck();
    //eslint-disable-next-line
  },[numberOfPlayers])
  const setUpTable = () =>{
    setWinnerCards(null);
    let tempDeck = deck;

    setMetaData({
      flop0:tempDeck.pop(),
      flop1:tempDeck.pop(),
      flop2:tempDeck.pop(),
      turn:tempDeck.pop(),
      river:tempDeck.pop()
    })

    let playersData = players;
    let newPlayerDeck = [];
    playersData.forEach((player, index)=>{
      if(uniqueDeck){
        console.log(playersDeck[index]);
        tempDeck = playersDeck[index] ? playersDeck[index] : tempDeck;
      }
      let player_cards = [];
      if(gameType !== game_type_values["FIVE_CARD"]){
        player_cards.push(tempDeck.pop(),tempDeck.pop());
      }else{
        for(var i =0 ; i< 5; i ++){
          player_cards.push(tempDeck.pop());

        }

      }
      newPlayerDeck.push({
        
        cards : player_cards
      })
    })
    setPlayers([...newPlayerDeck]);
  }

  useEffect(()=>{
      if(deck.length <= 0){
          setupDeck();
      }
    //eslint-disable-next-line
  },[deck]);


  
  const assignCard = () =>{  
    setWinnerCards(null);

    const card = {rank: cardNumber, suit: cardSymbol};

    if (isCardSelected(card)) {
      return  showSnackBar("Card has already been selected");
    }
    if(selectedPlayer !== null){
      let tempPlayers = players;
      tempPlayers[selectedPlayer].cards[cardToUpdate] = card;
      setSelectedPlayer(null);
      setPlayers([...tempPlayers]);
    }else{
      setMetaData({
          ...metaData,
          [cardToUpdate]: card
      });
    }
    setOpen(false);
     
  }

  const isCardSelected = card => {
    const cardSelectedInMeta = Object.keys(metaData).find((meta, key)  => {
      return card.rank === metaData[meta].rank && card.suit === metaData[meta].suit
    })
    
    const cardSelectedInPlayers = Object.keys(players).find((selectedPlayer, index) => {
      const player = players[selectedPlayer]
      const cardInPlayer = Object.keys(player.cards).find((card, key)  => {
        return card.rank === player.cards[card].rank && card.suit === player.cards[card].suit
      })
      return !!cardInPlayer
    })

    return !!(cardSelectedInMeta || cardSelectedInPlayers)
  }


  const selectCard = (event)=>{
    setCardToUpdate(null);
    setCardToUpdate(event);
    setOpen(true);
  }


  const selectPlayerCard = (player, card) =>{

      setCardToUpdate(card);
      setSelectedPlayer(player);
      setOpen(true);
  }

  const closeSelectCard = ()=>{
    setOpen(false);
}
  useEffect(()=>{
    get_all_hand_history();
    get_hand_history_stat();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  function get_all_hand_history(resetPage) {
      if (resetPage) {
          setPage(1);
      }
      setLoading(true);

      grpc_client.getAllHandHistoryData(
        {
          pagination_current_page: resetPage? 1 : page,
          pagination_items_per_page: 10
        },
        on_history_response,
        on_grpc_error
      );
   
  }
  function get_hand_history_stat() {

    setLoading(true);

    grpc_client.getHandHistoryStat(
      on_stat_response,
      on_grpc_error
    );
 
}

const on_stat_response = function(response){
  if (response) {
    let parsed_stats = JSON.parse(response.getResult());
    setStats(parsed_stats);
    // change players_data structure to be keyed by player id
   
  }
}
  const on_history_response = function (response) {
    setLoading(false);


    if (response) {
      let parsed_history = JSON.parse(response.getResult());
      setHistories(parsed_history.payload);
      setCount(parsed_history.pagination_data.number_of_pages)
      // change players_data structure to be keyed by player id
     
    }
  };
  function on_grpc_error(custom_msg) {
    setLoading(false);
    if (custom_msg) {
        showSnackBar(custom_msg);
    }
}
  //rank selected cards 
  const rankCards = () =>{
    let player_cards = [];
    players.forEach((player=>{
      player_cards.push(player.cards);
    }));


    //check if all cards are selected
    let isComplete = true;
    let community_cards = [[flop0,flop1,flop2], turn , river];
    player_cards.forEach(card=>{
   
        if(!card){
          isComplete = false;
        }
  
    })

    community_cards[0].forEach((card)=>{
      if(!card){
        isComplete = false;
      }
    })

    if(!turn || !river){
      isComplete = false;
    }

    if(isComplete){
      let payload = {
        player_cards: JSON.stringify(player_cards),
        additionalChecks: additionalChecks,
        wildcardValue: wildcardEnabled ? Number(wildcardValue) : - 1 
      }
      if(gameType !== game_type_values["FIVE_CARD"]){
        payload = {
          ...payload,
          table_cards:JSON.stringify(community_cards) 

        }
      }
      
      console.log(payload);
      grpc_client.rankHands(
        payload,
        rank_cards_response,
        on_grpc_error
    );
    }else{
      showSnackBar("Please select all cards");
    }
    

  }
  //response after cards are ranked
  const rank_cards_response = (response)=>{
    let json_response = JSON.parse(response.getSuccess());
    let winning_hands = json_response.winners;
    setPlayerDescription([...json_response.hand_description])
    setWinning({
      winning_first_hand:winning_hands[0],
      winning_second_card: winning_hands[1]
    })
    let winner_card_sample = {}
    winning_hands.forEach(hand=>{
     winner_card_sample[hand] = true; 
    })
    // set all possible wild card values as part of the winning hand
    if(wildcardEnabled){
      let wild_card_value = 12 - wildcardValue;
      winner_card_sample[(wild_card_value * 4) + 1] = true; 
      winner_card_sample[(wild_card_value * 4) + 2] = true; 
      winner_card_sample[(wild_card_value * 4) + 3] = true; 
      winner_card_sample[(wild_card_value * 4) + 4] = true; 
    }
    setWinnerCards(winner_card_sample);
    
  }
  useEffect(()=>{
    if(playerDescription){
  
        let player_description = players.map(player_data=>{
          return {
            ...player_data,
            description : getCardDescription(player_data.cards[0], player_data.cards[1])
          }
        })
        setPlayers([...player_description]);
       
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  },[playerDescription]);
  const getCardDescription = (first_card , second_card) =>{
    let description = ""
    playerDescription.map(player=>{
    
      if(player.hand.includes(first_card) && player.hand.includes(second_card)){
        description = player.description;
      }
      return null; 
    })
    return description;
  }

  useEffect(() => {
    get_all_hand_history(false);
// eslint-disable-next-line
}, [page])


function setCardFromHistory(history, index){
  setWinnerCards(null);

  if(history?.players_data[0]?.all_cards?.length > 2 && history.meta_data.flop_card0 ===  history.meta_data.flop_card1){
    setGameType(game_type_values["FIVE_CARD"]);
  }else{
    setGameType(game_type_values["TEXAS_HOLDEM"]);
  }
  //set community cards
  setSelectedHistoryId(index)
  setMetaData({
    flop0:history.meta_data.flop_card0 || 0,
    flop1:history.meta_data.flop_card1 || 0,
    flop2:history.meta_data.flop_card2 || 0,
    turn:history.meta_data.turn_card || 0,
    river:history.meta_data.river_card || 0
  });

  //setNumberOfPlayers(history.players_data.length);
  let temp_player_info = [];
  history.players_data.forEach(player=>{
    temp_player_info.push({
      cards :   history.meta_data.flop_card0 ===  history.meta_data.flop_card1 ? player.all_cards : [player.hole_cards[0] || 0, player.hole_cards[1] || 0],
      username:player.username,
      user_id: player.user_id
    })
  })
  setPlayers([...temp_player_info]);
};

  /**
   * Spades
   * Club
   * Hearts
   * Diamond
   * from ACE
   */
  return (
    <div className={classes.default_background}>
    <Fragment >
        <Container maxWidth="lg" align="center" className={classes.root}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typographyx variant="h4" color="textSecondary" p={1.5}>
                Test Hands
              </Typographyx>
              <br/>
              {gameType && <TextFieldx
                  select={true}
                  name="gameType"
                  onChange={(e) => {
                    console.log(e.target.value);
                    setGameType(e.target.value);
                    setupDeck()
                  }}
                  value={gameType}
                  size="small"
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="gameType"
                  label="Game Type"
                  autoComplete="gameType"
                  autoFocus
                  my={0.5}
                >
                  {game_types.map((type, index) => (
                    <MenuItem value={type.value} key={index}>
                      {type.label}
                    </MenuItem>
                  ))}
                </TextFieldx>}
              <Grid item>

              <FormControlLabel
                        control={
                          <Checkbox
                            checked={uniqueDeck}
                            onChange={()=>{
                              setUniqueDeck(!uniqueDeck)
                            }}
                            name="checkedB"
                            color="primary"
                          />
                        }
                    
                        label={<Typographyx variant="button" color="textSecondary">Use Unique Deck For Each Player</Typographyx>}
                      /> 
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={additionalChecks}
                            onChange={()=>{
                              setWildcardEnabled(false); setAddtionalChecks(!additionalChecks);
                            }}
                            name="checkedB"
                            color="primary"
                          />
                        }
                    
                        label={<Typographyx variant="button" color="textSecondary">Evaluate Additional Payout Hands</Typographyx>}
                      /> 
                       <div>
                         <FormControlLabel
                            control={
                              <Checkbox
                                checked={wildcardEnabled}
                                onChange={()=>{ setAddtionalChecks(false); setWildcardEnabled(!wildcardEnabled)}}
                                name="checkedBWildcard"
                                color="primary"
                              />
                            }
                        
                            label={<Typographyx variant="button" color="textSecondary">Enable Wildcards</Typographyx>}
                          />
                          </div>
                          <div>
                          {
                            wildcardEnabled &&
                            <FormControl>
                              <InputLabel id="demo-simple-select-label">Wild Card</InputLabel> 
                              <Select
                                  labelId="demo-simple-select-label"
                                  id="demo-simple-select"
                                  value={wildcardValue}
                                  style={{width: "85px"}}
                                  required
                                  onChange={(ev)=>{
                                      setWildcardValue(ev.target.value);
                                      ev.preventDefault();
                                  }}
                                  >
                                      
                                      {crdsym.map((sym, index) =>{
                                          return (
                                              <MenuItem key={index} value={index}>{sym}</MenuItem>

                                          );
                                      })}
                              
                              </Select>
                            </FormControl>
                          }
                          </div>

          <div className={classes.flex_row}>
              <Buttonx
              className={classes.stat_btn}
                onClick={() => rankCards()}
               
                color="primary"
                my={1}
                py={1}
                
                disabled={Boolean(loading)}
                endIcon={loading ? <Loading size={20} /> : null}
              >
                Test Cards
              </Buttonx>
             
              <Buttonx
              className={classes.stat_btn}
                onClick={() => setupDeck()}
               
                color="primary"
                my={1}
                py={1}
                
                disabled={Boolean(loading)}
                endIcon={loading ? <Loading size={20} /> : null}
              >
                Reset
              </Buttonx>
              </div>
              </Grid>
              
             
            </Grid>

            {gameType && gameType !== "five_card" && 
            <Grid item xs={12}>
              {/* General Table Information */}
              <Typographyx variant="h6" color="textSecondary" pb={0.5} pt={0}>
                Table Community Cards
              </Typographyx>
              {loading && <Loading />}
        
                <Card className={classes.background}>
                  <CardContent>
                    <Grid container>
                      <Grid item xs={12}>
                        <Grid container justify="center" spacing={5}>
                            <Grid item>
                                <UnpositionedCard
                                card={flop0}
                                winners_cards={winnerCards}
                                />
                                <IconButton aria-label="update" className={classes.iconButton} name="flop0" onClick={()=>selectCard("flop0")} color="primary">
                                    <AddIcon />
                                </IconButton>
                            </Grid>
                            <Grid item>
                                <UnpositionedCard
                                card={flop1}
                                winners_cards={winnerCards}
                                />
                                <Grid item xs={6}>
                                <IconButton aria-label="update" className={classes.iconButton} name="flop0" onClick={()=>selectCard("flop1")} color="primary">
                                    <AddIcon />
                                </IconButton>
                            </Grid>
                            </Grid>
                            <Grid item>
                                <UnpositionedCard
                                card={flop2}
                                winners_cards={winnerCards}
                                />
                                <IconButton aria-label="update" className={classes.iconButton} name="flop0" onClick={()=>selectCard("flop2")} color="primary">
                                    <AddIcon />
                                </IconButton>
                            </Grid>
                            <Grid item>
                                <UnpositionedCard
                                card={river}
                                winners_cards={winnerCards}
                                />
                                <IconButton aria-label="update" className={classes.iconButton} name="river" onClick={()=>selectCard("river")} color="primary">
                                    <AddIcon />
                                </IconButton>

                            </Grid>
                            <Grid item>
                                <UnpositionedCard
                                card={turn}
                                winners_cards={winnerCards}
                                />
                                <IconButton aria-label="update" className={classes.iconButton} name="turn" onClick={()=>selectCard("turn")} color="primary">
                                    <AddIcon />
                                </IconButton>

                            </Grid>
                            
                        </Grid>
                        <Grid container justify="center" spacing={5}>
                          <Grid item xs={3}>
                            Flops
                          </Grid>
                          <Grid item>Turn</Grid>
                          <Grid item>River</Grid>
                        </Grid>
                      
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
          
            </Grid>
              }
        
              <Grid  item xs={12}>
                {/* Players on table */}
                <Typographyx variant="h6" color="textSecondary" pb={0.5} pt={2}>
                  Table Players
                </Typographyx>

                <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={numberOfPlayers}
                      onChange={(ev)=>{
                          setNumberOfPlayers(ev.target.value);
                          ev.preventDefault();
                      }}
                      >
                          
                        <MenuItem value={1}>{1}</MenuItem>
                        <MenuItem value={2}>{2}</MenuItem>
                        <MenuItem value={3}>{3}</MenuItem>
                        <MenuItem value={4}>{4}</MenuItem>
                        <MenuItem value={5}>{5}</MenuItem>

                  
                  </Select>
                {loading && <Loading />}
                <Grid container spacing={2}>
                  {players &&
                  players.length > 0 &&
                    players.map((player, index) => (
                      <Grid item xs={players.length > 2 ? 4 : 6}  key={index}>
                        <Card className={classes.background}>
                          <CardContent>
                            <Grid container>
                            <Grid item xs={12}>
                              

                                <Grid container justify="center" spacing={4}>
                              
                                    {player.cards && player.cards.length > 0 &&
                                    player.cards.map((card, card_index)=>(
                                     <Grid item key={card_index}>

                                    <UnpositionedCard card={card} winners_cards={winnerCards}/>
                                    <IconButton aria-label="update" className={classes.iconButton} name="flop0" onClick={()=>{
                                        selectPlayerCard(index,card_index)
                                    }} color="primary">
                                      <AddIcon />
                              
                                      </IconButton>
                                  </Grid>
                                    )) 
                                  
                                    }
                              
                                    
                                   
                                  
                                </Grid>
                                <Grid container justify="center" spacing={5}>
                                  {player.user_id ?  <Grid item> UserId -{player.user_id} </Grid> : ""}
                                  </Grid>
                                  <Grid container justify="center" spacing={5}>

                                    {player.username ?  <Grid item>Username -{player.username} </Grid> : ""}
                                  </Grid>

                                <Grid container justify="center" spacing={5}>

                                  <Grid item style={{marginTop:"15px"}}>Hole Cards</Grid>
                                </Grid>
                                <Grid container justify="center" spacing={5}>

                                  <Grid item>{player.description}</Grid>
                                </Grid>
                                </Grid>
                            
                            </Grid>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                </Grid>
              </Grid>

            </Grid>
            <div className={classes.flex_row}>
            <Typographyx variant="h6" mt={2} pb={5} pt={3}>
                      Hand History                                         

                  </Typographyx>
                  <Buttonx className={classes.stat_btn} onClick={()=>{
                    setOpenStat(true)
                  }} color="primary" disabled={Boolean(loading)}
                  endIcon={loading ? <Loading size={20} /> : null}>
              Open Hand History Stats
          </Buttonx>
            </div>
            
            <Grid item xs={12}>
                    <Card>
                        <PaperTable>
                            <TableContainer component={classes.paper}>
                                <Table>
                                    <TableHead>
                                        <StyledTableRow>
                                        <StyledTableCell>Table ID </StyledTableCell>
                                        <StyledTableCell align="center">Round</StyledTableCell>
                                        <StyledTableCell align="center">Finished Time</StyledTableCell>
                                        <StyledTableCell align="center">Small Blind User ID</StyledTableCell>
                                        <StyledTableCell align="center">Big Blind User ID</StyledTableCell>
                                        <StyledTableCell align="center">Winner User ID</StyledTableCell>

                                        </StyledTableRow>
                                    </TableHead>
                                    {histories && (
                                        <TableBody style={styles.card_content}>
                                        {Object.keys(histories).map((index) => (
                                            <StyledTableRow key={index} hover={true} selected={index===selectedHistoryId}
                                            onClick={(event)=>{
                                              event.preventDefault();
                                              setCardFromHistory(histories[index], index)
                                            }}
                                            style={{cursor: "pointer"}}
                                            >
                                            <StyledTableCell component="th" scope="row">
                                                {histories[index].meta_data.table_id}
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                                {histories[index].meta_data.round}
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                                {
                                                    histories[index].meta_data.finished ? (
                                                        histories[index].meta_data.finished
                                                    ) : (
                                                        <i>Not finished yet</i>
                                                    )
                                                }
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                                {histories[index].meta_data.small_blind_user_id}
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                                {histories[index].meta_data.big_blind_user_id}
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                           
                                             {histories[index].meta_data.fold && 
                                              <>
                                              {
                                               Object.keys(histories[index].final_pots_data[0].winners_data).map((key=>{
                                                  return histories[index].final_pots_data[0].winners_data[key].user_id;
                                                  
                                                  }))
                                                }

                                                <Chip label="folded" color="secondary" size="small"/>
                                              </>
                                           }
                                           {!histories[index].meta_data.fold && 
                                            
                                               Object.keys(histories[index].final_pots_data[0].winners_data).map((key=>{
                                                  return histories[index].final_pots_data[0].winners_data[key].user_id;
                                                
                                                }))
                                           }
                                            </StyledTableCell>
                                            </StyledTableRow>
                                        ))}
                                        </TableBody>
                                    )}
                                </Table>
                                <Box m={2}>
                                  <Pagination count={count} variant="outlined" shape="rounded" page={page} onChange={handleChange} />
                                </Box>
                            </TableContainer>
                            {
                                histories && histories.length === 0 ? (
                                    <Typographyx variant="subtitle2" pb={5} pt={3}>
                                        There are no tables in this tournament yet
                                    </Typographyx>
                                ) : (
                                    <Box m={2}>
                                        {/* <Pagination count={count} variant="outlined" shape="rounded" page={page} onChange={handlePaginationChange} /> */}
                                    </Box>
                                )
                            }

                        </PaperTable>
                        {
                          loading && <Loading />
                        }
                    </Card>
                </Grid>
            
        {/* Select card dialog */}
        <Dialog open={open}  aria-labelledby="form-dialog-title" >
        <DialogTitle id="form-dialog-title">Select Card</DialogTitle>
        <DialogContent>
          <DialogContentText>
           Select  a card from the deck :
          </DialogContentText>
             <div className={classes.form_row}>
                <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={cardNumber}
                      onChange={(ev)=>{
                          setCardNumber(ev.target.value);
                          ev.preventDefault();
                      }}
                      >
                          
                          {crdsym.map((rank, index) =>{
                              return (
                                  <MenuItem key={index} value={crdsym.length - 1 - index}>{rank}</MenuItem>

                              );
                          })}
                  
                  </Select>
                  <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={cardSymbol}
                      onChange={(ev)=>{
                          setCardSymbol(ev.target.value);
                          ev.preventDefault();
                      }}
                      >
                          
                          {colsym.map((suit, index) =>{
                              return (
                                  <MenuItem key={index} value={colsym.length - 1 - index}>{suit}</MenuItem>

                              );
                          })}
                  
                  </Select>
              </div>        
                 
           
       
        </DialogContent>
        <DialogActions>
          <Button onClick={closeSelectCard} color="primary">
            Cancel
          </Button>
          <Buttonx onClick={assignCard} color="primary" disabled={Boolean(loading)}
                      endIcon={loading ? <Loading size={20} /> : null}>
            Submit
          </Buttonx>
        </DialogActions>
      </Dialog>
      


        {/* Select card dialog */}
        <Dialog open={openStat}  fullWidth={true} aria-labelledby="form-dialog-title" >
          <DialogTitle id="form-dialog-title">
            <Typographyx variant="h6" color="textSecondary">
              Hand Occurrence Probablities
            </Typographyx>
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
               Shows the amount of times in percent each hand has occured in the hand history. 
            </DialogContentText>
              <TableContainer component={classes.paper}>
                <Table>
                    <TableHead>
                        <StyledTableRow>
                        <StyledTableCell>Cards</StyledTableCell>
                        <StyledTableCell align="center">Occurrence Percantage</StyledTableCell>


                        </StyledTableRow>
                    </TableHead>
                    <TableBody style={styles.card_content}>
                                    
                      {stats && Object.keys(stats).map((key)=>{
                        return (
                          <StyledTableRow key={key} hover={true}>
                            <StyledTableCell component="th" scope="row">
                                {key}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                {Number(stats[key] || 0 ).toFixed(2)}%
                            </StyledTableCell>
                            
                          </StyledTableRow>
                        );
                      })}
                      
                  </TableBody>
                </Table>
              </TableContainer>
        
          </DialogContent>
          <DialogActions>
          
            <Buttonx onClick={()=>{
              setOpenStat(false)
            }} color="primary" disabled={Boolean(loading)}
                        endIcon={loading ? <Loading size={20} /> : null}>
                Alright
            </Buttonx>
          </DialogActions>
      </Dialog>
      </Container>
    </Fragment>
    </div>
  );
}
