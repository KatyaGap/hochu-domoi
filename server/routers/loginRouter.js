const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../db/models');

router.route('/')
  .get(async (req, res) => {
    res.render('login');
  })
  .post(async (req, res) => {
    try {
      const { email, password } = req.body;
      if (email && password) {
        const user = await User.findOne({ where: { email } });
        if (!user) {
          const message = 'Пользователь с таким e-mail не существует';
          res.json({ message: `${message}` });
        } else {
          const passCheck = await bcrypt.compare(password, user.password);
          if (user && passCheck) {
            req.session.userId = user.id;
            req.session.userName = user.name;
            res.json({ message: 200 });
          } else {
            const message = 'Вы ввели неверный пароль';
            res.json({ message: `${message}` });
          }
        }
      } else {
        const message = 'Заполните все поля';
        res.json({ message: `${message}` });
      }
    } catch (err) {
      console.log(err);
      const message = 'Какая-то ошибка, попробуй еще раз';
      res.json({ message: `${message}` });
    }
  });

module.exports = router;
