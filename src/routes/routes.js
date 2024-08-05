import express from "express";

import { getUserByUsername, loginUser, refreshToken, registerUser } from "../controllers/userController.js";
import { getUserByUsernameValidator, postLoginUserValidator, postRegisterUserValidator } from "./validators/userValidators.js";
import { createProduct, deleteProductById, getAllProducts, getProductById, getProductsBySellerId, updateProductById } from "../controllers/productController.js";
import { deleteProductValidator, postCreateProductValidator, putUpdateProductValidator } from "./validators/productValidators.js";
import { createOrder, getOrdersByUserId, updateOrderStatusById } from "../controllers/orderController.js";
import { getOrdersByUserIdValidator, patchUpdateOrderStatusByIdValidator, postCreateOrderValidator } from "./validators/orderValidators.js";

// Middlewares
import verifyJwtToken from "../middlewares/verifyJwtToken.js";
import verifyRole from "../middlewares/verifyRole.js";

import USER_ROLES from "../utils/enums/roles.js";

const routes = express.Router();

// USER
routes.post("/register", postRegisterUserValidator, registerUser);
routes.post("/login", postLoginUserValidator, loginUser);
routes.get("/login/refresh", refreshToken);

routes.use(verifyJwtToken); // Verify token in all routes after this line

routes.get("/users/:username", verifyRole(USER_ROLES.USER, USER_ROLES.SELLER), getUserByUsernameValidator, getUserByUsername);


// PRODUCT
routes.post("/products", verifyRole(USER_ROLES.SELLER), postCreateProductValidator, createProduct);
routes.get("/products", verifyRole(USER_ROLES.USER, USER_ROLES.SELLER), getAllProducts);
routes.get("/products/:id", verifyRole(USER_ROLES.USER, USER_ROLES.SELLER), getProductById);
routes.get("/products/seller/:sellerId", verifyRole(USER_ROLES.USER, USER_ROLES.SELLER), getProductsBySellerId);
routes.put("/products/:id", verifyRole(USER_ROLES.SELLER), putUpdateProductValidator, updateProductById);
routes.delete("/products/:id", verifyRole(USER_ROLES.SELLER), deleteProductValidator, deleteProductById);


// ORDER
routes.post("/orders", verifyRole(USER_ROLES.USER, USER_ROLES.SELLER), postCreateOrderValidator, createOrder);
routes.get("/orders/:userId", verifyRole(USER_ROLES.USER, USER_ROLES.SELLER), getOrdersByUserIdValidator, getOrdersByUserId);
routes.patch("/orders/:id", verifyRole(USER_ROLES.SELLER), patchUpdateOrderStatusByIdValidator, updateOrderStatusById);

export default routes;
