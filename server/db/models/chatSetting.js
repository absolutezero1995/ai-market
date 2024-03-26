'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ChatSetting extends Model {
    static associate({Chat}) {
      this.belongsTo(Chat, {foreignKey: 'chat_id'})
    }
  }
  ChatSetting.init({
    chat_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: "Chats",
        key: "id"
      },
      onDelete: "CASCADE"
    },
    version: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    roleS: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    roleU: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    roleA: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    content: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    temperature: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    n: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
  }, {
    sequelize,
    modelName: 'ChatSetting',
  });
  return ChatSetting;
};