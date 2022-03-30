import React from "react";


import { chairLayouts } from "./utils/constants";
import { useTableState } from "../contexts/table_state";
import { useSnackBarContext } from "../contexts/snackbar";
import { makeStyles } from "@material-ui/core";
import useLocalStorage from "./utils/hooks";
import UnpositionedCard from "./fragments/UnpositionedCard";
import PlayerCardsAlternate from "./fragments/PlayerCardsAlternate";
import ChipsContainer from "./fragments/ChipsContainer";
import PotsContainer from "./fragments/PotsContainer";
import PlayerInfo from "./fragments/PlayerInfo";
import CountDown from "./fragments/CountDown";

const useStyles = makeStyles((theme) => ({
    hand_name : {
     /* Standard Syntax */
     animation: "$PULSE 1.25s infinite"
   },
   table_container:{

       marginTop:"150px",
       width:"100%"
   },
   flex_row:{
        display:"flex",
        justifyContent:"space-between",
        flexWrap:"wrap",
        position:"relative",
        width:"100%",

   },

   flex_col:{
    flexBasis:"45%",
    padding:"5px",
    display:"flex",
    flexDirection:"column",
    alignItems:"center",
    alignContent:"flex-start",
    justifyContent:"flex-start",
    border:"solid 2px #f7f7f7",
    borderRadius:"5px",
    height:"max-content",
    marginBottom:"10px"

   },

   structure:{
       flex:"1",
       display:"flex",
       justifyContent:"center",
       alignContent:"center",
       position:"relative"
   },
   chip_pot:{
    marginTop:"25vh",
    position:"relative"
   },
   opponents:{
     flex:"2",
    display:"flex",
    justifyContent:"space-around",
    flexWrap:"wrap",
    alignItems:"right",
   },
   opponent_name:{
    fontSize:"12px",
    color:"#fff"
   },
   single_opponent : {
    display:"flex",
    justifyContent:"center",
   },

   /* Standard Syntax */
   "@keyframes PULSE" : {
    "0%" : {
      fontSize:"16px",
      color:"rgba(0,255,255)"
    },
     "110%" :{
      fontSize:"24px",
       color: "black"
      }
   }
  }));
function ChairsAlternate({ on_new_table_state, winners_cards, ...props }) {
  const [tableState, ] = useTableState();
  const showSnackBar = useSnackBarContext();
  const classes = useStyles();
const [localUser, ] = useLocalStorage("user");
  // check that main dependencies exist
  if (!tableState?.players || !tableState?.game_meta || !tableState?.game) {
    return null;
  }

  // number of players
  let players_num = null;

  // base chair to start from when showing players

  // Get players by order we want
  let players_by_ordering = null;

  players_by_ordering = Object.values(tableState.players);

  // determine starting player for ordering
  let starting_key =
    tableState.game.sb_player_key || tableState.game.bb_player_key;
  if (!starting_key) {
    return null;
  }
  let starting_chair_index = tableState.players[starting_key].chair;

  // set number of players
  players_num = tableState.game_meta.max_num_players || players_by_ordering.length;

  // sort player from starting player
  players_by_ordering.sort(function (a, b) {
    // need to get this to not affect player object
    let a_chair_index = parseInt(a.chair);
    let b_chair_index = parseInt(b.chair);

    if (a_chair_index === starting_chair_index) {
      // player_a should be first
      return -1;
    }

    if (b_chair_index < starting_chair_index) {
      // player b should be second if possible
      b_chair_index += parseInt(players_num);
    }
    if (a_chair_index < starting_chair_index) {
      // player a should be second if possible
      a_chair_index += parseInt(players_num);
    }

    // choose the one preferred to be first
    if (a_chair_index < b_chair_index) {
      return -1;
    } else {
      return 1;
    }
  });

  // find chair layout based on players number
  let chair_layout = chairLayouts[players_num];
  if (!chair_layout) {
    showSnackBar("Unsupported number of players are in the table.");
    return null;
  }

  // commented out for development purposes
  // if (store.player?.md5) {
  //   let me_player = tableState.players[store.player.md5];
  //   if (me_player) {
  //     base_chair =
  //       me_player.chair || me_player.chair === 0 ? me_player.chair : null;
  //   }
  // }

  // for development purposes only
//   if (tableState.game.sb_player_key) {
//     let sb_player = tableState.players[tableState.game.sb_player_key];
//     if (sb_player) {
//       base_chair =
//         sb_player.chair || sb_player.chair === 0 ? sb_player.chair : null;
//     }
//   } else {
//     console.warn("Couldn't get base chair dependencies.");
//   }
  console.log(localUser);
  return (

           <div className={classes.table_container}>
           <div className={classes.flex_row}>
                   <div className={classes.structure}>
                    <div className={classes.chip_pot}>

                        {tableState?.game && <ChipsContainer />}

                        <PotsContainer />
                       </div>
                   </div>
                   <div className={classes.opponents}>
                       {
                           Object.keys(tableState.players).map((key)=>{
                               if(key !== localUser.md5){
                                   return (
                                       <div className={classes.flex_col}>
                                           <span className={classes.opponent_name}>{tableState.players[key].meta.name}</span>

                                           <div className ={classes.single_opponent}>

                                               {
                                                   tableState.players[key].cards.map(card=>{
                                                       return(

                                                           <UnpositionedCard
                                                           number={card}
                                                           winners_cards={winners_cards}
                                                           />
                                                       )
                                                   })
                                               }

                                       </div>
                                   </div>);
                               }else{
                                   return (<></>);
                               }

                           })
                       }

                   </div>

           </div>
            <div style={{ display:"flex", justifyContent:"center", marginTop:"20px", alignContent:"center", alignItems:"center"}} spacing={1}>

            <div className="avatar_marker">
                <PlayerInfo player={tableState.players[localUser.md5]} on_new_table_state={on_new_table_state} />
            </div>
            <div className="countdown_marker">
                <CountDown player={tableState.players[localUser.md5]} />
            </div>
                <PlayerCardsAlternate
                player={tableState.players[localUser.md5]}
                winners_cards={winners_cards}
                on_new_table_state={on_new_table_state}
             />


            </div>

       </div>

  );
}

export default ChairsAlternate;
