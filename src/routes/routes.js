import express from "express";

import { registerUser } from "../controllers/userController.js";

const routes = express.Router();

// USER
routes.post("/register", registerUser);

export default routes;