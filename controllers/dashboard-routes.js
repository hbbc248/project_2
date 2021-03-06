const router = require('express').Router();
const sequelize = require('../config/connection');
const withAuth = require('../utils/auth');
const { Business, Contact, Review, User } = require("../models");
const { Op } = require("sequelize");
const session = require('express-session');

// get all posts for dashboard
router.get('/', withAuth, (req, res) => {
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
    { userData, loggedIn: req.session.user_id });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/createpersonalcontact', withAuth, (req, res) => {
  Contact.findAll({
    where: {
      user_id: req.session.user_id
    },
  })
    .then(dbPersonalContactData => {
      const personalContactCreate = dbPersonalContactData.map(post => post.get({ plain: true }));
      res.render('createpersonalcontact', { personalContactCreate, loggedIn: true });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/createbusinesscontact', withAuth, (req, res) => {
  console.log(req.session);
  console.log('======================');
  Business.findAll({
    where: {
      user_id: req.session.user_id
    },
  })
    .then(dbContactData => {
      const businessContactCreate = dbContactData.map(post => post.get({ plain: true }));
      res.render('createbusinesscontact', { businessContactCreate, loggedIn: true });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


router.get('/edit-bussiness/:id', withAuth, (req, res) => {
  console.log(req.session);
  console.log('======================');
  Business.findOne({
      where: {
        [Op.and]: [
          { id: req.params.id },
          { user_id: req.session.user_id }
        ] 
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
          include: {
              model: User,
              attributes: ["username"],
          },
      },
      ],
      order: [
        [Review, "created_at", "DESC"]
      ],
  })
  .then(dbBusinessData => {
    if (!dbBusinessData) {
      res.status(404).json({ message: "Business does not belong to the user signed in" });
      return;
    }
    const businessData = dbBusinessData.get({ plain: true });

    console.log(businessData);
    
    res.render('business-update', 
    { businessData, loggedIn: req.session.user_id });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/edit-contact/:id', withAuth, (req, res) => {
  console.log(req.session);
  console.log('======================');
  Contact.findOne({
      where: {
        [Op.and]: [
          { id: req.params.id },
          { user_id: req.session.user_id }
        ] 
      },
      attributes: ["id", "first_name", "last_name", "email", "phone", "address", "instagram", "facebook", "tiktok", "youtube","user_id",
      ],
      order: ["first_name"],
      include: [
      // include the  model here:
      {
          model: User,
          attributes: ["username"],
      },
      ],
  })
  .then(dbContactData => {
    if (!dbContactData) {
      res.status(404).json({ message: "Contact does not belong to the user signed in" });
      return;
    }
    const contactData = dbContactData.get({ plain: true });

    console.log(contactData);
    
    res.render('contact-update', 
    { contactData, loggedIn: req.session.user_id });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});
  

module.exports = router;