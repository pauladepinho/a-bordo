'use strict';
module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define('Student',
    {
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
  };
  return Student;
};