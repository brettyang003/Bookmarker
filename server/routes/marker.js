import express from "express";
import {
  getMarkers,
  createMarker,
  getFormData,
  getMarkerData,
} from "../controllers/marker.js";

const router = express.Router();

router.post("/sendFormData", getFormData);
router.post("/createMarker", createMarker);
router.post("/getMarkerData", getMarkerData);
router.get("/", getMarkers);

export default router;
