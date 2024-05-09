import express from "express";
import { PORT, mongodburl } from "./CONFIG.js";
import mongoose from "mongoose";

const app = express();

mongoose.connect(mongodburl).then(() => {
    console.log("Connected to MongoDB");
  app.listen(PORT, () => {
    console.log(`server is running at ${PORT}`);
  });
});
