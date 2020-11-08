const db = require('../../dataBase').getInstance();
const {DB_TABLE_NAME: {CART}} = require('../../constants');

module.exports = async (id, transaction) => {
    const CartToDeleteModel = db.getModel(CART);

    await CartToDeleteModel.destroy( {
        where: id,
        transaction
    });
};
