import { createUser } from "../repositories/userRepository.js";
import hashPassword from "../utils/encryption.js";

async function registerUserUseCase({ username, password, role }) {
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
