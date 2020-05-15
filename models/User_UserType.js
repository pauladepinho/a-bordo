module.exports = (sequelize, DataTypes) => {
    let User_UserType = sequelize.define(
        "User_UserType",
        {
            users_id: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
                // references: {
                //     model: "users",
                //     key: "id",
                // }
            },
            userTypes_id: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
                // references: {
                //     model: "userTypes",
                //     key: "id",
                // }
            }
        },
        {
            tableName: "users_userTypes",
            timestamps: false,
        }
    );

    return User_UserType;
};