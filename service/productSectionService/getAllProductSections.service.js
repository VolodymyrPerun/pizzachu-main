const db = require('../../dataBase').getInstance();
const {
    DB_TABLE_NAME: {PRODUCT_SECTION},
} = require('../../constants');

module.exports = async () => {
    const ProductSectionModel = await db.getModel(PRODUCT_SECTION);

    return ProductSectionModel.findAll({
        raw: true
    });
};

