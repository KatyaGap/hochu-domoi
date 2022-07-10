const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Favorite, { foreignKey: 'user_id' });
      this.hasMany(models.Post, { foreignKey: 'user_id' });
      this.belongsTo(models.Role, { foreignKey: 'role_id' });
      this.hasMany(models.Message, { foreignKey: 'user_id' });
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role_id: DataTypes.INTEGER,
    user_photo: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
