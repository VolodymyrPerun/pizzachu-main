const {DB_TABLE_NAME: {USER_STATUS}} = require('../../constants');

module.exports = (sequelize, DataTypes) => {
    const UserStatus = sequelize.define(USER_STATUS, {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        label: {
            type: DataTypes.STRING,
            allowNull: false
        }

    }, {
        tableName: USER_STATUS,
        timestamps: false
    });

    return UserStatus;
};
