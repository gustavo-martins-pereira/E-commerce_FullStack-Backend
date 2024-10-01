'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn("products", "image_id", {
            type: Sequelize.INTEGER,
            references: {
                model: "images",
                key: "id",
            },
            allowNull: false,
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn("products", "image_id");
    }
};
