const router = require('express').Router();
const Bcrypt = require('../utils/bcrypt');
const { User } = require('../db/models');

router.route('/').get(async (req, res) => {
  try {
    const result = await User.findByPk(req.session.userId);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

router.route('/logout').get(async (req, res) => {
  try {
    req.session.destroy();
    res.clearCookie('pet');
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

router.route('/register').post(async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (name && email && password) {
      const user = await User.create({
        email,
        password: await Bcrypt.hash(password),
        name,
        role_id: 2, // по умолчанию создаем НЕ АДМИНА
        user_photo: '/userpics/doge.jpg', // по умолчанию на аватарке будет Doge, потом можно будет изменить :)
      });
      req.session.userId = user.id;
      req.session.userName = user.name;
      res.json(user);
    }
  } catch (err) {
    console.log(err);
    const user = await User.findOne({
      where: { name: req.body.name, email: req.body.email },
    });
    if (user) {
      const message = 'Пользователь с таким e-mail уже существует';
      res.json({ message: `${message}` });
    }
  }
});

router.route('/login').post(async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email && password) {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        const message = 'Пользователь с таким e-mail не существует';
        res.json({ message: `${message}` });
      } else {
        const passCheck = await Bcrypt.compare(password, user.password);
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

router.route('/update').post(async (req, res) => {
  const { userId } = req.session;
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ where: { id: userId }, attributes: ['id', 'name', 'email'] });
    if (name) { user.name = name; }
    if (email) { user.email = email; }
    if (password) { user.password = await Bcrypt.hash(password); }
    user.save();

    req.session.userName = user.name;

    const message = 'Успешно обновлено!';
    res.json({ user, message: `${message}` });
  } catch (err) {
    res.json({ message: `${err}` });
  }
});

module.exports = router;
