module.exports = (sequelize, DataTypes) => {
    let Class = sequelize.define(
        "Class",
        {
            code: {
                type: DataTypes.STRING(10),
                allowNull: false
            },
            year: {
                type: DataTypes.STRING(4),
                allowNull: false
            },
            level_of_education: {
                type: DataTypes.STRING(25),
                allowNull: false
            },
            grade: {
                type: DataTypes.INTEGER(2),
                allowNull: false
            },
            schools_id: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false
            }
        },
        {
            tableName: "classes",
            timestamps: false
        }
    );

    Class.associate = (models) => {
        Class.belongsTo(models.School, {
            as: "schools",
            foreignKey: "schools_id"
        });
        Class.hasMany(models.User_Class, {
            as: "users_classes"
        });
        Class.belongsToMany(models.User_Category, {
            as: "users_categories",
            foreignKey: "classes_id",
            through: models.User_Class
        });
    };

    return Class;
};