import { updateProductById } from "../../repositories/productRepository.js";

async function updateProductByIdUsecase(id, updatedProduct) {
    return await updateProductById(id, updatedProduct);
}

export {
    updateProductByIdUsecase,
};
