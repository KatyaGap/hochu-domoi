const router = require('express').Router();
const { Post, User } = require('../db/models');

router.route('/').get(async (req, res) => {
  try {
    const posts = await Post.findAll({ raw: true });
    res.json(posts);
  } catch (error) {
    console.log(error);
  }
});
