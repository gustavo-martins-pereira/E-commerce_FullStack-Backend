import express from "express";

import { registerUser } from "../controllers/userController.js";
import { postRegisterUserValidator } from "./validators/userValidator.js";

const routes = express.Router();

// USER
routes.post("/register", postRegisterUserValidator, registerUser);

export default routes;