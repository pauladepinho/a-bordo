module.exports = (sequelize, DataTypes) => {
    let Evaluation_User = sequelize.define(
        "Evaluation_User",
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
                // }
            },
            users_id: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
                // references: {
                //     model: "users",
                //     key: "id",
                // }
            }
        },
        {
            tableName: "evaluations_users",
            timestamps: false,
        }
    );

    Evaluation_User.associate = (models) => {
        Evaluation_User.belongsTo(models.User, {
            as: "users",
            foreignKey: "users_id"
        });
        Evaluation_User.belongsTo(models.Evaluation, {
            as: "evaluations",
            foreignKey: "evaluations_id"
        });
    };

    return Evaluation_User;
};