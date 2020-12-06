const db = require('../../dataBase').getInstance();

const {
    DB_TABLE_NAME: {PURCHASE},
    PURCHASE_STATUS: {IN_PROGRESS}
} = require('../../constants');

module.exports = async params => {
    const PurchaseToFindModel = await db.getModel(PURCHASE);

    return PurchaseToFindModel.findOne(
        {
            where: params
        }, {
            status_id: IN_PROGRESS,
            new: true,
            raw: true
        })
};
