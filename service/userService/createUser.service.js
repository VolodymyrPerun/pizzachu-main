const db = require('../../dataBase').getInstance();
const {DB_TABLE_NAME: {USER}} = require('../../constants')

module.exports = async (createdUser, transaction) => {
    const UserModel = await db.getModel(USER);

    return UserModel.create(createdUser, {
        new: true,
        transaction
    })
};
