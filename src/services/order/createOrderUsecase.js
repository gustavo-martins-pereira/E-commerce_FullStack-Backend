import { createOrder } from "../../repositories/orderRepository.js";
import { getUserById } from "../../repositories/userRepository.js";
import CustomError from "../../utils/errors/customError.js";

async function createOrderUseCase({ total, status, clientId, sellerId }) {
    if(clientId === sellerId) throw new CustomError(400, "clientId and sellerId cannot be the same");

    const client = await getUserById(clientId);
    if(!client) throw new CustomError(404, "Client not found");
    
    const seller = await getUserById(sellerId);
    if(!seller) throw new CustomError(404, "Seller not found");

    return await createOrder({ total, status, clientId, sellerId });
}

export {
    createOrderUseCase,
};
