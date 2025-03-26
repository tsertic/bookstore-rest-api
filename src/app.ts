import { Request, Response, NextFunction } from "express";

import express from "express";
import cors from "cors";
import config from "./config/config";
import server from "./server";
import mongoose from "mongoose";
import logger from "./utils/logger";
//create express server
const app = express();

//Express Configuration
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Check DB connection on every request (optional but helpful during development)
app.use((_req: Request, res: Response, next: NextFunction) => {
  if (mongoose.connection.readyState !== 1) {
    logger.warn("MongoDB connection is not established");
    res.status(503).json({
      success: false,
      message: "Database connection not established.",
    });
  } else {
    next();
  }
});

//API Routes

app.get("/", (req, res) => {
  res.json({
    message: "Bookstore API is running!",
    enviroment: config.env,
    databaseConnected: mongoose.connection.readyState === 1,
  });
});

export default app;
