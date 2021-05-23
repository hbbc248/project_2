const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");


class Business extends Model {}

Business.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        type: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(50),
            allowNull: true,
            validate: {
              isEmail: true,
            },
            defaultValue: "No email provided",
        },
        phone: {
            type: DataTypes.STRING(15),
            allowNull: false,
            validate: {
                len: [7],
            },
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        webpage: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null,
        },
        linkedin: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null,
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
        modelName: "business",
    }
);

module.exports = Business;