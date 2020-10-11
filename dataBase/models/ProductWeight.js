const {DB_TABLE_NAME: {PRODUCT_WEIGHT}} = require('../../constants/');

module.exports = (sequelize, DataTypes) => {
    const ProductWeight = sequelize.define(PRODUCT_WEIGHT, {
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
        tableName: PRODUCT_WEIGHT,
        timestamps: false
    });

    return ProductWeight
};
