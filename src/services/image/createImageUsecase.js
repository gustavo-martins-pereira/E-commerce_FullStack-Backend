import { createImage } from "../../repositories/imageRepository.js";

async function createImageUsecase({ name, data }) {
    const formattedName = name.replace(/\.[^/.]+$/, "");
    const timeStampName = `${(new Date()).getTime()}_${formattedName}`;

    return await createImage({ name: timeStampName, data });
}

export {
    createImageUsecase,
};
