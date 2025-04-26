import crypto from "crypto";

function generateRandomImageName(bytes = 32) {
    return crypto.randomBytes(bytes).toString("hex");
}

export {
    generateRandomImageName,
};
