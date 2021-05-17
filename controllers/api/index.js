const router = require('express').Router();

const userRoutes = require('./user-routes');
const contactRoutes = require('./contact-routes');
const businessRoutes = require('./business-routes');
const reviewRoutes = require('./review-routes');


router.use('/users', userRoutes);
router.use('/contacts', contactRoutes);
router.use('/business', businessRoutes);
router.use('/reviews', reviewRoutes);

module.exports = router;