const db = require('../../dataBase').getInstance();

const {DB_TABLE_NAME: {CART, PURCHASE}} = require('../../constants');

module.exports = async (params, purchaseId, userId, transaction) => {
    const PurchaseToUpdateModel = await db.getModel(PURCHASE);
    const CartModel = db.getModel(CART);

    await Promise.all([PurchaseToUpdateModel.update(params, {
        where: purchaseId,
        transaction
    }),
        CartModel.destroy({
            where: userId,
            transaction
        })
    ]);
};
