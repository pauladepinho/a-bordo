module.exports = (sequelize, DataTypes) => {
    let Evaluation = sequelize.define(
        "Evaluation",
        {
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
            }
        },
        {
            tableName: "evaluations",
            timestamps: false,
        }
    );

    Evaluation.associate = (models) => {
        Evaluation.hasMany(models.Student_Evaluation, {
            as: "students_evaluations"
        });
        Evaluation.belongsToMany(models.Class_Lesson, {
            as: "classes_lessons",
            foreignKey: "evaluations_id",
            through: models.Student_Evaluation
        });

    };

    return Evaluation;
};