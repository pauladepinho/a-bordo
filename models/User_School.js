module.exports = (sequelize, DataTypes) => {
    let user_school = sequelize.define(
        "user_school",
        {
            users_id: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false,
                // references: {
                //     model: "users",
                //     key: "id",
                // },
                onUpdate: "CASCADE",
                onDelete: "CASCADE"
            },
            schools_id: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false,
                // references: {
                //     model: "schools",
                //     key: "id",
                // },
                onUpdate: "CASCADE",
                onDelete: "CASCADE"
            }
        },
        {
            tableName: "users_schools",
            timestamps: false,
        }
    );

    return user_school;
};