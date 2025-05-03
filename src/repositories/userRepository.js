import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function createUser({ username, password, role }) {
    return await prisma.users.create({
        data: {
            username,
            password,
            role
        },
    });
}

async function getUserById(id) {
    return await prisma.users.findUnique({ where: { id } });
}

async function getUserByUsername(username) {
    return await prisma.users.findUnique({ where: { username } });
}

async function getUserByRefreshToken(refreshToken) {
    return await prisma.users.findFirst({
        where: {
            refresh_token: refreshToken,
        },
    });
}

async function updateUserById(id, updatedUser) {
    return await prisma.users.update({
        where: { id },
        data: {
            refresh_token: updatedUser.refreshToken,
        },
    });
}

export {
    createUser,
    getUserById,
    getUserByUsername,
    getUserByRefreshToken,
    updateUserById,
};
