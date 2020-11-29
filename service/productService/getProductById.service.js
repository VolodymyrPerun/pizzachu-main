const db = require('../../dataBase').getInstance();

const {DB_TABLE_NAME: {PRODUCT}} = require('../../constants');

module.exports = async options => {
    const ProductModel = await db.getModel(PRODUCT);

    return ProductModel.findByPk(options, {
        raw: true,
        // attributes: ['status_id']
    });
};
