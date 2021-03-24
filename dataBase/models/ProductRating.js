const {DB_TABLE_NAME: {PRODUCT_RATING}} = require('../../constants');


module.exports = (sequelize, DataTypes) => {

    const ProductRating = sequelize.define(PRODUCT_RATING, {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        mark: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
        },
        userId: {
            type: DataTypes.INTEGER,
            foreignKey: true,
            allowNull: false
        },
        productId: {
            type: DataTypes.INTEGER,
            foreignKey: true,
            allowNull: false
        },
    }, {
        tableName: PRODUCT_RATING,
        timestamps: false
    });

    const User = sequelize.import('./User');
    const Product = sequelize.import('./Product');

    ProductRating.belongsTo(User, {foreignKey: 'userId'});
    ProductRating.belongsTo(Product, {foreignKey: 'productId'});

    return ProductRating;
};
