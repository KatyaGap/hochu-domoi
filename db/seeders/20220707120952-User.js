const Bcrypt = require('../../utils/bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        name: 'admin',
        email: 'admin@mail.ru',
        password: await Bcrypt.hash('admin'),
        role_id: 1,
        user_photo: '/images/admin.jpeg',
      },
      {
        name: 'Marat',
        email: 'marat@mail.ru',
        password: await Bcrypt.hash('111'),
        role_id: 2,
        user_photo: '/images/man.jpg',
      },
      {
        name: 'Kate',
        email: 'kate@mail.ru',
        password: await Bcrypt.hash('222'),
        role_id: 2,
        user_photo: '/images/woman.jpg',
      },
      {
        name: 'We',
        email: 'we@mail.ru',
        password: await Bcrypt.hash('333'),
        role_id: 2,
        user_photo: '/images/people.jpg',
      },
      {
        name: 'Zookie',
        email: 'zookie@mail.ru',
        password: await Bcrypt.hash('123'),
        role_id: 2,
        user_photo: '/userpics/doge.jpg',
      },
    ], {});
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
