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
      'grade', 
      [
        {
          id: 1, 
          test_id: 1,
          student_id: 1,
          grade: 2, 
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2, 
          test_id: 1,
          student_id: 3,
          grade: 5, 
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3, 
          test_id: 1,
          student_id: 5,
          grade: 4, 
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
