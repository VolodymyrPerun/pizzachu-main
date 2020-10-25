const db = require('../../dataBase').getInstance();
const {DB_TABLE_NAME: {PRODUCT_TYPE}} = require('../../constants');

module.exports = async (id, transaction) => {
    const ProductModel = db.getModel(PRODUCT_TYPE);

    await ProductModel.destroy( {
        where: id,
        transaction
    });
};
