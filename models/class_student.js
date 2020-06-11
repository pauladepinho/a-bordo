'use strict';
module.exports = (sequelize, DataTypes) => {
  const Class_Student = sequelize.define('Class_Student',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      classId: { type: DataTypes.INTEGER, allowNull: false },
      studentId: { type: DataTypes.INTEGER, allowNull: false },
      number: { type: DataTypes.INTEGER, allowNull: false }
    },
    {
      timestamps: false,
    });
  Class_Student.associate = function (models) {
    // associations can be defined here
  };
  return Class_Student;
};