'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ChatHistory extends Model {
    static associate({Chat}) {
      this.belongsTo(Chat, {foreignKey: 'chat_id'});
    }
  }
  ChatHistory.init({
    request: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    responce: {
      allowNull: false,
      type: DataTypes.TEXT
    },
  }, {
    sequelize,
    modelName: 'ChatHistory',
  });
  return ChatHistory;
};
