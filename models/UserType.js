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
        UserType.belongsToMany(models.users, {
            foreignKey: "users_id",
            as: "users",
            through: models.users_userTypes
        });
    };

    return UserType;
};