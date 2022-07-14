module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Locations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      seen_lattitude: {
        type: Sequelize.FLOAT,
        isNull: false,
      },
      seen_longitude: {
        type: Sequelize.FLOAT,
        isNull: false,
      },
      post_id: {
        type: Sequelize.INTEGER,
        isNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        isNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Locations');
  },
};
