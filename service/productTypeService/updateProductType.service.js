const db = require('../../dataBase').getInstance();

const {DB_TABLE_NAME: {PRODUCT_TYPE}} = require('../../constants')

module.exports = async (updatedProductType, id, transaction) => {
    const UserModel = await db.getModel(PRODUCT_TYPE);

    return UserModel.update(updatedProductType, {
        where: id,
        returning: true,
        plain: true,
        raw: true
    }, transaction);
};
