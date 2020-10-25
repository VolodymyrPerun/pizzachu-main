const db = require('../../dataBase').getInstance();
const {
    DB_TABLE_NAME: {PRODUCT_TYPE},
} = require('../../constants');

module.exports = async () => {
    const ProductTypeModel = await db.getModel(PRODUCT_TYPE);

    return ProductTypeModel.findAll({
        raw: true
    });
};

