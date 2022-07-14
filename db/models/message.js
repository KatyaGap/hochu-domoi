const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Room, { foreignKey: 'room_id' });
      this.belongsTo(models.User, { foreignKey: 'user_id' });
    }
  }
  Message.init({
    room_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    message: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Message',
  });
  return Message;
};
