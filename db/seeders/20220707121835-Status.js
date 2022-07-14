module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Statuses', [
      {
        status: 'Замечен на улице',
      },
      {
        status: 'Ищу передержку',
      },
      {
        status: 'Ищу нового хозяина',
      },
      {
        status: 'Ищу своего хозяина',
      },
      {
        status: 'Потерялся',
      },
    ], {});
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Statuses', null, {});
  },
};
