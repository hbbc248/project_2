const router = require("express").Router();
const sequelize = require("../config/connection");
const { Business, Contact, Review, User } = require("../models");

// routes go in here
router.get('/', (req, res) => {
    Business.findAll({
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
    }).then(dbBusinessData => {
        const businesses = dbBusinessData.map(business => business.get({ plain: true }));
        console.log(businesses);
        res.render('homepage', {
            businesses,
            loggedIn: req.session.loggedIn
        })
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
  
    res.render('login');
  });

  router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
  
    res.render('signup');
  });

    module.exports = router;
