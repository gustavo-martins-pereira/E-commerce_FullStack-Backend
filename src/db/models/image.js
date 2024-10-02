'use strict';

const {
    Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Image extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Image.hasOne(models.Product, { foreignKey: "imageId" });
        }
    }
    Image.init({
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Image name is required",
                },
                notEmpty: {
                    msg: "Image name cannot be empty",
                },
                len: {
                    args: [5, 255],
                    msg: "Image name must be between 5 and 255 characters long",
                },
            },
        },
        data: {
            type: DataTypes.BLOB("long"),
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Image data is required",
                },
            },
        }
    }, {
        sequelize,
        modelName: "Image",
        tableName: "images",
        underscored: true,
        indexes: [
            {
                unique: true,
                fields: ["name"],
            }
        ],
    });
    return Image;
};