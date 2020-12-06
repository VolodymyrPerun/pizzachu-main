const db = require('../../dataBase').getInstance();

const {DB_TABLE_NAME: {PURCHASE}, PURCHASE_STATUS: {DONE}} = require('../../constants');

module.exports = async (purchaseId, userId, transaction) => {
    const PurchaseToAcceptModel = db.getModel(PURCHASE);

    await PurchaseToAcceptModel.update({
        status_id: DONE,
        updated_at: Date.now()
    }, {
        where: purchaseId,
        transaction
    });
};
