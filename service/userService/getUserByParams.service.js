const db = require('../../dataBase').getInstance();
const {DB_TABLE_NAME: {USER}} = require('../../constants')

module.exports = async params => {
    const UserModel = await db.getModel(USER);

    return UserModel.findOne({
        where: params
    })
};
