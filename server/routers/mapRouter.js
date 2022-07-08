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
  .post(upload.single('file'), async (req, res) => {
    try {
      console.log('Я ХОЧУ СОЗДАТЬ ПОСТ С ФРОНТА');
      console.log('REQ BODY', req.body);
      console.log('REQ FILE', req.file);
      const type = await Type.findOne({ where: { type: req.params.type } });
      const { userId } = req.session;
      const post = await Post.create({
        text: req.body.text,
        pet_id: req.body.pet_id,
        type_id: type.dataValues.id,
        status_id: req.body.status_id,
        breed_id: req.body.breed_id || 1,
        color_id: req.body.color_id,
        size: req.body.size,
        lost_date: req.body.lost_date,
        address_string: req.body.address_string,
        address_lattitude: req.body.address_lattitude,
        address_longitude: req.body.address_longitude,
        photo_url: req.body.photo_url,
        user_id: userId,
      });
      console.log('POST', post);
      res.json({ text: 'Круто!' }); // тупо строка для теста. Потом поменять на что-то правильное
    } catch (error) {
      console.log('Я НЕ СМОГ СОЗДАТЬ ПОСТ С ФРОНТА');
      console.log(error);
      res.json({ text: 'Не Круто!' }); // тупо строка для теста. Потом поменять на что-то правильное
    }
  });
module.exports = router;
