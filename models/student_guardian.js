'use strict';
module.exports = (sequelize, DataTypes) => {
  const Student_Guardian = sequelize.define('Student_Guardian',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      studentId: { type: DataTypes.INTEGER, allowNull: false },
      guardianId: { type: DataTypes.INTEGER, allowNull: false }
    },
    {
      timestamps: false,
    });
  Student_Guardian.associate = function (models) {
    // associations can be defined here
  };
  return Student_Guardian;
};