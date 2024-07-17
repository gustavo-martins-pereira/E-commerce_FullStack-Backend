import { createOrderItem } from "../../repositories/orderItemRepository.js";

async function createOrderItemUsecase({ quantity, price, subtotal, orderId, productId }) {
    return await createOrderItem({ quantity, price, subtotal, orderId, productId });
}

export {
    createOrderItemUsecase,
};
