'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class lecture extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  lecture.init({
    profesor_id: DataTypes.INTEGER,
    student_id: DataTypes.INTEGER,
    lecture_data_id: DataTypes.INTEGER,
    group_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'lecture',
    freezeTableName: true,
  });
  return lecture;
};