import express from "express";

import { getUserByUsername, loginUser, registerUser } from "../controllers/userController.js";
import { getUserByUsernameValidator, postLoginUserValidator, postRegisterUserValidator } from "./validators/userValidators.js";
import { createProduct, getAllProducts } from "../controllers/productController.js";
import { postCreateProductValidator } from "./validators/productValidators.js";

const routes = express.Router();

// USER
routes.post("/register", postRegisterUserValidator, registerUser);
routes.post("/login", postLoginUserValidator, loginUser);
routes.get("/users/:username", getUserByUsernameValidator, getUserByUsername);


// PRODUCT
routes.post("/products", postCreateProductValidator, createProduct);
routes.get("/products", getAllProducts);

export default routes;
