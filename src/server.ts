import mongoose from "mongoose";
import app from "./app";
import config from "./config";
import { errorLogger, logger } from "./shared/logger";
import { Server } from "http";

process.on("uncaughtException", error => {
  errorLogger.error(error);
  process.exit(1);
});

let server: Server;
async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    // logger.info("Database connection established");
    server = app.listen(config.port, () => {
      // logger.info(`Application listening on port ${config.port}`);
      console.log(`Application listening on port ${config.port}`);
    });
  } catch (error) {
    // errorLogger.error("Failed to run", error);
  }

  // turn off server gracefully
  process.on("unhandledRejection", error => {
    if (server) {
      server.close(() => {
        errorLogger.error(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

main();

process.on("SIGTERM", () => {
  logger.info("sigterm is received");
  if (server) {
    server.close();
  }
});
