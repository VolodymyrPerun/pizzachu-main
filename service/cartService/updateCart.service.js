const db = require('../../dataBase').getInstance();

const {DB_TABLE_NAME: {CART}} = require('../../constants');

module.exports = async (params, options, transaction) => {
    const CartToUpdateModel = await db.getModel(CART);

    return CartToUpdateModel.update(params, {
        where: options,
        returning: true,
        plain: true,
        raw: true
    }, transaction);
};
