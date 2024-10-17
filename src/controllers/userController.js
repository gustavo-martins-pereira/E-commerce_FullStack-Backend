import { matchedData, validationResult } from "express-validator";
import { registerUserUseCase } from "../services/user/registerUserUsecase.js";
import CustomError from "../utils/errors/customError.js";
import { loginUserUseCase } from "../services/user/loginUserUsecase.js";
import { getUserByUsernameUsecase } from "../services/user/getUserByUsernameUsecase.js";
import { refreshTokenUseCase } from "../services/user/refreshTokenUsecase.js";

async function registerUser(request, response) {
    const result = validationResult(request);

    if(!result.isEmpty()) {
        return response.status(400).json({ errors: result.array() });
    }

    try {
        const {
            username,
            password,
            role
        } = matchedData(request);
        
        const user = await registerUserUseCase({ username, password, role });

        return response.status(201).json(user);
    }catch(error) {
        return response.status(error instanceof CustomError ? error.statusCode : 500).json({ error: error.message});
    }
};

async function loginUser(request, response) {
    const result = validationResult(request);

    if(!result.isEmpty()) {
        return response.status(400).json({ errors: result.array() });
    }

    try {
        const {
            username,
            password
        } = request.body;
        const { accessToken, refreshToken } = await loginUserUseCase({ username, password });

        response.cookie("token", refreshToken, { httpOnly: true, maxAge: 1000 * 60 * 60 });
        return response.status(200).json({ token: accessToken });
    }catch(error) {
        return response.status(error instanceof CustomError ? error.statusCode : 500).json({ error: error.message});
    }
}

async function refreshToken(request, response) {
    try {
        const cookies = request.cookies;

        if(!cookies?.token) return response.status(401).json({ error: "Unauthorized" });
        const refreshToken = cookies.token;

        const accessToken = await refreshTokenUseCase(refreshToken);
        
        return response.status(200).json({ token: accessToken });
    }catch(error) {
        return response.status(error instanceof CustomError ? error.statusCode : 500).json({ error: error.message});
    }
}

async function getUserByUsername(request, response) {
    const result = validationResult(request);

    if (!result.isEmpty()) {
        return response.status(400).json({ errors: result.array() });
    }

    try {
        const user = await getUserByUsernameUsecase(request.params.username);

        return user ? response.status(200).json(user) : response.status(404).json({message: "User not found"});
    } catch(error) {
        return response.status(error instanceof CustomError ? error.statusCode : 500).json({ error: error.message});
    }
}

export {
    registerUser,
    loginUser,
    refreshToken,
    getUserByUsername,
};
