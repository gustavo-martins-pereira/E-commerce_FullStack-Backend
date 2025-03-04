import express from "express";

import { getUserById, getUserByUsername, loginUser, logout, refreshToken, registerUser } from "../controllers/userController.js";
import { getUserByIdValidator, getUserByUsernameValidator, postLoginUserValidator, postRegisterUserValidator } from "./validators/userValidators.js";
import { createProduct, deleteProductById, getAllProducts, getProductById, getProductsBySellerId, updateProductById } from "../controllers/productController.js";
import { deleteProductValidator, postCreateProductValidator, putUpdateProductValidator } from "./validators/productValidators.js";
import { createOrder, getOrderById, getOrdersByClientId, getOrdersBySellerId, updateOrderStatusById } from "../controllers/orderController.js";
import { getOrderByIdValidator, getOrdersByClientIdValidator, getOrdersBySellerIdValidator, patchUpdateOrderStatusByIdValidator, postCreateOrderValidator } from "./validators/orderValidators.js";

// Middlewares
import verifyJwtAccessToken from "../middlewares/verifyJwtAccessToken.js";
import verifyJwtRefreshToken from "../middlewares/verifyJwtRefreshToken.js";
import verifyRole from "../middlewares/verifyRole.js";
import uploadSingleFile from "../middlewares/uploadSingleFile.js";

import USER_ROLES from "../utils/enums/userRoles.js";

const routes = express.Router();

const publicRoutes = express.Router();
const protectedRoutes = express.Router();

// HEALTH CHECK SERVICE
publicRoutes.get("/check", (request, response) => {
    return response.sendStatus(200);
});

// USER
publicRoutes.post("/register", postRegisterUserValidator, registerUser);
publicRoutes.post("/login", postLoginUserValidator, loginUser);
publicRoutes.post("/login/refresh", refreshToken);
publicRoutes.post("/users/logout", verifyJwtRefreshToken, verifyRole(USER_ROLES.USER, USER_ROLES.SELLER), logout);
publicRoutes.get("/users/:id", getUserByIdValidator, getUserById);
publicRoutes.get("/users/usernames/:username", getUserByUsernameValidator, getUserByUsername);

protectedRoutes.use(verifyJwtAccessToken);

// PRODUCT
publicRoutes.get("/products", getAllProducts);
publicRoutes.get("/products/:id", getProductById);
publicRoutes.get("/products/seller/:sellerId", getProductsBySellerId);

protectedRoutes.post("/products", verifyRole(USER_ROLES.SELLER), uploadSingleFile("image"), postCreateProductValidator, createProduct);
protectedRoutes.put("/products/:id", verifyRole(USER_ROLES.SELLER), putUpdateProductValidator, updateProductById);
protectedRoutes.delete("/products/:id", verifyRole(USER_ROLES.SELLER), deleteProductValidator, deleteProductById);

// ORDER
protectedRoutes.post("/orders", verifyRole(USER_ROLES.USER, USER_ROLES.SELLER), postCreateOrderValidator, createOrder);
protectedRoutes.get("/orders/:id", verifyRole(USER_ROLES.USER, USER_ROLES.SELLER), getOrderByIdValidator, getOrderById);
protectedRoutes.get("/orders/clients/:clientId", verifyRole(USER_ROLES.USER, USER_ROLES.SELLER), getOrdersByClientIdValidator, getOrdersByClientId);
protectedRoutes.get("/orders/sellers/:sellerId", verifyRole(USER_ROLES.SELLER), getOrdersBySellerIdValidator, getOrdersBySellerId);
protectedRoutes.patch("/orders/:id", verifyRole(USER_ROLES.SELLER), patchUpdateOrderStatusByIdValidator, updateOrderStatusById);

routes.use(publicRoutes);
routes.use(protectedRoutes);

export default routes;
