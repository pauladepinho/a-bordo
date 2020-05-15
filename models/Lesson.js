module.exports = (sequelize, DataTypes) => {
    let Lesson = sequelize.define(
        "lesson",
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
                // },
                onUpdate: "CASCADE",
                onDelete: "CASCADE"
            },
            subjects_id: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
                // references: {
                //     model: "subjects",
                //     key: "id",
                // },
                onUpdate: "CASCADE",
                onDelete: "CASCADE"
            }
        },
        {
            tableName: "lessons",
            timestamps: false,
        }
    );

    Lesson.associate = (models) => {
        Lesson.belongsToMany(models.user, {
            foreignKey: "users_id",
            as: "users",
            through: models.attendance
        });
        Lesson.hasMany(models.attendance, {
            as: "attendances"
        });
        Lesson.hasMany(models.evaluation, {
            as: "evaluations"
        });
        Lesson.belongsTo(models.subject, {
            foreignKey: "subjects_id",
            as: "subjects"
        });
        Lesson.belongsTo(models.class, {
            foreignKey: "classes_id",
            as: "classes"
        });
    };

    return Lesson;
};