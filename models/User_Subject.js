module.exports = (sequelize, DataTypes) => {
    let User_Subject = sequelize.define(
        "User_Subject",
        {
            users_id: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
                // references: {
                //     model: "users",
                //     key: "id",
                // }
            },
            subjects_id: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
                // references: {
                //     model: "subjects",
                //     key: "id",
                // }
            }
        },
        {
            tableName: "users_subjects",
            timestamps: false,
        }
    );

    return User_Subject;
};