'use strict';

const { totalOfProducts } = require("../config/seedParams");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        async function streamToBuffer(stream) {
            const chunks = [];
            for await (const chunk of stream) {
                chunks.push(chunk);
            }
    
            return Buffer.concat(chunks);
        }

        const faker = require("@faker-js/faker").fakerEN_US;

        const sellers = await queryInterface.sequelize.query(
            "SELECT * FROM users WHERE role = 'SELLER';",
            { type: Sequelize.QueryTypes.SELECT },
        );

        // Images Creation
        const images = [];
        for (let i = 1; i <= totalOfProducts; i++) {
            const imageUrl = `https://picsum.photos/seed/${i}/200/300`;

            const response = await fetch(imageUrl);
            const imageData = await streamToBuffer(response.body);

            images.push({
                name: `${(new Date()).getTime()}_image_${i}`,
                data: imageData,
            });
        }

        await queryInterface.bulkInsert("images", images, {});

        const imagesId = await queryInterface.sequelize.query(
            "SELECT id FROM images;",
            { type: Sequelize.QueryTypes.SELECT }
        );


        // Products Creation
        const products = [];
        for (let i = 0; i < totalOfProducts; i++) {
            const randomSeller = sellers[Math.floor(Math.random() * sellers.length)];

            products.push({
                name: faker.commerce.productName(),
                description: faker.commerce.productDescription(),
                price: faker.number.float({ min: 10, max: 500, fractionDigits: 2 }),
                owner_id: randomSeller.id,
                image_id: imagesId[i].id,
            });
        }

        await queryInterface.bulkInsert("products", products, {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("products", null, {});
    }
};
