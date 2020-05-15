module.exports = (sequelize, DataTypes) => {
    let UserType = sequelize.define(
        "userType",
        {
            type: {
                type: DataTypes.STRING(20),
                allowNull: false,
                unique: true
            }
        },
        {
            tableName: "userTypes",
            timestamps: false,
        }
    );

    UserType.associate = (models) => {
        UserType.belongsToMany(models.user, {
            foreignKey: "users_id",
            as: "users",
            through: models.user_userType
        });
    };

    return UserType;
};