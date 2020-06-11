'use strict';
module.exports = (sequelize, DataTypes) => {
  const Lesson = sequelize.define('Lesson',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      courseId: { type: DataTypes.INTEGER, allowNull: false },
      academicTerm: { type: DataTypes.STRING, allowNull: false },
      date: { type: DataTypes.DATEONLY, allowNull: false },
      periods: { type: DataTypes.INTEGER, allowNull: false },
      observations: { type: DataTypes.TEXT }
    },
    {
      timestamps: false,
    });
  Lesson.associate = function (models) {
    // associations can be defined here
    Lesson.belongsTo(models.Course, {
      as: "course"
    });
    Lesson.hasMany(models.Attendance, {
      as: "attendances",
      foreignkey: "lessonId"
    });
    Lesson.hasMany(models.Evaluation, {
      as: "evaluations",
      foreignkey: "lessonId"
    })
  };
  return Lesson;
};