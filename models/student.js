'use strict';
module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define('Student',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      name: { type: DataTypes.STRING, allowNull: false/*, unique: true */ }
    },
    {
      timestamps: false,
    });
  Student.associate = function (models) {
    // associations can be defined here
    Student.hasMany(models.Class_Student, {
      as: "classStudents",
      foreignKey: "studentId"
    });
    Student.belongsToMany(models.Class, {
      as: "classes",
      through: models.Class_Student,
      foreignKey: "studentId"
    });

    Student.hasMany(models.Student_Evaluation, {
      as: "studentEvaluations",
      foreignKey: "studentId"
    });
    Student.belongsToMany(models.Evaluation, {
      as: "evaluations",
      foreignKey: "studentId",
      through: models.Student_Evaluation
    });

    Student.hasMany(models.Attendance, {
      as: "attendances",
      foreignKey: "studentId"
    });
    Student.belongsToMany(models.Lesson, {
      as: "lessons",
      foreignKey: "studentId",
      through: models.Attendance
    });

    Student.belongsToMany(models.Course, {
      as: "repeatedCourses",
      foreignKey: "studentId",
      through: models.Repeater
    });

    Student.belongsToMany(models.Guardian, {
      as: "guardians",
      foreignKey: "studentId",
      through: models.Student_Guardian
    });
  };
  return Student;
};