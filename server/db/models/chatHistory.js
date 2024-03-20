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
    text: {
      allowNull: false,
      type: DataTypes.TEXT
    },
  }, {
    sequelize,
    modelName: 'ChatHistory',
  });
  return ChatHistory;
};
