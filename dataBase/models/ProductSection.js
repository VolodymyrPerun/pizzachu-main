const {DB_TABLE_NAME: {PRODUCT_SECTION}} = require('../../constants');

module.exports = (sequelize, DataTypes) => {
    const ProductSection = sequelize.define(PRODUCT_SECTION, {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        section: {
            type: DataTypes.STRING,
            unique: true
        }
    }, {
        tableName: PRODUCT_SECTION,
        timestamps: false
    })

    return ProductSection
};
