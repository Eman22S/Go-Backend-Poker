// @flow
import React, { useEffect } from 'react'
import { uuid } from 'uuidv4';

import '@geoman-io/leaflet-geoman-free';
import useGrpcClient from '../contexts/grpc_client';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Buttonx from './fragments/Buttonx';
import Loading from './fragments/Loading';
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

export default function LeafletMap() {
  
  const [currentMap, setCurrentMap] = React.useState(null);
  const grpc_client = useGrpcClient();
  const [isLoading, setIsLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [createdLayer, setCreatedLayer] = React.useState(null);
  const [geofences, setGeofences] = React.useState(null);
  
  const [identifier, setIdentifier] = React.useState("");

  //handle the input change on the modal
  const handleIdentifierChange = (event)=>{
    let {value} = event.target;
    console.log(createdLayer.toGeoJSON());
    setIdentifier(value);
  }
  //open modal
  const handleClickOpen = () => {
    setOpen(true);
  };
  //handle modal close and clear the polygon currently 
  const handleClose = () => {
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

  //fetch and draw all the layers and the lifecyle method
  const getGeoRefs = (map)=>{
    clearMap();
    map = map ? map : currentMap;
    grpc_client.getGeofenceData({},(response)=>{
      let tempFences = {};
      let results = JSON.parse(response.array);
      //add to the map
      results.forEach(result=>{
        let temp = {
          "type": "FeatureCollection",
          "features": []
        }
        let polygon = JSON.parse(result.polygon);
        temp.features.push(polygon);
        tempFences[polygon.id] = result;
        const dbGeofences = new L.geoJSON(temp, {
          onEachFeature: function (f, l) {
            l.bindPopup(f.id || 'show info');
            console.log("selected");
          }
        });
        dbGeofences.addTo(map);
        Object.values(dbGeofences._layers).forEach( layer => {
          layer.on('click', (e) => {
            console.log("Clicked");
          })
  
          layer.on('pm:update', (e) => {
            //When A polygon is updated (the vertices edited)
            console.log(e);
            exportGeoJSON(map);
          });
  
          layer.on('pm:dragend', (e) => {
            //When A polygon is dragged
            console.log(e);
            exportGeoJSON(map);
          })
  
          layer.on('pm:remove', (e) => {
            //when a polygon is removed
            console.log(e);
            exportGeoJSON(map);
          })
        });
      })
      console.log("Setting fences");
      setGeofences(tempFences);
    },(error)=>{
      console.log(error)
    })
  }
  const handleFence = ()=>{
    console.log("---------------")
    console.log(geofences);
  }
 
  
  //add geofencing
  const addGeoRefs = (data) =>{
    setIsLoading(true);
    grpc_client.addGeofenceData(data,(response)=>{
      getGeoRefs();
      setIsLoading(false);
      setOpen(false);
    },(error)=>{
      setIsLoading(false);
      setOpen(false);
    })
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
        addGeoRefs(data);
      }
     
    }
  }

  useEffect(() => {
    getLocation((error, position) => {
      const latitude = position?.coords?.latitude || 51.505;
      const longitude = position?.coords?.longitude || -0.09;
      const map = L.map('mapid').setView([latitude, longitude], 13);
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
        deleteLayer: true,
        draggable: true,
        cutPolygon: false
      });
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
        console.log(e);
        //save the created layer
        setCreatedLayer(layer);
        //open the modal
        handleClickOpen()
        exportGeoJSON(map);
        //add on click listener
        layer.on('click', (e) => {
          console.log("Newly created clicked");
          console.log(e);
        })

        layer.on('pm:update', (e) => {
          //When A polygon is updated (the vertices edited)
          console.log(e);
          exportGeoJSON(map);
        });

        layer.on('pm:dragend', (e) => {
          //When A polygon is dragged
          console.log(e);
          exportGeoJSON(map);
        })

        layer.on('pm:remove', (e) => {
          //when a polygon is removed
          console.log(e);
          exportGeoJSON(map);
        })
      });
    });
  }, [])

  return (
    <>
    <div id="mapid"></div>
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Create geofence</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To create the geofencing please enter an identifier :
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
            onChange={handleIdentifierChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
      <Buttonx onClick={handleSubmit} color="primary" disabled={Boolean(isLoading)}
                      endIcon={isLoading ? <Loading size={20} /> : null}>
            Submit
          </Buttonx>
        </DialogActions>
      </Dialog>
    </>
      
  );

}