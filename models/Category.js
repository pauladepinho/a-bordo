module.exports = (sequelize, DataTypes) => {
    let Category = sequelize.define(
        "Category",
        {
            name: {
                type: DataTypes.STRING(20),
                allowNull: false,
                unique: true
            }
        },
        {
            tableName: "categories",
            timestamps: false,
        }
    );

    Category.associate = (models) => {
        Category.belongsToMany(models.User, {
            as: "users",
            foreignKey: "categories_id",
            through: models.User_Category
        });
    };

    return Category;
};