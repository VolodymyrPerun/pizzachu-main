const db = require('../../dataBase').getInstance();
const {DB_TABLE_NAME: {PRODUCT_TYPE}} = require('../../constants');

module.exports = async (createdProductType, transaction) => {
    const ProductTypeModel = await db.getModel(PRODUCT_TYPE);

    return ProductTypeModel.create(createdProductType, {
        new: true,
        raw: true,
    }, transaction);
};
