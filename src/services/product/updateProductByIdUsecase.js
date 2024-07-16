import { updateProductById } from "../../repositories/productRepository.js";
import CustomError from "../../utils/errors/customError.js";

async function updateProductByIdUsecase(id, updatedProduct) {
    const [numberOfAffectedRows, affectedRows] = await updateProductById(id, updatedProduct);

    if(!numberOfAffectedRows) throw new CustomError(404, "Product not found");

    return [numberOfAffectedRows, affectedRows];
}

export {
    updateProductByIdUsecase,
};
