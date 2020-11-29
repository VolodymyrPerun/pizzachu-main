const {DB_TABLE_NAME: {PURCHASE_STATUS}} = require('../../constants');

module.exports = (sequelize, DataTypes) => {
    const PurchaseStatus = sequelize.define(PURCHASE_STATUS, {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    }, {
        tableName: PURCHASE_STATUS,
        timestamps: false
    });

    return PurchaseStatus;
};
