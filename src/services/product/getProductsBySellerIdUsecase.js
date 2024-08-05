import { getProductsBySellerId } from "../../repositories/productRepository.js";
import { getUserById } from "../../repositories/userRepository.js";
import CustomError from "../../utils/errors/customError.js";

async function getProductsBySellerIdUsecase(sellerId) {
    const user = await getUserById(sellerId);
    if(!user) throw new CustomError(404, "Seller not found");

    if(user.role !== "SELLER") throw new CustomError(400, "This user is not a seller");

    return await getProductsBySellerId(sellerId);
}

export {
    getProductsBySellerIdUsecase,
};
