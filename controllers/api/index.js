const router = require('express').Router();
const userRoutes = require('./userRoutes');
const albumRoutes = require('./albumRoutes');
const commentRoutes = require('./commentRoutes');
const LikeRoutes = require('./likeRoutes');

router.use('/users', userRoutes);
router.use('/albums', albumRoutes);
router.use('/comments', commentRoutes);
router.use('/likes', LikeRoutes);

module.exports = router;