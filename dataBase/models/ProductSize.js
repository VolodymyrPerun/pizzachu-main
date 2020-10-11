const {DB_TABLE_NAME: {PRODUCT_SIZE}} = require('../../constants/');

module.exports = (sequelize, DataTypes) => {
    const ProductSize = sequelize.define(PRODUCT_SIZE, {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        size: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    }, {
        tableName: PRODUCT_SIZE,
        timestamps: false
    });

    return ProductSize
};
