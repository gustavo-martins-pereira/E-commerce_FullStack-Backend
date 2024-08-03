import db from "../db/models/index.js";

const { User } = db;

async function createUser({ username, password, role }) {
    return await User.create({ username, password, role });
}

async function getUserById(id) {
    return await User.findByPk(id);
}

async function getUserByUsername(username) {
    return await User.findOne({ where: { username } });
}

async function updateUserById(id, updatedUser) {
    return await User.update(updatedUser, {
        where: { id },
        returning: true,
    });
}

export {
    createUser,
    getUserById,
    getUserByUsername,
    updateUserById,
};
