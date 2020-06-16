'use strict';
module.exports = (sequelize, DataTypes) => {
  const Attendance = sequelize.define('Attendance',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      lessonId: { type: DataTypes.INTEGER, allowNull: false },
      studentId: { type: DataTypes.INTEGER, allowNull: false },
      mark: { type: DataTypes.STRING, allowNull: false },
      period: { type: DataTypes.STRING, allowNull: false }
    },
    {
      timestamps: false,
    });
  Attendance.associate = function (models) {
    // associations can be defined here
    Attendance.belongsTo(models.Lesson, {
      as: "lesson"
    });
    Attendance.belongsTo(models.Student, {
      as: "student"
    });
  };
  return Attendance;
};