const router = require('express').Router();
const moment = require('moment');
const { Post } = require('../db/models');

require('moment/locale/ru');
router.route('/').get(async (req, res) => {
  try {
    const posts = await Post.findAll({
      order: [['lost_date', 'DESC']],
      raw: true,
    });
    res.json(posts);
  } catch (error) {
    console.log(error);
  }
});

router.route('/fiveLost').get(async (req, res) => {
  try {
    const postsLost = await Post.findAll({
      where: { type_id: 2 },
      order: [['lost_date', 'DESC']],
      limit: 5,
      raw: true,
    });
    const result = postsLost.map((post) => ({
      ...post,
      timeSinceMissing: moment(
        post.lost_date?.toISOString().split('T')[0].split('-').join(''),
        'YYYYMMDD'
      ).fromNow(),
    }));
    console.log('POSTLOST', result);
    res.json(result);
  } catch (error) {
    console.log(error);
  }
});
router.route('/fiveFound').get(async (req, res) => {
  try {
    const postsFind = await Post.findAll({
      where: { type_id: 1 },
      order: [['lost_date', 'DESC']],
      limit: 5,
      raw: true,
    });
    const result = postsFind.map((post) => ({
      ...post,
      timeSinceMissing: moment(
        post.lost_date?.toISOString().split('T')[0].split('-').join(''),
        'YYYYMMDD'
      ).fromNow(),
    }));
    console.log('POSTFIND', result);
    res.json(result);
  } catch (error) {
    console.log(error);
  }
});
router.route('/filter').post(async (req, res) => {
  try {
    console.log('reqbody', req.body);
    const postsFind = await Post.findAll({
      where: req.body,
      order: [['lost_date', 'DESC']],
      raw: true,
    });
    console.log('postFind', postsFind);
    const result = postsFind.map((post) => ({
      ...post,
      timeSinceMissing: moment(
        post.lost_date?.toISOString().split('T')[0].split('-').join(''),
        'YYYYMMDD'
      ).fromNow(),
    }));
    console.log('filter result', result);
    res.json(result);
  } catch (error) {
    // console.log(error);
  }
});
router.route('/:id').get(async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(id);
    const post = await Post.findOne({
      where: {
        id: req.params.id,
      },
    });
    // console.log('======', post);
    res.json(post);
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
