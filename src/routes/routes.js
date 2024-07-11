import express from "express";

import { loginUser, registerUser } from "../controllers/userController.js";
import { postLoginUserValidator, postRegisterUserValidator } from "./validators/userValidator.js";

const routes = express.Router();

// USER
routes.post("/register", postRegisterUserValidator, registerUser);
routes.post("/login", postLoginUserValidator, loginUser);

export default routes;