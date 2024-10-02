import { createImage } from "../../repositories/imageRepository.js";

async function createImageUsecase({ name, data }) {
    const timeStampName = `${(new Date()).getTime()}_${name}`;

    return await createImage({ name: timeStampName, data });
}

export {
    createImageUsecase,
};
