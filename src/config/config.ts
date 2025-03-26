import dotenv from "dotenv";
import path from "path";

//Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || "development";

const envFound = dotenv.config();
if (envFound.error) throw new Error("Couldnt find .env file!");

export default {
  //ENVIROMENT
  env: process.env.NODE_ENV,

  //Server
  port: parseInt(process.env.PORT || "3000", 10),

  //DataBase
  databaseURL: process.env.MONGODB_URI,

  //JWT
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "24h",

  //Api config
  api: {
    prefix: "/api",
  },

  //logging
  logs: {
    level: process.env.LOG_LEVEL || "info",
  },
};
