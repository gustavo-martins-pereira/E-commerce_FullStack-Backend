import bcrypt from "bcrypt";

async function hashPassword(password) {
    try {
        const saltRounds = 2;

        return await bcrypt.hash(password, saltRounds);
    } catch (err) {
        throw err;
    }
}

export default hashPassword;