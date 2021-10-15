import mongoose from "mongoose";
import Marker from "../markerModel.js";

export const getMarkers = async (req, res) => {
  const markers = await Marker.find({});
  res.send(markers);
};

export const createMarker = async (req, res) => {
  const { lng, lat } = req.body;
  const newMarker = new Marker({
    longitude: lng,
    latitude: lat,
    destination: "",
    activityType: "",
    notes: "",
  });
  newMarker.save();
};

export const getFormData = async (req, res) => {
  const formData = req.body;
  const marker = await Marker.updateOne(
    {
      latitude: req.body.latitude,
      longitude: req.body.longitude,
    },
    req.body
  );
  return formData;
};

export const getMarkerData = async (req, res) => {
  const marker = await Marker.find({
    latitude: req.body[0],
    longitude: req.body[1],
  });
  res.send(marker);
};
