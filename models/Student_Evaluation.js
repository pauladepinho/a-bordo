'use strict';
module.exports = (sequelize, DataTypes) => {
  const Student_Evaluation = sequelize.define('Student_Evaluation',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      studentId: { type: DataTypes.INTEGER, allowNull: false },
      evaluationId: { type: DataTypes.INTEGER, allowNull: false },
      grade: { type: DataTypes.DECIMAL, allowNull: false },
      evaluated: { type: DataTypes.TINYINT, allowNull: false }
    },
    {
      timestamps: false,
    });
  Student_Evaluation.associate = function (models) {
    // associations can be defined here
    Student_Evaluation.belongsTo(models.Student, {
      as: "student"
    });
    Student_Evaluation.belongsTo(models.Evaluation, {
      as: "evaluation"
    });
  };
  return Student_Evaluation;
};