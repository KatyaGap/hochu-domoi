const router = require('express').Router();
const { Post } = require('../db/models');

router.route('/fiveLost')
  .get(async (req, res) => {
    try {
      const postsLost = await Post.findAll({ where: { type_id: 2 }, order: [['lost_date', 'DESC']], Limit: 5 });
      console.log('POSTLOST', postsLost);
      res.json({ postsLost });
    } catch (error) {
      console.log(error);
    }
  });
router.route('/fiveFound')
  .get(async (req, res) => {
    try {
      const postsFind = await Post.findAll({ where: { type_id: 1 }, order: [['lost_date', 'DESC']], Limit: 5 });
      console.log('POSTFIND', postsFind);
      res.json({ postsFind });
    } catch (error) {
      console.log(error);
    }
  });
module.exports = router;
