const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");


class Review extends Model {}

Review.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        star_rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                max: 5,
                min: 1,
            },
        },
        review_text: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        business_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "business",
                key: "id",
            }
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "user",
                key: "id",
            }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: "review",
    }
);

module.exports = Review;