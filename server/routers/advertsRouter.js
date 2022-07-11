const router = require('express').Router();
const moment = require('moment');
const {
  User, Post, Breed, Pet, Color, Status, Type, Size,
} = require('../db/models');

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
      ],
      limit: 5,
      raw: true,
    });
    const result = postsLost.map((el) => ({
      ...el,
      name: el['User.name'],
      breed: el['Breed.breed'],
      color_name: el['Color.color_name'],
      hex: el['Color.hex'],
      status: el['Status.status'],
      type: el['Type.type'],
      pet: el['Pet.pet'],
      size: el['Size.size'],
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
      ],
      limit: 5,
      raw: true,
    });
    const result = postsFound.map((el) => ({
      ...el,
      name: el['User.name'],
      breed: el['Breed.breed'],
      color_name: el['Color.color_name'],
      hex: el['Color.hex'],
      status: el['Status.status'],
      type: el['Type.type'],
      pet: el['Pet.pet'],
      size: el['Size.size'],
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

router.route('/filter').post(async (req, res) => {
  try {
    const postsFind = await Post.findAll({
      where: req.body,
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
      ],
      raw: true,
    });
    const result = postsFind.map((el) => ({
      ...el,
      name: el['User.name'],
      breed: el['Breed.breed'],
      color_name: el['Color.color_name'],
      hex: el['Color.hex'],
      status: el['Status.status'],
      type: el['Type.type'],
      pet: el['Pet.pet'],
      size: el['Size.size'],
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

router.route('/params').get(async (req, res) => {
  try {
    const types = await Type.findAll({ attributes: ['type'], raw: true });
    const pets = await Pet.findAll({ attributes: ['pet'], raw: true });
    const breeds = await Breed.findAll({ attributes: ['breed'], raw: true });
    const colors = await Color.findAll({
      attributes: ['color_name', 'hex'],
      raw: true,
    });
    const statuses = await Status.findAll({
      attributes: ['status'],
      raw: true,
    });
    const sizes = await Size.findAll({
      attributes: ['size'],
      raw: true,
    });
    res.json({
      sizes, types, pets, breeds, colors, statuses,
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
      ],
      raw: true,
    });
    post = {
      ...post,
      name: post['User.name'],
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
    res.json(post);
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
