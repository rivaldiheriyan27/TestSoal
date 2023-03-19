'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const Books = require("../data/title.json");
    console.log(Books)
    Books.forEach(el => {
      el.createdAt = new Date();
      el.updatedAt = new Date();
    })
    await queryInterface.bulkInsert("Books", Books, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Books", null, {
      restartIdentity: true
    });
  }
};
