import { matchedData, validationResult } from "express-validator";
import { registerUserUseCase } from "../services/user/registerUserUsecase.js";
import CustomError from "../utils/errors/customError.js";
import { loginUserUseCase } from "../services/user/loginUserUsecase.js";
import { getUserByUsernameUsecase } from "../services/user/getUserByUsernameUsecase.js";

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
        const tokens = await loginUserUseCase({ username, password });

        response.cookie("token", tokens.refreshToken, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 });
        return response.status(200).json({ token: tokens.accessToken });
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
    getUserByUsername,
};
