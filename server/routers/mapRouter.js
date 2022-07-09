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
      // const type = await Type.findOne({ where: { type: req.params.type } }); ПОТОМ РАСКОММЕНТИТЬ, КОГДА БУДУТ ДАННЫЕ С ФРОНТА
      const { userId } = req.session;
      await Post.create({
        text: req.body.text,
        pet_id: req.body.pet_id,
        // type_id: type.dataValues.id || 1,  ПОТОМ РАСКОММЕНТИТЬ, КОГДА БУДУТ ДАННЫЕ С ФРОНТА
        type_id: 2,
        status_id: req.body.status_id,
        breed_id: req.body.breed_id || 1,
        color_id: req.body.color_id,
        size: req.body.size,
        // lost_date: req.body.date || '2020-01-17T04:33:12.000Z',   ПОТОМ РАСКОММЕНТИТЬ
        lost_date: req.body.date, // НУЖНА ФОРМА НА ФРОНТЕ С ДАТОЙ ПОТЕРИ
        address_string: req.body.address_string || 'Moscow', // ДАННЫЕ ДОЛЖНЫ ИЗ КАРТЫ ТЯНУТЬСЯ
        address_lattitude: req.body.address_lattitude || 55.683986493805385, // ДАННЫЕ ДОЛЖНЫ ИЗ КАРТЫ ТЯНУТЬСЯ
        address_longitude: req.body.address_longitude || 37.534586242675786, // ДАННЫЕ ДОЛЖНЫ ИЗ КАРТЫ ТЯНУТЬСЯ
        photo_url: req.file.path,
        user_id: userId,
      });
      res.json({ text: 'Круто!' }); // тупо строка для теста. Потом поменять на что-то правильное
    } catch (error) {
      console.log(error);
      res.json({ text: 'Не Круто!' }); // тупо строка для теста. Потом поменять на что-то правильное
    }
  });
module.exports = router;

       