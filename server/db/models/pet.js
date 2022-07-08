const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Pet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Post, { foreignKey: 'pet_id' });
    }
  }
  Pet.init({
    pet: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Pet',
  });
  return Pet;
};
