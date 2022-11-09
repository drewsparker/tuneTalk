const router = require('express').Router();
const { Comment } = require('../../models');
const { findAll } = require('../../models/Users');

//
// router.get('/:id', async(req, res)=>{
//     const commentData=findAll({
//         where:{
//             track_id:req.params.id,
//         }
//     })
//     if(!commentData){

//     }else{

//     }

// })
router.post('/', async(req,res)=>{

    try {
        const  = await Comment.create({
          ...req.body, //track_id, text
          user_id: req.session.user_id,
        });
    
        res.status(200).json(newComment);
      } catch (err) {
        res.status(400).json(err);
      }
});

router.delete('/:id', async (req, res) => {
    try {
      const newComment = await Comment.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
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