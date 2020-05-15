module.exports = (sequelize, DataTypes) => {
    let Subject = sequelize.define(
        "subject",
        {
            name: {
                type: DataTypes.STRING(50),
                allowNull: false,
                unique: true
            }
        },
        {
            tableName: "subjects",
            timestamps: false,
        }
    );

    Subject.associate = (models) => {
        Subject.belongsToMany(models.users, {
            foreignKey: "users_id",
            as: "users",
            through: models.users_subjects
        });
        Subject.belongsToMany(models.classes, {
            foreignKey: "classes_id",
            as: "classes",
            through: models.lessons
        });
        Subject.hasMany(models.lessons, {
            as: "lessons"
        });
    };

    return Subject;
};