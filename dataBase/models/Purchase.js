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
                type: DataTypes.INTEGER,
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
            tempId: {
                type: DataTypes.INTEGER,
            },
            email: {
                type: DataTypes.STRING,
                foreignKey: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            surname: {
                type: DataTypes.STRING
            },
            phone: {
                type: DataTypes.INTEGER,
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
