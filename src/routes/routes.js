import express from "express";

import { getUserByUsername, loginUser, registerUser } from "../controllers/userController.js";
import { getUserByUsernameValidator, postLoginUserValidator, postRegisterUserValidator } from "./validators/userValidators.js";
import { createProduct, deleteProductById, getAllProducts, getProductById, getProductsBySellerId, updateProductById } from "../controllers/productController.js";
import { deleteProductValidator, postCreateProductValidator, putUpdateProductValidator } from "./validators/productValidators.js";
import { createOrder, getOrdersByUserId } from "../controllers/orderController.js";
import { getOrdersByUserIdValidator, postCreateOrderValidator } from "./validators/orderValidators.js";

const routes = express.Router();

// USER
routes.post("/register", postRegisterUserValidator, registerUser);
routes.post("/login", postLoginUserValidator, loginUser);
routes.get("/users/:username", getUserByUsernameValidator, getUserByUsername);


// PRODUCT
routes.post("/products", postCreateProductValidator, createProduct);
routes.get("/products", getAllProducts);
routes.get("/products/:id", getProductById);
routes.get("/products/seller/:sellerId", getProductsBySellerId);
routes.put("/products/:id", putUpdateProductValidator, updateProductById);
routes.delete("/products/:id", deleteProductValidator, deleteProductById);


// ORDER
routes.post("/orders", postCreateOrderValidator, createOrder);
routes.get("/orders/:userId", getOrdersByUserIdValidator, getOrdersByUserId);

export default routes;
