import { getOrdersByClientId } from "../../repositories/orderRepository.js";
import { getUserById } from "../../repositories/userRepository.js";
import CustomError from "../../utils/errors/customError.js";

async function getOrdersByClientIdUsecase(clientId) {
    const user = await getUserById(clientId);
    if(user?.id !== Number(clientId)) throw new CustomError(403, "You don't have permission to access the orders of other sellers");

    return await getOrdersByClientId(clientId);
}

export {
    getOrdersByClientIdUsecase,
};
