'use strict';

const { totalOfProducts } = require("../config/seedParams");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const faker = require("@faker-js/faker").fakerEN_US;

        const sellers = await queryInterface.sequelize.query(
            "SELECT * FROM users WHERE role = 'SELLER';",
            { type: Sequelize.QueryTypes.SELECT },
        );

        const products = [];
        for(let i = 0; i < totalOfProducts; i++) {
            const randomSeller = sellers[Math.floor(Math.random() * sellers.length)];

            products.push({
                name: faker.commerce.productName(),
                description: faker.commerce.productDescription(),
                price: faker.number.float({ min: 10, max: 500, fractionDigits: 2 }),
                owner_id: randomSeller.id,
            });
        }

        await queryInterface.bulkInsert("products", products, {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("products", null, {});
    }
};
