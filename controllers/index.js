const router = require("express").Router();

const apiRoutes = require("./api");
const homeRoutes = require('./home-routes.js');
const dashboardRoutes = require("./dashboard-routes.js");
const createBusinessRoute = require("./createbusinesscontact-routes");
const createPersonalRoute = require("./createpersonalcontact-routes");

router.use("/", homeRoutes);
router.use("/api", apiRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/createbusinesscontact", createBusinessRoute);
router.use("/createpersonalcontact", createPersonalRoute);

router.use((req, res) => {
    res.status(404).end();
});


module.exports = router;