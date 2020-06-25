'use strict';
module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define('Course',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      teacherId: { type: DataTypes.INTEGER, allowNull: false },
      subjectId: { type: DataTypes.INTEGER, allowNull: false },
      classId: { type: DataTypes.INTEGER, allowNull: false }
    },
    {
      timestamps: false,
    });
  Course.associate = function (models) {
    // associations can be defined here
    Course.belongsTo(models.Teacher, {
      as: "teacher"
    });
    Course.belongsTo(models.Subject, {
      as: "subject"
    });
    Course.belongsTo(models.Class, {
      as: "class"
    });

    Course.hasMany(models.Lesson, {
      as: "lessons",
      foreignkey: "courseId"
    });

    Course.belongsToMany(models.Student, {
      as: "repeaters",
      foreignkey: "courseId",
      through: models.Repeater
    });
  };
  return Course;
};