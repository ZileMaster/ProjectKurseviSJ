'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class lecture_data extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  lecture_data.init({
  }, {
    sequelize,
    modelName: 'lecture_data',
    freezeTableName: true,
  });
  return lecture_data;
};