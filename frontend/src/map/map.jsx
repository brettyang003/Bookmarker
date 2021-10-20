import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import axios from "axios";
import { FaMapMarkerAlt } from "react-icons/fa";
import MarkerPopup from "./markerPopup";
import MapPopup from "./mapPopup";
import { Card, ListGroup, Button } from "react-bootstrap";

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
  markerList();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setViewport({
        ...viewport,
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
      });
    });
  });

  function markerList() {
    let list = (
      <Card style={{ width: "18rem" }}>
        <Card.Header>Featured</Card.Header>
        <ListGroup variant="flush">
          {markers.map((marker) => {
            return (
              <ListGroup.Item action href="#link1">
                {marker.destination}
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </Card>
    );
    return list;
  }

  function addMarker(e) {
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
      <div
        style={{ position: "absolute", right: 20, top: 20, zIndex: 2 }}
      ></div>
      <div style={{ position: "absolute", left: 20, top: 20, zIndex: 1 }}>
        <Card onMouseHover={() => setAllowed(false)} style={{ width: "18rem" }}>
          <Card.Header>Markers</Card.Header>
          <ListGroup variant="flush">
            {markers.map((marker, i) => {
              return (
                <ListGroup.Item action href={`link${i}`}>
                  {marker.destination}
                  <Button
                    style={{
                      float: "right",
                      width: "20%",
                      fontSize: "12px",
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      setAllowed(false);
                      setViewport({
                        ...viewport,
                        longitude: marker.longitude,
                        latitude: marker.latitude,
                        zoom: 13,
                      });
                    }}
                    variant="success"
                  >
                    Go
                  </Button>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </Card>
      </div>

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
