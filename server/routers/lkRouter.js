const router = require('express').Router();
const fs = require('fs').promises;
const moment = require('moment');
const { sendMail } = require('../utils/mailer');
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
  Favorite,
} = require('../db/models');
const favorite = require('../db/models/favorite');
const e = require('express');
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
          'YYYYMMDD',
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
          'YYYYMMDD',
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
    user.user_photo = req.file.path.replace('public', '');
    await user.save();
    res.json(user);
  })
  .delete(async (req, res) => {
    // удаление аватара
    const user = await User.findOne({ where: { id: res.locals.userId } });
    user.user_photo = null;
    await user.save();
    res.json(user);
  });

// избранное
// добавление в избранное
router
  .route('/likes/:id')
  .get(async (req, res) => {
    try {
      const { id } = req.params;
      let like = await Favorite.findOne({
        where: { post_id: id, user_id: res.locals.userId },
        include: [{ model: Post, include: [{ model: Image, limit: 1 }, {model: Status}, {model: Breed}] }, {model: User}],
      });
      if (!like) {
        await Favorite.create({ user_id: res.locals.userId, post_id: id });
        like = await Favorite.findOne({
          where: { post_id: id, user_id: res.locals.userId },
          include: [{ model: Post, include: [{ model: Image, limit: 1}, {model: Status}, {model: Breed}]}, {model: User}],
        });
      } else if (like) {
        await Favorite.destroy({
          where: { user_id: res.locals.userId, post_id: id },
        });
      }
      const post = {
        photo_url: like.Post.dataValues.Images[0].dataValues.image,
        text: like.Post.dataValues.text,
        type_id: like.Post.dataValues.type_id,
        address_string: like.Post.dataValues.address_string,
        post_id: like.Post.dataValues.id,
			status: like.Post.dataValues.Status.status,
			breed: like.Post.dataValues.Breed.breed,
			user_name: like.User.dataValues.name,
			user_photo: like.User.dataValues.user_photo,
        timeSinceMissing: moment(
          like.Post.dataValues.lost_date
            ?.toISOString()
            .split('T')[0]
            .split('-')
            .join(''),
          'YYYYMMDD'
        ).fromNow(),
      };
      res.json(post);
    } catch (error) {
      console.log('last', error);
    }
  })
  .delete(async (req, res) => {
    // удаление лайка в избранном
    await Favorite.destroy({
      where: { user_id: res.locals.userId, post_id: req.params.id },
    });
    res.sendStatus(200);
  });

// получение всех постов из избранного
router.route('/likes').get(async (req, res) => {
  try {
    const posts = await Favorite.findAll({
      where: { user_id: res.locals.userId },
      include: [{ model: Post, include: [{ model: Image, limit: 1 }, {model: Status}, {model: Breed}] }, {model: User}],
    });
    const result = posts.map((el) => ({
      photo_url: el.Post.dataValues.Images[0].dataValues.image,
      text: el.Post.dataValues.text,
      type_id: el.Post.dataValues.type_id,
      address_string: el.Post.dataValues.address_string,
      post_id: el.Post.dataValues.id,
			status: el.Post.dataValues.Status.status,
			breed: el.Post.dataValues.Breed.breed,
			user_name: el.User.dataValues.name,
			user_photo: el.User.dataValues.user_photo,
      timeSinceMissing: moment(
        el.Post.dataValues.lost_date
          ?.toISOString()
          .split('T')[0]
          .split('-')
          .join(''),
        'YYYYMMDD'
      ).fromNow(),
    }));
    res.json(result);
  } catch (error) {
    console.log(error);
  }
});

// ручка для удаления поста
router
  .route('/:id')
  .delete(async (req, res) => {
    const { user_id } = await Post.findOne({ where: { id: req.params.id } });
    const user = await User.findOne({ where: { id: res.locals.userId } });
    const deleteUser = await User.findOne({ where: { id: user_id } });
    if (res.locals.userId === user_id || user.role_id === 1) {
      const imagesToDelete = await Image.findAll({ where: { post_id: req.params.id } });
      await Image.destroy({ where: { post_id: req.params.id } });
      imagesToDelete.map(async (image) => {
        await fs.unlink(`${process.env.PWD}/public/${image.image}`);
      });
      await Post.destroy({ where: { id: req.params.id } });
      if (user.role_id === 1) {
        sendMail({ to: deleteUser.email });
      }
    }
    res.json({ id: req.params.id });
  })
  .put(upload.single('file'), async (req, res) => {
    // ручка для редактирования поста
    try {
      const updatePost = await Post.findOne({ where: { id: req.params.id } });
      const arr = req.files;
      if (updatePost.user_id === res.locals.userId) {
        // const fileName = updatePost.image; // под вопросом, мне кажется надо править
        updatePost.text = req.body.text;
        updatePost.pet_id = req.body.pet_id;
        updatePost.type_id = req.body.type_id;
        updatePost.status_id = req.body.status_id;
        updatePost.breed_id = req.body.breed_id;
        updatePost.color_id = req.body.color_id;
        updatePost.size_id = req.body.size;
        updatePost.lost_date = req.body.date;
        updatePost.address_string = req.body.address_string;
        updatePost.address_lattitude = req.body.address_lattitude;
        updatePost.address_longitude = req.body.address_longitude;
        updatePost.user_id = res.locals.userId;
        await updatePost.save();

        const images = await Image.findAll({
          where: { post_id: req.params.id },
        });
        if (arr.length === images.length) {
          for (let i = 0; i < arr.length; i++) {
            images[i].image = arr[i].req.file.filename;
            images[i].image.save();
          }
        } else {
          await Image.destroy({ where: { post_id: req.params.id } });
          for (let i = 0; i < arr.length; i++) {
            await Image.create({
              image: arr[i].req.file.filename,
              post_id: req.params.id,
            });
          }
        }
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
