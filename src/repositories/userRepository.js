import db from "../db/models/index.js";

const { User } = db;

async function createUser({ username, password, role }) {
    return await User.create({ username, password, role });
}

export {
    createUser,
};
