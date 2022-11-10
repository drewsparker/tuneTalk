const router = require('express').Router();
const { Comment, User,Track } = require('../../models');
const { findAll } = require('../../models/Users');


router.post('/', async(req,res)=>{

    try {
        const  newComment= await Comment.create({
          ...req.body, //track_id, text
          user_id: req.session.user_id,
        });
    
        res.status(200).json(newComment);
      } catch (err) {
        res.status(400).json(err);
      }
});
router.get('/', async(req,res)=>{

  try {

    const commentData = await Comment.findAll({
      include: [
          { model: Track }, { model: User }
      ],
      // order : [['updatedAt', 'DESC']],

  });
 
    const comments = commentData.map((comment) => comment.get({ plain: true }));
    console.log(comments);

      res.render('comment', {
        comments,logged_in: req.session.logged_in,
        user_id: req.session.user_id,
      });
} catch (err) {
    res.status(500).json(err);
}
});




router.delete('/:id', async (req, res) => {
    try {
      const newComment = await Comment.destroy({
        where: {
          id: req.params.id,
        },
      });
  
      if (!newComment) {
        res.status(404).json({ message: 'No project found with this id!' });
        return;
      }
  
      res.status(200).json(newComment);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;