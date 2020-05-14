module.exports = (sequelize, DataTypes) => {
    let user_subject = sequelize.define(
        "user_subject",
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
            subjects_id: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false,
                // references: {
                //     model: "subjects",
                //     key: "id",
                // },
                onUpdate: "CASCADE",
                onDelete: "CASCADE"
            }
        },
        {
            tableName: "users_subjects",
            timestamps: false,
        }
    );

    return user_subject;
};