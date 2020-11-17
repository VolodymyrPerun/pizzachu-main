const db = require('../../dataBase').getInstance();

const {
    DB_TABLE_NAME: {CART, CART_STATUS},
} = require('../../constants');

module.exports = async options=> {
    const CartModel = await db.getModel(CART);
    const CartStatusModel = await db.getModel(CART_STATUS);

    return CartModel.findAll({
        where: options,
        raw: true,
        include: [{
            model: CartStatusModel,
            attributes: ['status']
        }],
    });
};

