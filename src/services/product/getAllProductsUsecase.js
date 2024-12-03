import {
    getAllProductsCache,
    isCacheStale,
    isFetching,
    setFetchingFlag,
    clearFetchingFlag,
    updateCache,
} from "../../redis/services/productRedisService.js";
import { getAllProducts } from "../../repositories/productRepository.js";

async function getAllProductsUseCase() {
    const cachedProducts = await getAllProductsCache();
    if(cachedProducts) return cachedProducts;

    if(await isCacheStale()) {
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

    return await getAllProducts();
}

export { getAllProductsUseCase };
