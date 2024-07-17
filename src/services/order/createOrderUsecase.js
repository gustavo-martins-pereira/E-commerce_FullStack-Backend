import { createOrder } from "../../repositories/orderRepository.js";

async function createOrderUseCase({ total, status, clientId, sellerId }) {
    return await createOrder({ total, status, clientId, sellerId });
}

export {
    createOrderUseCase,
};
