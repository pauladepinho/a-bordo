module.exports = (sequelize, DataTypes) => {
    let userType = sequelize.define(
        "userType",
        {
            type: {
                type: Sequelize.STRING(20),
                allowNull: false,
                unique: true
            }
        },
        {
            tableName: "userTypes",
            timestamps: false,
        }
    );

    userType.associate = (models) => {
        userType.belongsToMany(models.users, {
            foreignKey: "users_id",
            as: "users",
            through: models.users_userTypes
        });
    };

    return userType;
};