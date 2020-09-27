const db = require('../../dataBase').getInstance();
const {DB_TABLE_NAME: {USER}} = require('../../constants')

module.exports = async params => {
    const UserModel = await db.getModel(USER);

    UserModel.findOne({
        where: params,
        raw: true
    })
};
