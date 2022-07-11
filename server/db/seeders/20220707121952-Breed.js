module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Breeds', [
      {
        breed: 'Чихуахуа',
      },
      {
        breed: 'Овчарка',
      },
      {
        breed: 'Чау-Чау',
      },
      {
        breed: 'Бультерьер',
      },
      {
        breed: 'Не знаю',
      },
      {
        breed: 'Кошка',
      },
    ], {});
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Breeds', null, {});
  },
};
