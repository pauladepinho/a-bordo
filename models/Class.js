module.exports = (sequelize, DataTypes) => {
    let Class = sequelize.define(
        "class",
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
                // },
                onUpdate: "CASCADE",
                onDelete: "CASCADE"
            }
        },
        {
            tableName: "classes",
            timestamps: false
        }
    );

    Class.associate = (models) => {
        Class.belongsTo(models.school, {
            foreignKey: "schools_id",
            as: "schools"
        });
        Class.belongsToMany(models.user, {
            foreignKey: "users_id",
            as: "users",
            through: models.user_class
        });
        Class.hasMany(models.user_class, {
            as: "student_numbers"
        });
        Class.belongsToMany(models.subject, {
            foreignKey: "subjects_id",
            as: "subjects",
            through: models.lesson
        });
        Class.hasMany(models.lesson, {
            as: "lessons"
        });
    };

    return Class;
};