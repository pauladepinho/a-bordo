module.exports = (sequelize, DataTypes) => {
    let Evaluation_User = sequelize.define(
        "evaluation_user",
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
                allowNull: false,
                // references: {
                //     model: "evaluations",
                //     key: "id",
                // },
                onUpdate: "CASCADE",
                onDelete: "CASCADE"
            },
            users_id: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
                // references: {
                //     model: "users",
                //     key: "id",
                // },
                onUpdate: "CASCADE",
                onDelete: "CASCADE"
            }
        },
        {
            tableName: "evaluations_users",
            timestamps: false,
        }
    );

    Evaluation_User.associate = (models) => {
        Evaluation_User.belongsTo(models.user, {
            foreignKey: "users_id",
            as: "users"
        });
        Evaluation_User.belongsTo(models.evaluation, {
            foreignKey: "evaluations_id",
            as: "evaluations"
        });
    };

    return Evaluation_User;
};