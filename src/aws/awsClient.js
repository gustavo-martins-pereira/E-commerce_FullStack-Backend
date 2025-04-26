import { S3Client } from "@aws-sdk/client-s3";

const region = process.env.S3_BUCKET_REGION;
const accessKeyId = process.env.S3_BUCKET_ACCESS_KEY;
const secretAccessKey = process.env.S3_BUCKET_SECRET_ACCESS_KEY;

const s3Client = new S3Client({
    region,
    credentials: {
        accessKeyId,
        secretAccessKey,
    }
});

export {
    s3Client,
};
