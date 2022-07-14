const router = require('express').Router();
const { sendMailToUser } = require('../utils/mailer');
const {
  User,
  Post,
} = require('../db/models');

router
  .route('/:id')
  .post(async (req, res) => {
    try {
      const senderUser = await User.findOne({ where: { id: res.locals.userId } });
      const receiverPost = await Post.findOne({ where: { id: req.params.id } });
      const receiverUser = await User.findOne({ where: { id: receiverPost.user_id } });
      sendMailToUser({
        to: receiverUser.email,
        text: `По Вашему посту с описанием ${receiverPost.text} Вам пришло сообщение от пользователя ${receiverUser.name} (почта: ${receiverUser.email} \n телефон: ${receiverPost.phone || `не указан`}): \n ${req.body.body}`,
      });
    } catch (error) {
      console.log(error);
      res.json({ message: 'Ошибка в введённых данных, пост не создан!' }); // тупо строка для теста. Потом поменять на что-то правильное
    }
  });

module.exports = router;
