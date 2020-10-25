const db = require('../../dataBase').getInstance();

const {DB_TABLE_NAME: {PRODUCT_TYPE}} = require('../../constants');

module.exports = async (id) => {
    const UserModel = await db.getModel(PRODUCT_TYPE);

    return UserModel.findByPk(id, {
        raw: true
    });
};
