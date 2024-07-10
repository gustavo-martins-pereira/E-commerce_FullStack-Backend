import { createUser, getUserByUsername } from "../repositories/userRepository.js";
import hashPassword from "../utils/encryption.js";
import CustomError from "../utils/errors/customError.js";

async function registerUserUseCase({ username, password, role }) {
    const existingUser = await getUserByUsername(username);
    if(existingUser) {
        throw new CustomError(409, "Username already exists");
    }

    const hashedPassword = await hashPassword(password);

    return await createUser({
        username,
        password: hashedPassword,
        role
    });
}

export {
    registerUserUseCase,
};
