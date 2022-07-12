const router = require('express').Router();
const fs = require('fs').promises;
const moment = require('moment');
const { upload } = require('../middlewares/upload');
const {
  User,
  Post,
  Breed,
  Pet,
  Color,
  Status,
  Type,
  Size,
  Image,
} = require('../db/models');
require('moment/locale/ru');

// ручка для отображения ВСЕХ постов АДМИНУ или только СВОИХ постов ЮЗЕРУ
router.route('/').get(async (req, res) => {
  try {
    const user = await User.findOne({
      where: { id: res.locals.userId },
    });
    if (user.role_id === 1) {
      const posts = await Post.findAll({
        order: [['lost_date', 'DESC']],
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
          'YYYYMMDD'
        ).fromNow(),
        photo_url: el.Images[0]?.image,
      }));
      res.json(result);
    } else {
      const posts = await Post.findAll({
        where: { user_id: user.id },
        order: [['lost_date', 'DESC']],
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
          'YYYYMMDD'
        ).fromNow(),
        photo_url: el.Images[0]?.image,
      }));
      res.json(result);
    }
  } catch (error) {
    console.log(error);
  }
});

// ручка для аватара юзера
router
  .route('/avatar')
  .put(upload.single('file'), async (req, res) => {
    // изменение аватара
    const user = await User.findOne({ where: { id: res.locals.userId } });
    console.log('А ВОТ И ФОТКА С БЭКА', req.body.file);
    user.user_photo = req.body.file;
    console.log('ПЕРЕЗАПИСАЛИ ФОТОЧКУ', user.user_photo);
    await user.save();
    console.log('А ВОТ И ЮЗЕР НОВЕНЬКИЙ', user);
    res.json(user);
  })
  .delete(async (req, res) => {
    // удаление аватара
    const user = await User.findOne({ where: { id: res.locals.userId } });
    user.user_photo = null;
    await user.save();
    res.json(user);
  });

// ручка для удаления поста
router
  .route('/:id')
  .delete(async (req, res) => {
    const { user_id } = await Post.findOne({ where: { id: req.params.id } });
    if (res.locals.userId === user_id) {
      await Post.destroy({ where: { id: req.params.id } });
    }
    const message = 'Пост удален';
    res.json({ message: `${message}` });
  })
  .put(upload.single('file'), async (req, res) => {
    try {
      const updatePost = await Post.findOne({ where: { id: req.params.id } });
      if (updatePost.user_id === res.locals.userId) {
        // const fileName = updatePost.image; // под вопросом, мне кажется надо править
        updatePost.text = req.body.text;
        updatePost.pet_id = req.body.pet_id;
        updatePost.type_id = 2;
        updatePost.status_id = req.body.status_id;
        updatePost.breed_id = req.body.breed_id || 1;
        updatePost.color_id = req.body.color_id;
        updatePost.size_id = req.body.size;
        updatePost.lost_date = req.body.date;
        updatePost.address_string = req.body.address_string || 'Moscow';
        updatePost.address_lattitude =
          req.body.address_lattitude || 55.683986493805385;
        updatePost.address_longitude =
          req.body.address_longitude || 37.534586242675786;
        // updatePost.photo_url = req.file.fileName; // не работает, надо раскомментить и править
        updatePost.user_id = res.locals.userId;

        await updatePost.save();
        // await fs.unlink(`${process.env.PWD}/public/images/${fileName}`); // не работает, надо раскомментить и править
        res.json(updatePost);
      }
    } catch (err) {
      console.log(err);
      const message = 'Что-то не получилось. Попробуй еще раз';
      res.json({ message: `${message}` });
    }
  });

module.exports = router;
