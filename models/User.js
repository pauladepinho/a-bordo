module.exports = (sequelize, DataTypes) => {
    let User = sequelize.define(
        "User",
        {
            forename: {
                type: DataTypes.STRING(50),
                allowNull: false
            },
            surname: {
                type: DataTypes.STRING(50),
                allowNull: false
            },
            phone: DataTypes.STRING(17),
            email: {
                type: DataTypes.STRING(50),
                allowNull: false,
                unique: true
            },
            password: {
                type: DataTypes.STRING(256),
                allowNull: false
            },
            picture: DataTypes.BLOB
        },
        {
            tableName: "users",
            timestamps: false,
        }
    );

    User.associate = (models) => {
        User.belongsToMany(models.Category, {
            as: "categories",
            foreignKey: "users_id",
            through: models.User_Category
        });
    };

    return User;
};