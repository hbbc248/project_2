const router = require("express").Router();
const sequelize = require("../config/connection");
const { Business, Contact, Review, User } = require("../models");


router.get('/', (req, res) => {
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

module.exports = router;