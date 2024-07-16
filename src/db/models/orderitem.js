'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class OrderItem extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // Order
            OrderItem.belongsTo(models.Order, { foreignKey: "orderId", as: "order" });

            // Product
            OrderItem.belongsTo(models.Product, { foreignKey: "productId", as: "product" });
        }
    }

    OrderItem.init({
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Quantity is required",
                },
                isInt: {
                    msg: "Quantity must be an integer",
                },
                min: {
                    args: [1],
                    msg: "Quantity must be at least 1",
                },
            },
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Price is required",
                },
                isDecimal: {
                    msg: "Price must be a decimal number",
                },
                min: {
                    args: [0],
                    msg: "Price must be greater than or equal to 0",
                },
            },
        },
        subtotal: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Subtotal is required",
                },
                isDecimal: {
                    msg: "Subtotal must be a decimal number",
                },
                min: {
                    args: [0],
                    msg: "Subtotal must be greater than or equal to 0",
                },
            },
        },
        orderId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Order ID is required",
                },
                isInt: {
                    msg: "Order ID must be an integer",
                },
                min: {
                    args: [0],
                    msg: "Order ID must be a positive integer",
                },
            },
        },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Product ID is required",
                },
                isInt: {
                    msg: "Product ID must be an integer",
                },
                min: {
                    args: [0],
                    msg: "Product ID must be a positive integer",
                },
            },
        },
    }, {
        sequelize,
        modelName: "OrderItem",
        tableName: "order_items",
        underscored: true,
        indexes: [
            {
                unique: true,
                fields: ["orderId", "productId"],
            },
        ],
    });

    return OrderItem;
};
