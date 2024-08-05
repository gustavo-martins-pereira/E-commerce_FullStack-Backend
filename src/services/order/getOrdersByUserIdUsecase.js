import { getOrdersByUserId } from "../../repositories/orderRepository.js";
import { getUserByUsername } from "../../repositories/userRepository.js";
import CustomError from "../../utils/errors/customError.js";

async function getOrdersByUserIdUsecase(userId, username) {
    const user = await getUserByUsername(username);
    if(user?.id !== Number(userId)) throw new CustomError(403, "You don't have permission to access the orders of other users");

    return await getOrdersByUserId(userId);
}

export {
    getOrdersByUserIdUsecase,
};
