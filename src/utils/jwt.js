import jwt from "jsonwebtoken";

import { JWT_CONFIGS } from "./configs/jwt.js";

/**
 * Calculates the maxAge in milliseconds based on the REFRESH_TOKEN_EXPIRE_TIMEOUT in JWT_CONFIGS.
 *
 * @function getRefreshTokenMaxAge
 * @returns {number} The maxAge in milliseconds.
 * @throws {Error} Throws an error if the time unit in REFRESH_TOKEN_EXPIRE_TIMEOUT is invalid.
 *
 * @example
 * // Example usage:
 * const maxAge = getRefreshTokenMaxAge();
 * console.log(maxAge); // Output: 86400000 (1 day in milliseconds)
 */
function getRefreshTokenMaxAge() {
    const [value, unit] = JWT_CONFIGS.REFRESH_TOKEN_EXPIRE_TIMEOUT.match(/(\d+)([smhd])/).slice(1);
    switch (unit) {
        case "s": return value * 1000;                  // seconds to milliseconds
        case "m": return value * 1000 * 60;             // minutes to milliseconds
        case "h": return value * 1000 * 60 * 60;        // hours to milliseconds
        case "d": return value * 1000 * 60 * 60 * 24;   // days to milliseconds
        default: throw new Error("Invalid time unit for refresh token expiration");
    }
};

function generateAccessToken(user) {
    return jwt.sign(
        {
            username: user.username,
            role: user.role,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: JWT_CONFIGS.ACCESS_TOKEN_EXPIRE_TIMEOUT }
    );
}

function generateRefreshToken(user) {
    return jwt.sign(
        {
            username: user.username,
            role: user.role,
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: JWT_CONFIGS.REFRESH_TOKEN_EXPIRE_TIMEOUT }
    );
}

export {
    getRefreshTokenMaxAge,
    generateAccessToken,
    generateRefreshToken,
};
