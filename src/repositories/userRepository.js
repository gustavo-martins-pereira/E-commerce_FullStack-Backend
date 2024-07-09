import db from "../db/models/index.js";

const { User } = db;

async function createUser({ username, password, role }) {
    return await User.create({ username, password, role });
}

async function getUserByUsername(username) {
    return await User.findOne({ where: { username } });
}

export {
    createUser,
    getUserByUsername,
};
