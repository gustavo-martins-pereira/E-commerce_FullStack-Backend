import { body } from "express-validator";

const postCreateProductValidator = [
    body("name")
        .exists().withMessage("The name is required")
        .isString().withMessage("The name must be a string")
        .trim().notEmpty().withMessage("The name cannot be empty")
        .isLength({ min: 5, max: 100 }).withMessage("The name must be between 5 and 100 characters long")
        .escape(),
    body("description")
        .isString().withMessage("The description must be a string")
        .trim().notEmpty().withMessage("The description cannot be empty")
        .escape(),
    body("price")
        .exists().withMessage("The price is required")
        .isDecimal().withMessage("The price must be a number")
        .isFloat({ min: 0 }).withMessage("The price must be greater than 0"),
    body("ownerId")
        .exists().withMessage("The ownerId is required")
        .isNumeric().withMessage("The ownerId must be a number")
        .isInt({ gt: 0 }).withMessage("The ownerId must be greater than 0")
];

export {
    postCreateProductValidator,
};
