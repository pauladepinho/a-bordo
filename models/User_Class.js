module.exports = (sequelize, DataTypes) => {
    let User_Class = sequelize.define(
        "User_Class",
        {
            subject: {
                type: DataTypes.STRING(50),
                allowNull: false
            },
            student_number: {
                type: DataTypes.INTEGER
            },
            users_categories_id: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false
            },
            classes_id: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false
            }
        },
        {
            tableName: "users_classes",
            timestamps: false,
        }
    );

    User_Class.associate = (models) => {
        User_Class.belongsTo(models.User_Category, {
            as: "users_categories",
            foreignKey: "users_categories_id"
        });
        User_Class.belongsTo(models.Class, {
            as: "classes",
            foreignKey: "classes_id"
        });
        User_Class.hasMany(models.Class_Lesson, {
            as: "classes_lessons"
        });
        User_Class.belongsToMany(models.Lesson, {
            as: "lessons",
            foreignKey: "users_classes_id",
            through: models.Class_Lesson
        });
    };

    return User_Class;
};