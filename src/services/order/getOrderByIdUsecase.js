import { getOrderById } from "../../repositories/orderRepository.js";
import { getUserByUsername } from "../../repositories/userRepository.js";
import CustomError from "../../utils/errors/customError.js";

async function getOrderByIdUsecase(id, username) {
    const order = await getOrderById(id);
    if(!order) throw new CustomError(404, "Order not found");

    const user = await getUserByUsername(username);
    if(user?.id !== Number(order.clientId)) throw new CustomError(403, "You don't have permission to access the orders of other users");

    return order;
}

export {
    getOrderByIdUsecase,
};
