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
        User.belongsToMany(models.userTypes, {
            foreignKey: "userTypes_id",
            as: "userTypes",
            through: models.users_userTypes
        });
        User.belongsToMany(models.schools, {
            foreignKey: "schools_id",
            as: "schools",
            through: models.users_schools
        });
        User.belongsToMany(models.subjects, {
            foreignKey: "subjects_id",
            as: "subjects",
            through: models.users_subjects
        });
        User.belongsToMany(models.classes, {
            foreignKey: "classes_id",
            as: "classes",
            through: models.users_classes
        });
        User.belongsToMany(models.lessons, {
            foreignKey: "lessons_id",
            as: "lessons",
            through: models.attendances
        });
        User.belongsToMany(models.evaluations, {
            foreignKey: "evaluations_id",
            as: "evaluations",
            through: models.evaluations_users
        });
    };

    return User;
};