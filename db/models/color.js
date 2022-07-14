const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Color extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Post, { foreignKey: 'color_id' });
    }
  }
  Color.init({
    color_name: DataTypes.STRING,
    hex: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Color',
  });
  return Color;
};
