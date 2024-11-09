import { getOrdersBySellerId } from "../../repositories/orderRepository.js";
import { getUserById } from "../../repositories/userRepository.js";
import CustomError from "../../utils/errors/customError.js";

async function getOrdersBySellerIdUsecase(sellerId) {
    const user = await getUserById(sellerId);
    if(user?.id !== Number(sellerId)) throw new CustomError(403, "You don't have permission to access the orders of other sellers");

    return await getOrdersBySellerId(sellerId);
}

export {
    getOrdersBySellerIdUsecase,
};
