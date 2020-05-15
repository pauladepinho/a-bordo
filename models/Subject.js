module.exports = (sequelize, DataTypes) => {
    let Subject = sequelize.define(
        "Subject",
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
        Subject.belongsToMany(models.User, {
            foreignKey: "users_id",
            as: "users",
            through: models.User_Subject
        });
        Subject.belongsToMany(models.Class, {
            foreignKey: "classes_id",
            as: "classes",
            through: models.Lesson
        });
        Subject.hasMany(models.Lesson, {
            as: "lessons"
        });
    };

    return Subject;
};