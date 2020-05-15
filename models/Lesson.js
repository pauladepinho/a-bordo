module.exports = (sequelize, DataTypes) => {
    let Lesson = sequelize.define(
        "Lesson",
        {
            date: {
                type: DataTypes.DATEONLY,
                allowNull: false
            },
            academic_term: {
                type: DataTypes.INTEGER(1),
                allowNull: false
            },
            observations: DataTypes.STRING,
            evaluation_day: {
                type: DataTypes.TINYINT,
                allowNull: false
            },
            classes_id: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
                // references: {
                //     model: "classes",
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
            tableName: "lessons",
            timestamps: false,
        }
    );

    Lesson.associate = (models) => {
        Lesson.belongsToMany(models.User, {
            as: "users",
            foreignKey: "lessons_id",
            through: models.Attendance
        });
        Lesson.hasMany(models.Attendance, {
            as: "attendances"
        });
        Lesson.hasMany(models.Evaluation, {
            as: "evaluations"
        });
        Lesson.belongsTo(models.Subject, {
            as: "subjects",
            foreignKey: "subjects_id"
        });
        Lesson.belongsTo(models.Class, {
            as: "classes",
            foreignKey: "classes_id"
        });
    };

    return Lesson;
};