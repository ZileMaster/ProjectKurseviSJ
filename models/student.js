'use strict';
const {
  Model
} = require('sequelize');
const { Sequelize } = require('.');
module.exports = (sequelize, DataTypes) => {
  class student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  student.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    type: DataTypes.STRING,
    admin_id: DataTypes.INTEGER,
    group_id: DataTypes.INTEGER,
    attendance: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'student',
    freezeTableName: true,
    freezeTableName: true,
  });
  return student;
};