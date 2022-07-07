module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Colors', [
      {
        color_name: 'white',
        hex: '#FFFFFF',
      },
      {
        color_name: 'black',
        hex: '#000000',
      },
      {
        color_name: 'gray',
        hex: '#808080',
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Colors', null, {});
  },
};
