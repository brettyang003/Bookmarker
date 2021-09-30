import express from "express";
import {
  getMarkers,
  createMarker,
  getFormData,
} from "../controllers/marker.js";

const router = express.Router();

router.post("/sendFormData", getFormData);
router.post("/createMarker", createMarker);
router.get("/", getMarkers);

export default router;
