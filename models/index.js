const User = require("./User");
const Contact = require("./Contact");
const Business = require("./Business");
const Review = require("./Review");

// create associations here
// associations between User and Contact
User.hasMany(Contact, {
    foreignKey: "user_id",
    onDelete: "cascade"
});

Contact.belongsTo(User, {
    foreignKey: "user_id",
});

// associations between User and Business
User.hasMany(Business, {
    foreignKey: "user_id",
    onDelete: "cascade"
});

Business.belongsTo(User, {
    foreignKey: "user_id",
});

// associations between Business and Review
Business.hasMany(Review, {
    foreignKey: "business_id",
    onDelete: "cascade"
});

Review.belongsTo(Business, {
    foreignKey: "business_id",
});

// associations between User and Review
User.hasMany(Review, {
    foreignKey: "user_id",
    onDelete: "cascade"
});

Review.belongsTo(User, {
    foreignKey: "user_id",
});

// associations between User and Business through review

User.belongsToMany(Business, {
    through: Review,
    as: "reviews",
    foreignKey: "user_id"
});

Business.belongsToMany(User, {
    through: Review,
    as: "reviewer",
    foreignKey: "business_id"
});



















module.exports = { User, Contact, Business };