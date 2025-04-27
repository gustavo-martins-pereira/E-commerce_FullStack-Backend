import { deleteImageByName } from "../../aws/services/s3Service.js";
import { deleteProductById, getProductById } from "../../repositories/productRepository.js";
import CustomError from "../../utils/errors/customError.js";

async function deleteProductByIdUsecase(id) {
    const product = await getProductById(id);
    if(!product) throw new CustomError(404, "Product not found");

    await deleteImageByName(product.imageName);

    return await deleteProductById(id);
}

export {
    deleteProductByIdUsecase,
};