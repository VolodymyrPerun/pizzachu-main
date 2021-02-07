const {DB_TABLE_NAME: {PRODUCT}} = require('../../constants');

module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define(PRODUCT, {
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        type_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            foreignKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING
        },
        status_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            foreignKey: true
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        size_id: {
            type: DataTypes.INTEGER,
            foreignKey: true
        },
        weight: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        section_id: {
            type: DataTypes.INTEGER,
            foreignKey: true
        },
        stockCount: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 100
        },
        product_photo: {
            type: DataTypes.STRING,
            allowNull: true
        },
        create_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.fn('now')
        }
    }, {
        tableName: PRODUCT,
        timestamps: false
    });

    const ProductType = sequelize.import('./ProductType');
    const ProductStatus = sequelize.import('./ProductStatus');
    const ProductSize = sequelize.import('./ProductSize');
    const ProductSection = sequelize.import('./ProductSection');

    Product.belongsTo(ProductType, {foreignKey: 'type_id'});
    Product.belongsTo(ProductStatus, {foreignKey: 'status_id'});
    Product.belongsTo(ProductSize, {foreignKey: 'size_id'});
    Product.belongsTo(ProductSection, {foreignKey: 'section_id'});

    return Product;
};
