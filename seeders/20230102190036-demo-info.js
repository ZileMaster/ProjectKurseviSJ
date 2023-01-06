'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert(
    'info', 
    [
      {
        id: 1, 
        notice_board_id: 1,
        text: 'Neka informacija za tablu', 
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2, 
        notice_board_id: 1,
        text: 'Neka druga informacija za tablu', 
        createdAt: new Date(),
        updatedAt: new Date(),
      }, 
      {
        id: 3, 
        notice_board_id: 1,
        text: 'Neka treca infor za tablu', 
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], 
    {}
    );
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
