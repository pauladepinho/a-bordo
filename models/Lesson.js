module.exports = (sequelize, DataTypes) => {
    let Lesson = sequelize.define(
        "Lesson",
        {
            academic_term: {
                type: DataTypes.INTEGER(1),
                allowNull: false
            },
            date: {
                type: DataTypes.DATEONLY,
                allowNull: false
            },
            periods: {
                type: DataTypes.INTEGER(2),
                allowNull: false
            },
            observations: DataTypes.STRING,
            evaluation_day: {
                type: DataTypes.TINYINT,
                allowNull: false
            }
        },
        {
            tableName: "lessons",
            timestamps: false,
        }
    );

    Lesson.associate = (models) => {
        Lesson.hasMany(models.Class_Lesson, {
            as: "classes_lessons"
        });
        Lesson.belongsToMany(models.User_Class, {
            as: "users_classes",
            foreignKey: "lessons_id",
            through: models.Class_Lesson
        });
    };

    return Lesson;
};