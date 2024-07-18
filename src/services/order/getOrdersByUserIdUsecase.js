import { getOrdersByUserId } from "../../repositories/orderRepository.js";
import { getUserById } from "../../repositories/userRepository.js";
import CustomError from "../../utils/errors/customError.js";

async function getOrdersByUserIdUsecase(userId) {
    const user = await getUserById(userId);
    if(!user) throw new CustomError(404, "User not found");

    return await getOrdersByUserId(userId);
}

export {
    getOrdersByUserIdUsecase,
};
