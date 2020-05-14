module.exports = (sequelize, DataTypes) => {
    let user = sequelize.define(
        "user",
        {
            forename: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            surname: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            phone: Sequelize.STRING(17),
            email: {
                type: Sequelize.STRING(50),
                allowNull: false,
                unique: true
            },
            password: {
                type: Sequelize.STRING(256),
                allowNull: false
            },
            picture: Sequelize.BLOB
        },
        {
            tableName: "users",
            timestamps: false,
        }
    );

    user.associate = (models) => {
        user.belongsToMany(models.userTypes, {
            foreignKey: "userTypes_id",
            as: "userTypes",
            through: models.users_userTypes
        });
        user.belongsToMany(models.schools, {
            foreignKey: "schools_id",
            as: "schools",
            through: models.users_schools
        });
        user.belongsToMany(models.subjects, {
            foreignKey: "subjects_id",
            as: "subjects",
            through: models.users_subjects
        });
        user.belongsToMany(models.classes, {
            foreignKey: "classes_id",
            as: "classes",
            through: models.users_classes
        });
        user.belongsToMany(models.lessons, {
            foreignKey: "lessons_id",
            as: "lessons",
            through: models.attendances
        });
        user.belongsToMany(models.evaluations, {
            foreignKey: "evaluations_id",
            as: "evaluations",
            through: models.evaluations_users
        });
    };

    return user;
};