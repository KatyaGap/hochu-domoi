const router = require('express').Router();
const fs = require('fs').promises;
const { update } = require('lodash');
const { User, Party, Product } = require('../db/models');
const upload = require('../middlewares/upload');

router.route('/:id')
  .get(async (req, res) => {
    const party = await Party.findOne({ where: { id: req.params.id } });
    if (party.user_id === res.locals.userId) {
      party.option = true;
    } else {
      party.option = false;
    }
    res.render('party', { party });
  })
  .delete(async (req, res) => {
    const element = await Party.findOne({ where: { id: req.params.id } });
    const fileName = element.image;
    const deleteParty = await Party.destroy({ where: { id: req.params.id } });
    const file = await fs.unlink(`${process.env.PWD}/public/images/${fileName}`);
    res.json({ deleteParty });
  });

router.route('/:id/edit')
  .get(async (req, res) => {
    const party = await Party.findOne({ where: { id: req.params.id } });
    if (party.user_id === res.locals.userId) {
      party.option = true;
    } else {
      party.option = false;
    }
    res.render('edit', { party });
  })
  .put(upload.single('image'), async (req, res) => {
    try {
      const updateParty = await Party.findOne({ where: { id: req.params.id } });
      if (updateParty.user_id === res.locals.userId) {
        const fileName = updateParty.image;
        updateParty.title = req.body.title;
        updateParty.place = req.body.place;
        updateParty.date = req.body.date;
        updateParty.image = req.file.filename;
        updateParty.user_id = req.params.id;
        await updateParty.save();
        const file = await fs.unlink(`${process.env.PWD}/public/images/${fileName}`);
        res.json(updateParty);
      }
    } catch (err) {
      console.log(err);
      const message = 'Что-то не получилось. Попробуй еще раз';
      res.json({ message: `${message}` });
    }
  })
  // .put(async (req, res) => {
  //   const updatedBook = await Book.findOne({ where: { id: req.params.id } });
  //   updatedBook.title = req.body.title;
  //   updatedBook.description = req.body.description;
  //   await updatedBook.save();
  //   res.json(updatedBook);
  // });
// router.route('/')
//   .get(async (req, res) => {
//     const books = await Book.findAll({ where: { user_id: res.locals.userId } });
//     res.json(books);
//   });

module.exports = router;
