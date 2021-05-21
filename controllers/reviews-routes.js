const router = require("express").Router();
const sequelize = require("../config/connection");
const { Business, Review, User } = require("../models");

router.get('/:id', (req, res) => {
    console.log(req.session);
    console.log('======================');
    Business.findOne({
        where: {
            id: req.params.id
        },
        attributes: ["id", "name", "type", "email", "phone", "address", "webpage", "linkedin", "user_id",
        [sequelize.literal('(SELECT ROUND(AVG(star_rating),2) FROM review WHERE business.id = review.business_id)'), 'star_rating_avg']
        ],
        order: ["name"],
        include: [
        // include the  model here:
        {
            model: User,
            attributes: ["username"],
        },
        {
            model: Review,
            attributes: ["id", "star_rating", "review_text", "business_id", "user_id", "created_at"],
            order: [["created_at", "DESC"]],
            include: {
                model: User,
                attributes: ["username"],
            },
        },
        ],
    })
  .then(dbBusinessData => {
    const businessData = dbBusinessData.get({ plain: true });
    
    res.render('reviews', 
    { businessData, loggedIn: req.session.user_id });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});















module.exports = router;
