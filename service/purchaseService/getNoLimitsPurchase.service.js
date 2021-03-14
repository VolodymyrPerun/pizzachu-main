const db = require('../../dataBase').getInstance();

const {
    DB_TABLE_NAME: {PURCHASE, PURCHASE_STATUS},
} = require('../../constants');

module.exports = async options => {
    const PurchaseModel = await db.getModel(PURCHASE);
    const PurchaseStatusModel = await db.getModel(PURCHASE_STATUS);

    return PurchaseModel.findAll({
        where: options,
        include: [{
            model: PurchaseStatusModel,
            attributes: ['status']
        }],
        raw: true,
        order: [
            ['productId', 'DESC']
        ]
    });
};

