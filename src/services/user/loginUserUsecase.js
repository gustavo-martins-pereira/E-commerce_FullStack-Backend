import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { getUserByUsername } from "../../repositories/userRepository.js";
import CustomError from "../../utils/errors/customError.js";

async function loginUserUseCase({ username, password }) {
    const user = await getUserByUsername(username);

    if(!user || !(await bcrypt.compare(password, user?.password))) {
        throw new CustomError(400, "Invalid credentials");
    }

    const token = jwt.sign({ username: user.username, password: user.password}, process.env.JWT_KEY, {expiresIn: 3600});

    return token;
}

export {
    loginUserUseCase,
};
