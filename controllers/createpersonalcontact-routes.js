const router = require("express").Router();
const sequelize = require("../config/connection");
const { Business, Contact, Review, User } = require("../models");

router.get('/', (req, res) => {
    console.log(req.session);
    console.log('======================');
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

module.exports = router;