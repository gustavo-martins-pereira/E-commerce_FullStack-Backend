import { body, param } from "express-validator";

const postCreateOrderValidator = [
    body("clientId")
        .exists().withMessage("The clientId is required")
        .isNumeric().withMessage("The clientId must be a number")
        .isInt({ gt: 0 }).withMessage("The clientId must be a positive integer greater than 0"),
    body("sellerId")
        .exists().withMessage("The sellerId is required")
        .isNumeric().withMessage("The sellerId must be a number")
        .isInt({ gt: 0 }).withMessage("The sellerId must be a positive integer greater than 0"),
    body("total")
        .exists().withMessage("The total is required")
        .isDecimal().withMessage("Total must be a number")
        .isFloat({ min: 0 }).withMessage("The total must be greater than or equal to 0"),
    body("status")
        .isString().withMessage("The status must be a string")
        .trim().notEmpty().withMessage("The status cannot be empty")
        .toUpperCase()
        .isIn(["PENDING", "SHIPPED", "DELIVERED"]).withMessage("The status must be PENDING, SHIPPED, or DELIVERED"),
    body("orderItems")
        .exists().withMessage("Order items are required")
        .isArray({ min: 1 }).withMessage("Order items must be a non-empty array with at least 1 item"),

        body("orderItems.*.quantity")
            .exists().withMessage("The quantity is required for each order item")
            .isNumeric().withMessage("The quantity must be a number")
            .isInt({ min: 1 }).withMessage("The quantity must be an integer greater than or equal to 1"),
        body("orderItems.*.price")
            .exists().withMessage("The price is required for each order item")
            .isNumeric().withMessage("The price must be a number")
            .isFloat({ min: 0 }).withMessage("The price must be greater than or equal to 0"),
        body("orderItems.*.subtotal")
            .exists().withMessage("The subtotal is required for each order item")
            .isNumeric().withMessage("The subtotal must be a number")
            .isFloat({ min: 0 }).withMessage("The subtotal must be greater than or equal to 0"),
        body("orderItems.*.productId")
            .exists().withMessage("The productId is required for each order item")
            .isNumeric().withMessage("The productId must be a number")
            .isInt({ gt: 0 }).withMessage("The productId must be a positive integer greater than 0"),
];

const getOrderByIdValidator = [
    param("id")
        .isNumeric().withMessage("The id must be a number")
        .escape(),
];

const getOrdersByUserIdValidator = [
    param("userId")
        .isNumeric().withMessage("The userId must be a number")
        .escape(),
];

const patchUpdateOrderStatusByIdValidator = [
    param("id")
        .isNumeric().withMessage("The id must be a number")
        .escape(),
    body('status')
        .isString().withMessage("The status must be a string")
        .trim().notEmpty().withMessage("The status cannot be empty")
        .toUpperCase()
        .isIn(["PENDING", "SHIPPED", "DELIVERED"]).withMessage("The status must be PENDING, SHIPPED, or DELIVERED"),
];

export {
    postCreateOrderValidator,
    getOrderByIdValidator,
    getOrdersByUserIdValidator,
    patchUpdateOrderStatusByIdValidator,
};
