const router = require('express').Router();
const { User, Contact, Business, Review } = require("../../models");
const sequelize = require('../../config/connection');
const { Op } = require("sequelize");



// GET /api/users
router.get("/", (req, res) => {
    // Access our User model and run .findAll() method)
    User.findAll({
      attributes: { exclude: ["password"] },
    })
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
});

// GET /api/users/id
router.get("/:id", (req, res) => {
  User.findOne({
    
    attributes: { exclude: ["password"] },
    where: {
      id: req.params.id
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
  .then((dbUserData) => {
    if (!dbUserData) {
      res.status(404).json({ message: "No user found with this id" });
      return;
    }
    res.json(dbUserData);
  })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});


// POST /api/users
router.post("/", (req, res) => {
    // expects {email: 'email@email.com, username: 'Jose', password: 'password1234'}
    User.create({
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
    }).then((dbUserData) => {
      req.session.save(() => {
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.email = dbUserData.email;
        req.session.loggedIn = true;
  
        res.json(dbUserData);
        timeout();
      });
    });
});

// LOG IN GOES IN HERE
router.post('/login', (req, res) => {
  User.findOne({
    where: {
      [Op.or]: [{username: req.body.input}, {email: req.body.input}],
    }
  }).then(dbUserData => {
    if (!dbUserData) {
      res.status(400).json({ message: 'No registered user found with that email or username address!' });
      return;
    }
    const validPassword = dbUserData.checkPassword(req.body.password);
    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect password!' });
      return;
    }

    req.session.save(() => {
      // declare session variables
      req.session.user_id = dbUserData.id;
      req.session.username = dbUserData.username;
      req.session.email = dbUserData.email;
      req.session.loggedIn = true;

      res.json({ user: dbUserData, message: 'You are now logged in!' });
    });
  });
});


// LOG OUT GOES IN HERE
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).json({ message: 'You are now logged out!' });
    });
  }
  else {
    res.status(404).end();
  }
});


// PUT /api/users/1
router.put("/:id", (req, res) => {
  // if req.body has exact key/value pairs to match the model, you can just use `req.body` instead
  User.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData[0]) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// DELETE /api/users/1
router.delete("/:id", (req, res) => {
  User.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;