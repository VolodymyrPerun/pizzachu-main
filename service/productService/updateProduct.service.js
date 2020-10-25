const db = require('../../dataBase').getInstance();

const {DB_TABLE_NAME: {PRODUCT}} = require('../../constants')

module.exports = async (productId, updatedProduct, transaction) => {
    const ProductModel = await db.getModel(PRODUCT);

    return ProductModel.update(updatedProduct, {
        where: {productId},
        returning: true,
        plain: true,
        transaction
    });
};
