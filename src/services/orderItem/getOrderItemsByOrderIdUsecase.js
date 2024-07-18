import { getOrderItemsByOrderId } from "../../repositories/orderItemRepository.js";

async function getOrderItemsByOrderIdUsecase(orderId) {
    return await getOrderItemsByOrderId(orderId);
}

export {
    getOrderItemsByOrderIdUsecase,
};
