// @flow

import React, { useEffect, useState, Fragment } from "react";

import { makeStyles } from "@material-ui/core/styles";

import Table from "@material-ui/core/Table";
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Pagination from "@material-ui/lab/Pagination";
import useGrpcClient from "../contexts/grpc_client";
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

import Loading from "./fragments/Loading";
import PaperTable from "./fragments/PaperTable";
import Typographyx from "./fragments/Typographyx";
import StyledTableCell from './fragments/StyledTableCell';
import StyledTableRow from './fragments/StyledTableRow';
import { AppBar, Tabs, Tab, FormControlLabel, Paper, InputBase } from "@material-ui/core";
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup'
import { useSnackBarContext } from "../contexts/snackbar";
import SearchIcon from '@material-ui/icons/Search';
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/SaveRounded';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/AddCircle';
import CloseIcon from '@material-ui/icons/Close';
import Card from '@material-ui/core/Card';
import Container from '@material-ui/core/Container';
import intersect from "@turf/intersect";

import { useConfirm } from 'material-ui-confirm';

import { uuid } from 'uuidv4';

import '@geoman-io/leaflet-geoman-free';
import TextField from '@material-ui/core/TextField';
import Buttonx from './fragments/Buttonx';
const L = window.L;


/**
 * get user location from browser using the html geolocation api
 * @param {function} callback : a callback function that accepts two parameters - first : error object, second: geolocation object
*/
const getLocation = (callback) => {
  if (navigator && navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      callback(null, position);
    },
      (error) => {
        callback(error);
      });
  } else {
    let errorObj = new Error("Geolocation is not supported in this browser!");
    errorObj.code = 0;
    callback(errorObj);
  }
}


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    minHeight: '100vh'
  },
  scrollPaper: {
    justifyContent:'center',
    marginRight:"30%"

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
  //  backgroundColor: theme.palette.background.paper,
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
    margin: theme.spacing(0),
  },
  flex_center:{
    display:"flex",
    alignItems:"flex-end",
    justifyContent:"space-around",
  },
  btn:{
    border:"solid 2px #fff",
    marginTop:"10px",
    padding:"5px 20px"

  },
  selectedGeofence: {
    width: '100%',
    margin: theme.spacing(1),
    padding: theme.spacing(1)
  },
  usersList: {
    padding: theme.spacing(0),
    margin: theme.spacing(1)
  }
}));

const styles = {
  card_content: {
    paddingBottom: 1,
    paddingTop: 1,
  },
};
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}



