'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Chat extends Model {
    static associate({User, ChatSetting, ChatHistory, Category}) {
      this.belongsTo(User, {foreignKey: 'user_id'})
      this.belongsTo(Category, {foreignKey: 'category_id'})
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
    category_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: "Category",
        key: "id"
      },
      onDelete: "CASCADE"
    },
    title: {
      allowNull: false,
      type: DataTypes.TEXT
    },
  }, {
    sequelize,
    modelName: 'Chat',
  });
  return Chat;
};