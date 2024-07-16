'use strict';
const {
    Model
} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // Product
            User.hasMany(models.Product, { foreignKey: "ownerId" });

            //Order
            User.hasMany(models.Order, { foreignKey: "clientId" });
            User.hasMany(models.Order, { foreignKey: "sellerId" });
        }
    }

    User.init({
        username: {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Username is required",
                },
                notEmpty: {
                    msg: "Username cannot be empty",
                },
                len: {
                    args: [5, 50],
                    msg: "Username must be between 5 and 50 characters long",
                },
                isAlphanumeric: {
                    msg: "Username can only contain letters and numbers",
                },
            },
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Password is required",
                },
                notEmpty: {
                    msg: "Password cannot be empty",
                },
                len: {
                    args: [8, 255],
                    msg: "Password must be between 8 and 255 characters long",
                },
            },
        },
        role: {
            type: DataTypes.ENUM("USER", "SELLER"),
            allowNull: false,
            defaultValue: "USER",
            validate: {
                notNull: {
                    msg: "Role is required",
                },
                isIn: {
                    args: [["USER", "SELLER"]],
                    msg: "Role must be USER or SELLER",
                },
            },
        },
    }, {
        sequelize,
        modelName: "User",
        tableName: "users",
        underscored: true,
    });

    return User;
};
