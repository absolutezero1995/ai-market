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
    title: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    role: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    version: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    temperature: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
  }, {
    sequelize,
    modelName: 'ChatSetting',
  });
  return ChatSetting;
};