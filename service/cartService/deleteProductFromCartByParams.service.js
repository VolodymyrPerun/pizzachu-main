const db = require('../../dataBase').getInstance();
const {DB_TABLE_NAME: {CART}} = require('../../constants');

module.exports = async (params, transaction) => {
    const CartProductToDeleteModel = db.getModel(CART);

    await CartProductToDeleteModel.destroy({
        where: params,
        transaction
    });
};
