module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Statuses', [
      {
        status: 'Status1',
      },
      {
        status: 'Status2',
      },
      {
        status: 'Status3',
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Statuses', null, {});
  },
};
