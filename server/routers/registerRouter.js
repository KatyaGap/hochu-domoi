const router = require('express').Router();
const Bcrypt = require('../utils/bcrypt');
const { User } = require('../db/models');
const checkAuth = require('../middlewares/checkAuth');

router.route('/')
  .get(async (req, res) => {
    try {
      const result = await User.findByPk(req.session.userId);
      res.json(result);
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  });

router.route('/logout')
  .get(async (req, res) => {
    try {
      req.session.destroy();
      res.clearCookie('pet');
      res.sendStatus(200);
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  });

router.route('/register')
  .post(checkAuth, async (req, res) => {
    try {
      const { name, email, password } = req.body;
      if (name && email && password) {
        const user = await User.create({ email, password: await Bcrypt.hash(password), name });
        req.session.userId = user.id;
        req.session.userName = user.name;
        res.json(user);
      }
    } catch (err) {
      console.log(err);
      const user = await User.findOne({ where: { name: req.body.name, email: req.body.email } });
      if (user) {
        const message = 'Пользователь с таким логином и e-mail уже существует';
        res.json({ message: `${message}` });
      } else {
        const user1 = await User.findOne({ where: { name: req.body.name } });
        if (user1) {
          const message = 'Пользователь с таким логином уже существует';
          res.json({ message: `${message}` });
        } else {
          const message = 'Пользователь с таким e-mail уже существует';
          res.json({ message: `${message}` });
        }
      }
    }
  });

router.route('/login')
  .post(async (req, res) => {
    try {
      const { email, password } = req.body;
      if (email && password) {
        const user = await User.findOne({ where: { email } });
        if (!user) {
          const message = 'Пользователь с таким e-mail не существует';
          res.json({ message: `${message}` });
        } else {
          const passCheck = await Bcrypt.compare(password, res.password);
          if (user && passCheck) {
            req.session.userId = user.id;
            req.session.userName = user.name;
            res.json(user);
          } else {
            const message = 'Вы ввели неверный пароль';
            res.json({ message: `${message}` });
          }
        }
      }
    } catch (err) {
      console.log(err);
      const message = 'Какая-то ошибка, попробуй еще раз';
      res.json({ message: `${message}` });
    }
  });

module.exports = router;
