const db = require('../../dataBase').getInstance();

const {DB_TABLE_NAME: {CART}} = require('../../constants');

module.exports = async userId => {
    const CartToFindModel = await db.getModel(CART);

    return CartToFindModel.findOne(userId, {
        raw: true,
        attributes: ['status_id']
    }).exec();
};
