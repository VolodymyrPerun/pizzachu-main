const db = require('../../dataBase').getInstance();
const {DB_TABLE_NAME: {USER}} = require('../../constants')

module.exports = async object => {
    const UserModel = db.getModel(USER);

    const user = await UserModel.findOne({
        where: object,
        raw: true
    });
    return user
};
