import CustomError from "../../utils/errors/customError.js";

import { getProductById } from "../../repositories/productRepository.js";

async function getProductByIdUsecase(id) {
    const product = await getProductById(id);

    if(!product) throw new CustomError(404, "Product not found");

    return product;
}

export {
    getProductByIdUsecase,
};
