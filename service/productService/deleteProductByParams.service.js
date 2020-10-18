const db = require('../../dataBase').getInstance();
const {DB_TABLE_NAME: {PRODUCT}, PRODUCT_STATUS: {DELETED}} = require('../../constants');

module.exports = async (productId, transaction) => {
    const ProductModel = db.getModel(PRODUCT);

    await ProductModel.update({
        status_id: DELETED
    }, {
        where: productId,
        transaction
    });
};
