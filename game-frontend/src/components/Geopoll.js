import React, { useEffect, useState } from "react";

import { makeStyles } from "@material-ui/core/styles";

import Table from "@material-ui/core/Table";

import Container from "@material-ui/core/Container";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Pagination from "@material-ui/lab/Pagination";
import useGrpcClient from "../contexts/grpc_client";
import { useSnackBarContext } from "../contexts/snackbar";


import Loading from "./fragments/Loading";
import PaperTable from "./fragments/PaperTable";
import Typographyx from "./fragments/Typographyx";
import StyledTableCell from './fragments/StyledTableCell';
import StyledTableRow from './fragments/StyledTableRow';
import TextFieldx from "./fragments/TextFieldx";

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
    //   backgroundColor: theme.palette.background.paper,
        backgroundImage: `url(${theme.backgroundImg.image})`,
        backgroundRepeat:  theme.backgroundImg.repeat
    },
    container: {
      minHeight: 480,
      maxHeight: 720,
    },
    input: {
      marginLeft: theme.spacing(1),
      padding: 2,
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    rootSearch: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: 400,
    },
  }));
  
  const styles = {
      card_content: {
        paddingBottom: 1,
        paddingTop: 1,
      },
  }; 
    
  
export default function Geopoll(props) {
    const classes = useStyles();
    const grpc_client = useGrpcClient();
    const showSnackBar = useSnackBarContext();
    const [searchResult, setSearchResult] = useState([])

    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(false);

    const [sessionId, setSessionId] = useState('');
    const [ipAddress, setIpAddress] = useState('');

    const on_search_response = function (response) {
        setLoading(false);
        let parsedResponse = JSON.parse(response.getData());
        console.log(parsedResponse);
        setSearchResult(parsedResponse.payload);
        setCount(parsedResponse.pagination_data.number_of_pages);
        if (page > parsedResponse.pagination_data.number_of_pages) {
            setPage(1);
        }
    };

    function on_search_error(custom_msg) {
        setLoading(false);
        if (custom_msg) {
            showSnackBar(custom_msg);
        }
    }

    const fetchGeopollList = (resetPage) => {
        setLoading(true);
        if (resetPage) {
            setPage(1);
        }

        let query = {
            pagination_current_page: page, pagination_items_per_page: 10
        }
        if(sessionId) {
            query.session_id = sessionId
        }
        if(ipAddress) {
            query.ip_address = ipAddress
        }
        
        grpc_client.getGeopollList(
            query,
            on_search_response,
            on_search_error
        );
    };

    const handlePaginationChange = (event, value) => {
        setPage(value);
    }

    useEffect(() => {
        console.log('session data id',sessionId);
        console.log('ip address',ipAddress);
    }, [ sessionId, ipAddress])

    useEffect(() => {
        fetchGeopollList();
        //eslint-disable-next-line
    }, [page, sessionId, ipAddress]);

    return (
        <div className={classes.background}>
            <Container maxWidth="lg" align="center" className={classes.root}>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Typographyx variant="h6" color="textSecondary" pt={3}>
                           Geopoll
                        </Typographyx>
                    </Grid>
                </Grid>

                <Grid md={6} container spacing={1} justify="space-evenly" alignItems="center">
                    
                        <Grid item xs={6} sm={4}>
                            <TextFieldx
                                name={"session_id"}
                                size="small"
                                variant="outlined"
                                margin="normal"
                                placeholder="100"
                                required
                                label={"Session Id"}
                                autoComplete={"session_id"}
                                style={{minWidth: "100px"}}
                                m={1}
                                onChange={(e)=>{
                                    setSessionId(e.target.value)
                                }}
                                value={sessionId}
                            />
                        </Grid>
                        <Grid item xs={6} sm={4}>
                            <TextFieldx
                                name={"client_ip"}
                                size="small"
                                variant="outlined"
                                margin="normal"
                                placeholder="x.x.x.x"
                                required
                                label={"Ip Address"}
                                autoComplete={"client_ip"}
                                style={{minWidth: "100px"}}
                                m={1}
                                onChange={(e)=>{
                                    setIpAddress(e.target.value)
                                }}
                                value={ipAddress}
                            />
                        </Grid>
                    {/* </Box> */}
                </Grid>
                <Grid item xs={12} style={{minHeight: "400px"}}>
                    <PaperTable className={classes.root}>
                        <TableContainer>
                            <Table stickyHeader>
                                <TableHead>
                                    <StyledTableRow>
                                        <StyledTableCell align="center">Session Data ID</StyledTableCell>
                                        <StyledTableCell align="center">Created</StyledTableCell>
                                        <StyledTableCell align="center">Finished</StyledTableCell>
                                        <StyledTableCell align="center">Longitude</StyledTableCell>
                                        <StyledTableCell align="center">Lat</StyledTableCell>
                                        <StyledTableCell align="center">Client IP</StyledTableCell>
                                        <StyledTableCell align="center">Is valid</StyledTableCell>
                                        <StyledTableCell align="center">Error Info</StyledTableCell>
                                    </StyledTableRow>
                                </TableHead>
                                <TableBody style={styles.card_content}>
                                    {
                                        searchResult?.map( (data, index) => {
                                            return (
                                                <StyledTableRow key={index} hover={true}>
                                                    <StyledTableCell align="center"> { data.session_data_id } </StyledTableCell>
                                                    <StyledTableCell align="center"> { data.created } </StyledTableCell>
                                                    <StyledTableCell align="center"> { data.finished } </StyledTableCell>
                                                    <StyledTableCell align="center"> { data.long } </StyledTableCell>
                                                    <StyledTableCell align="center"> { data.lat } </StyledTableCell>
                                                    <StyledTableCell align="center"> { data.client_ip } </StyledTableCell>
                                                    {/* eslint-disable-next-line */}
                                                    <StyledTableCell align="center"> { data.is_valid_geo == "1"? "Yes": "No" } </StyledTableCell>
                                                    <StyledTableCell align="center"> { data.error_info } </StyledTableCell>

                                                </StyledTableRow>

                                                
                                            )
                                        })
                                    }
                                </TableBody>
                            </Table>
                            { loading && <Loading pb={5} /> }
                            {
                                searchResult && searchResult.length === 0 ? (
                                    <Typographyx variant="subtitle2" pb={5} pt={3}>
                                        No Results.
                                    </Typographyx>
                                ) : (
                                    <Box m={2}>
                                        <Pagination count={count} variant="outlined" shape="rounded" page={page} onChange={handlePaginationChange} />
                                    </Box>
                                )
                            }
                        </TableContainer>
                    </PaperTable>
                </Grid>
            </Container>
        </div>
    );

}