import { matchedData, validationResult } from "express-validator";

import { registerUserUseCase } from "../services/user/registerUserUsecase.js";
import { loginUserUseCase } from "../services/user/loginUserUsecase.js";
import { getUserByUsernameUsecase } from "../services/user/getUserByUsernameUsecase.js";
import { refreshTokenUseCase } from "../services/user/refreshTokenUsecase.js";
import { logoutUseCase } from "../services/user/logoutUsecase.js";
import CustomError from "../utils/errors/customError.js";
import { getRefreshTokenMaxAge } from "../utils/jwt.js";

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
        const { accessToken, refreshToken, loginMaxAge } = await loginUserUseCase({ username, password });

        const isProduction = process.env.NODE_ENV === "production";
        response.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: getRefreshTokenMaxAge(),
            sameSite: isProduction ? "None" : "Lax",
            secure: isProduction,
        });

        return response.status(200).json({ accessToken, loginMaxAge });
    }catch(error) {
        return response.status(error instanceof CustomError ? error.statusCode : 500).json({ error: error.message});
    }
}

async function refreshToken(request, response) {
    try {
        const refreshToken = request.cookies.refreshToken;
        if(!refreshToken) return response.status(401).json({ error: "No token provided" });

        const accessToken = await refreshTokenUseCase(refreshToken);
        
        return response.status(200).json({ accessToken });
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

async function logout(request, response) {
    try {
        const refreshToken = request.cookies.refreshToken;
        if(!refreshToken) return response.status(401).json({ error: "No token provided" });
        
        await logoutUseCase(refreshToken);

        response.clearCookie("refreshToken");

        return response.status(200).json({ message: "Logged out successfully" });
    } catch(error) {
        return response.status(error instanceof CustomError? error.statusCode : 500).json({ error: error.message});
    }
}

export {
    registerUser,
    loginUser,
    refreshToken,
    getUserByUsername,
    logout,
};
