import { createUser } from "../repositories/userRepository.js";

async function registerUserUseCase({ username, password, role }) {
    return await createUser({ username, password, role });
}

export {
    registerUserUseCase,
};
