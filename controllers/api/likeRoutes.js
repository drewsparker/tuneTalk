const router = require('express').Router();
const { Like,User,Track } = require('../../models');
const { findAll } = require('../../models/Users');

router.get('/', async(req,res)=>{

    try {
        const likeData= await Like.findAll({
            where:{
                user_id:2
                //user_id:req.session.user_id
            },
            include: [{ model: Track }, {
                model: User,
                attributes: { exclude: ['password'] }
            }]
          
        });

        const likes = likeData.map((like) => like.get({ plain: true }));    
        res.status(200).render('like',{likes,logged_in: req.session.logged_in,
            user_id: req.session.user_id,});
      } catch (err) {
        res.status(400).json(err);
      }
});


module.exports=router;