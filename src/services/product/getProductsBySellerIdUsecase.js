import { getProductsBySellerId } from "../../repositories/productRepository.js";

async function getProductsBySellerIdUsecase(sellerId) {
    // FIXME: If seller is not found, returning 404
    return await getProductsBySellerId(sellerId);
}

export {
    getProductsBySellerIdUsecase,
};
