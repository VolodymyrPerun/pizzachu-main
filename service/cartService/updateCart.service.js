const db = require('../../dataBase').getInstance();

const {DB_TABLE_NAME: {CART}} = require('../../constants')

module.exports = async (updatedCart, id, transaction) => {
    const CartToUpdateModel = await db.getModel(CART);

    return CartToUpdateModel.update(updatedCart, {
        where: id,
        returning: true,
        plain: true,
        raw: true,
        new: true
    }, transaction);
};
