'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('RentalBooks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      UserId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id"
        },
        onUpdate: "cascade",
        onDelete: "cascade"
      },
      BookId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Books",
          key: "id"
        },
        onUpdate: "cascade",
        onDelete: "cascade"
      },
      rentNumber: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      returnEstimate: {
        type: Sequelize.DATE
      },
      actualEstimate: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        type: Sequelize.DATE,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('RentalBooks');
  }
};