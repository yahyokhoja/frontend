// backend/models/User.js

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true // чтобы номера телефонов были уникальными
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      role: {
        type: DataTypes.STRING,
        defaultValue: 'user' // обычный пользователь по умолчанию
      }
    });
  
    return User;
  };
  