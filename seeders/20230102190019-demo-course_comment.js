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
    */await queryInterface.bulkInsert(
    'course_comment', 
    [
      {
        id: 1, 
        student_id: 1, 
        text: 'Nije lose, lako se pratio tempo dosta se naucilo, sportski pozdrav!',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2, 
        student_id: 2, 
        text: 'Previse intenzivno za mene.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3, 
        student_id: 3, 
        text: 'Mama, dodji po mene, vise ne ide gas',
        createdAt: new Date(),
        updatedAt: new Date(),
      }, 
      {
        id: 4, 
        student_id: 5, 
        text: 'komentar je da nemam komentara rip',
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
