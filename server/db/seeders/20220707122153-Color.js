module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Colors', [
      {
        color_name: 'Черный',
        hex: '#000000',
      },
      {
        color_name: 'Белый',
        hex: '#FFFFFF',
      },
      {
        color_name: 'Серый',
        hex: '#808080',
      },
      {
        color_name: 'Коричневый',
        hex: '#964b00',
      },
      {
        color_name: 'Рыжий',
        hex: '#ffa500',
      },
    ], {});
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Colors', null, {});
  },
};
