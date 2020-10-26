const db = require('../../dataBase').getInstance();

const {DB_TABLE_NAME: {PRODUCT_TYPE}} = require('../../constants');

module.exports = async id => {
    const ProductTypeModel = await db.getModel(PRODUCT_TYPE);

    return ProductTypeModel.findByPk(id, {
        raw: true
    });
};
