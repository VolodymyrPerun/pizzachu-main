const db = require('../../dataBase').getInstance();

const {DB_TABLE_NAME: {PRODUCT_SECTION}} = require('../../constants');

module.exports = async (id) => {
    const ProductSectionModel = await db.getModel(PRODUCT_SECTION);

    return ProductSectionModel.findByPk(id, {
        raw: true
    });
};
