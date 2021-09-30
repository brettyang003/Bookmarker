import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import axios from "axios";
import { FaMapMarkerAlt } from "react-icons/fa";
import MapPopup from "./mapPopup";

function Map() {
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    zoom: 8,
  });
  const [markers, setMarkers] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [currCoords, setCurrCoords] = useState({ lng: 0, lat: 0 });

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
    console.log(e);
    const [lng, lat] = e.lngLat;
    setCurrCoords(e.lngLat);
    axios.post("/marker/createMarker", { lng, lat });
    setShow(true);
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
            offsetLeft={-20}
            offsetTop={-10}
          >
            <FaMapMarkerAlt />
          </Marker>
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
