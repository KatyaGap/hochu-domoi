module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Messages', [
      {
        room_id: 1,
        user_id: 2,
        message: 'Hello, Kate',
      },
      {
        room_id: 1,
        user_id: 3,
        message: 'Hello, Marat!',
      },
      {
        room_id: 1,
        user_id: 2,
        message: 'What are you doing?',
      },
      {
        room_id: 1,
        user_id: 3,
        message: 'I am the Team-Lead and I am watching you!!!',
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Messages', null, {});
  },
};
