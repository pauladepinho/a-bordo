module.exports = (sequelize, DataTypes) => {
    let subject = sequelize.define(
        "subject",
        {
            name: {
                type: Sequelize.STRING(50),
                allowNull: false,
                unique: true
            }
        },
        {
            tableName: "subjects",
            timestamps: false,
        }
    );

    subject.associate = (models) => {
        subject.belongsToMany(models.users, {
            foreignKey: "users_id",
            as: "users",
            through: models.users_subjects
        });
        subject.belongsToMany(models.classes, {
            foreignKey: "classes_id",
            as: "classes",
            through: models.lessons
        });
        subject.hasMany(models.lessons, {
            as: "lessons"
        });
    };

    return subject;
};