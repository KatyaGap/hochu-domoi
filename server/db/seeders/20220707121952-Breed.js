module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Breeds', [
      {
        breed: 'Breed1',
      },
      {
        breed: 'Breed2',
      },
      {
        breed: 'Breed3',
      },
      {
        breed: 'Breed4',
      },
      {
        breed: 'Breed5',
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Breeds', null, {});
  },
};
