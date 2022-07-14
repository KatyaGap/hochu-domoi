module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Pets',
      [
        { pet: 'Собака' },
        { pet: 'Кошка' },
        { pet: 'Крыса' },
        { pet: 'Хомяк' },
        { pet: 'Какаду' },
        { pet: 'Кактус' },
      ],
      {},
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Pets', null, {});
  },
};
