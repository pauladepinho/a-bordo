module.exports = (sequelize, DataTypes) => {
    let Student_Evaluation = sequelize.define(
        "Student_Evaluation",
        {
            evaluated: {
                type: DataTypes.TINYINT,
                allowNull: false
            },
            grade: {
                type: DataTypes.DECIMAL(5, 2),
                allowNull: false
            },
            evaluations_id: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false
            },
            classes_lessons_id: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false
            }
        },
        {
            tableName: "students_evaluations",
            timestamps: false,
        }
    );

    Student_Evaluation.associate = (models) => {
        Student_Evaluation.belongsTo(models.Class_Lesson, {
            as: "classes_lessons",
            foreignKey: "classes_lessons_id"
        });
        Student_Evaluation.belongsTo(models.Evaluation, {
            as: "evaluations",
            foreignKey: "evaluations_id"
        });
    };

    return Student_Evaluation;
};