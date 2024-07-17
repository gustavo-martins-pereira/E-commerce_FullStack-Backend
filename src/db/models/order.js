'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Order extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // User
            Order.belongsTo(models.User, { foreignKey: "clientId", as: "client" });
            Order.belongsTo(models.User, { foreignKey: "sellerId", as: "seller" });

            // OrderItem
            Order.belongsToMany(models.Product, { through: models.OrderItem, foreignKey: "orderId" });
        }
    }

    Order.init({
        total: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Total is required",
                },
                isDecimal: {
                    msg: "Total must be a decimal number",
                },
                min: {
                    args: [0],
                    msg: "Total must be greater than or equal to 0",
                },
            },
        },
        status: {
            type: DataTypes.ENUM("PENDING", "SHIPPED", "DELIVERED"),
            allowNull: false,
            defaultValue: "PENDING",
            validate: {
                notNull: {
                    msg: "Status is required",
                },
                isIn: {
                    args: [["PENDING", "SHIPPED", "DELIVERED"]],
                    msg: "Status must be PENDING, SHIPPED, or DELIVERED",
                },
            },
        },
        clientId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Client ID is required",
                },
                isInt: {
                    msg: "Client ID must be an integer",
                },
                min: {
                    args: [0],
                    msg: "Client ID must be a positive integer",
                },
            },
        },
        sellerId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Seller ID is required",
                },
                isInt: {
                    msg: "Seller ID must be an integer",
                },
                min: {
                    args: [0],
                    msg: "Seller ID must be a positive integer",
                },
            },
        },
    }, {
        sequelize,
        modelName: "Order",
        tableName: "orders",
        underscored: true,
        indexes: [
            {
                unique: true,
                fields: ['clientId', 'sellerId'],
            },
        ],
    });

    return Order;
};
