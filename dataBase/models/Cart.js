const {DB_TABLE_NAME: {CART}, CART_STATUS: {IN_PROGRESS}} = require('../../constants');

module.exports = (sequelize, DataTypes) => {
    const Cart = sequelize.define(CART, {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            foreignKey: true
        },
        products: {
            type: DataTypes.STRING
        },
        status_id: {
            type: DataTypes.INTEGER,
            defaultValue: IN_PROGRESS,
            allowNull: false,
            foreignKey: true
        },
        sum: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        create_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.fn('now')
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.fn('now')
        }
    }, {
        tableName: CART,
        timestamps: false
    });

    const User = sequelize.import('./User');
    const CartStatus = sequelize.import('./CartStatus');

    Cart.belongsTo(User, {foreignKey: 'userId'});
    Cart.belongsTo(CartStatus, {foreignKey: 'status_id'});

    return Cart;
};
