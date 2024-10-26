import bcrypt from "bcrypt";

import { getUserByUsername, updateUserById } from "../../repositories/userRepository.js";
import CustomError from "../../utils/errors/customError.js";
import { generateAccessToken, generateRefreshToken } from "../../utils/jwt.js";

async function loginUserUseCase({ username, password }) {
    const existingUser = await getUserByUsername(username);

    if(!existingUser || !(await bcrypt.compare(password, existingUser?.password))) {
        throw new CustomError(400, "Invalid credentials");
    }

    const accessToken = generateAccessToken(existingUser);
    const refreshToken = generateRefreshToken(existingUser);

    const updatedUser = { ...existingUser, refreshToken };
    const user = (await updateUserById(existingUser.id, updatedUser, { plain: true }))[1];

    return { accessToken, refreshToken, user: { username: user.username, role: user.role }};
}

export {
    loginUserUseCase,
};