export default function PlayerGeofencing(props) {
  const classes = useStyles();
  const showSnackBar = useSnackBarContext();
  const confirm = useConfirm();

  const [searchResult, setSearchResult] = useState([])
  const [clientResult, setClientResult] = useState([])

  const [page, setPage] = useState(1);
  const [georefPage, setGeorefPage] = useState(1);
  const [count, setCount] = useState(1);
  const [georefCount, setGeorefCount] = useState(1);

  const [loading, setLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showClientConfirmation, setShowClientConfirmation] = useState(false);

  const [currentMap, setCurrentMap] = React.useState(null);
  const grpc_client = useGrpcClient();
  const [isLoading, setIsLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [createdLayer, setCreatedLayer] = React.useState(null);
  const [errorMessage, setErrorMessage] = React.useState(null);

  const [geofences, setGeofences] = React.useState(null);
  const [selectedFenceID, setSelectedFenceID] = React.useState(null);
  const [selectedFence, setSelectedFence] = React.useState(null);
  const [selectedGeofenceData, setSelectedGeofenceData] = React.useState(null);

  const [whiteListedUsers, setWhiteListedUsers] = React.useState([]);
  const [blackListedUsers, setBlackListedUsers] = React.useState([])


  const [whiteListedClients, setWhiteListedClients] = React.useState([]);
  const [blackListedClients, setBlackListedClients] = React.useState([])


  const [identifier, setIdentifier] = React.useState("");
  const [selectedIdentifier, setSelectedIdentifier] = React.useState("");
  const [editName, setEditName] = React.useState(false);

  const [selectAll, setSelectAll] = useState(false);
  const [state, setState] = React.useState({});
  const [status, setStatus] = React.useState("INACTIVE");
  const [username,setUsername] = React.useState("");

  useEffect(() => {
    getUsers();
    getClients();
  // eslint-disable-next-line
  }, [page])

  useEffect(() => {
    if(georefPage && currentMap){
        getGeoRefs(currentMap);
    }
    // getGeoRefs();
  // eslint-disable-next-line
  }, [georefPage,currentMap])
  //handle the input change on the modal
  const handleIdentifierChange = (event)=>{
    let {value} = event.target;
    console.log(createdLayer.toGeoJSON());
    setIdentifier(value);
  }
  const handleSelectedIdentifierChange = (event)=>{
    setSelectedIdentifier(event.target.value)
  }
  const handleStatusChange = (event)=>{

    setStatus(status === "ACTIVE"?"INACTIVE":"ACTIVE");

  }
  //open modal
  const handleClickOpen = () => {
    setOpen(true);
  };
  //handle modal close and clear the polygon currently
  const handleIdentifierClose = () => {
    setOpen(false);
    if(createdLayer && currentMap){
      currentMap.removeLayer(createdLayer);
      setCreatedLayer(null)
    }
  };

  //clear map of all polygon
  const clearMap = ()=>{
    if(currentMap){
      currentMap.eachLayer(function (layer) {
        if (layer instanceof L.Polygon) {
          currentMap.removeLayer(layer);
        }

      })
    }

  }

  //clear map colors
  const clearMapColors = () =>{
    if(currentMap){
      currentMap.eachLayer(function (layer) {
        if (layer instanceof L.Polygon) {
          layer.closePopup();
          layer.setStyle({fillColor :'blue'});
        }

      })
    }
  }

  //fetch and draw all the layers and the lifecyle method
  const getGeoRefs = (map)=>{
    clearMap();
    map = map ? map : currentMap;
    grpc_client.getGeofenceData({pagination_current_page: georefPage, pagination_items_per_page: 10},(response)=>{
      let tempFences = {};
      let results = [];
      let res = JSON.parse(response.getData())
      if(res.payload){
        results = res.payload;
        setGeorefCount(res.pagination_data.number_of_pages);

      }


      //add to the map
      results.forEach(result=>{
        let temp = {
          "type": "FeatureCollection",
          "features": []
        }
        let polygon = JSON.parse(result.polygon);
        if(polygon){
          tempFences[polygon.id] = result;
          temp.features.push(polygon);
          const dbGeofences = new L.geoJSON(temp, {
            onEachFeature: function (f, l) {
              l.bindPopup(result.name);
            }
          });
          dbGeofences.addTo(map);

          Object.values(dbGeofences._layers).forEach( layer => {
            layer.on('click', (e) => {
              setSelectedFenceID(layer.feature.id);
            })

            layer.on('pm:update', (e) => {
              //When A polygon is updated (the vertices edited)
              console.log("Updating");
              setSelectedFenceID(layer.feature.id);

              let temp = layer.toGeoJSON();
              let foundIntersection = false;
              map.eachLayer(function (layer) {
                // Check if layer is a marker
                if (layer instanceof L.Polygon) {
                    // Create GeoJSON object from marker
                    var geojson = layer.toGeoJSON();
                    // Push GeoJSON object to collection
                    var intersection = intersect(geojson, temp);
                    if(intersection && geojson.id !== temp.id){
                      foundIntersection = true;
                    }

                }
              });
              if(foundIntersection){
                setErrorMessage("Can't Have Geofences intersect");
                map.removeLayer(e.layer);

                getGeoRefs(map);
              }else{
                setSelectedGeofenceData(JSON.stringify(layer.toGeoJSON()));

              }
              exportGeoJSON(map);
            });

            layer.on('pm:dragend', (e) => {

              setSelectedGeofenceData(JSON.stringify(layer.toGeoJSON()));
              exportGeoJSON(map);
            })

            layer.on('pm:remove', (e) => {

              exportGeoJSON(map);
            })
          });
        }

      })
      setGeofences(tempFences);

    },on_error)
  }

  //set the selected fence or clear
  useEffect(()=>{
    if(selectedFenceID){
      clearMapColors();

      setSelectedFence(geofences[selectedFenceID])
    }else{
      setSelectedFence(null);
    }
    //eslint-disable-next-line
  },[selectedFenceID,geofences])
  //set the selected fence or clear
  useEffect(()=>{
    if(selectedFence){
      setSelectedIdentifier(selectedFence.name);
      setStatus(selectedFence.status);
      setWhiteAndBlackListUsers();
      setWhiteAndBlackListClients();

      let selectedLayer = L.geoJSON(JSON.parse(selectedFence.polygon));
      clearMapColors();
      if(currentMap){
        currentMap.eachLayer(function (layer) {

          if (layer instanceof L.Polygon) {
            if(layer.feature.id === selectedFenceID){
              layer.setStyle({fillColor :'red'});
              layer.openPopup()
            }

          }

        })
      }      currentMap.flyTo(selectedLayer.getBounds().getCenter(),11);

    }else{
      setSelectedIdentifier("");
      setStatus("INACTIVE");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[selectedFence])

  const setWhiteAndBlackListUsers= () =>{
    grpc_client.getWhitelistedUsersonGeofence({id:selectedFence.id},(response)=>{
      setWhiteListedUsers(JSON.parse(response.array))
    },on_error)

    grpc_client.getBlacklistedUsersonGeofence({id:selectedFence.id},(response)=>{
      setBlackListedUsers(JSON.parse(response.array))
    },on_error)
  }


  const setWhiteAndBlackListClients= () =>{
    grpc_client.getWhitelistedClientsonGeofence({id:selectedFence.id},(response)=>{
      setWhiteListedClients(JSON.parse(response.array))
    },on_error)

    grpc_client.getBlacklistedClientsonGeofence({id:selectedFence.id},(response)=>{
      setBlackListedClients(JSON.parse(response.array))
    },on_error)
  }



  useEffect(()=>{
    if(selectedGeofenceData){
      const handlePolygonUpdate = () =>{
        if(selectedGeofenceData && selectedFence){
          selectedFence.name = selectedIdentifier;
          selectedFence.isActive = status === "ACTIVE";
          selectedFence.geofenceData = selectedGeofenceData;
          confirm({ description: 'Update geofence?' })
          .then(() => {
            grpc_client.updateGeofenceData(selectedFence,(response)=>{
              getGeoRefs();
              setSelectedGeofenceData(null);
            },on_error) })

        }

      }
      handlePolygonUpdate()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[selectedGeofenceData]);


  //handle modal submit with identifier
  const handleSubmit = ()=>{
    if(createdLayer && currentMap ){
      if(identifier){
        let temp = createdLayer.toGeoJSON();
        temp = {
          ...temp,
          id:uuid()
        }
        let data = {
          name:identifier,
          geofenceData: JSON.stringify(temp)
        }
        setCreatedLayer(null);
        setIdentifier(null);
        currentMap.eachLayer(function (layer) {
          // Check if layer is a marker
          if (layer instanceof L.Polygon) {
              // Create GeoJSON object from marker
              // var geojson = layer.toGeoJSON();
              // Push GeoJSON object to collection
              // var intersection = intersect(geojson, temp);

          }
        });
        addGeoRefs(data);
      }

    }
  }
  //add geofencing
  const addGeoRefs = (data) =>{
    setIsLoading(true);
    grpc_client.addGeofenceData(data,(response)=>{
      getGeoRefs();
      setIsLoading(false);
      setOpen(false);
    },on_error)
  }
  const exportGeoJSON = (map) => {
    let sampleGeoJSON = {
      "type": "FeatureCollection",
      "features": []
    };
    // Iterate the layers of the map
    map.eachLayer(function (layer) {
      // Check if layer is a marker
      if (layer instanceof L.Polygon) {
          // Create GeoJSON object from marker
          var geojson = layer.toGeoJSON();
          // Push GeoJSON object to collection
          sampleGeoJSON.features.push(geojson);
      }
    });
  }

  //handle geofence update of the name and status
  const handleUpdate = () =>{
    selectedFence.name = selectedIdentifier;
    selectedFence.isActive = status === "ACTIVE";
    selectedFence.geofenceData = selectedFence.polygon;

    setEditName(false);
    confirm({ description: 'Update geofence?' })
      .then(() => { grpc_client.updateGeofenceData(selectedFence,(response)=>{
        getGeoRefs();
      },on_error) })

  }

  const cancelUpdate = () =>{
    setSelectedFenceID(null);
    setEditName(false);
  }

  //remove selected fence
  const removeSelectedFence = ()=>{
    confirm({ description: 'Remove selected fence?' })
      .then(() => {
        grpc_client.removeGeofenceData(selectedFence.id,(respopnse)=>{
        getGeoRefs();
      },on_error)
      setSelectedFenceID(null); })
      .catch(() => {console.log("No") });

  }

  //setup up map location and map layer
  useEffect(() => {
    getLocation((error, position) => {
      const latitude = 36.1699 // position?.coords?.latitude || 51.505;
      const longitude = -115.1398//position?.coords?.longitude || -0.09;
      const map = L.map('mapid', { drawControl: true }).setView([latitude, longitude], 11);
      setCurrentMap(map);
      //import layers

      map.pm.addControls({
        position: 'topleft',
        drawMarker: false,
        drawCircleMarker: false,
        drawPolygon: true,
        drawPolyline: false,
        drawCircle: false,
        editPolygon: true,
        deleteLayer: false,
        draggable: true,
        cutPolygon: false,
      });


      //fetch layers from api
      getGeoRefs(map);

      // create the geocoding control and add it to the map
      var searchControl = L.esri.Geocoding.geosearch().addTo(map);

      // create an empty layer group to store the results and add it to the map
      var results = L.layerGroup().addTo(map);

      // listen for the results event and add every result to the map
      searchControl.on("results", function (data) {
        results.clearLayers();
        for (var i = data.results.length - 1; i >= 0; i--) {
          results.addLayer(L.marker(data.results[i].latlng));
        }
      });



      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      map.on('pm:create', ({layer, ...e}) => {
        //When A polygon is created
        //save the created layer
        let temp = layer.toGeoJSON();
        let tempLayer = layer;
        let foundIntersection = false;
        map.eachLayer(function (layer) {
          // Check if layer is a marker
          if (layer instanceof L.Polygon) {
              // Create GeoJSON object from marker
              var geojson = layer.toGeoJSON();
              // Push GeoJSON object to collection
              var intersection = intersect(geojson, temp);
              if(intersection && geojson.id){
                foundIntersection = true;
              }

          }
        });
        if(foundIntersection){
          setErrorMessage("Can't Have Geofences intersect")
          map.removeLayer(tempLayer);
          setCreatedLayer(null)
        }else{
          setCreatedLayer(layer);
          handleClickOpen()
        }

      });
    });
// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  useEffect(()=>{
    if(errorMessage){
      showSnackBar(errorMessage);
    }
  },[errorMessage, showSnackBar])



  const handleClose = () => {
    setShowConfirmation(false);
    setShowClientConfirmation(false);
  };


  const [value, setValue] = React.useState(1);
  const handleChangeIndex = (value, index) => {
    setValue(index);
  };



  const [clientValue, setClientValue] = React.useState(1);
  const handleClientChangeIndex = (value, index) => {
    setClientValue(index);
  };
  //user dialog checkbox handler
  const handleSelectAll = (event) => {
    if(event.target.checked) {
        setSelectAll(true);
        setState(searchResult.map((user, index) => ({
                checked: true,
                id: user.id
        })));
    } else {
        setSelectAll(false);
        setState({});
    }
}
  const handleChange = (event) => {
    setSelectAll(false)
    if (event.target.checked) {
        setState({
            ...state,
            [event.target.name]: {
            checked: event.target.checked,
            id: event.target.value,
            },
        });
    } else {
        setState({
            ...state,
            [event.target.name]: { checked: event.target.checked, id: null },
        });
    }
};



const addClients = ()  =>{
  //temp
  setCount(1)
  setLoading(true);
  let ids = Object.keys(state).map(key=>state[key].id);
  console.log(ids);
  if(clientValue === 0){
    grpc_client.whitelistClientsOnGeofence({id: selectedFence.id, whitelist_ids :ids},(response)=>{
      getGeoRefs();
      setWhiteAndBlackListClients();
      setLoading(false);
      setShowClientConfirmation(false);
    },on_error)
  }else{
    grpc_client.blacklistClientsOnGeofence({id: selectedFence.id, blacklist_ids :ids},(response)=>{
      getGeoRefs();
      setWhiteAndBlackListClients();
      setLoading(false);
      setShowClientConfirmation(false);
    },on_error)
  }
}

const addUsers = ()  =>{
  //temp
  setCount(1)
  setLoading(true);
  let ids = Object.keys(state).map(key=>state[key].id)
  if(value === 0){
    grpc_client.whitelistUsersOnGeofence({id: selectedFence.id, whitelist_ids :ids},(response)=>{
      getGeoRefs();
      setWhiteAndBlackListUsers();
      setLoading(false);
      setShowConfirmation(false);
    },on_error)
  }else{
    grpc_client.blacklistUsersOnGeofence({id: selectedFence.id, blacklist_ids :ids},(response)=>{
      getGeoRefs();
      setWhiteAndBlackListUsers();
      setLoading(false);
      setShowConfirmation(false);
    },on_error)
  }
}
function on_error(custom_msg) {
  setLoading(false);
  if (custom_msg) {
      showSnackBar(custom_msg);
  }
}
const getUsers = ()=>{

  if (username) {
      grpc_client.searchByUsername(
          { username: username, pagination_current_page: page, pagination_items_per_page: 10 },
          on_search_response,
          on_search_error
      );
  }
  else {
      grpc_client.getWhitelistedUsers(
          { pagination_current_page: page, pagination_items_per_page: 10},
          on_search_response,
          on_search_error
      );
  }

}

const getClients = ()=>{

    grpc_client.getClients(
        { pagination_current_page: page, pagination_items_per_page: 10},
        on_client_response,
        on_search_error
    );

}

const on_client_response = (response) =>{
  let parsedResponse = JSON.parse(response.getData());
  setClientResult(parsedResponse);
  console.log(parsedResponse);
  console.log("==========+++++++++++");
  setCount(parsedResponse?.pagination_data?.number_of_pages);
  if (parsedResponse.pagination_data && page > parsedResponse.pagination_data.number_of_pages) {
      setPage(1);
  }
}
const on_search_response = function (response) {
  setLoading(false);
  let parsedResponse = JSON.parse(response.getData());

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
const handlePaginationChange = (event, value) => {
  setPage(value);
}


const handleGeorefPaginationChange = (event, value) => {
  setGeorefPage(value);
}

const handleWhitelistGlobalRule = (e) => {
  grpc_client.setGeofenceGlobalRule({id: selectedFence.id, blacklistAll: !e.target.checked},(response)=>{
    getGeoRefs();
    setWhiteAndBlackListUsers();
    setLoading(false);
    setShowConfirmation(false);
  },on_error)
}
const handleBlacklistGlobalRule = (e) => {
  grpc_client.setGeofenceGlobalRule({id: selectedFence.id, blacklistAll: e.target.checked},(response)=>{
    getGeoRefs();
    setWhiteAndBlackListUsers();
    setLoading(false);
    setShowConfirmation(false);
  },on_error)
}



const handleBlacklistClientGlobalRule = (e) => {
  grpc_client.setGeofenceClientGlobalRule({id: selectedFence.id, blacklistAll: e.target.checked},(response)=>{
    getGeoRefs();
    setWhiteAndBlackListUsers();
    setLoading(false);
    setShowConfirmation(false);
  },on_error)
}

const handleWhitelistClientGlobalRule = (e) => {
  grpc_client.setGeofenceClientGlobalRule({id: selectedFence.id, blacklistAll: !e.target.checked},(response)=>{
    getGeoRefs();
    setWhiteAndBlackListClients();
    setLoading(false);
    setShowConfirmation(false);
  },on_error)
}


const removeFromBlacklist = (id) => {
  grpc_client.whitelistUsersOnGeofence({id: selectedFence.id, whitelist_ids :[id]},(response)=>{
    getGeoRefs();
    setWhiteAndBlackListUsers();
    setLoading(false);
    setShowConfirmation(false);
  },on_error);
}

const removeFromWhitelist = (id) => {
  grpc_client.blacklistUsersOnGeofence({id: selectedFence.id, blacklist_ids :[id]},(response)=>{
    getGeoRefs();
    setWhiteAndBlackListUsers();
    setLoading(false);
    setShowConfirmation(false);
  },on_error);
}
const removeClientFromBlacklist = (id) => {
  grpc_client.whitelistClientsOnGeofence({id: selectedFence.id, whitelist_ids :[id]},(response)=>{
    getGeoRefs();
    setWhiteAndBlackListClients();
    setLoading(false);
    setShowConfirmation(false);
  },on_error);
}

const removeClientFromWhitelist = (id) => {
  grpc_client.blacklistClientsOnGeofence({id: selectedFence.id, blacklist_ids :[id]},(response)=>{
    getGeoRefs();
    setWhiteAndBlackListClients();
    setLoading(false);
    setShowConfirmation(false);
  },on_error);
}
  return (
    <Fragment>
      <Grid container>
        {/* Map */}
        <Grid item xs={8}>
          <Box mt={1} mx={1}>
              <div id="mapid"></div>
          </Box>
        </Grid>
        {/* Sidebar */}
        <Grid item xs={4} className={classes.background}>
          <Grid container spacing={1}  >
            <Box border={1} borderColor='primary.main' m={1} p={1}>
            <Grid item xs={12}>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <Box mt={1} mx={1}>
                      <Typographyx variant="h6" color="textSecondary">Geofence Details</Typographyx>
                    </Box>
                  </Grid>
                  { selectedFence ?
                    <Card className={classes.selectedGeofence}>
                      <Grid item xs={12}>
                        <Grid container spacing={1} alignItems="center" justify="center">
                          <Grid item xs={6}>
                            { editName?
                              <Box mx={2}>
                                <TextField
                                  autoFocus
                                  margin="dense"
                                  id="name"
                                  type="text"
                                  name="identifier"
                                  value={selectedIdentifier}
                                  onChange={handleSelectedIdentifierChange}
                                />
                              </Box>
                              :
                              <React.Fragment>
                                <Typographyx variant="button" color="textSecondary" px={2}>{selectedIdentifier}</Typographyx>
                                <IconButton onClick={() => setEditName(true)}>
                                   <EditIcon fontSize="small"/>
                                </IconButton>
                              </React.Fragment>
                            }
                          </Grid>
                          <Grid item xs={3}>
                            <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={status === "ACTIVE"}
                                    onChange={handleStatusChange}
                                    name="checkedB"
                                    color="primary"
                                  />
                                }
                                label={<Typographyx variant="body2" color="textSecondary">Active</Typographyx>}/>

                          </Grid>
                          <Grid item xs={3}>
                            <Grid container spacing={1}>
                              <Grid item xs={4}>
                                <IconButton aria-label="update" className={classes.iconButton} onClick={handleUpdate} disabled={Boolean(isLoading) || !selectedFence} color="primary">
                                  <SaveIcon />
                                </IconButton>
                              </Grid>
                              <Grid item xs={4}>
                                <IconButton aria-label="delete" className={classes.iconButton} onClick={removeSelectedFence} disabled={Boolean(isLoading) || !selectedFence} color="secondary">
                                  <DeleteIcon />
                                </IconButton>
                              </Grid>
                              <Grid item xs={4} className={classes.iconButton}>
                                <IconButton onClick={cancelUpdate}>
                                  <CloseIcon />
                                </IconButton>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                      </Card>
                      :
                      <Card className={classes.selectedGeofence}>
                        <Box mt={1} mb={4} mx={2}>
                          <Typographyx variant="body2" color="textSecondary">No Geofence Selected.</Typographyx>
                          <Typographyx variant="caption" color="textSecondary">Please select a Geofence from the list below or click on the Geofence layer on the map.</Typographyx>
                        </Box>
                      </Card>
                      }
                  </Grid>

            </Grid>

            {selectedFence && <Grid item xs={12}>
              <Card className={classes.usersList}>
                <AppBar position="static">
                  <Tabs value={value} onChange={handleChangeIndex} aria-label="simple tabs example">
                    <Tab label="Whitelisted Users"  />
                    <Tab label="Blacklisted Users" />
                  </Tabs>
                </AppBar>
                <TabPanel value={value} index={0}>

                  <Grid item xs={12}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={selectedFence.global_rule === "WHITELIST"}
                              onChange={handleWhitelistGlobalRule}
                              name="checkedB"
                              color="primary"
                            />
                          }
                          label={<Typographyx variant="body2" color="textSecondary">Whitelist all users except those specified in the blacklist.</Typographyx>}/>
                        <Grid container>
                        {selectedFence.global_rule !== "WHITELIST" &&
                          <Grid item xs={12}>
                        <IconButton onClick={()=>{setShowConfirmation(true)}} color='primary' style={{float: "right"}}>
                          <AddIcon />
                        </IconButton>
                        <Table size='small'>
                          <TableHead>
                            <StyledTableRow>
                              <StyledTableCell align="center">Username</StyledTableCell>
                              <StyledTableCell align="center">Name</StyledTableCell>
                              <StyledTableCell align="center">Email</StyledTableCell>
                              <StyledTableCell align="center"></StyledTableCell>
                            </StyledTableRow>
                          </TableHead>
                          <TableBody style={styles.card_content}>
                            {
                            whiteListedUsers &&  whiteListedUsers?.map(user => {
                                return (
                                  <StyledTableRow key={user.id} hover={true}>
                                    <StyledTableCell align="center"> {user.username} </StyledTableCell>
                                    <StyledTableCell align="center"> {user.name} </StyledTableCell>
                                    <StyledTableCell align="center"> {user.email} </StyledTableCell>
                                    <StyledTableCell align="center">
                                      <IconButton aria-label="remove" className={classes.iconButton} onClick={()=>{removeFromWhitelist(user.id)}} color="secondary">
                                        <DeleteIcon />
                                      </IconButton>
                                    </StyledTableCell>

                                  </StyledTableRow>
                                )
                              })
                            }
                          </TableBody>
                        </Table>
                        {loading && <Loading pb={5} />}
                        {
                          whiteListedUsers && whiteListedUsers.length === 0 ? (
                            <Container align="center">
                              <Typographyx variant="subtitle2">
                                No Results.
                              </Typographyx>
                            </Container>
                          ) : (
                              <Box m={2}>
                                <Pagination count={count} variant="outlined" size="small" shape="rounded" page={page} onChange={handlePaginationChange} />
                              </Box>
                            )
                        }
                        </Grid>
                        }
                        </Grid>
                  </Grid>
                </TabPanel>
                <TabPanel value={value} index={1}>
                <Grid item xs={12}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={selectedFence.global_rule === "BLACKLIST"}
                              onChange={handleBlacklistGlobalRule}
                              name="checkedB"
                              color="primary"
                            />
                          }
                          label={<Typographyx variant="body2" color="textSecondary">Blacklist all users except those specified in the whitelist.</Typographyx>}/>
                        <Grid container>
                        {selectedFence.global_rule !== "BLACKLIST" &&
                          <Grid item xs={12}>
                        <IconButton onClick={()=>{setShowConfirmation(true)}} color='primary' style={{float: "right"}}>
                          <AddIcon />
                        </IconButton>
                      <Table stickyHeader size="small">
                        <TableHead>
                          <StyledTableRow>
                            <StyledTableCell align="center">Username</StyledTableCell>
                            <StyledTableCell align="center">Name</StyledTableCell>
                            <StyledTableCell align="center">Email</StyledTableCell>
                            <StyledTableCell align="center"></StyledTableCell>
                          </StyledTableRow>
                        </TableHead>
                        <TableBody style={styles.card_content}>
                          {
                           blackListedUsers && blackListedUsers.length > 0 &&  blackListedUsers?.map(user => {
                              return (
                                <StyledTableRow key={user.id} hover={true}>
                                  <StyledTableCell align="center"> {user.username} </StyledTableCell>
                                  <StyledTableCell align="center"> {user.name} </StyledTableCell>
                                  <StyledTableCell align="center"> {user.email} </StyledTableCell>
                                  <StyledTableCell align="center">
                                    <IconButton aria-label="remove" className={classes.iconButton} onClick={()=>{removeFromBlacklist(user.id)}} color="secondary">
                                      <DeleteIcon />
                                    </IconButton>
                                  </StyledTableCell>

                                </StyledTableRow>
                              )
                            })
                          }
                        </TableBody>
                      </Table>
                      {
                        blackListedUsers && blackListedUsers.length === 0 ? (
                          <Container align="center">
                            <Typographyx variant="subtitle2">
                              No Results.
                            </Typographyx>
                          </Container>
                        ) : (
                            <Box m={2}>
                              <Pagination count={count} size="small" variant="outlined" shape="rounded" page={page} onChange={handlePaginationChange} />
                            </Box>
                          )
                      }
                    </Grid>
                    }
                  </Grid>
                </Grid>
              </TabPanel>
              </Card>
            </Grid>}

            {selectedFence && <Grid item xs={12}>
              <Card className={classes.usersList}>
              <AppBar position="static">
                <Tabs value={clientValue} onChange={handleClientChangeIndex} aria-label="simple tabs example">
                  <Tab label="Whitelisted Clients"  />
                  <Tab label="Blacklisted Clients" />
                </Tabs>
              </AppBar>
              <TabPanel value={clientValue} index={0}>

                <Grid item xs={12}>
                <FormControlLabel
                          control={
                            <Checkbox
                              checked={selectedFence.global_client_rule === "WHITELIST"}
                              onChange={handleWhitelistClientGlobalRule}
                              name="checkedB"
                              color="primary"
                            />
                          }
                          label={<Typographyx variant="body2" color="textSecondary">Whitelist all clients except those specified in the blacklist.</Typographyx>}/>
                      <Grid container>
                      {selectedFence.global_client_rule !== "WHITELIST" &&
                        <Grid item xs={12}>
                      <IconButton onClick={()=>{setShowClientConfirmation(true)}} color='primary' style={{float: "right"}}>
                        <AddIcon />
                      </IconButton>
                      <Table size='small'>
                        <TableHead>
                          <StyledTableRow>
                            <StyledTableCell align="center">Name</StyledTableCell>
                          <StyledTableCell align="center"></StyledTableCell>
                          </StyledTableRow>
                        </TableHead>
                        <TableBody style={styles.card_content}>
                          {
                          whiteListedClients &&  whiteListedClients?.map(user => {
                              return (
                                <StyledTableRow key={user.id} hover={true}>
                                  <StyledTableCell align="center"> {user.name} </StyledTableCell>
                                  <StyledTableCell align="center">
                                  <IconButton aria-label="remove" className={classes.iconButton} onClick={()=>{removeClientFromWhitelist(user.id)}} color="secondary">
                                    <DeleteIcon />
                                  </IconButton>
                                </StyledTableCell>
                                </StyledTableRow>
                              )
                            })
                          }
                        </TableBody>
                      </Table>
                      {loading && <Loading pb={5} />}
                      {
                        whiteListedClients && whiteListedClients.length === 0 ? (
                          <Container align="center">
                            <Typographyx variant="subtitle2">
                              No Results.
                            </Typographyx>
                          </Container>
                        ) : (
                            <Box m={2}>
                              <Pagination count={count} variant="outlined" size="small" shape="rounded" page={page} onChange={handlePaginationChange} />
                            </Box>
                          )
                      }
                      </Grid>
                      }
                      </Grid>
                </Grid>
              </TabPanel>
              <TabPanel value={clientValue} index={1}>
              <Grid item xs={12}>
              <FormControlLabel
                          control={
                            <Checkbox
                              checked={selectedFence.global_client_rule === "BLACKLIST"}
                              onChange={handleBlacklistClientGlobalRule}
                              name="checkedB"
                              color="primary"
                            />
                          }
                          label={<Typographyx variant="body2" color="textSecondary">Blacklist all users except those specified in the whitelist.</Typographyx>}/>
                       <Grid container>
                      {selectedFence.global_client_rule !== "BLACKLIST" &&
                        <Grid item xs={12}>
                      <IconButton onClick={()=>{setShowClientConfirmation(true)}} color='primary' style={{float: "right"}}>
                        <AddIcon />
                      </IconButton>
                    <Table stickyHeader size="small">
                      <TableHead>
                        <StyledTableRow>
                          <StyledTableCell align="center">Name</StyledTableCell>
                          <StyledTableCell align="center"></StyledTableCell>
                        </StyledTableRow>
                      </TableHead>
                      <TableBody style={styles.card_content}>
                        {
                        blackListedClients && blackListedClients.length > 0 &&  blackListedClients?.map(user => {
                            return (
                              <StyledTableRow key={user.id} hover={true}>
                                <StyledTableCell align="center"> {user.name} </StyledTableCell>
                                <StyledTableCell align="center">
                                  <IconButton aria-label="remove" className={classes.iconButton} onClick={()=>{removeClientFromBlacklist(user.id)}} color="secondary">
                                    <DeleteIcon />
                                  </IconButton>
                                </StyledTableCell>

                              </StyledTableRow>
                            )
                          })
                        }
                      </TableBody>
                    </Table>
                    {
                      blackListedClients && blackListedClients.length === 0 ? (
                        <Container align="center">
                          <Typographyx variant="subtitle2">
                            No Results.
                          </Typographyx>
                        </Container>
                      ) : (
                          <Box m={2}>
                            <Pagination count={count} size="small" variant="outlined" shape="rounded" page={page} onChange={handlePaginationChange} />
                          </Box>
                        )
                    }
                  </Grid>
                  }
                </Grid>
              </Grid>
            </TabPanel>
            </Card>
            </Grid>}

            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box mt={4} mx={1}>
              <Typographyx variant="h6" color="textSecondary">Geofences List</Typographyx>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <PaperTable className={classes.root}>
              <TableContainer>
                <Table stickyHeader size="small">
                  <TableHead>
                    <StyledTableRow>
                      <StyledTableCell align="center">Name</StyledTableCell>
                      <StyledTableCell align="center">Status</StyledTableCell>
                      <StyledTableCell align="center">Global Rule</StyledTableCell>
                    </StyledTableRow>
                  </TableHead>
                  <TableBody style={styles.card_content}>
                    {
                      geofences && Object.keys(geofences)?.map((fence_id) => {
                        return (
                          <StyledTableRow onClick={(event)=>{setSelectedFenceID(fence_id)}} key={fence_id} hover={true} selected={fence_id === selectedFenceID}>
                            <StyledTableCell align="center"> {geofences[fence_id].name} </StyledTableCell>
                            <StyledTableCell align="center"> {geofences[fence_id].status} </StyledTableCell>
                            <StyledTableCell align="center"> {geofences[fence_id].global_rule} ALL </StyledTableCell>

                          </StyledTableRow>
                        )
                      })
                    }
                  </TableBody>
                </Table>
                {loading && <Loading pb={5} />}
                {
                  geofences && Object.keys(geofences) && Object.keys(geofences).length === 0 ? (
                    <Container align="center">
                      <Typographyx variant="subtitle2">
                        No Results.
                      </Typographyx>
                    </Container>
                  ) : (
                      <Box m={2}>
                        <Pagination count={georefCount} size="small" variant="outlined" shape="rounded" page={georefPage} onChange={(handleGeorefPaginationChange)} />
                      </Box>
                    )
                }
              </TableContainer>
            </PaperTable>
            </Grid>
        </Grid>
      </Grid>
      {/* Add User Dialog */}
      <Dialog open={showConfirmation} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title" style={{ color: "#fff" }}>
          <Typographyx variant="h6" style={{ color: "#fff", textTransform: "inherit" }} >
            Add Users
          </Typographyx>

        </DialogTitle>
        <DialogContent>
                <Grid item xs={12}>
                        <Paper component="form" className={classes.rootSearch}>
                            <InputBase
                                className={classes.input}
                                placeholder="Search By Username"
                                inputProps={{ 'aria-label': 'search usernames' }}
                                onChange={(e)=>setUsername(e.target.value)}
                                onKeyPress={(ev) => {
                                if (ev.key === 'Enter') {
                                    getUsers(true);
                                    ev.preventDefault();
                                }
                                }}
                            />
                            <IconButton className={classes.iconButton} aria-label="search" onClick={()=> getUsers(true) }>
                                <SearchIcon />
                            </IconButton>
                        </Paper>
                </Grid>
                <PaperTable className={classes.root}>
                    <TableContainer>
                      <Table stickyHeader>
                        <TableHead>
                          <StyledTableRow>
                            <StyledTableCell align="center">
                              <FormGroup>
                                  <FormControlLabel
                                      control={ <Checkbox value={"selectAll"} checked={selectAll} onChange={handleSelectAll} name={"selectALL"} color="default" />}
                                      label={<Typographyx variant="caption" color="textSecondary"></Typographyx>}
                                  />
                              </FormGroup>
                            </StyledTableCell>
                            <StyledTableCell align="center">Username</StyledTableCell>
                            <StyledTableCell align="center">Name</StyledTableCell>
                            <StyledTableCell align="center">Email</StyledTableCell>
                          </StyledTableRow>
                        </TableHead>
                        <TableBody style={styles.card_content}>
                          {
                            searchResult?.map((user,index) => {
                              return (
                                <StyledTableRow key={user.id} hover={true}>
                                  <StyledTableCell align="center"> <FormGroup>
                                  <FormControlLabel
                                                                    control={ <Checkbox value={user.id} checked={state[index]?.checked || selectAll} onChange={handleChange} name={index} color="default" />}
                                                                />
                                                </FormGroup> </StyledTableCell>
                                  <StyledTableCell align="center"> {user.username} </StyledTableCell>
                                  <StyledTableCell align="center"> {user.name} </StyledTableCell>
                                  <StyledTableCell align="center"> {user.email} </StyledTableCell>

                                </StyledTableRow>
                              )
                            })
                          }
                        </TableBody>
                      </Table>
                      {loading && <Loading pb={5} />}
                      {
                        searchResult && searchResult.length === 0 ? (
                          <Container align="center">
                            <Typographyx variant="subtitle2">
                              No Results.
                            </Typographyx>
                          </Container>
                        ) : (
                            <Box m={2}>
                              <Pagination count={count} size="small" variant="outlined" shape="rounded" page={page} onChange={handlePaginationChange} />
                            </Box>
                          )
                      }
                    </TableContainer>
                  </PaperTable>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={Boolean(loading)} color="primary">
            Cancel
          </Button>
          <Button onClick={() => addUsers()} color="primary" disabled={Boolean(loading)} endIcon={isLoading ? <Loading size={20} /> : null} autoFocus>
            Add Users
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add User Dialog */}
      <Dialog open={showClientConfirmation} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title" style={{ color: "#fff" }}>
          <Typographyx variant="h6" style={{ color: "#fff", textTransform: "inherit" }} >
            Add Clients
          </Typographyx>

        </DialogTitle>
        <DialogContent>
                {/* <Grid item xs={12}>
                        <Paper component="form" className={classes.rootSearch}>
                            <InputBase
                                className={classes.input}
                                placeholder="Search By Username"
                                inputProps={{ 'aria-label': 'search usernames' }}
                                onChange={(e)=>setClientValue(e.target.value)}
                                onKeyPress={(ev) => {
                                if (ev.key === 'Enter') {
                                    getClients(true);
                                    ev.preventDefault();
                                }
                                }}
                            />
                            <IconButton className={classes.iconButton} aria-label="search" onClick={()=> getClients(true) }>
                                <SearchIcon />
                            </IconButton>
                        </Paper>
                </Grid> */}
                <PaperTable className={classes.root}>
                    <TableContainer>
                      <Table stickyHeader>
                        <TableHead>
                          <StyledTableRow>
                            <StyledTableCell align="center">
                              <FormGroup>
                                  <FormControlLabel
                                      control={ <Checkbox value={"selectAll"} checked={selectAll} onChange={handleSelectAll} name={"selectALL"} color="default" />}
                                      label={<Typographyx variant="caption" color="textSecondary"></Typographyx>}
                                  />
                              </FormGroup>
                            </StyledTableCell>
                            <StyledTableCell align="center">Name</StyledTableCell>
                            </StyledTableRow>
                        </TableHead>
                        <TableBody style={styles.card_content}>
                          {
                            clientResult?.map((user,index) => {
                              return (
                                <StyledTableRow key={user.id} hover={true}>
                                  <StyledTableCell align="center"> <FormGroup>
                                  <FormControlLabel
                                                                    control={ <Checkbox value={user.id} checked={state[index]?.checked || selectAll} onChange={handleChange} name={index} color="default" />}
                                                                />
                                                </FormGroup> </StyledTableCell>
                                  <StyledTableCell align="center"> {user.name} </StyledTableCell>

                                </StyledTableRow>
                              )
                            })
                          }
                        </TableBody>
                      </Table>
                      {loading && <Loading pb={5} />}
                      {
                        clientResult && clientResult.length === 0 ? (
                          <Container align="center">
                            <Typographyx variant="subtitle2">
                              No Results.
                            </Typographyx>
                          </Container>
                        ) : (
                            <Box m={2}>
                              <Pagination count={count} size="small" variant="outlined" shape="rounded" page={page} onChange={handlePaginationChange} />
                            </Box>
                          )
                      }
                    </TableContainer>
                  </PaperTable>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={Boolean(loading)} color="primary">
            Cancel
          </Button>
          <Button onClick={() => addClients()} color="primary" disabled={Boolean(loading)} endIcon={isLoading ? <Loading size={20} /> : null} autoFocus>
            Add Clients
          </Button>
        </DialogActions>
      </Dialog>


      {/* Create geofence name dialog */}
      <Dialog open={open} onClose={handleIdentifierClose} aria-labelledby="form-dialog-title" classes={{scrollPaper: classes.scrollPaper }} >
        <DialogTitle id="form-dialog-title">Create geofence</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To create the selected geofence please enter an identifier :
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Geofence identifier"
            type="text"
            name="identifier"
            fullWidth
            value={identifier}
            onChange={(ev)=>{
              handleIdentifierChange(ev)
            }}
            onKeyPress={(ev)=>{
              if (ev.key === 'Enter') {
                console.log("HERRRE");
                handleSubmit();
                ev.preventDefault();
             }
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleIdentifierClose} color="primary">
            Cancel
          </Button>
          <Buttonx onClick={handleSubmit} color="primary" disabled={Boolean(isLoading)}
                      endIcon={isLoading ? <Loading size={20} /> : null}>
            Submit
          </Buttonx>
        </DialogActions>
      </Dialog>

    </Fragment>
  );
}
