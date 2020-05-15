module.exports = (sequelize, DataTypes) => {
    let Attendance = sequelize.define(
        "Attendance",
        {
            type: {
                type: DataTypes.STRING(8),
                allowNull: false
            },
            users_id: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
                // references: {
                //     model: "users",
                //     key: "id",
                // }
            },
            lessons_id: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
                // references: {
                //     model: "lessons",
                //     key: "id",
                // }
            }
        },
        {
            tableName: "attendances",
            timestamps: false,
        }
    );

    Attendance.associate = (models) => {
        Attendance.belongsTo(models.User, {
            as: "users",
            foreignKey: "users_id"
        });
        Attendance.belongsTo(models.Lesson, {
            as: "lessons",
            foreignKey: "lessons_id"
        });
    };

    return Attendance;
};