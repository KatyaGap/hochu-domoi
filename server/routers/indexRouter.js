const router = require('express').Router();
const { User, Party, Product } = require('../db/models');
const upload = require('../middlewares/upload');
console.log('===>', process.env.PWD);

router.route('/')
  .get(async (req, res) => {
    let parties = await Party.findAll({
      raw: true,
      order: [['date', 'ASC']],
    });
    let now = new Date();
    let currentDate = JSON.stringify(now).slice(1, -9);
    parties = parties.filter((el) => el.date >= currentDate);
    // // const likes = await Like.findAll({ raw: true });
    // for (let i = 0; i < parties.length; i++) {
    //   if (parties[i].user_id === res.locals.userId) {
    //     parties[i].option = true;
    //   } else {
    //     parties[i].option = false;
    //   }
    // }
    // // books = books.map((el) => ({
    // //   ...el,
    // //   likes: likes.filter((item) => item.book_id === el.id).length }));
    res.render('mainpage', { parties });
  });

router.route('/form')
  .get(async (req, res) => {
    res.render('form');
  })
  .post(upload.single('image'), async (req, res) => {
    try {
      const party = await Party.create({
        title: req.body.title,
        place: req.body.place,
        date: req.body.date,
        image: req.file.filename,
        user_id: res.locals.userId,
      });
      res.json(party);
    } catch (err) {
      console.log(err);
      const message = 'Что-то пошло не так, попробуй еще раз';
      res.json({ message: `${message}` });
    }
  });

router.route('/likes/:id')
  .get(async (req, res) => {
    const like = await Like.findOne({ where: { book_id: req.params.id, user_id: res.locals.userId } });
    if (!like) {
      await Like.create({
        user_id: res.locals.userId,
        book_id: req.params.id,
      });
    } else {
      await Like.destroy({ where: { book_id: req.params.id, user_id: res.locals.userId } });
    }
    const likes = await Like.findAll({ where: { book_id: req.params.id } });
    res.json(likes);
  });

module.exports = router;
