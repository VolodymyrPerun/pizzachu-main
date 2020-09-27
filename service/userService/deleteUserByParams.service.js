const db = require('../../dataBase').getInstance();
const {modelNamesEnum: {USER}} = require('../../constants')

module.exports = async params => {
    const UserModel = await db.getModel(USER);

    return UserModel.destroy({
        where: params
    })
};
