module.exports = (sequelize, DataTypes) => {
    let User_Category = sequelize.define(
        "User_Category",
        {
            users_id: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false
            },
            categories_id: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false
            }
        },
        {
            tableName: "users_categories",
            timestamps: false,
        }
    );

    User_Category.associate = (models) => {
        User_Category.hasMany(models.User_Class, {
            as: "users_classes"
        });
        User_Category.belongsToMany(models.Class, {
            as: "classes",
            foreignKey: "users_categories_id",
            through: models.User_Class
        });
    };

    return User_Category;
};