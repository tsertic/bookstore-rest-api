import mongoose from "mongoose";
import config from "./config";
import logger from "../utils/logger";

const connectDB = async (): Promise<void> => {
  try {
    //init connection
    const conn = await mongoose.connect(config.databaseURL as string);
    logger.info(`MongoDB Connected: ${conn.connection.host}`);

    //Add event listeners

    mongoose.connection.on("connected", () => {
      logger.info("Mongoose connected to db");
    });

    mongoose.connection.on("error", (err) => {
      logger.error(`Mongoose connection error: ${err}`);
    });

    mongoose.connection.on("disconnected", () => {
      logger.info(`Mongoose connection is disconnected.`);
    });

    //If node process ends, close the MongoDB connection

    process.on("SIGINT", async () => {
      await mongoose.connection.close();
      logger.info(`Mongoose connection disconnected through app termination`);
      process.exit(0);
    });
  } catch (error) {
    if (error instanceof Error) {
      logger.error(`Error connecting to MongoDB: ${error.message}`);
    } else {
      logger.error("Unknown error connecting to MongoDB");
    }
    process.exit(1);
  }
};

export default connectDB;
