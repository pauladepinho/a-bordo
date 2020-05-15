module.exports = (sequelize, DataTypes) => {
    let User_Class = sequelize.define(
        "User_Class",
        {
            student_number: {
                type: DataTypes.INTEGER
            },
            users_id: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
                // references: {
                //     model: "users",
                //     key: "id",
                // }
            },
            classes_id: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
                // references: {
                //     model: "userTypes",
                //     key: "id",
                // }
            }
        },
        {
            tableName: "users_userTypes",
            timestamps: false,
        }
    );

    User_Class.associate = (models) => {
        User_Class.belongsTo(models.User, {
            as: "users",
            foreignKey: "users_id"
        });
        User_Class.belongsTo(models.Class, {
            as: "classes",
            foreignKey: "classes_id"
        });
    };

    return User_Class;
};