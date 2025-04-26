'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.removeColumn("products", "image_id");

        await queryInterface.addColumn("products", "image_name", {

            type: Sequelize.STRING,
            allowNull: false,
        });

        await queryInterface.dropTable("images");
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.createTable("images", {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
            },
            name: {
                type: Sequelize.STRING(255),
                allowNull: false,
                unique: true,
            },
            data: {
                type: Sequelize.BLOB,
                allowNull: false,
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.fn("now"),
            },
            updated_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.fn("now"),
            }
        });

        await queryInterface.removeColumn("products", "image_name");

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
    }
};
