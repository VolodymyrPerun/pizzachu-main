const db = require('../../dataBase').getInstance();

const {
    DB_TABLE_NAME: {CART},
    CART_STATUS: {IN_PROGRESS}
} = require('../../constants');

module.exports = async options => {
    const CartToFindModel = await db.getModel(CART);

    return CartToFindModel.findOne(
        {
            where: options
        }, {
            status_id: IN_PROGRESS,
            new: true,
            raw: true
        });
};
