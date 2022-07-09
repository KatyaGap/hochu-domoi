const moment = require('moment');
const router = require('express').Router();
const upload = require('../middlewares/upload');
require('moment/locale/ru');
moment.locale('ru');
const { Post, Type } = require('../db/models');
router.route('/:type')
  .get(async (req, res) => {
    try {
      const type = await Type.findOne({ where: { type: req.params.type } });
      const posts = await Post.findAll({ where: { type_id: type.id }, raw: true });
      const result = posts.map((post) => ({ ...post, timeSinceMissing: moment(post.lost_date.toISOString().split('T')[0].split('-').join(''), 'YYYYMMDD').fromNow() }));
      console.log(result);
      res.json(result);
    } catch (error) {
      console.log(error);
    }
  })
  .post(async (req, res) => {
    try {
      const type = await Type.findOne({ where: { type: req.params.type } });
      const posts = await Post.findAll({ where: { type_id: type.id } });
      res.json(posts);
    } catch (error) {
      console.log(error);
    }
  });
// router.route('/lost').get(async (req, res) => {
//   try {
// 		console.log('llllllllllllllost')
//     const type = await Type.findOne({ where: { type: 'lost' } });
//     const posts = await Post.findAll({ where: { type_id: type.id } });
//     res.json(posts);
//   } catch (error) {
//     console.log(error);
//   }
// });

// router.route('/found').get(async (req, res) => {
//   try {
// 		console.log('fffffffffffound')
//     const type = await Type.findOne({ where: { type: 'found' } });
// 		console.log('typeid', type)
//     const posts = await Post.findAll({ where: { type_id: type.id } });
//     res.json(posts);
//   } catch (error) {
//     console.log(error);
//   }
// });
module.exports = router;

       