module.exports = (sequelize, DataTypes) => {
    let school = sequelize.define(
        "school",
        {
            name: {
                type: Sequelize.STRING(70),
                allowNull: false
            },
            passing_grade: {
                type: Sequelize.DECIMAL(4, 2),
                allowNull: false
            },
            academic_terms: {
                type: Sequelize.INTEGER(1),
                allowNull: false
            },
            state: {
                type: Sequelize.STRING(2),
                allowNull: false
            },
            municipality: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
        },
        {
            tableName: "schools",
            timestamps: false,
        }
    );

    school.associate = (models) => {
        school.belongsToMany(models.users, {
            foreignKey: "users_id",
            as: "users",
            through: models.users_schools
        });
        school.hasMany(models.classes, {
            as: "classes"
        });
    };

    return school;
};