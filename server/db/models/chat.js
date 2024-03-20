'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Chat extends Model {
    static associate({User, ChatSetting, ChatHistory}) {
      this.belongsTo(User, {foreignKey: 'user_id'})
      this.hasOne(ChatSetting, {foreignKey: 'chat_id'})
      this.hasMany(ChatHistory, {foreignKey: 'chat_id'})
    }
  }
  Chat.init({
    user_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: "Users",
        key: "id"
      },
      onDelete: "CASCADE"
    },
  }, {
    sequelize,
    modelName: 'Chat',
  });
  return Chat;
};