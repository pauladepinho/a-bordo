module.exports = (sequelize, DataTypes) => {
    let Class_Lesson = sequelize.define(
        "Class_Lesson",
        {
            users_classes_id: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false
            },
            lessons_id: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false
            }
        },
        {
            tableName: "classes_lessons",
            timestamps: false,
        }
    );

    Class_Lesson.associate = (models) => {
        Class_Lesson.belongsTo(models.User_Class, {
            as: "users_classes",
            foreignKey: "users_classes_id"
        });
        Class_Lesson.belongsTo(models.Lesson, {
            as: "lessons",
            foreignKey: "lessons_id"
        });
        Class_Lesson.hasMany(models.Attendance, {
            as: "attendances"
        });
        Class_Lesson.hasMany(models.Student_Evaluation, {
            as: "students_evaluations"
        });
        Class_Lesson.belongsToMany(models.Evaluation, {
            as: "evaluations",
            foreignKey: "classes_lessons_id",
            through: models.Student_Evaluation
        });
    };

    return Class_Lesson;
};