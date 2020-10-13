const db = require('../../dataBase').getInstance();
const {DB_TABLE_NAME: {PRODUCT}, USER_STATUS: {DELETED}} = require('../../constants')

module.exports = async userId => {
    const UserModel = db.getModel(PRODUCT);

    await UserModel.update({
        status_id: DELETED
    }, {
        where: userId
    });
};
