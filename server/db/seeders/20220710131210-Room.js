module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Rooms', [
      {
        user1_id: 2,
        user2_id: 3,
      },
      {
        user1_id: 2,
        user2_id: 4,
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Rooms', null, {});
  },
};
