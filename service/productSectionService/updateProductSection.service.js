const db = require('../../dataBase').getInstance();

const {DB_TABLE_NAME: {PRODUCT_SECTION}} = require('../../constants')

module.exports = async (updatedProductSection, id, transaction) => {
    const ProductSectionModel = await db.getModel(PRODUCT_SECTION);

    return ProductSectionModel.update(updatedProductSection, {
        where: id,
        returning: true,
        plain: true,
        raw: true
    }, transaction);
};
