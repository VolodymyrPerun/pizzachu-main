const db = require('../../dataBase').getInstance();

const {DB_TABLE_NAME: {USER}, USER_STATUS: {BLOCKED}} = require('../../constants');

module.exports = async (userId, transaction) => {
    const UserModel = await db.getModel(USER);

    return UserModel.update({
            status_id: BLOCKED
        },
        {
            where: {userId},
            returning: true,
            plain: true,
            transaction
        });
};
