import React, {  useState, useEffect } from 'react';
import {  makeStyles } from '@material-ui/core/styles';

import PaperTable from "./PaperTable";
import StyledTableCell from './StyledTableCell';
import StyledTableRow from './StyledTableRow';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import IconButton  from '@material-ui/core/IconButton';
import ArrowRight from '@material-ui/icons/ArrowRight';
import ArrowBack from '@material-ui/icons/ArrowBack';
import { filterHands }  from '../utils/hands';

const useStyles = makeStyles((theme) => ({
   


  hand_name : {
   /* Standard Syntax */
   animation: "$PULSE 1.25s infinite"
 },
 hand_name_highlight : {
  /* Standard Syntax */
  animation: "$PULSE 1.25s infinite",
  backgroundColor: theme.palette.background.dark,
},
 card_width:{
   width:"240px !important",
   overflowX:"hidden",
 },

 card_expanded_width:{
  width:"100%"

 },

 highLight:{
  backgroundColor: theme.palette.background.dark,
 }
 ,
 /* Standard Syntax */
 "@keyframes PULSE" : {
  "0%" : {
    fontSize:"13.5px",
    color:"rgba(0,255,255)"
  },	
   "110%" :{
    fontSize:"24px",
     color: "black"
    }
 }
}));




export default function PayoutStructureCard({ additionalHand, payoutHand,currentAddOnAmount,addons_permitted,  ...props }) {
    const classes = useStyles();
  
    
    const payoutHandValue = (({hand, hands}) =>({hand,hands}))(payoutHand);
    //eslint-disable-next-line
    const filltredPayoutHand = filterHands(payoutHandValue)
    // since useState doesnot update its initial state when prop changes, use useEffect
    useEffect(() => {
      console.log("currentAddOnAmount "+currentAddOnAmount)
      console.log("payoutHand")
      console.log(payoutHand)
      console.log("additionalHand")
      console.log(additionalHand)
      console.log("addons_permitted")
      console.log(addons_permitted)
      //eslint-disable-next-line
    }, [currentAddOnAmount]);

   
    const upFirst = word => word[0].toUpperCase() + word.toLowerCase().slice(1) + " "

    const camelize = text => {
    const words = text.split("_") 
    return  words.map(upFirst);
    }

    const [expanded, setExpanded] = useState(false);


    return (
        <React.Fragment {...props}>
           <div id='flash_mode_prize_pool' className='flash_mode_prize_pool' style={{fontSize:'5rem', position: 'absolute', top:"0px",left:"15px", zIndex: '400'}}>
           <div item xs={12} style={{position:"relative"}} className={expanded ? classes.card_expanded_width : classes.card_width}>
                <PaperTable >
                          <TableContainer component={classes.paper}>
                            <Table>
                         
                              <TableHead>
                                <StyledTableRow>
                                  <StyledTableCell align="left" >Hand</StyledTableCell>

                                  {
                                      payoutHand.buyin.length > 0 &&  payoutHand.buyin.map((buyin, index)=>{
                                        // eslint-disable-next-line
                                        if(index != currentAddOnAmount  && !expanded){
                                          return (
                                            <></>
                                          )
                                        }else{
                                            // eslint-disable-next-line
                                            if(index==addons_permitted){
                                              return(
                                                <StyledTableCell align="left" >1 Buyin and {addons_permitted} addons</StyledTableCell>
                                              )
                                            }else{
                                              
                                                if(parseInt(buyin.addon) > 0)
                                                {
                                                  return (
                                                <StyledTableCell align="left" >1 Buyin and { parseInt(buyin.addon)} addons</StyledTableCell>
                                                  )
                                                }
                                                else
                                                {
                                                  return (
                                                <StyledTableCell align="left" >1 Buyin</StyledTableCell>
                                                  )
                                                }
                                              
                                            }
                                          
                                        }
                                       

                                      })
                                    }

                                    {
                                      Object.keys(payoutHandValue.hands).length > 0 && Object.keys(payoutHandValue.hands).map((key, index)=>{
                                        // eslint-disable-next-line
                                        if(index != currentAddOnAmount  && !expanded){
                                          return (
                                            <></>
                                          )
                                        }else{
                                            // eslint-disable-next-line
                                            if(index==addons_permitted){
                                              return(
                                                <StyledTableCell align="left" >1 Buyin and {addons_permitted} addons</StyledTableCell>
                                              )
                                            }else{
                                              
                                                if(index > 0){
                                                  return(
                                                  <StyledTableCell align="left" >1 Buyin and { index } addons</StyledTableCell>
                                                  )
                                                }else
                                                {
                                                  return(
                                                  <StyledTableCell align="left" >1 Buyin</StyledTableCell>
                                                  )
                                                }
                                              
                                            }
                                          
                                        }
                                       

                                      })
                                    }
                                
                                </StyledTableRow>
                              </TableHead>
                              <TableBody >
                              
                                {payoutHand.buyin.length > 0 && Object.keys(payoutHandValue.hand).map((hand,index)=>{
                                return (
                                    <StyledTableRow key={index}>
                                      <td
                                        style={{paddinTop:0, paddingBottom :0}}
                                        className={additionalHand === hand? classes.hand_name : ""}
                                      >
                                        {camelize(hand)}
                                      </td>
                                      {
                                      payoutHand.buyin.map((buyin, index)=>{
                                        // eslint-disable-next-line
                                        if(index !=currentAddOnAmount && !expanded){
                                          return (
                                            <></>
                                          )
                                        }else{
                                          return(
                                          // eslint-disable-next-line
                                            <td style={{paddinTop:0, paddingBottom :0}} className={[additionalHand === hand? classes.hand_name :"", index ==currentAddOnAmount ?classes.highLight:""].join(" ")} align="center">
                                          {buyin.payout*payoutHandValue.hand[hand]}
                                        </td>
                                          )
                                        }
                                       
                                      })
                                    }
                                  </StyledTableRow>
                                  
                                )
                                })}


                                {Object.keys(payoutHandValue.hands).length > 0 && Object.keys(payoutHandValue.hand).map((hand,index)=>{
                                //let handList = payoutHand.hands[key0]
                                return (
                                    <StyledTableRow key={index}>
                                      <td
                                        style={{paddinTop:0, paddingBottom :0}}
                                        className={additionalHand === hand? classes.hand_name : ""}
                                      >
                                        {camelize(hand)}
                                      </td>
                                      {
                                      
                                      Object.keys(payoutHandValue.hands).map((key, index)=>{
                                        let current_hand = payoutHandValue.hands[key][hand]
                                        // eslint-disable-next-line
                                        if(index !=currentAddOnAmount && !expanded){
                                          return (
                                            <></>
                                          )
                                        }else{
                                          return(
                                          // eslint-disable-next-line
                                            <td style={{paddinTop:0, paddingBottom :0}} className={[additionalHand === hand ? classes.hand_name :"", index ==currentAddOnAmount ?classes.highLight:""].join(" ")} align="center">
                                          {current_hand}
                                        </td>
                                          )
                                        }
                                       
                                      })
                                    }
                                  </StyledTableRow>
                                  
                                )
                                })}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </PaperTable>
                        {
                           ((payoutHand.buyin && payoutHand.buyin.length > 1) || (payoutHandValue.hands && Object.keys(payoutHandValue.hands).length > 1) ) &&
                           <IconButton
                           style={{position:"absolute", bottom:"10px", right:"0"}}
                             onClick={()=>{ setExpanded(!expanded)}}
                           >
                            {expanded ? <ArrowBack/> : <ArrowRight/>}
                           </IconButton> 
                        }
                         
                 
                  </div>
                
     
                    </div>
        </React.Fragment>
    );
}
