import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { getUserByUsername, updateUserById } from "../../repositories/userRepository.js";
import { JWT_CONFIGS } from "../../utils/configs/jwt.js";
import CustomError from "../../utils/errors/customError.js";

async function loginUserUseCase({ username, password }) {
    const user = await getUserByUsername(username);

    if(!user || !(await bcrypt.compare(password, user?.password))) {
        throw new CustomError(400, "Invalid credentials");
    }

    const accessToken = jwt.sign(
        {
            username: user.username,
            role: user.role,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: JWT_CONFIGS.ACCESS_TOKEN_EXPIRE_TIMEOUT }
    );
    const refreshToken = jwt.sign(
        { username: user.username },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: JWT_CONFIGS.REFRESH_TOKEN_EXPIRE_TIMEOUT }
    );

    const updatedUser = { ...user, refreshToken };
    await updateUserById(user.id, updatedUser);

    return { accessToken, refreshToken };
}

export {
    loginUserUseCase,
};
