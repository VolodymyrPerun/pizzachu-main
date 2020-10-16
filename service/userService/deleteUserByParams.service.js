const db = require('../../dataBase').getInstance();
const {DB_TABLE_NAME: {USER}, USER_STATUS: {DELETED}} = require('../../constants')

module.exports = async (userId, transaction) => {
    const UserModel = db.getModel(USER);

    await UserModel.update({
        status_id: DELETED
    }, {
        where: userId,
        transaction
    });
};
