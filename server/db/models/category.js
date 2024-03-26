'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate({Chat}) {
      this.hasMany(Chat, {foreignKey: 'category_id'})
    }
  }
  Category.init({
    category: {
      allowNull: false,
      type: DataTypes.TEXT
    },
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};