import { createOrderItem } from "../../repositories/orderItemRepository.js";
import { getProductById } from "../../repositories/productRepository.js";
import CustomError from "../../utils/errors/customError.js";

async function createOrderItemUsecase({ quantity, price, subtotal, orderId, productId }) {
    const product = await getProductById(productId);
    if(!product) throw new CustomError(404, "Product not found");

    return await createOrderItem({ quantity, price, subtotal, orderId, productId });
}

export {
    createOrderItemUsecase,
};
