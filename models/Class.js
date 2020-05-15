module.exports = (sequelize, DataTypes) => {
    let Class = sequelize.define(
        "Class",
        {
            code: {
                type: DataTypes.STRING(10),
                allowNull: false
            },
            level_of_education: {
                type: DataTypes.STRING(25),
                allowNull: false
            },
            grade: {
                type: DataTypes.INTEGER(2),
                allowNull: false
            },
            year: {
                type: DataTypes.STRING(4),
                allowNull: false
            },
            number_of_students: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false
            },
            number_of_subjects: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false
            },
            number_of_teachers: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false
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
            tableName: "classes",
            timestamps: false
        }
    );

    Class.associate = (models) => {
        Class.belongsTo(models.School, {
            as: "schools",
            foreignKey: "schools_id"
        });
        Class.belongsToMany(models.User, {
            as: "users",
            foreignKey: "classes_id",
            through: models.User_Class
        });
        Class.hasMany(models.User_Class, {
            as: "student_numbers"
        });
        Class.belongsToMany(models.Subject, {
            as: "subjects",
            foreignKey: "classes_id",
            through: models.Lesson
        });
        Class.hasMany(models.Lesson, {
            as: "lessons"
        });
    };

    return Class;
};