import { createClient } from "redis";

const redisClient = createClient({
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
    },
});

redisClient.on("error", (err) => {
    console.error("Redis connection error:", err);
});

(async () => {
    try {
        await redisClient.connect();
        console.log("Redis client connected successfully");
    } catch (error) {
        console.error("Failed to connect to Redis:", error);
    }
})();

export {
    redisClient
};
