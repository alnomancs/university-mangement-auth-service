import mongoose from "mongoose";
import app from "./app";
import config from "./config";
import { Server } from "http";

process.on("uncaughtException", error => {
  console.log(error);
  process.exit(1);
});

let server: Server;
async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    // logger.info("Database connection established");
    console.log("Database connection established");
    server = app.listen(config.port, () => {
      // logger.info(`Application listening on port ${config.port}`);
      console.log(`Application listening on port ${config.port}`);
    });
  } catch (error) {
    // console.log("Failed to run", error);
  }

  // turn off server gracefully
  process.on("unhandledRejection", error => {
    if (server) {
      server.close(() => {
        console.log(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

main();

process.on("SIGTERM", () => {
  //logger.info("sigterm is received");
  console.log("sigterm is received");
  if (server) {
    server.close();
  }
});
