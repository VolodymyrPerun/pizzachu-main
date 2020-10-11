const {DB_TABLE_NAME: {PRODUCT}} = require('../../constants');

module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define(PRODUCT, {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        type_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            foreignKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            foreignKey: true,
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        size_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            foreignKey: true,
        },
        weight_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            foreignKey: true,
        },
        section_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            foreignKey: true,
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
    const ProductWeight = sequelize.import('./ProductWeight');
    const ProductSection = sequelize.import('./ProductSection');

    Product.belongsTo(ProductType, {foreignKey: 'type_id'});
    Product.belongsTo(ProductStatus, {foreignKey: 'status_id'});
    Product.belongsTo(ProductSize, {foreignKey: 'size_id'});
    Product.belongsTo(ProductWeight, {foreignKey: 'weight_id'});
    Product.belongsTo(ProductSection, {foreignKey: 'section_id'});

    return Product

};
