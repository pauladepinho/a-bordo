module.exports = (sequelize, DataTypes) => {
    let Evaluation = sequelize.define(
        "evaluation",
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
        Evaluation.belongsToMany(models.users, {
            foreignKey: "users_id",
            as: "users",
            through: models.evaluations_users
        });
        Evaluation.hasMany(models.evaluations_users, {
            as: "student_grades"
        });
        Evaluation.belongsTo(models.lessons, {
            foreignKey: "lessons_id",
            as: "lessons"
        });
    };

    return Evaluation;
};