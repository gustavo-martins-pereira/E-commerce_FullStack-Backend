import { validationResult } from "express-validator";
import { createProductUseCase } from "../services/product/createProductUsecase.js";
import CustomError from "../utils/errors/customError.js";
import { getAllProductsUseCase } from "../services/product/getAllProductsUsecase.js";
import { getProductByIdUsecase } from "../services/product/getProductByIdUsecase.js";
import { getProductsBySellerIdUsecase } from "../services/product/getProductsBySellerIdUsecase.js";
import { updateProductByIdUsecase } from "../services/product/updateProductByIdUsecase.js";

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

async function getAllProducts(request, response) {
    try {
        const products = await getAllProductsUseCase();

        return response.status(200).json(products);
    } catch(error) {
        return response.status(error instanceof CustomError ? error.statusCode : 500).json({ error: error.message});
    }
}

async function getProductById(request, response) {
    try {
        const product = await getProductByIdUsecase(request.params.id);

        return response.status(200).json(product);
    } catch (error) {
        return response.status(error instanceof CustomError ? error.statusCode : 500).json({ error: error.message});
    }
}

async function getProductsBySellerId(request, response) {
    try {
        const products = await getProductsBySellerIdUsecase(request.params.sellerId);

        return response.status(200).json(products);
    } catch (error) {
        return response.status(error instanceof CustomError ? error.statusCode : 500).json({ error: error.message});
    }
}

async function updateProductById(request, response) {
    try {
        const { id } = request.params;
        const {
            name,
            description,
            price
        } = request.body;

        const result = await updateProductByIdUsecase(id, { name, description, price });

        return response.status(200).json(result);
    } catch (error) {
        return response.status(error instanceof CustomError ? error.statusCode : 500).json({ error: error.message });
    }
}

export {
    createProduct,
    getAllProducts,
    getProductById,
    getProductsBySellerId,
    updateProductById,
};
