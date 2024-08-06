'use strict';

const { totalOfUsers } = require("../config/seedParams.js");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const faker = require("@faker-js/faker").fakerEN_US;

        const users = [];
        const { default: USER_ROLES } = await import("../../utils/enums/userRoles.js");
        const userRoles = Object.keys(USER_ROLES);
        for(let i = 0; i < totalOfUsers; i++) {
            const randomNumber = Math.floor(Math.random() * Object.values(USER_ROLES).length);

            users.push({
                username: faker.person.firstName(),
                password: faker.internet.password({ length: 10 }),
                role: userRoles[randomNumber],
            });
        }

        await queryInterface.bulkInsert("users", users, {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("users", null, {});
    }
};
