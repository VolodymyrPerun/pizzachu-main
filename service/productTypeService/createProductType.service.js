const db = require('../../dataBase').getInstance();
const {DB_TABLE_NAME: {PRODUCT_TYPE}} = require('../../constants');

module.exports = async (createdProductType, transaction) => {
    const UserModel = await db.getModel(PRODUCT_TYPE);

    return UserModel.create(createdProductType, {
        new: true,
        raw: true,
    }, transaction);
};
