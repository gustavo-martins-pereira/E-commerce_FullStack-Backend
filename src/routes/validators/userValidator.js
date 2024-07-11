import { body, param } from "express-validator";

const postRegisterUserValidator = [
    body("username")
        .isString().withMessage("The username must be a string")
        .trim().notEmpty().withMessage("The username cannot be empty")
        .isLength({ min: 5, max: 50 }).withMessage("Username must be between 5 and 50 characters long")
        .matches(/^[A-Za-z]/).withMessage("Username must start with a letter")
        .escape(),
    body("password")
        .isString().withMessage("The password must be a string")
        .trim().notEmpty().withMessage("The password cannot be empty")
        .isLength({ min: 8, max: 50 }).withMessage("Password must be between 8 and 50 characters long")
        .escape(),
    body("role")
        .toUpperCase()
        .isString().withMessage("The role must be a string")
        .trim().notEmpty().withMessage("The role cannot be empty")
        .isIn(["USER", "SELLER"]).withMessage("The role must be \"USER\" or \"SELLER\"")
];

const postLoginUserValidator = [
    body("username")
        .isString().withMessage("The username must be a string")
        .trim().notEmpty().withMessage("The username cannot be empty")
        .escape(),
    body("password")
        .isString().withMessage("The password must be a string")
        .trim().notEmpty().withMessage("The password cannot be empty")
        .escape(),
];


const getUserByUsernameValidator = [
    param("username")
        .trim().notEmpty().withMessage("The username cannot be empty")
        .escape(),
];

export {
    postRegisterUserValidator,
    postLoginUserValidator,
    getUserByUsernameValidator,
};
