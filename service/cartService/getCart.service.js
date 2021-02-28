const db = require('../../dataBase').getInstance();

const {
    DB_TABLE_NAME: {CART, CART_STATUS, PRODUCT},
} = require('../../constants');

module.exports = async options => {
    const CartModel = await db.getModel(CART);
    const CartStatusModel = await db.getModel(CART_STATUS);
    const ProductModel = await db.getModel(PRODUCT);

    return CartModel.findAll({
        where: options,
        include: [{
            model: ProductModel,
            attributes: ['product_photo', 'name']
        },{
            model: CartStatusModel,
            attributes: ['status']
        }],
        raw: true
    });
};

