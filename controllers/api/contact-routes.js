const router = require('express').Router();
const { User, Contact } = require("../../models");
const withAuth = require('../../utils/auth');


// GET all contacts including username of creator
router.get("/", withAuth, (req, res) => {
    Contact.findAll({
        attributes: ["id", "first_name", "last_name", "email", "phone", "address", "instagram", "facebook", "tiktok", "youtube", "user_id"],
        order: ["first_name"],
        include: [
        // include the  model here:
        {
            model: User,
            attributes: ["username"],
        },
        ],
    })
      .then((dbContactData) => res.json(dbContactData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
});

// GET on contact by ID
router.get("/:id", withAuth, (req, res) => {
    Contact.findOne({
        where: {
            id: req.params.id,
        },
        attributes: ["id", "first_name", "last_name", "email", "phone", "address", "instagram", "facebook", "tiktok", "youtube", "user_id"],
        order: ["first_name"],
        include: [
        // include the  model here:
        {
            model: User,
            attributes: ["username"],
        },
      ],
    })
      .then((dbContactData) => {
        if (!dbContactData) {
            res.status(404).json({ message: "No contact found with this id" });
            return;
        }  
        res.json(dbContactData);
    })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
});


// POST contact
router.post("/", withAuth, (req, res) => {
    Contact.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      instagram: req.body.instagram,
      facebook: req.body.facebook,
      tiktok: req.body.tiktok,
      youtube: req.body.youtube,
      // get id from session
      user_id: req.session.user_id
    })
      .then((dbContactData) => res.json(dbContactData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
});

// PUT contact
router.put("/:id", withAuth, (req, res) => {
  Contact.update(
    {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      instagram: req.body.instagram,
      facebook: req.body.facebook,
      tiktok: req.body.tiktok,
      youtube: req.body.youtube,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((dbContactData) => {
      if (!dbContactData) {
        res.status(404).json({ message: "No contact found with this id" });
        return;
      }
      res.json(dbContactData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// DELETE contact
// delete post
router.delete("/:id", withAuth, (req, res) => {
    Contact.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then((dbContactData) => {
        if (!dbContactData) {
          res.status(404).json({ message: "No contact found with this id" });
          return;
        }
        res.json(dbContactData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
});

module.exports = router;