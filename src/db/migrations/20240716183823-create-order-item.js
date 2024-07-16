'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("order_items", {
            order_id: {
                type: Sequelize.DataTypes.INTEGER,
                references: {
                    model: {
                        tableName: "orders",
                    },
                    key: "id",
                },
                allowNull: false,
                primaryKey: true,
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },
            product_id: {
                type: Sequelize.DataTypes.INTEGER,
                references: {
                    model: {
                        tableName: "products",
                    },
                    key: "id",
                },
                allowNull: false,
                primaryKey: true,
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },
            quantity: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            price: {
                type: Sequelize.FLOAT,
                allowNull: false,
            },
            subtotal: {
                type: Sequelize.FLOAT,
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
            },
        });

        await queryInterface.removeConstraint("order_items", "order_items_pkey", {
            type: "primary key",
        });

        await queryInterface.addConstraint("order_items", {
            fields: ["order_id", "product_id"],
            type: "primary key",
            name: "order_items_pkey",
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("order_items");
    }
};