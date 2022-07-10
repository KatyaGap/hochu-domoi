module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Colors', [
      {
        color_name: 'Черный',
        hex: '#FFFFFF',
      },
      {
        color_name: 'Белый',
        hex: '#000000',
      },
      {
        color_name: 'Коричневый',
        hex: '#808080',
      },
    ], {});
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Colors', null, {});
  },
};
