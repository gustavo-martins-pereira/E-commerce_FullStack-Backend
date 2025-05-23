import sharp from "sharp";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { DeleteObjectCommand, GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";

import { s3Client } from "../awsClient.js";

const bucketName = process.env.S3_BUCKET_NAME;

async function saveImage(file, imageName) {
    const fileBuffer = await sharp(file.buffer)
            .resize({ height: 1080, width: 1920, fit: "contain" })
            .toBuffer();

    const s3Params = {
        Bucket: bucketName,
        Key: imageName,
        Body: fileBuffer,
        ContentType: file.mimetype,
    };

    const command = new PutObjectCommand(s3Params);
    await s3Client.send(command);
}

async function getImageUrl(imageName) {
    const s3Params = {
        Bucket: bucketName,
        Key: imageName,
    };

    const command = new GetObjectCommand(s3Params);
    return await getSignedUrl(s3Client, command, { expiresIn: 3600 });
}

async function deleteImageByName(imageName) {
    const s3Params = {
        Bucket: bucketName,
        Key: imageName,
    };

    const command = new DeleteObjectCommand(s3Params);
    await s3Client.send(command);
}

export {
    saveImage,
    getImageUrl,
    deleteImageByName,
};
