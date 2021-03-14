const db = require('../../dataBase').getInstance();

const {DB_TABLE_NAME: {USER}} = require('../../constants');

module.exports = async (updatedUser,userId, transaction) => {
    const UserModel = await db.getModel(USER);

    return  UserModel.update(updatedUser, {
        where: {userId},
        returning: true,
        plain: true,
        transaction
    });
};
