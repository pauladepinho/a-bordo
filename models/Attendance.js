module.exports = (sequelize, DataTypes) => {
    let Attendance = sequelize.define(
        "Attendance",
        {
            mark: {
                type: DataTypes.STRING(10),
                allowNull: false
            },
            period: {
                type: DataTypes.INTEGER(2),
                allowNull: false
            },
            classes_lessons_id: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false
            }
        },
        {
            tableName: "attendances",
            timestamps: false,
        }
    );

    Attendance.associate = (models) => {
        Attendance.belongsTo(models.Class_Lesson, {
            as: "classes_lessons",
            foreignKey: "classes_lessons_id"
        });
    };

    return Attendance;
};