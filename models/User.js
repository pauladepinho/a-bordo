module.exports = (sequelize, DataTypes) => {
    let User = sequelize.define(
        "user",
        {
            forename: {
                type: DataTypes.STRING(50),
                allowNull: false
            },
            surname: {
                type: DataTypes.STRING(50),
                allowNull: false
            },
            phone: DataTypes.STRING(17),
            email: {
                type: DataTypes.STRING(50),
                allowNull: false,
                unique: true
            },
            password: {
                type: DataTypes.STRING(256),
                allowNull: false
            },
            picture: DataTypes.BLOB
        },
        {
            tableName: "users",
            timestamps: false,
        }
    );

    User.associate = (models) => {
        User.belongsToMany(models.userType, {
            foreignKey: "userTypes_id",
            as: "userTypes",
            through: models.user_userType
        });
        User.belongsToMany(models.school, {
            foreignKey: "schools_id",
            as: "schools",
            through: models.user_school
        });
        User.belongsToMany(models.subject, {
            foreignKey: "subjects_id",
            as: "subjects",
            through: models.user_subject
        });
        User.belongsToMany(models.class, {
            foreignKey: "classes_id",
            as: "classes",
            through: models.user_class
        });
        User.hasMany(models.user_class, {
            as: "student_numbers"
        });
        User.belongsToMany(models.lesson, {
            foreignKey: "lessons_id",
            as: "lessons",
            through: models.attendance
        });
        User.hasMany(models.attendance, {
            as: "attendances"
        });
        User.belongsToMany(models.evaluation, {
            foreignKey: "evaluations_id",
            as: "evaluations",
            through: models.evaluation_user
        });
        User.hasMany(models.evaluation_user, {
            as: "student_grades"
        });
    };

    return User;
};