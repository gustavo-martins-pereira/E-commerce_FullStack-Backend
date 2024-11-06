import { jwtDecode } from "jwt-decode";

import { getUserByRefreshToken, getUserByUsername, updateUserById } from "../../repositories/userRepository.js";
import CustomError from "../../utils/errors/customError.js";

async function logoutUseCase(refreshToken) {
    let user = await getUserByRefreshToken(refreshToken);
    if(!user) {
        user = await getUserByUsername(jwtDecode(refreshToken).username);

        if(!user) throw new CustomError(401, "Unauthorized");
    }

    const updatedUser = { ...user, refreshToken: null };
    await updateUserById(user.id, updatedUser);
}

export {
    logoutUseCase,
};
