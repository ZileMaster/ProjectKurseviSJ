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
      'admin', 
      [
        {
          id: 1, 
          first_name: 'Aleksa',
          last_name: 'Zivkovic', 
          account_type: 'admin',
          username:'az_zile01',
          password:'SecretPass1389!',
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
