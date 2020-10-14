const db = require('../../dataBase').getInstance();

const {DB_TABLE_NAME: {PRODUCT}} = require('../../constants')

module.exports = async (updatedProduct, productId, transaction) => {
    const UserModel = await db.getModel(PRODUCT);

    return UserModel.update(updatedProduct, {
        where: {productId},
        // returning: true,
        // plain: true,
        transaction
    })
};
