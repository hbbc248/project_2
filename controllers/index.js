const router = require("express").Router();

const apiRoutes = require("./api");
const homeRoutes = require('./home-routes.js');
const dashboardRoutes = require("./dashboard-routes.js");
const reviewsRoutes = require("./reviews-routes.js");



router.use("/", homeRoutes);
router.use("/api", apiRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/reviews", reviewsRoutes);



router.use((req, res) => {
    res.status(404).end();
});


module.exports = router;