import db from "../db/models/index.js";

const { Image } = db;

async function createImage({ name, data }) {
    return await Image.create({ name, data });
}

export {
    createImage,
};
