const db = require('../../dataBase').getInstance();
const {DB_TABLE_NAME: {PRODUCT_SECTION}} = require('../../constants');

module.exports = async (createdProductSection, transaction) => {
    const ProductSectionModel = await db.getModel(PRODUCT_SECTION);

    return ProductSectionModel.create(createdProductSection, {
        new: true,
        raw: true,
    }, transaction);
};
