const router = require('express').Router();
const { User } = require("../../models");



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
        req.session.loggedIn = true;
  
        res.json(dbUserData);
        timeout();
      });
    });
});

// LOG IN GOES IN HERE


// LOG OUT GOES IN HERE



// PUT /api/users/1


// DELETE /api/users/1





module.exports = router;