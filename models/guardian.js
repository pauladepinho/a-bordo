'use strict';
module.exports = (sequelize, DataTypes) => {
  const Guardian = sequelize.define('Guardian',
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
  Guardian.associate = function (models) {
    // associations can be defined here
    Guardian.belongsTo(models.User, {
      as: "user"
    });
    Guardian.belongsToMany(models.Student, {
      as: "kids",
      foreignkey: "guardianId",
      through: models.Student_Guardian
    })
  };
  return Guardian;
};