const db = require('../../dataBase').getInstance();
const {
    DB_TABLE_NAME: {PURCHASE},
} = require('../../constants');

module.exports = async (createdPurchase, transaction) => {
    const PurchaseToCreateModel = await db.getModel(PURCHASE);

    PurchaseToCreateModel.create(createdPurchase, {
        plain: true,
        nest: true,
        row: true,
    }, transaction);
};
