module.exports = (sequelize, DataTypes) => {
    let User_Class = sequelize.define(
        "user_class",
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
                // },
                onUpdate: "CASCADE",
                onDelete: "CASCADE"
            },
            classes_id: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
                // references: {
                //     model: "userTypes",
                //     key: "id",
                // },
                onUpdate: "CASCADE",
                onDelete: "CASCADE"
            }
        },
        {
            tableName: "users_userTypes",
            timestamps: false,
        }
    );

    User_Class.associate = (models) => {
        User_Class.belongsTo(models.users, {
            foreignKey: "users_id",
            as: "users"
        });
        User_Class.belongsTo(models.classes, {
            foreignKey: "classes_id",
            as: "classes"
        });
    };

    return User_Class;
};