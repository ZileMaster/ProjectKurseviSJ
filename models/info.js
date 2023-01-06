'use strict';
const {
  Model, INTEGER
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class info extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  info.init({
    text: DataTypes.STRING,
    notice_board_id: INTEGER
  }, {
    sequelize,
    modelName: 'info',
  });
  return info;
};