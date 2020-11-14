const db = require('../../dataBase').getInstance();
const {
    DB_TABLE_NAME: {CART},
} = require('../../constants');

module.exports = async (createdCart, transaction) => {
    const CartToCreateModel = await db.getModel(CART);

    CartToCreateModel.create(createdCart, {
        plain: true,
        nest: true,
        row: true,
    }, transaction);
};
