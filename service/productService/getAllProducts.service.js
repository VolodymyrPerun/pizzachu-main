const db = require('../../dataBase').getInstance();
const {
    DB_TABLE_NAME: {PRODUCT},
} = require('../../constants');

module.exports = async () => {
    const ProductModel = await db.getModel(PRODUCT);

    return ProductModel.findAll({
        raw: true
    });
};

