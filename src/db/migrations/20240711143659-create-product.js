'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("products", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            name: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            description: {
                type: Sequelize.TEXT,
            },
            price: {
                type: Sequelize.FLOAT,
                allowNull: false,
            },
            owner_id: {
                type: Sequelize.DataTypes.INTEGER,
                references: {
                    model: {
                        tableName: "users",
                    },
                    key: "id",
                },
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
            },
        });

        await queryInterface.addConstraint("products", {
            fields: ["name", "owner_id"],
            type: "unique",
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("products");
    }
};