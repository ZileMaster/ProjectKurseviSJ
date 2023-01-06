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
      'profesor',
      [
        {
          id: 1, 
          first_name: 'Test',
          last_name: 'Profesor', 
          type: 'profesor',
          username: 'profesorTester1', 
          password: 'profesorForTest1234', 
          email: 'azivkovic10120ri@raf.rs', 
          admin_id: 1, 
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
