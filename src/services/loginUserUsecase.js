import bcrypt from "bcrypt";

import { getUserByUsername } from "../repositories/userRepository.js";
import CustomError from "../utils/errors/customError.js";

async function loginUserUseCase({ username, password }) {
    const user = await getUserByUsername(username);

    if(!user || !(await bcrypt.compare(password, user?.password))) {
        throw new CustomError(400, "Invalid credentials");
    }

    return {username, password};
}

export {
    loginUserUseCase,
};
