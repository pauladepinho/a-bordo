'use strict';
module.exports = (sequelize, DataTypes) => {
  const Subject = sequelize.define('Subject',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      name: { type: DataTypes.STRING, allowNull: false, unique: true }
    },
    {
      timestamps: false,
    });
  Subject.associate = function (models) {
    // associations can be defined here
    Subject.hasMany(models.Course, {
      as: "courses",
      foreignKey: "subjectId"
    });
    Subject.belongsToMany(models.Teacher, {
      as: "teachers",
      through: models.Course,
      foreignKey: "subjectId"
    });
    Subject.belongsToMany(models.Class, {
      as: "classes",
      through: models.Course,
      foreignKey: "subjectId"
    });

  };
  return Subject;
};