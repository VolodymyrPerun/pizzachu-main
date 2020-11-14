const db = require('../../dataBase').getInstance();
const Sequelize = require('sequelize');
const {
    DB_TABLE_NAME: {CART, CART_STATUS},
} = require('../../constants');

module.exports = async userId => {
    const CartModel = await db.getModel(CART);
    const CartStatusModel = await db.getModel(CART_STATUS);

    return CartModel.findAll({
        where: {userId},
        raw: true,
        include: [{
            model: CartStatusModel,
            attributes: ['status']
        }],

    });
};

