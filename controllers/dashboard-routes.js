const router = require('express').Router();
const sequelize = require('../config/connection');
const withAuth = require('../utils/auth');
const { Business, Contact, Review, User } = require("../models");

// get all posts for dashboard
router.get('/', withAuth, (req, res) => {
    console.log(req.session);
    console.log('======================');
    User.findOne({
    attributes: { exclude: ["password"] },
    where: {
      id: req.session.user_id
    },
    include: [
      {
        model: Business,
        attributes: ["id", "name", "type", "email", "phone", "address", "webpage", "linkedin", "user_id",
        [sequelize.literal('(SELECT ROUND(AVG(star_rating),2) FROM review WHERE businesses.id = review.business_id)'), 'star_rating_avg']
        ],
        order: ["name"],
        include: {
            model: Review,
            attributes: ["id", "star_rating", "review_text", "business_id", "user_id", "created_at"],
            order: [["created_at", "DESC"]],
            include: {
                model: User,
                attributes: ["username"],
            },
        },
      },
      {
        model: Contact,
        attributes: ["id", "first_name", "last_name", "email", "phone", "address", "instagram", "facebook", "tiktok", "youtube", "user_id"],
        order: ["first_name"],
      },
    ],
  })
  .then(dbUserData => {
    const userData = dbUserData.get({ plain: true });
    
    res.render('dashboard', 
    { userData, loggedIn: true });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
  });
  
  module.exports = router;