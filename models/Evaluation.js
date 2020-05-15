module.exports = (sequelize, DataTypes) => {
    let Evaluation = sequelize.define(
        "Evaluation",
        {
            evaluation_number: {
                type: DataTypes.INTEGER(1),
                allowNull: false
            },
            max_grade: {
                type: DataTypes.DECIMAL(5, 2),
                allowNull: false
            },
            title: {
                type: DataTypes.STRING(50),
                allowNull: false
            },
            color: {
                type: DataTypes.STRING(7),
                allowNull: false
            },
            type: {
                type: DataTypes.STRING(20),
                allowNull: false
            },
            lessons_id: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
                // references: {
                //     model: "lessons",
                //     key: "id",
                // },
                onUpdate: "CASCADE",
                onDelete: "CASCADE"
            }
        },
        {
            tableName: "evaluations",
            timestamps: false,
        }
    );

    Evaluation.associate = (models) => {
        Evaluation.belongsToMany(models.User, {
            foreignKey: "users_id",
            as: "users",
            through: models.Evaluation_User
        });
        Evaluation.hasMany(models.Evaluation_User, {
            as: "student_grades"
        });
        Evaluation.belongsTo(models.Lesson, {
            foreignKey: "lessons_id",
            as: "lessons"
        });
    };

    return Evaluation;
};