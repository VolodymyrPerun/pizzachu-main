const db = require('../../dataBase').getInstance();
const {DB_TABLE_NAME: {PRODUCT_TYPE}} = require('../../constants');

module.exports = async (id, transaction) => {
    const ProductTypeModel = db.getModel(PRODUCT_TYPE);

    await ProductTypeModel.destroy( {
        where: id,
        transaction
    });
};
