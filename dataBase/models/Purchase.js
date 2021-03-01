const {DB_TABLE_NAME: {PURCHASE}} = require("../../constants");
module.exports = (sequelize, DataTypes) => {

    const Purchase = sequelize.define(PURCHASE, {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            purchaseId: {
                type: DataTypes.STRING,
                allowNull: false
            },
            userId: {
                type: DataTypes.INTEGER,
                foreignKey: true
            },
            productId: {
                type: DataTypes.INTEGER,
                foreignKey: true,
                allowNull: false
            },
            product_photo: {
                type: DataTypes.STRING
            },
            productName: {
                type: DataTypes.STRING
            },
            tempId: {
                type: DataTypes.STRING,
            },
            email: {
                type: DataTypes.STRING,
                foreignKey: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            phone: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false
            },
            city: {
                type: DataTypes.STRING,
                allowNull: false
            },
            street: {
                type: DataTypes.STRING,
                allowNull: false
            },
            house: {
                type: DataTypes.STRING,
                allowNull: false
            },
            apartment: {
                type: DataTypes.STRING
            },
            entrance: {
                type: DataTypes.STRING
            },
            floor: {
                type: DataTypes.STRING
            },
            status_id: {
                type: DataTypes.INTEGER,
                foreignKey: true,
                allowNull: false
            },
            price: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            count: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            sum: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            total: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            created_at: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: sequelize.fn('now')
            },
            updated_at: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: sequelize.fn('now')
            }
        },
        {
            tableName: PURCHASE,
            timestamps: false
        });


    const User = sequelize.import('./User');
    const PurchaseStatus = sequelize.import('./PurchaseStatus');
    const Product = sequelize.import('./Product');

    Purchase.belongsTo(User, {foreignKey: 'userId'});
    Purchase.belongsTo(PurchaseStatus, {foreignKey: 'status_id'});
    // Purchase.belongsTo(Product, {foreignKey: 'productId'});

    return Purchase;
};
