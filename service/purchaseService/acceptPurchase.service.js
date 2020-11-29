const db = require('../../dataBase').getInstance();
const {DB_TABLE_NAME: {CART, PURCHASE}, PURCHASE_STATUS: {ACCEPTED}} = require('../../constants');

module.exports = async (purchaseId, userId, transaction) => {
    const PurchaseToAcceptModel = db.getModel(PURCHASE);
    const CartModel = db.getModel(CART);

    await Promise.all([PurchaseToAcceptModel.update({
        status_id: ACCEPTED,
        updated_at: Date.now()
    }, {
        where: purchaseId,
        transaction
    }),
        CartModel.destroy({
            where: userId,
            transaction
        })
    ]);
};
