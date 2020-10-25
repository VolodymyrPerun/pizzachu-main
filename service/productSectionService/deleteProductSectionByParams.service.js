const db = require('../../dataBase').getInstance();
const {DB_TABLE_NAME: {PRODUCT_SECTION}} = require('../../constants');

module.exports = async (id, transaction) => {
    const ProductSectionModel = db.getModel(PRODUCT_SECTION);

    await ProductSectionModel.destroy( {
        where: id,
        transaction
    });
};
