const db = require('../../dataBase').getInstance();
const {DB_TABLE_NAME: {PRODUCT}} = require('../../constants')

module.exports = async (createdProduct, transaction) => {
    const UserModel = await db.getModel(PRODUCT);

    return UserModel.create(createdProduct, {
        new: true,
    }, transaction)
};
