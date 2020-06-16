'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      forename: { type: DataTypes.STRING, allowNull: false },
      surname: { type: DataTypes.STRING, allowNull: false },
      phone: { type: DataTypes.STRING },
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
      password: { type: DataTypes.STRING, allowNull: false },
      picture: { type: DataTypes.STRING }
    },
    {
      timestamps: false,
    });
  User.associate = function (models) {
    // associations can be defined here
    User.hasOne(models.Teacher, {
      as: "teacher",
      foreignkey: "userId"
    });
    User.hasOne(models.Guardian, {
      as: "guardian",
      foreignkey: "userId"
    });
  };
  return User;
};