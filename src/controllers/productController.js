import { validationResult } from "express-validator";
import { createProductUseCase } from "../services/product/createProductUsecase.js";
import CustomError from "../utils/errors/customError.js";

async function createProduct(request, response) {
    const result = validationResult(request);

    if(!result.isEmpty()) {
        return response.status(400).json({ errors: result.array() });
    }

    try {
        const {
            name,
            description,
            price,
            ownerId
        } = request.body;

        const product = await createProductUseCase({ name, description, price, ownerId });

        return response.status(201).json(product);
    } catch(error) {
        return response.status(error instanceof CustomError ? error.statusCode : 500).json({ error: error.message});
    }
}

export {
    createProduct,
};