const router = require('express').Router();
const { Post, Type } = require('../db/models');

router.route('/:type').get(async (req, res) => {
  try {
    const typeId = await Type.findOne({ where: { type: req.params.type } });
    const posts = await Post.findAll({ where: { type: typeId } });
    res.json(posts);
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
