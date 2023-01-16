'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class notice_board extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  notice_board.init({
    profesor_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'notice_board',
    freezeTableName: true,
  });
  return notice_board;
};