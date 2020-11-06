const db = require('../../dataBase').getInstance();

const {DB_TABLE_NAME: {PRODUCT}} = require('../../constants');

module.exports = async productId => {
    const ProductModel = await db.getModel(PRODUCT);

    return ProductModel.findByPk(productId, {
        raw: true,
        attributes: ['status_id']
    });
};
