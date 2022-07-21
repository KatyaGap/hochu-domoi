const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'wewanthomewithlove@gmail.com',
    pass: 'dvkllmeclyubzpcp',
  },
});

async function sendMail({ to }) {
  await transporter.sendMail({
    from: 'wewanthomewithlove@gmail.com',
    to,
    subject: 'Администрация Хотим Домой',
    text: 'Ваше объявление было удалено по причине нарушения тематики сайта. Объявления можно размещать только касательно пропавших и найденных животных. Благодарим за понимание.',

  });
}

async function sendMailToUser({ to, text }) {
  await transporter.sendMail({
    from: 'wewanthomewithlove@gmail.com',
    to,
    subject: 'Письмо от пользователя Хотим Домой',
    text,

  });
}

module.exports = { sendMail, sendMailToUser };
