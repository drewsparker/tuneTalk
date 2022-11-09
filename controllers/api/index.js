const router = require('express').Router();
const userRoutes = require('./userRoutes');
const albumRoutes = require('./albumRoutes');
const commentRoutes = require('./commentRoutes');

router.use('/users', userRoutes);
router.use('/albums', albumRoutes);
router.use('/comments', commentRoutes);

module.exports = router;