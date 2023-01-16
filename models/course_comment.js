'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class course_comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  course_comment.init({
    student_id: DataTypes.INTEGER,
    text: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'course_comment',
    freezeTableName: true,
  });
  return course_comment;
};