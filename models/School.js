module.exports = (sequelize, DataTypes) => {
    let School = sequelize.define(
        "school",
        {
            name: {
                type: DataTypes.STRING(70),
                allowNull: false
            },
            passing_grade: {
                type: DataTypes.DECIMAL(4, 2),
                allowNull: false
            },
            academic_terms: {
                type: DataTypes.INTEGER(1),
                allowNull: false
            },
            state: {
                type: DataTypes.STRING(2),
                allowNull: false
            },
            municipality: {
                type: DataTypes.STRING(50),
                allowNull: false
            },
        },
        {
            tableName: "schools",
            timestamps: false,
        }
    );

    School.associate = (models) => {
        School.belongsToMany(models.users, {
            foreignKey: "users_id",
            as: "users",
            through: models.users_schools
        });
        School.hasMany(models.classes, {
            as: "classes"
        });
    };

    return School;
};