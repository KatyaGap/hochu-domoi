const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User, Group, Book, Like } = require('../db/models');
const checkAuth = require('../middlewares/checkAuth');
const upload = require('../middlewares/upload');

router.route('/')
.get((req, res) => {
  req.session.destroy((error) => {
    if (error) {
      console.error(error);
      return res.sendStatus(500);
    }
    res.clearCookie('auth').redirect('/');
  });
});

module.exports = router;
