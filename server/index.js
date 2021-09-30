import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import markerRoute from "./routes/marker.js";

const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/marker", markerRoute);

const uri =
  "mongodb+srv://brett:Awesome78@cluster0.tribb.mongodb.net/mapAppDatabase?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.URI, { useNewUrlParser: true })
  .then(() => app.listen(PORT, () => console.log(`Connected to port ${PORT}`)))
  .catch((error) => console.log(error));
