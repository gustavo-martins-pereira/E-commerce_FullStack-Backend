import express from "express";
import { getAppIsRunning } from "./app.js";

const routes = express.Router();

// APP
routes.get("/test-api", getAppIsRunning);

export default routes;