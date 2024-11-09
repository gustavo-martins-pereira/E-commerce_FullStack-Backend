import { getUserById } from "../../repositories/userRepository.js";

async function getUserByIdUsecase(id) {
    return await getUserById(id);
}

export {
    getUserByIdUsecase,
};