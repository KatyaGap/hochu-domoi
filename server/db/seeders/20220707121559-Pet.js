module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Pets',
      [
        { pet: 'Собака' },
        { pet: 'Кошка' },
        { pet: 'Крыса' },
        { pet: 'Хомяк' },
        { pet: 'Попугай' },
        { pet: 'Крокодил' },
      ],
      {},
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Pets', null, {});
  },
};
