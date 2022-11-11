const router = require('express').Router();
const { Like, User, Track } = require('../../models');
const { findAll } = require('../../models/Users');
const withAuth = require('../../utils/withAuth');

router.get('/', async (req, res) => {

    try {
        console.log(req.session.user_id);
        const likeData = await Like.findAll({
            where: {
                user_id: req.session.user_id
            },
            include: [{ model: Track }, {
                model: User,
                attributes: { exclude: ['password'] }
            }]

        });

        const likes = likeData.map((like) => like.get({ plain: true }));
        console.log(likes);
        res.status(200).render('like', {
            likes,
            logged_in: true,
            user_id: req.session.user_id,
        });




    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/',async (req, res) => {
    try {
        console.log('user_id', req.session.user_id);
        const newLike = await Like.create({
            user_id: req.session.user_id,
            track_id: req.body.track_id
        });
        res.json(newLike);

    } catch (err) {
        res.status(500).json(err);
    }

});

router.delete('/:id', async (req, res) => {
    try {
        console.log('user_id', req.session.user_id);
        const likeData = await Like.destroy({
            where:{
                id:req.params.id
            }
        });
        if (!likeData) {
            res.status(404).json({ message: 'No like found with this id!' });
            return;
          }
      
          res.status(200).json(likeData);

    } catch (err) {
        res.status(500).json(err);
    }

});


module.exports = router;