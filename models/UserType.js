module.exports = (sequelize, DataTypes) => {
    let UserType = sequelize.define(
        "UserType",
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
        UserType.belongsToMany(models.User, {
            as: "users",
            foreignKey: "userTypes_id",
            through: models.User_UserType
        });
    };

    return UserType;
};