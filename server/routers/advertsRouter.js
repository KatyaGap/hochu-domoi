const router = require('express').Router();
const moment = require('moment');
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

router.route('/').get(async (req, res) => {
  try {
    const posts = await Post.findAll({
      order: [['lost_date', 'DESC']],
      include: [
        {
          model: Image,
          attributes: ['image'],
          limit: 1,
        },
        {
          model: Status,
          attributes: ['status'],
        },
      ],
    });
    const result = posts.map((el) => ({
      ...el.dataValues,
      photo_url: el.Images[0]?.image,
      status: el.Status.dataValues.status,
      timeSinceMissing: moment(
        el.lost_date?.toISOString().split('T')[0].split('-').join(''),
        'YYYYMMDD',
      ).fromNow(),
    }));
    res.json(result);
  } catch (error) {
    console.log(error);
  }
});

router.route('/fiveLost').get(async (req, res) => {
  try {
    const postsLost = await Post.findAll({
      where: { type_id: 2 },
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
      limit: 5,
    });
    const result = postsLost.map((el) => ({
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
});

router.route('/fiveFound').get(async (req, res) => {
  try {
    const postsFound = await Post.findAll({
      where: { type_id: 1 },
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
      limit: 5,
    });
    const result = postsFound.map((el) => ({
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
});

router.route('/filter').post(async (req, res) => {
  try {
    console.log('req.body: ', req.body);
    const filtered = {};

    for (const key in req.body) {
      if (req.body[key]) {
        filtered[key] = req.body[key];
      }
    }
    console.log('filtered: ', filtered);

    const postsFind = await Post.findAll({
      where: filtered,
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
    const result = postsFind.map((el) => ({
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
      flag: true, // Марат - спец флаг чтобы проверить, работал ли фильтр, но он мб и не нужен, но удалять боюсь
    }));
    console.log('result: ', result);
    res.json(result);
  } catch (error) {
    console.log(error);
  }
});

router.route('/params').get(async (req, res) => {
  try {
    let types = await Type.findAll({ attributes: ['id', 'type'], raw: true });
    let pets = await Pet.findAll({ attributes: ['id', 'pet'], raw: true });
    let breeds = await Breed.findAll({ attributes: ['id', 'breed'], raw: true });
    let colors = await Color.findAll({
      attributes: ['id', 'color_name', 'hex'],
      raw: true,
    });
    let statuses = await Status.findAll({
      attributes: ['id', 'status'],
      raw: true,
    });
    let sizes = await Size.findAll({
      attributes: ['id', 'size'],
      raw: true,
    });

    types = types.map((el) => ({
      ...el,
      value: el.type,
    }));

    pets = pets.map((el) => ({
      ...el,
      value: el.pet,
    }));

    breeds = breeds.map((el) => ({
      ...el,
      value: el.breed,
    }));

    colors = colors.map((el) => ({
      ...el,
      value: el.color_name,
    }));

    statuses = statuses.map((el) => ({
      ...el,
      value: el.status,
    }));

    sizes = sizes.map((el) => ({
      ...el,
      value: el.size,
    }));

    res.json({
      sizes,
      types,
      pets,
      breeds,
      colors,
      statuses,
    });
  } catch (error) {
    console.log(error);
  }
});

router.route('/:id').get(async (req, res) => {
  try {
    let post = await Post.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: User,
          attributes: ['name', 'user_photo'],
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
      ],
      raw: true,
    });
    post = {
      ...post,
      user_name: post['User.name'],
      user_photo: post['User.user_photo'],
      breed: post['Breed.breed'],
      color_name: post['Color.color_name'],
      hex: post['Color.hex'],
      status: post['Status.status'],
      type: post['Type.type'],
      pet: post['Pet.pet'],
      size: post['Size.size'],
      timeSinceMissing: moment(
        post.lost_date?.toISOString().split('T')[0].split('-').join(''),
        'YYYYMMDD',
      ).fromNow(),
    };
    const images = (
      await Image.findAll({
        where: { post_id: req.params.id },
        raw: true,
      })
    ).map((el) => el.image);
    post.images = images;
    // images.forEach((el, ind) => (post[`image${ind}`] = el.image));
    res.json({ post });
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
