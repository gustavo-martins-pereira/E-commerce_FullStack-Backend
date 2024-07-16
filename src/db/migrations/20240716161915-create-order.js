'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('orders', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            total: {
                type: Sequelize.FLOAT,
                allowNull: false,
            },
            status: {
                type: Sequelize.ENUM("PENDING", "SHIPPED", "DELIVERED"),
                allowNull: false,
            },
            client_id: {
                type: Sequelize.DataTypes.INTEGER,
                references: {
                    model: {
                        tableName: "users",
                    },
                    key: "id",
                },
                allowNull: false,
            },
            seller_id: {
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
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.fn("now"),
            },
            updated_at: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.fn("now"),
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('orders');
    }
};