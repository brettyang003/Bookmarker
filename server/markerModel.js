import mongoose from "mongoose";

const markerSchema = new mongoose.Schema({
  latitude: Number,
  longitude: Number,
  destination: String,
  activityType: String,
  notes: String,
});

const Marker = mongoose.model("Marker", markerSchema);

export default Marker;
