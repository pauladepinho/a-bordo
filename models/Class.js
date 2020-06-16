'use strict';
module.exports = (sequelize, DataTypes) => {
  const Class = sequelize.define('Class',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      schoolId: { type: DataTypes.INTEGER, allowNull: false },
      code: { type: DataTypes.STRING, allowNull: false },
      year: { type: DataTypes.STRING, allowNull: false },
      levelOfEducation: { type: DataTypes.STRING, allowNull: false },
      grade: { type: DataTypes.STRING, allowNull: false }
    },
    {
      timestamps: false,
    });
  Class.associate = function (models) {
    // associations can be defined here
    Class.belongsTo(models.School, {
      as: "school"
    });

    Class.hasMany(models.Course, {
      as: "courses",
      foreignKey: "classId"
    });
    Class.belongsToMany(models.Teacher, {
      as: "teachers",
      through: models.Course,
      foreignKey: "classId"
    });
    Class.belongsToMany(models.Subject, {
      as: "subjects",
      through: models.Course,
      foreignKey: "classId"
    });

    Class.hasMany(models.Class_Student, {
      as: "classStudents",
      foreignKey: "classId"
    });
    Class.belongsToMany(models.Student, {
      as: "students",
      through: models.Class_Student,
      foreignKey: "classId"
    });
  };
  return Class;
};