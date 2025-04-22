import { redisClient } from "../redisClient.js";

const ALL_PRODUCTS_CACHE_KEY = "product:all";
const ALL_PRODUCTS_UPDATED_KEY = "product:all:is_updated";
const ALL_PRODUCTS_FETCHING_KEY = "product:all:is_fetching";

async function getAllProductsCache() {
    const productsCache = await redisClient.get(ALL_PRODUCTS_CACHE_KEY);

    return JSON.parse(productsCache);
}

async function setAllProductsCache(products) {
    await redisClient.set(ALL_PRODUCTS_CACHE_KEY, JSON.stringify(products));
}

async function isProductsCacheOutdated() {
    const updated = await redisClient.get(ALL_PRODUCTS_UPDATED_KEY);

    return !updated;
}

async function isFetching() {
    const fetching = await redisClient.get(ALL_PRODUCTS_FETCHING_KEY);

    return Boolean(fetching);
}

async function setFetchingFlag(expiry = 15) {
    await redisClient.set(ALL_PRODUCTS_FETCHING_KEY, "true", { EX: expiry });
}

async function updateCache(products, cacheExpiry = 60) {
    await setAllProductsCache(products);
    await redisClient.set(ALL_PRODUCTS_UPDATED_KEY, "true", { EX: cacheExpiry });
}

async function clearFetchingFlag() {
    await redisClient.del(ALL_PRODUCTS_FETCHING_KEY);
}

export {
    getAllProductsCache,
    setAllProductsCache,
    isProductsCacheOutdated,
    setFetchingFlag,
    clearFetchingFlag,
    isFetching,
    updateCache,
};
