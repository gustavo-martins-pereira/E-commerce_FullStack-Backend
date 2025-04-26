import {
    getAllProductsCache,
    isProductsCacheOutdated,
    isFetching,
    setFetchingFlag,
    clearFetchingFlag,
    updateCache,
} from "../../redis/services/productRedisService.js";
import { getAllProducts } from "../../repositories/productRepository.js";

async function getAllProductsUseCase() {
    const isOutdated = await isProductsCacheOutdated();

    if(isOutdated) {
        const fetching = await isFetching();

        if(!fetching) {
            await setFetchingFlag();

            setTimeout(async () => {
                const products = await getAllProducts();
                await updateCache(products);
                await clearFetchingFlag();
            }, 0);
        }
    }

    return await getAllProductsCache();
}

export { getAllProductsUseCase };
