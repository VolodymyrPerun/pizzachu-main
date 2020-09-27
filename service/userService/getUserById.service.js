const db = require('../../dataBase').getInstance();
const {DB_TABLE_NAME: {USER}} = require('../../constants')

module.exports = async (userId) => {
    const UserModel = await db.getModel(USER);

    return UserModel.findByPk(userId);

};
