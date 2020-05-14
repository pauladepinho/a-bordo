module.exports = (sequelize, DataTypes) => {
    let user_userType = sequelize.define(
        "user_userType",
        {
            users_id: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false,
                // references: {
                //     model: "users",
                //     key: "id",
                // },
                onUpdate: "CASCADE",
                onDelete: "CASCADE"
            },
            userTypes_id: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false,
                // references: {
                //     model: "userTypes",
                //     key: "id",
                // },
                onUpdate: "CASCADE",
                onDelete: "CASCADE"
            }
        },
        {
            tableName: "users_userTypes",
            timestamps: false,
        }
    );

    return user_userType;
};