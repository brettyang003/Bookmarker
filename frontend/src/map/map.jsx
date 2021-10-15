import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import axios from "axios";
import { FaMapMarkerAlt } from "react-icons/fa";
import MarkerPopup from "./markerPopup";
import MapPopup from "./mapPopup";

function Map() {
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    zoom: 8,
  });
  const [markers, setMarkers] = useState([]);
  const [show, setShow] = useState(false);
  const [currCoords, setCurrCoords] = useState({ lng: 0, lat: 0 });
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [popupIndex, setPopupIndex] = useState(null);
  const [allowed, setAllowed] = useState(true);
  const getMarkers = () => {
    axios.get("/marker/").then((res) => {
      setMarkers(res.data);
      return markers;
    });
  };

  getMarkers();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setViewport({
        ...viewport,
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
      });
    });
  });

  function addMarker(e) {
    console.log(allowed);
    if (allowed) {
      const [lng, lat] = e.lngLat;
      setCurrCoords({ lng, lat });
      axios.post("/marker/createMarker", { lng, lat });
      setShow(true);
    }
  }

  function handleMarkerClick(i) {
    axios
      .post("/marker/getMarkerData", [
        markers[i].latitude,
        markers[i].longitude,
      ])
      .then(() => {
        setPopupIndex(i);
      });
  }

  function closePopup(i) {
    setPopupIndex(null);
    setAllowed(false);
    setTimeout(() => setAllowed(true), 1000);
  }

  return (
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken="pk.eyJ1IjoiYm9tYnMwODAiLCJhIjoiY2t0cTE4bHl4MGx1cDJvcGllMTMyZjA0YSJ9.CQFGYBC3V55VsVtqJGl11w"
      onViewportChange={(nextViewport) => {
        setViewport(nextViewport);
      }}
      onClick={addMarker}
    >
      {markers.map((marker, i) => {
        return (
          <Marker
            key={i}
            latitude={marker.latitude}
            longitude={marker.longitude}
            offsetLeft={-10}
            offsetTop={-10}
            onClick={() => {
              handleMarkerClick(i);
            }}
          >
            <FaMapMarkerAlt />
          </Marker>
        );
      })}
      {markers.map((marker, i) => {
        return (
          popupIndex === i && (
            <MarkerPopup
              latitude={marker.latitude}
              longitude={marker.longitude}
              activityType={marker.activityType}
              notes={marker.notes}
              marker={marker}
              closePopup={closePopup}
            />
          )
        );
      })}
      <MapPopup
        currCoords={currCoords}
        show={show}
        setShow={setShow}
        handleShow={handleShow}
        handleClose={handleClose}
      />
    </ReactMapGL>
  );
}

export default Map;
