import express, { json } from "express";
import { PORT, mongodburl } from "./CONFIG.js";
import mongoose from "mongoose";
import ListRoutes from "./Listroutes/ListRoutes.js";
import cors from 'cors'

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);
app.use(express.json())

app.use('/todolist',ListRoutes)

mongoose.connect(mongodburl).then(() => {
    console.log("Connected to MongoDB");
  app.listen(PORT, () => {
    console.log(`server is running at ${PORT}`);
  });
});
