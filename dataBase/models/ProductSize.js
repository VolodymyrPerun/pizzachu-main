const {DB_TABLE_NAME: {PRODUCT_SIZE}} = require('../../constants');

module.exports = (sequelize, DataTypes) => {
    const ProductSize = sequelize.define(PRODUCT_SIZE, {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        size: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        tableName: PRODUCT_SIZE,
        timestamps: false
    });

    return ProductSize
};
