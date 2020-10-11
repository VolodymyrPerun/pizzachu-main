const {DB_TABLE_NAME: {PRODUCT_TYPE}} = require('../../constants');

module.exports = (sequelize, DataTypes) => {
    const ProductType = sequelize.define(PRODUCT_TYPE, {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    }, {
        tableName: PRODUCT_TYPE,
        timestamps: false
    });


    return ProductType

};
