import { getProductsBySellerId } from "../../repositories/productRepository.js";

async function getProductsBySellerIdUsecase(sellerId) {
    return await getProductsBySellerId(sellerId);
}

export {
    getProductsBySellerIdUsecase,
};
