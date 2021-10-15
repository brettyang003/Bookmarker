import React from "react";
import { Card } from "react-bootstrap";
import CloseButton from "react-bootstrap/CloseButton";
import { Popup } from "react-map-gl";

function MarkerPopup(props) {
  return (
    <Popup
      latitude={props.marker.latitude}
      longitude={props.marker.longitude}
      anchor="top"
      closeButton={false}
    >
      <Card style={{ border: "none" }}>
        <Card.Body>
          <Card.Title>{props.destination}</Card.Title>
          <CloseButton style={{ float: "right" }} onClick={props.closePopup} />
          <Card.Subtitle className="mb-2 text-muted">
            {props.activityType}
          </Card.Subtitle>
          <Card.Text>{props.notes}</Card.Text>
          <Card.Link
            href={`https://www.google.ca/maps/@${props.latitude},${props.longitude},15z`}
            target="_blank"
          >
            See on Google Maps
          </Card.Link>
        </Card.Body>
      </Card>
    </Popup>
  );
}

export default MarkerPopup;
