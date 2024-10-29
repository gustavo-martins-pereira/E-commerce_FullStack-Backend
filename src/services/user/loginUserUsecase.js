import bcrypt from "bcrypt";
import { jwtDecode } from "jwt-decode";

import { getUserByUsername, updateUserById } from "../../repositories/userRepository.js";
import CustomError from "../../utils/errors/customError.js";
import { generateAccessToken, generateRefreshToken } from "../../utils/jwt.js";

async function loginUserUseCase({ username, password }) {
    const user = await getUserByUsername(username);
    if(!user || !(await bcrypt.compare(password, user?.password))) {
        throw new CustomError(400, "Invalid credentials");
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    const { exp } = jwtDecode(refreshToken);

    const updatedUser = { ...user, refreshToken };
    await updateUserById(user.id, updatedUser);

    return { accessToken, refreshToken, loginMaxAge: exp * 1000 };
}

export {
    loginUserUseCase,
};
