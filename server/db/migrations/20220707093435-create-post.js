module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Posts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      text: {
        type: Sequelize.STRING,
        isNull: false,
      },
      pet_id: {
        type: Sequelize.INTEGER,
        isNull: false,
        references: {
          model: 'Pets',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      type_id: {
        type: Sequelize.INTEGER,
        isNull: false,
        references: {
          model: 'Types',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      status_id: {
        type: Sequelize.INTEGER,
        isNull: false,
        references: {
          model: 'Statuses',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      breed_id: {
        type: Sequelize.INTEGER,
        isNull: false,
        references: {
          model: 'Breeds',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      color_id: {
        type: Sequelize.INTEGER,
        isNull: false,
        references: {
          model: 'Colors',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      size_id: {
        type: Sequelize.INTEGER,
        isNull: false,
        references: {
          model: 'Sizes',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      lost_date: {
        type: Sequelize.DATE,
        isNull: false,
      },
      address_string: {
        type: Sequelize.STRING,
        isNull: false,
      },
      address_lattitude: {
        type: Sequelize.DECIMAL(65, 30, 'int'),
        isNull: false,
      },
      address_longitude: {
        type: Sequelize.DECIMAL(65, 30, 'int'),
        isNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        isNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      phone: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('Posts');
  },
};
