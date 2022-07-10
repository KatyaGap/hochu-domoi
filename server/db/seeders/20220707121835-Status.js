module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Statuses', [
      {
        status: 'Животное замечено на улице',
      },
      {
        status: 'Ищу передержку',
      },
      {
        status: 'Ищу нового хозяина',
      },
      {
        status: 'Ищу только старого хозяина',
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
