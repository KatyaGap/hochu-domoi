module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        name: 'User1',
        email: 'user1@mail.ru',
        password: '123',
        phone: 111,
      },
      {
        name: 'User2',
        email: 'user2@mail.ru',
        password: '123',
        phone: 222,
      },
      {
        name: 'User3',
        email: 'user3@mail.ru',
        password: '123',
        phone: 333,
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
