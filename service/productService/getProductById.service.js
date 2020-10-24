const db = require('../../dataBase').getInstance();

const {DB_TABLE_NAME: {PRODUCT}} = require('../../constants');

module.exports = async (productId, transaction) => {
    const UserModel = await db.getModel(PRODUCT);

    return UserModel.findByPk(productId, {
        raw: true,
        transaction
    });
};
