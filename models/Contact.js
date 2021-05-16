const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");


class Contact extends Model {}

Contact.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        last_name: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(50),
            allowNull: true,
            unique: true,
            validate: {
              isEmail: true,
            },
            defaultValue: "No email provided",
        },
        phone: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isNumeric: true,
            },
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        instagram: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null,
        },
        facebook: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null,
        },
        tiktok: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null,
        },
        youtube: {
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
        modelName: "contact",
    }
);

module.exports = Contact;