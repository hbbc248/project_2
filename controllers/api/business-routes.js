const router = require('express').Router();
const { User, Business, Review } = require("../../models");
const sequelize = require('../../config/connection');


// GET all Business including username of creator and reviews
router.get("/", (req, res) => {
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
            include: {
                model: User,
                attributes: ["username"],
            },
        },
        ],
    })
      .then((dbBusinessData) => res.json(dbBusinessData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
});

// GET Business by ID including username of creator and reviews
router.get("/:id", (req, res) => {
    Business.findOne({
        where: {
            id: req.params.id
        },
        attributes: ["id", "name", "type", "email", "phone", "address", "webpage", "linkedin", "user_id",
        [sequelize.literal('(SELECT ROUND(AVG(star_rating),2) FROM review WHERE business.id = review.business_id)'), 'star_rating_avg']
        ],
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
    .then((dbBusinessData) => {
        if (!dbBusinessData) {
            res.status(404).json({ message: "No business found with this id" });
            return;
        }  
        res.json(dbBusinessData);
    })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
});

// POST business
router.post("/", (req, res) => {
    Business.create({
      name: req.body.name,
      type: req.body.type,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      webpage: req.body.webpage,
      linkedin: req.body.linkedin,
      // when session exist we need to get user_id from session
      user_id: req.session.user_id
    })
      .then((dbBusinessData) => res.json(dbBusinessData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
});

// PUT business
router.put("/:id", (req, res) => {
  Business.update(
    {
        name: req.body.name,
        type: req.body.type,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        webpage: req.body.webpage,
        linkedin: req.body.linkedin
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((dbBusinessData) => {
      if (!dbBusinessData) {
        res.status(404).json({ message: "No business found with this id" });
        return;
      }
      res.json(dbBusinessData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// DELETE business by id
router.delete("/:id", (req, res) => {
    Business.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then((dbBusinessData) => {
        if (!dbBusinessData) {
          res.status(404).json({ message: "No business found with this id" });
          return;
        }
        res.json(dbBusinessData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
});

module.exports = router;