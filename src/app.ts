import express from "express";
import cors from "cors";
import config from "./config/config";
import server from "./server";
//create express server
const app = express();

//Express Configuration
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//API Routes

app.get("/", (req, res) => {
  res.send("Bookstore API is running!");
});

export default app;
