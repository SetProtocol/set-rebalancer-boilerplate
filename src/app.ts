/**
 * Module dependencies.
 */
import bodyParser from "body-parser";
import compression from "compression"; // compresses requests
import enforce from "express-sslify";
import express, { Request, Response, NextFunction } from "express";
import expressValidator = require("express-validator");
import logger from "morgan";
import dotenv from "dotenv";
import timeout from "connect-timeout";

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.config();

/**
 * Custom Middleware
 */
import { errorHandler } from "./middleware/errorHandler";

/**
 * Controllers (route handlers).
 */
import * as rebalanceController from "./controllers/rebalanceController";

/**
 * Create Express server.
 */
const app = express();

/**
 * Express is only able to handle callback based route handlers.
 * In order to use async functions we need to wrap the handler to call express callback afterwards
 */
const asyncRouteHandler = (controller: (req: Request, res: Response) => void) => async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await controller(req, res);
    next();
  } catch (e) {
    console.error(`Something went wrong inside controller: ${e.message}`);
    next(e);
  }
};

/**
 * Express configuration.
 */
app.set("port", process.env.PORT || 3001);
if (process.env.NODE_ENV === "production" || process.env.NODE_ENV === "staging") {
  // trustProtoHeader should only be used behind proxy like Heroku
  app.use(enforce.HTTPS({ trustProtoHeader: true }));
}
app.use(timeout(process.env.REQUEST_TIMEOUT));
app.use(compression());
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());

app.enable("trust proxy");

/**
 * Primary app routes.
 */
app.post("/rebalance/:address", asyncRouteHandler(rebalanceController.rebalance));

app.use(errorHandler);

module.exports = app;
