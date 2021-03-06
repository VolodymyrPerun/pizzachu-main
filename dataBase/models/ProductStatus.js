const {DB_TABLE_NAME: {PRODUCT_STATUS}} = require('../../constants');

module.exports = (sequelize, DataTypes) => {
    const ProductStatus = sequelize.define(PRODUCT_STATUS, {
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
        tableName: PRODUCT_STATUS,
        timestamps: false
    });

    return ProductStatus;
};
