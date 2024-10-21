import { getUserByRefreshToken, updateUserById } from "../../repositories/userRepository.js";
import CustomError from "../../utils/errors/customError.js";

async function logoutUseCase(refreshToken) {
    const user = await getUserByRefreshToken(refreshToken);
    if(!user) throw new CustomError(401, "Unauthorized");

    const updatedUser = { ...user, refreshToken: null };
    await updateUserById(user.id, updatedUser);
}

export {
    logoutUseCase,
};
