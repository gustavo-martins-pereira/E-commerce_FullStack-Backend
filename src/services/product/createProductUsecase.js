import { createProduct, getProductByName } from "../../repositories/productRepository.js";
import { getUserById } from "../../repositories/userRepository.js";
import CustomError from "../../utils/errors/customError.js";

async function createProductUseCase({ name, description, price, ownerId }) {
    const user = await getUserById(ownerId);
    if(!user) throw new CustomError(404, "Owner not exists");
    
    const product = await getProductByName(name);
    if(product?.name === name && product.ownerId === ownerId) throw new CustomError(400, "This product already exists");

    return await createProduct({ name, description, price, ownerId });
}

export {
    createProductUseCase,
};
