import { createLogger, format, transports } from "winston";
import path from "path";
import DailyRotateFile from "winston-daily-rotate-file";

const { combine, timestamp, label, printf, prettyPrint } = format;

// custom log format

const myFormat = printf(({ level, message, label, timestamp }) => {
  const date = new Date(timestamp);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  return `[${label}] ${level}: ${message} ${date.toDateString()} ${hours} ${minutes} ${seconds}`;
});

const logger = createLogger({
  level: "info",
  format: combine(label({ label: "ph" }), timestamp(), myFormat, prettyPrint()),
  transports: [
    new transports.Console(),

    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        "logs",
        "winston",
        "success",
        "ums-%DATE%-success.log"
      ),
      datePattern: "YYYY-MM-DD-HH",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "14d",
    }),
  ],
});

const errorLogger = createLogger({
  level: "error",
  format: combine(label({ label: "ph" }), timestamp(), myFormat),
  transports: [
    new transports.Console(),

    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        "logs",
        "winston",
        "errors",
        "ums-%DATE%-error.log"
      ),
      datePattern: "YYYY-MM-DD-HH",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "14d",
    }),
  ],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new transports.Console({
      format: format.simple(),
    })
  );
}

export { logger, errorLogger };
