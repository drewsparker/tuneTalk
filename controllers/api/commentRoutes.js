const router = require('express').Router();
const { Comment, User,Track } = require('../../models');
const withAuth = require('../../utils/withAuth');
const { findAll } = require('../../models/Users');


router.post('/', async(req,res)=>{
console.log("get api/comment post");
    try {
        const  newComment= await Comment.create({
          text : req.body.text, //track_id, text
          user_id: req.session.user_id,
          track_id : req.body.track_id
        });
        console.log(newComment);
    
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
        comments,
        log_in:req.session.log_in,
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