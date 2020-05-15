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
        Subject.belongsToMany(models.user, {
            foreignKey: "users_id",
            as: "users",
            through: models.user_subject
        });
        Subject.belongsToMany(models.class, {
            foreignKey: "classes_id",
            as: "classes",
            through: models.lesson
        });
        Subject.hasMany(models.lesson, {
            as: "lessons"
        });
    };

    return Subject;
};