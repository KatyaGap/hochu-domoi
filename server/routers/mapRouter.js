const moment = require('moment');
const router = require('express').Router();
const upload = require('../middlewares/upload');
require('moment/locale/ru');

moment.locale('ru');
const {
  Post, Type, User, Color, Breed, Status, Pet,
} = require('../db/models');

router
  .route('/:type')
  .get(async (req, res) => {
    try {
      let type_id = 0;
      if (req.params.type === 'found') {
        type_id = 1;
      } else if (req.params.type === 'lost') {
        type_id = 2;
      }

      const posts = await Post.findAll({
        where: { type_id },
        include: [
          {
            model: User,
            attributes: ['name'],
          },
          {
            model: Breed,
            attributes: ['breed'],
          },
          {
            model: Color,
            attributes: ['color_name', 'hex'],
          },
          {
            model: Status,
            attributes: ['status'],
          },
          {
            model: Type,
            attributes: ['type'],
          },
          {
            model: Pet,
            attributes: ['pet'],
          },
        ],

        raw: true,
      });
      const result = posts.map((post) => ({
        ...post,
        name: post['User.name'],
        breed: post['Breed.breed'],
        color_name: post['Color.color_name'],
        hex: post['Color.hex'],
        status: post['Status.status'],
        type: post['Type.type'],
        pet: post['Pet.pet'],
        timeSinceMissing: moment(
          post.lost_date.toISOString().split('T')[0].split('-').join(''),
          'YYYYMMDD',
        ).fromNow(),
      }));
      res.json(result);
    } catch (error) {
      console.log(error);
    }
  })
  .post(upload.single('file'), async (req, res) => {
    try {
      // const type = await Type.findOne({ where: { type: req.params.type } });
      console.log('reqbody', req.body);
			const { userId } = req.session;
      await Post.create({
        text: req.body.text,
        pet_id: req.body.pet_id,
        // type_id: type.dataValues.id || 1,  ПОТОМ РАСКОММЕНТИТЬ, КОГДА БУДУТ ДАННЫЕ С ФРОНТА
        type_id: req.body.type_id,
        status_id: req.body.status_id,
        breed_id: req.body.breed_id || 1,
        color_id: req.body.color_id,
        size_id: req.body.size,
        // lost_date: req.body.date || '2020-01-17T04:33:12.000Z',   ПОТОМ РАСКОММЕНТИТЬ
        lost_date: req.body.date, // НУЖНА ФОРМА НА ФРОНТЕ С ДАТОЙ ПОТЕРИ
        address_string: req.body.address_string || 'Moscow', // ДАННЫЕ ДОЛЖНЫ ИЗ КАРТЫ ТЯНУТЬСЯ
        address_lattitude: req.body.address_lattitude || 55.683986493805385, // ДАННЫЕ ДОЛЖНЫ ИЗ КАРТЫ ТЯНУТЬСЯ
        address_longitude: req.body.address_longitude || 37.534586242675786, // ДАННЫЕ ДОЛЖНЫ ИЗ КАРТЫ ТЯНУТЬСЯ
        photo_url: req.file.path.replace('public', ''),
        user_id: userId,
      });
      res.json({ text: 'Круто!' }); // тупо строка для теста. Потом поменять на что-то правильное
    } catch (error) {
      console.log(error);
      res.json({ text: 'Не Круто!' }); // тупо строка для теста. Потом поменять на что-то правильное
    }
  });
module.exports = router;
