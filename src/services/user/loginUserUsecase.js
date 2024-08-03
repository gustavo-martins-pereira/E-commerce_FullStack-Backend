import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { getUserByUsername, updateUserById } from "../../repositories/userRepository.js";
import CustomError from "../../utils/errors/customError.js";

async function loginUserUseCase({ username, password }) {
    const user = await getUserByUsername(username);

    if(!user || !(await bcrypt.compare(password, user?.password))) {
        throw new CustomError(400, "Invalid credentials");
    }


    const accessToken = jwt.sign(
        { username: user.username },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1m" }
    );
    const refreshToken = jwt.sign(
        { username: user.username },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "1h" }
    );

    const updatedUser = { ...user, refreshToken };
    await updateUserById(user.id, updatedUser);

    return { accessToken, refreshToken };
}

export {
    loginUserUseCase,
};
