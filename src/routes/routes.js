import express from "express";

import { getUserByUsername, loginUser, registerUser } from "../controllers/userController.js";
import { getUserByUsernameValidator, postLoginUserValidator, postRegisterUserValidator } from "./validators/userValidator.js";

const routes = express.Router();

// USER
routes.post("/register", postRegisterUserValidator, registerUser);
routes.post("/login", postLoginUserValidator, loginUser);
routes.get("/users/:username", getUserByUsernameValidator, getUserByUsername);

export default routes;