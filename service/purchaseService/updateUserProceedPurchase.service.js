const db = require('../../dataBase').getInstance();

const {DB_TABLE_NAME: {PURCHASE}} = require('../../constants');

module.exports = async (params, options, transaction) => {
    const PurchaseToUpdateModel = await db.getModel(PURCHASE);

    return PurchaseToUpdateModel.update(params, {
        where: options,
        returning: true,
        plain: true,
        raw: true
    }, transaction);
};
