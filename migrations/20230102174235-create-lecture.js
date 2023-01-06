'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('lecture', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      profesor_id: {
        type: Sequelize.INTEGER,
        allowNull:false, 
        references:{
          model:'profesor',
          key:'id',
        }
      },
      lecture_data_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'lecture_data', 
          key: 'id',
        }
      },
      group_id: {
        type: Sequelize.INTEGER, 
        references:{
          model: 'group', 
          key: 'id',
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('lecture');
  }
};