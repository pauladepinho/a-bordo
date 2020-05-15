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
                references: {
                    model: "users",
                    key: "id",
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE"
            },
            lessons_id: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
                references: {
                    model: "lessons",
                    key: "id",
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE"
            }
        },
        {
            tableName: "attendances",
            timestamps: false,
        }
    );

    Attendance.associate = (models) => {
        Attendance.belongsTo(models.User, {
            foreignKey: "users_id",
            as: "users"
        });
        Attendance.belongsTo(models.Lesson, {
            foreignKey: "lessons_id",
            as: "lessons"
        });
    };

    return Attendance;
};