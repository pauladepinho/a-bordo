module.exports = (sequelize, DataTypes) => {
    let User_School = sequelize.define(
        "User_School",
        {
            users_id: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
                // references: {
                //     model: "users",
                //     key: "id",
                // }
            },
            schools_id: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
                // references: {
                //     model: "schools",
                //     key: "id",
                // }
            }
        },
        {
            tableName: "users_schools",
            timestamps: false,
        }
    );

    return User_School;
};