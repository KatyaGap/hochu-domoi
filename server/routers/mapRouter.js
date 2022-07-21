const moment = require('moment');
const router = require('express').Router();
const multer = require('multer');

const { upload, uploadMultiple } = require('../middlewares/upload');
require('moment/locale/ru');

moment.locale('ru');
const {
  User, Post, Breed, Pet, Color, Status, Type, Size, Image,
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
            model: Size,
            attributes: ['size'],
          },
          {
            model: Type,
            attributes: ['type'],
          },
          {
            model: Pet,
            attributes: ['pet'],
          },
          {
            model: Size,
            attributes: ['size'],
          },
          {
            model: Image,
            attributes: ['image'],
            limit: 1,
          },
        ],
      });
      const result = posts.map((el) => ({
        ...el.dataValues,
        name: el.User.dataValues.name,
        breed: el.Breed.dataValues.breed,
        color_name: el.Color.dataValues.color_name,
        hex: el.Color.dataValues.hex,
        status: el.Status.dataValues.status,
        type: el.Type.dataValues.type,
        pet: el.Pet.dataValues.pet,
        size: el.Size.dataValues.size,
        timeSinceMissing: moment(
          el.lost_date?.toISOString().split('T')[0].split('-').join(''),
          'YYYYMMDD',
        ).fromNow(),
        photo_url: el.Images[0]?.image,
      }));
      res.json(result);
    } catch (error) {
      console.log(error);
    }
  })
  .post(upload.array('files'), async (req, res) => {
    try {
      const { userId } = req.session;
      const arr = req.files;
      const post = await Post.create({
        text: req.body.text,
        pet_id: req.body.pet_id,
        type_id: req.body.type_id,
        status_id: req.body.status_id,
        breed_id: req.body.breed_id,
        color_id: req.body.color_id,
        size_id: req.body.size,
        lost_date: req.body.date,
        address_string: req.body.address_string,
        address_lattitude: req.body.address_lattitude,
        address_longitude: req.body.address_longitude,
        user_id: userId,
        phone: req.body.phone,
      });
      arr?.map(
        await ((img, i) => Image.create({
          image: arr[i].path.replace('public', ''),
          post_id: post.id,
        })),
      );
      res.json({ id: post.id });
    } catch (error) {
      console.log(error);
      res.json({ message: 'Ошибка в введённых данных, пост не создан!' });
    }
  });
module.exports = router;
