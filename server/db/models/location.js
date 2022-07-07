const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Location extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Location.init({
    seen_lattitude: DataTypes.FLOAT,
    seen_longitude: DataTypes.FLOAT,
    post_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Location',
  });
  return Location;
};
