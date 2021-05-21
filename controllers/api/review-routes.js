const router = require('express').Router();
const { User, Business, Review } = require("../../models");

// GET all reviews including Bussiness name and Username of creator
router.get("/", (req, res) => {
    Review.findAll({
        attributes: ["id", "star_rating", "review_text", "business_id", "user_id", "created_at"],
        order: [["created_at", "DESC"]],
        include: [
        // include the  model here:
        {
            model: Business,
            attributes: ["name"]
        },
        {
            model: User,
            attributes: ["username"],
        },
        ],
    })
      .then((dbReviewData) => res.json(dbReviewData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

// GET all reviews by id including business name and Username of creator
router.get("/:id", (req, res) => {
  Review.findOne({
    where: {
      id: req.params.id
    },
      attributes: ["id", "star_rating", "review_text", "business_id", "user_id", "created_at"],
      include: [
      // include the  model here:
      {
          model: Business,
          attributes: ["name"]
      },
      {
          model: User,
          attributes: ["username"],
      },
      ],
  })
    .then((dbReviewData) => res.json(dbReviewData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
  });
});

// POST to create new review
router.post("/", (req, res) => {
    // expects {star_rating: 5, review_text: 'Very good store.', business_id: 2, user_id: 2}
    Review.create({
      star_rating: req.body.star_rating,
      review_text: req.body.review_text,
      business_id: req.body.business_id,
            
      // when session exitst we need to get user_id from session
      user_id: req.session.user_id
    })
      .then((dbReviewData) => res.json(dbReviewData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

// PUT to update review
router.put("/:id", (req, res) => {
  Review.update(
    {
      star_rating: req.body.star_rating,
      review_text: req.body.review_text,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((dbReviewData) => {
      if (!dbReviewData) {
        res.status(404).json({ message: "No review found with this id" });
        return;
      }
      res.json(dbReviewData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// DELETE to delete review 
router.delete("/:id", (req, res) => {
  Review.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbReviewData) => {
      if (!dbReviewData) {
        res.status(404).json({ message: "No review found with this id" });
        return;
      }
      res.json(dbReviewData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;