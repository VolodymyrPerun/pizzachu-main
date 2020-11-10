const db = require('../../dataBase').getInstance();

const {
    DB_TABLE_NAME: {CART},
    CART_STATUS: {IN_PROGRESS}
} = require('../../constants');

module.exports = async userId => {
    const CartToFindModel = await db.getModel(CART);

    return CartToFindModel.findByPk(userId, {
        status_id: IN_PROGRESS,
        raw: true,
    });
};
