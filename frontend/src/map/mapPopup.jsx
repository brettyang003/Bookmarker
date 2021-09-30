import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";

function MapPopup(props) {
  const [formData, setFormData] = useState({
    latitude: 0,
    longitude: 0,
    destination: "",
    activityType: "",
    notes: "",
  });

  function sendFormData() {
    setFormData({
      ...formData,
      latitude: props.currCoords.lat,
      longitude: props.currCoords.lng,
    });
    axios.post("/marker/sendFormData", formData);
  }
  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Bookmark A Spot</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Name</Form.Label>
          <Form.Control
            onChange={(e) =>
              setFormData({
                ...formData,
                destination: e.target.value,
                longitude: props.currCoords[0],
                latitude: props.currCoords[1],
              })
            }
            type="text"
            placeholder="Enter Destination Name"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Activity Type</Form.Label>
          <Form.Control
            onChange={(e) =>
              setFormData({ ...formData, activityType: e.target.value })
            }
            type="text"
            placeholder="Enter Activity Type"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Notes</Form.Label>
          <Form.Control
            onChange={(e) =>
              setFormData({ ...formData, notes: e.target.value })
            }
            as="textarea"
            rows={3}
          />
        </Form.Group>
        <Button onClick={sendFormData} variant="primary" type="submit">
          Submit
        </Button>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default MapPopup;
