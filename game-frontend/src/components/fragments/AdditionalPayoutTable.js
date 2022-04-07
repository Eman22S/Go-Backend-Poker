import React from 'react'
import Typographyx from "./Typographyx";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import PaperTable from "./PaperTable";
import StyledTableCell from "./StyledTableCell";
import StyledTableRow from "./StyledTableRow";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      minHeight: "100%",
    },
    background: {
      backgroundColor: theme.palette.background.paper,
    },
    headerInfo: {
      width: "100%",
      border: `1px solid ${theme.palette.divider}`,
      borderRadius: theme.shape.borderRadius,
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.text.secondary,
      // padding: theme.spacing(1),
      "& svg": {
        margin: theme.spacing(1.5),
      },
      "& hr": {
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
      alignItems: "center",
    },
  }));
function AdditionalPayoutTable(props) {
    const classes = useStyles();
    let additionalPayoutPerHand = props.additionalPayoutPerHand;
	  let addons_permitted = props.addons_permitted;


    const createTableHeaders = () => {
		let headers = [];
		if(addons_permitted > 1){
			for(let i = 0; i <= addons_permitted; i++){
				headers.push(<StyledTableCell align="center">
					1 buyin { i === 0 ? '' : addons_permitted > 1 ? (i === 1) ? ' & 1 addon' : ' & ' + i +' addons' : ''}
				</StyledTableCell>)
      }
		}
    else {
      headers.push(<StyledTableCell align="center">
        1 buyin
      </StyledTableCell>)
    }
		return headers;
	}

	const createValuesForHands = (hand) => {
		let cols = [];
		if(addons_permitted >= 2){
			for(let i = 1; i <= addons_permitted; i++){
				cols.push(<StyledTableCell
					component="th"
					align="center"
					scope="row">
					{additionalPayoutPerHand?.hands
					  ? additionalPayoutPerHand.hands[i + 1][hand]
					  : 0}
				  </StyledTableCell>)
			}
		}
		return cols;
	}
    return (
        <div>
             <Typographyx variant="button" color="textSecondary" pt={3}>
                    ADDITIONAL PAYOUT BASED ON PLAYER HAND
                  </Typographyx>
                  <PaperTable className={classes.paperTable}>
                    <TableContainer className={classes.tableContainer}>
                      <Table size="small" stickyHeader>
                        <TableHead>
                          <StyledTableRow>
                            <StyledTableCell align="center">
                              Hand
                            </StyledTableCell>

                            {
								 createTableHeaders()
                            }
                          </StyledTableRow>
                        </TableHead>
                        <TableBody>
                          <StyledTableRow>
                            <StyledTableCell
                              component="th"
                              align="center"
                              scope="row">
                              Royal Flush
                            </StyledTableCell>
                            <StyledTableCell
                              component="th"
                              align="center"
                              scope="row">
                              {additionalPayoutPerHand?.hand?.royal_flush
                                ? additionalPayoutPerHand.hand.royal_flush
                                : 0}
                            </StyledTableCell>
                            {createValuesForHands('royal_flush')}
                          </StyledTableRow>

                          <StyledTableRow>
                            <StyledTableCell
                              component="th"
                              align="center"
                              scope="row">
                              Straight Flush
                            </StyledTableCell>
                            <StyledTableCell
                              component="th"
                              align="center"
                              scope="row">
                              {additionalPayoutPerHand?.hand?.straight_flush
                                ? additionalPayoutPerHand.hand.straight_flush
                                : 0}
                            </StyledTableCell>
							{createValuesForHands('straight_flush')}

                          </StyledTableRow>

                          <StyledTableRow>
                            <StyledTableCell
                              component="th"
                              align="center"
                              scope="row">
                              Four of a Kind
                            </StyledTableCell>
                            <StyledTableCell
                              component="th"
                              align="center"
                              scope="row">
                              {additionalPayoutPerHand?.hand?.four_of_a_kind
                                ? additionalPayoutPerHand.hand.four_of_a_kind
                                : 0}
                            </StyledTableCell>
                           {createValuesForHands('four_of_a_kind')}
                          </StyledTableRow>

                          <StyledTableRow>
                            <StyledTableCell
                              component="th"
                              align="center"
                              scope="row">
                              Full house
                            </StyledTableCell>
                            <StyledTableCell
                              component="th"
                              align="center"
                              scope="row">
                              {additionalPayoutPerHand?.hand?.full_house
                                ? additionalPayoutPerHand.hand.full_house
                                : 0}
                            </StyledTableCell>
							{createValuesForHands('full_house')}
                          </StyledTableRow>

                          <StyledTableRow>
                            <StyledTableCell
                              component="th"
                              align="center"
                              scope="row">
                              Four Aces
                            </StyledTableCell>
                            <StyledTableCell
                              component="th"
                              align="center"
                              scope="row">
                              {additionalPayoutPerHand?.hand?.four_aces
                                ? additionalPayoutPerHand.hand.four_aces
                                : 0}
                            </StyledTableCell>
                           {createValuesForHands('four_aces')}

                          </StyledTableRow>

                          <StyledTableRow>
                            <StyledTableCell
                              component="th"
                              align="center"
                              scope="row">
                              Four Fives Through Kings
                            </StyledTableCell>
                            <StyledTableCell
                              component="th"
                              align="center"
                              scope="row">
                              {additionalPayoutPerHand?.hand?.four_fives_through_kings
                                ? additionalPayoutPerHand.hand.four_fives_through_kings
                                : 0}
                            </StyledTableCell>
                           {createValuesForHands('four_fives_through_kings')}

                          </StyledTableRow>

                          <StyledTableRow>
                            <StyledTableCell
                              component="th"
                              align="center"
                              scope="row">
                              Four Fives Through Kings
                            </StyledTableCell>
                            <StyledTableCell
                              component="th"
                              align="center"
                              scope="row">
                              {additionalPayoutPerHand?.hand?.four_twos_threes_or_fours
                                ? additionalPayoutPerHand.hand.four_twos_threes_or_fours
                                : 0}
                            </StyledTableCell>
							{createValuesForHands('four_twos_threes_or_fours')}

                          </StyledTableRow>

                          <StyledTableRow>
                            <StyledTableCell
                              component="th"
                              align="center"
                              scope="row">
                              Flush
                            </StyledTableCell>
                            <StyledTableCell
                              component="th"
                              align="center"
                              scope="row">
                              {additionalPayoutPerHand?.hand?.flush
                                ? additionalPayoutPerHand.hand.flush
                                : 0}
                            </StyledTableCell>
							{createValuesForHands('flush')}

                          </StyledTableRow>

                          <StyledTableRow>
                            <StyledTableCell
                              component="th"
                              align="center"
                              scope="row">
                              Straight
                            </StyledTableCell>
                            <StyledTableCell
                              component="th"
                              align="center"
                              scope="row">
                              {additionalPayoutPerHand?.hand?.straight
                                ? additionalPayoutPerHand.hand.straight
                                : 0}
                            </StyledTableCell>
							{createValuesForHands('straight')}

                          </StyledTableRow>

                          <StyledTableRow>
                            <StyledTableCell
                              component="th"
                              align="center"
                              scope="row">
                              Three of a Kind
                            </StyledTableCell>
                            <StyledTableCell
                              component="th"
                              align="center"
                              scope="row">
                              {additionalPayoutPerHand?.hand?.three_of_a_kind
                                ? additionalPayoutPerHand.hand.three_of_a_kind
                                : 0}
                            </StyledTableCell>
							{createValuesForHands('three_of_a_kind')}

                          </StyledTableRow>

                          <StyledTableRow>
                            <StyledTableCell
                              component="th"
                              align="center"
                              scope="row">
                              Two Pair
                            </StyledTableCell>
                            <StyledTableCell
                              component="th"
                              align="center"
                              scope="row">
                              {additionalPayoutPerHand?.hand?.two_pair
                                ? additionalPayoutPerHand.hand.two_pair
                                : 0}
                            </StyledTableCell>
							{createValuesForHands('two_pair')}

                            </StyledTableRow>

                            <StyledTableRow>
                            <StyledTableCell
                              component="th"
                              align="center"
                              scope="row">
                              Pair
                            </StyledTableCell>
                            <StyledTableCell
                              component="th"
                              align="center"
                              scope="row">
                              {additionalPayoutPerHand?.hand?.pair
                                ? additionalPayoutPerHand.hand.pair
                                : 0}
                            </StyledTableCell>
							{createValuesForHands('pair')}

                            </StyledTableRow>

                            <StyledTableRow>
                            <StyledTableCell
                              component="th"
                              align="center"
                              scope="row">
                              Jacks or Better
                            </StyledTableCell>
                            <StyledTableCell
                              component="th"
                              align="center"
                              scope="row">
                              {additionalPayoutPerHand?.hand?.jacks_or_better
                                ? additionalPayoutPerHand.hand.jacks_or_better
                                : 0}
                            </StyledTableCell>
							{createValuesForHands('jacks_or_better')}

                            </StyledTableRow>

                            <StyledTableRow>
                            <StyledTableCell
                              component="th"
                              align="center"
                              scope="row">
                              One Jack or Better
                            </StyledTableCell>
                            <StyledTableCell
                              component="th"
                              align="center"
                              scope="row">
                              {additionalPayoutPerHand?.hand?.one_jack_or_better
                                ? additionalPayoutPerHand.hand.one_jack_or_better
                                : 0}
                            </StyledTableCell>
							{createValuesForHands('one_jack_or_better')}

                            </StyledTableRow>

                            <StyledTableRow>
                            <StyledTableCell
                              component="th"
                              align="center"
                              scope="row">
                              High Card
                            </StyledTableCell>
                            <StyledTableCell
                              component="th"
                              align="center"
                              scope="row">
                              {additionalPayoutPerHand?.hand?.high_card
                                ? additionalPayoutPerHand.hand.high_card
                                : 0}
                            </StyledTableCell>
							{createValuesForHands('high_card')}

                          </StyledTableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </PaperTable>

        </div>
    )
}
export default AdditionalPayoutTable

