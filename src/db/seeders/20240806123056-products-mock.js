'use strict';

const env = require("dotenv");
const { totalOfProducts } = require("../config/seedParams");
const sharp = require("sharp");
const crypto = require("crypto");
const { PutObjectCommand, S3Client } = require("@aws-sdk/client-s3");
const { generateRandomImageName } = require("../../utils/image");

env.config();

const bucketName = process.env.S3_BUCKET_NAME;
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

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const faker = require("@faker-js/faker").fakerEN_US;

        const sellers = await queryInterface.sequelize.query(
            "SELECT * FROM users WHERE role = 'SELLER';",
            { type: Sequelize.QueryTypes.SELECT },
        );

        // Products Creation
        const products = [];
        for (let i = 0; i < totalOfProducts; i++) {
            const randomSeller = sellers[Math.floor(Math.random() * sellers.length)];
            
            const imageUrl = `https://picsum.photos/seed/${i}/200/300`;
            const response = await fetch(imageUrl);
            const imageBuffer = await response.arrayBuffer();
            
            const processedImage = await sharp(Buffer.from(imageBuffer))
                .resize({ height: 1080, width: 1920, fit: "contain" })
                .toBuffer();

            const randomImageName = generateRandomImageName();

            // Upload to S3
            const s3Params = {
                Bucket: bucketName,
                Key: randomImageName,
                Body: processedImage,
                ContentType: 'image/jpeg',
            };

            const command = new PutObjectCommand(s3Params);
            await s3Client.send(command);

            products.push({
                name: faker.commerce.productName(),
                description: faker.commerce.productDescription(),
                price: faker.number.float({ min: 10, max: 500, fractionDigits: 2 }),
                owner_id: randomSeller.id,
                image_name: randomImageName,
            });
        }

        await queryInterface.bulkInsert("products", products, {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("products", null, {});
    }
};
