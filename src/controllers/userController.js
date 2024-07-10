import { matchedData, validationResult } from "express-validator";
import { registerUserUseCase } from "../services/registerUserUsecase.js";
import CustomError from "../utils/errors/customError.js";
import { loginUserUseCase } from "../services/loginUserUsecase.js";

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
    try {
        const {
            username,
            password
        } = request.body;
        const user = await loginUserUseCase({ username, password });

        return response.status(200).json(user);
    }catch(error) {
        return response.status(error instanceof CustomError ? error.statusCode : 500).json({ error: error.message});
    }
}

export {
    registerUser,
    loginUser,
};
