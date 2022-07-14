module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Types', [
      {
        type: 'Я нашел',
      },
      {
        type: 'Я потерял',
      },
    ], {});
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Types', null, {});
  },
};
