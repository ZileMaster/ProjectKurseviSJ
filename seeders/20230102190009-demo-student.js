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
      'student', 
      [
        {
          id: 1, 
          first_name: 'Milovan', 
          last_name: 'Pantic',
          username: 'mpantic1', 
          type: 'student',
          group_id: 1,
          password: 'panticMil1',
          email: 'mpantic@gmail.com',
          admin_id: 1, 
          attendance: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2, 
          first_name: 'Petar', 
          last_name: 'Dobric',
          username: 'pdobric1', 
          type: 'student',
          group_id: 1,
          password: 'dobricMil1',
          email: 'dobar123445556@gmail.com',
          admin_id: 1, 
          attendance: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3, 
          first_name: 'Dobrivoje', 
          last_name: 'Jovanovic',
          username: 'dobjovi1', 
          type: 'student',
          group_id: 1,
          password: 'jovoje12345',
          email: 'dobre1volje2@gmail.com',
          admin_id: 1, 
          attendance: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 4, 
          first_name: 'Petar', 
          last_name: 'Andric',
          username: 'pericaNobel1', 
          type: 'student',
          group_id: 1,
          password: 'NobelNagrada21',
          email: 'imam_nobela@gmail.com',
          admin_id: 1, 
          attendance: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 5, 
          first_name: 'Neznam', 
          last_name: 'Kogajos',
          username: 'nekibata123', 
          type: 'student',
          group_id: 1,
          password: 'njegovaSifra123!',
          email: 'misterimejl@gmail.com',
          admin_id: 1, 
          attendance: 0,
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
