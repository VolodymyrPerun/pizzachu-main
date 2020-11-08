const db = require('../../dataBase').getInstance();

const {DB_TABLE_NAME: {CART}} = require('../../constants');

module.exports = async params => {
    const CartToFindModel = await db.getModel(CART);

    return CartToFindModel.find(params, {
        raw: true
    }).exec();
};
