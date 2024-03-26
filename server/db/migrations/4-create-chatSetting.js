'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ChatSettings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      chat_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Chats",
          key: "id"
        },
        onDelete: "CASCADE"
      },
      version: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      roleS: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      roleU: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      roleA: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      content: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      temperature: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      n: {
        allowNull: false,
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('ChatSettings');
  }
};