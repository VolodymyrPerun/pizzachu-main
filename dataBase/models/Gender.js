const {DB_TABLE_NAME: {GENDER}} = require('../../constants');

module.exports = (sequelize, DataTypes) => {
    const Gender = sequelize.define(GENDER, {
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
        tableName: GENDER,
        timestamps: false
    });

    return Gender;
};
