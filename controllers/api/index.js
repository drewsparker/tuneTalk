const router = require('express').Router();
const userRoutes = require('./userRoutes');
const albumRoutes = require('./albumRoutes');

router.use('/users', userRoutes);
router.use('/albums', albumRoutes);

module.exports = router;