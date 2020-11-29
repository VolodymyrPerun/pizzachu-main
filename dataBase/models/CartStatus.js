const {DB_TABLE_NAME: {CART_STATUS}} = require('../../constants');

module.exports = (sequelize, DataTypes) => {
    const CartStatus = sequelize.define(CART_STATUS, {
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
        tableName: CART_STATUS,
        timestamps: false
    });

    return CartStatus;
};
