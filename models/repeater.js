'use strict';
module.exports = (sequelize, DataTypes) => {
  const Repeater = sequelize.define('Repeater',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      studentId: { type: DataTypes.INTEGER, allowNull: false },
      courseId: { type: DataTypes.INTEGER, allowNull: false }
    },
    {
      timestamps: false,
    });
  Repeater.associate = function (models) {
    // associations can be defined here
  };
  return Repeater;
};