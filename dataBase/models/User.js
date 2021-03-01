const {DB_TABLE_NAME: {USER}} = require("../../constants");
module.exports = (sequelize, DataTypes) => {

    const User = sequelize.define(USER, {
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            email: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            surname: {
                type: DataTypes.STRING,
                allowNull: false
            },
            age: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            gender_id: {
                type: DataTypes.STRING,
                allowNull: true
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            },
            phone: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false
            },
            city: {
                type: DataTypes.STRING,
                allowNull: false
            },
            street: {
                type: DataTypes.STRING,
                allowNull: false
            },
            house: {
                type: DataTypes.STRING,
                allowNull: false
            },
            apartment: {
                type: DataTypes.STRING
            },
            entrance: {
                type: DataTypes.STRING
            },
            floor: {
                type: DataTypes.STRING
            },
            status_id: {
                type: DataTypes.INTEGER,
                foreignKey: true,
                allowNull: false
            },
            role_id: {
                type: DataTypes.INTEGER,
                foreignKey: true,
                allowNull: false
            },
            user_photo: {
                type: DataTypes.STRING,
                allowNull: true
            },
            create_at: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: sequelize.fn('now')
            }
        },
        {
            tableName: USER,
            timestamps: false
        });


    const Gender = sequelize.import('./Gender.js');
    const UserRole = sequelize.import('./UserRole.js');
    const UserStatus = sequelize.import('./UserStatus.js');

    User.belongsTo(Gender, {foreignKey: 'gender_id'});
    User.belongsTo(UserRole, {foreignKey: 'role_id'});
    User.belongsTo(UserStatus, {foreignKey: 'status_id'});

    return User;
};
