'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Result extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Result.init(
    {
      name: DataTypes.STRING,
      name_en: DataTypes.STRING,
      category: DataTypes.STRING,
      image: DataTypes.STRING(500),
      location: DataTypes.STRING,
      phone: DataTypes.STRING,
      google_map: DataTypes.STRING(1000),
      rating: DataTypes.FLOAT,
      description: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'Result',
    }
  )
  return Result
}
