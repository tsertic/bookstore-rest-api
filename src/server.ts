import app from "./app";
import config from "./config/config";
import connectDB from "./config/database";
//Connect to DB
connectDB();

//Start Express server
const server = app.listen(config.port, () => {
  console.log(`Server started on port ${config.port} in ${config.env} mode.`);
  console.log("Press CTRL+C to stop.");
});

//Handle unhandled promise rejections
process.on("unhandledRejection", (err: Error) => {
  console.log(`ERROR: ${err.message}`);
  //close server and exit process
  server.close(() => process.exit(1));
});

export default server;
