import jwt from "jsonwebtoken";

import { getUserByRefreshToken } from "../../repositories/userRepository.js";
import CustomError from "../../utils/errors/customError.js";

async function refreshTokenUseCase(refreshToken) {
    const user = await getUserByRefreshToken(refreshToken);
    if(!user) throw new CustomError(401, "Unauthorized");

    return jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if(err || user.username !== decoded.username) throw new CustomError(403, "Invalid credentials");

            const accessToken = jwt.sign(
                { username: decoded.username },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "1m" }
            );

            return accessToken;
        }
    );
}

export {
    refreshTokenUseCase,
};
