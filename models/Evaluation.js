'use strict';
module.exports = (sequelize, DataTypes) => {
  const Evaluation = sequelize.define('Evaluation',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      lessonId: { type: DataTypes.INTEGER, allowNull: false },
      maxGrade: { type: DataTypes.DECIMAL, allowNull: false },
      title: { type: DataTypes.STRING, allowNull: false },
      color: { type: DataTypes.STRING, allowNull: false },
      type: { type: DataTypes.STRING, allowNull: false }
    },
    {
      timestamps: false,
    });
  Evaluation.associate = function (models) {
    // associations can be defined here
    Evaluation.belongsTo(models.Lesson, {
      as: "lesson"
    });

    Evaluation.hasMany(models.Student_Evaluation, {
      as: "studentsGrades",
      foreignkey: "evaluationId"
    });
    Evaluation.belongsToMany(models.Student, {
      as: "students",
      foreignkey: "evaluationId",
      through: models.Student_Evaluation
    });
  };
  return Evaluation;
};