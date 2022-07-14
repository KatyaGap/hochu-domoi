module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Sizes', [
      {
        size: 'Мелкий',
      },
      {
        size: 'Средний',
      },
      {
        size: 'Крупный',
      },
      {
        size: 'Огромный',
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Sizes', null, {});
  },
};
