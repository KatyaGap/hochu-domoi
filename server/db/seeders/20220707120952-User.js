const Bcrypt = require('../../utils/bcrypt');
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        name: 'Marat',
        email: 'marat@mail.ru',
        password: await Bcrypt.hash('123'),
      },
      {
        name: 'Kate',
        email: 'kate@mail.ru',
        password: await Bcrypt.hash('321'),
      },
      {
        name: 'We',
        email: 'we@mail.ru',
        password: await Bcrypt.hash('333'),
      },
    ], {});
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
