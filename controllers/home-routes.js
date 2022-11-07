const router = require('express').Router();
const withAuth = require('../utils/withAuth');

router.get('/',async (req, res) => {
    res.status(200).render('homepage');
});

module.exports=router;