'use strict';
module.exports = (sequelize, DataTypes) => {
  const Teacher = sequelize.define('Teacher',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      userId: { type: DataTypes.INTEGER, allowNull: false }
    },
    {
      timestamps: false,
    });
  Teacher.associate = function (models) {
    // associations can be defined here
    Teacher.belongsTo(models.User, {
      as: "user"
    });

    Teacher.hasMany(models.Course, {
      as: "courses",
      foreignkey: "teacherId"
    });
    Teacher.belongsToMany(models.Class, {
      as: "classes",
      through: models.Course,
      foreignkey: "teacherId"
    });
    Teacher.belongsToMany(models.Subject, {
      as: "subjects",
      through: models.Course,
      foreignkey: "teacherId"
    });
  };
  return Teacher;
};