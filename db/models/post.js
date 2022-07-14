const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Favorite, { foreignKey: 'post_id' });
      this.belongsTo(models.User, { foreignKey: 'user_id' });
      this.belongsTo(models.Pet, { foreignKey: 'pet_id' });
      this.belongsTo(models.Type, { foreignKey: 'type_id' });
      this.belongsTo(models.Status, { foreignKey: 'status_id' });
      this.belongsTo(models.Breed, { foreignKey: 'breed_id' });
      this.belongsTo(models.Size, { foreignKey: 'size_id' });
      this.belongsTo(models.Color, { foreignKey: 'color_id' });
      this.hasMany(models.Image, { foreignKey: 'post_id' });
    }
  }
  Post.init({
    text: DataTypes.STRING,
    pet_id: DataTypes.INTEGER,
    type_id: DataTypes.INTEGER,
    status_id: DataTypes.INTEGER,
    breed_id: DataTypes.INTEGER,
    color_id: DataTypes.INTEGER,
    size_id: DataTypes.INTEGER,
    lost_date: DataTypes.DATE,
    address_string: DataTypes.STRING,
    address_lattitude: DataTypes.DECIMAL(65, 30, 'int'),
    address_longitude: DataTypes.DECIMAL(65, 30, 'int'),
    user_id: DataTypes.INTEGER,
    phone: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};
