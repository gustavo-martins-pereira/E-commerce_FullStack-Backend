import { registerUserUseCase } from "../services/registerUserUsecase.js";

async function registerUser(request, response) {
    try {
        const {
            username,
            password,
            role
        } = request.body;
        const user = await registerUserUseCase({ username, password, role });

        response.json(user);
    } catch (error) {
        response.status(500).send('Internal Server Error');
    }
};

export {
    registerUser,
};
