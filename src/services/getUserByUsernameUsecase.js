import { getUserByUsername } from "../repositories/userRepository.js";

async function getUserByUsernameUsecase(username) {
    return await getUserByUsername(username);
}

export {
    getUserByUsernameUsecase,
};