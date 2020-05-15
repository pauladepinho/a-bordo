module.exports = (sequelize, DataTypes) => {
    let User = sequelize.define(
        "User",
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
        User.belongsToMany(models.UserType, {
            as: "userTypes",
            foreignKey: "users_id",
            through: models.User_UserType
        });
        User.belongsToMany(models.School, {
            as: "schools",
            foreignKey: "users_id",
            through: models.User_School
        });
        User.belongsToMany(models.Subject, {
            as: "subjects",
            foreignKey: "users_id",
            through: models.User_Subject
        });
        User.belongsToMany(models.Class, {
            as: "classes",
            foreignKey: "users_id",
            through: models.User_Class
        });
        User.hasMany(models.User_Class, {
            as: "student_numbers"
        });
        User.belongsToMany(models.Lesson, {
            as: "lessons",
            foreignKey: "users_id",
            through: models.Attendance
        });
        User.hasMany(models.Attendance, {
            as: "attendances"
        });
        User.belongsToMany(models.Evaluation, {
            as: "evaluations",
            foreignKey: "users_id",
            through: models.Evaluation_User
        });
        User.hasMany(models.Evaluation_User, {
            as: "student_grades"
        });
    };

    return User;
};