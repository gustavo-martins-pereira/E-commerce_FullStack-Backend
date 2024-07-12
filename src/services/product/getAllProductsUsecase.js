import { getAllProducts } from "../../repositories/productRepository.js";

async function getAllProductsUseCase() {
    return await getAllProducts();
}

export {
    getAllProductsUseCase,
};
