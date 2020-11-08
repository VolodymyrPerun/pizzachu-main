const {DB_TABLE_NAME: {CART_PRODUCT}} = require('../../constants');

module.exports = (sequelize, DataTypes) => {
    const CartProduct = sequelize.define(CART_PRODUCT, {
        productId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        count: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        tableName: CART_PRODUCT,
        timestamps: false
    });

    const Product = sequelize.import('./Product');

    CartProduct.belongsTo(Product, {foreignKey: 'productId'});

    return CartProduct
};
