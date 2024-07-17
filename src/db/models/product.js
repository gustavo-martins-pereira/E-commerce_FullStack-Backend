'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Product extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // User
            Product.belongsTo(models.User, { foreignKey: "ownerId" });

            // Order
            Product.belongsToMany(models.Order, { through: models.OrderItem, foreignKey: "productId" });
        }
    }

    Product.init({
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Product name is required",
                },
                notEmpty: {
                    msg: "Product name cannot be empty",
                },
                len: {
                    args: [5, 100],
                    msg: "Product name must be between 5 and 100 characters long",
                },
            },
        },
        description: {
            type: DataTypes.TEXT,
            validate: {
                notEmpty: {
                    msg: "Product description cannot be empty",
                },
            },
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Product price is required",
                },
                isDecimal: {
                    msg: "Product price must be a decimal number",
                },
                min: {
                    args: [0],
                    msg: "Product price must be greater than or equal to 0",
                },
            },
        },
        ownerId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Owner ID is required",
                },
                isInt: {
                    msg: "Owner ID must be an integer",
                },
                min: {
                    args: [0],
                    msg: "Owner ID must be a positive integer",
                },
            },
        },
    }, {
        sequelize,
        modelName: "Product",
        tableName: "products",
        underscored: true,
        indexes: [
            {
                unique: true,
                fields: ['name', 'ownerId'],
            },
        ],
    });

    return Product;
};
