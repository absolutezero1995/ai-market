const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({ Chat, RefreshToken }) {
      this.hasMany(Chat, { foreignKey: 'user_id' });
      this.hasMany(RefreshToken, { foreignKey: 'user_id' });
    }
  }
  User.init(
    {
      name: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      email: {
        unique: true,
        allowNull: false,
        type: DataTypes.TEXT,
      },
      password: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      refreshTokens: {
        type: DataTypes.TEXT,
      },
      is_activated: {
        type: DataTypes.BOOLEAN,
      },
      activation_link: {
        type: DataTypes.TEXT,
      },
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'Users',
    },
  );
  return User;
};
