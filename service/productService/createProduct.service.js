const db = require('../../dataBase').getInstance();
const {DB_TABLE_NAME: {PRODUCT}} = require('../../constants');

module.exports = async (createdProduct, transaction) => {
    const ProductModel = await db.getModel(PRODUCT);

    return ProductModel.create(createdProduct, {
        new: true,
    }, transaction);
};
