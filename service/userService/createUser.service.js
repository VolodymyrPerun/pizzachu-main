const db = require('../../dataBase').getInstance();
const {modelNamesEnum: {USER}} = require('../../constants')

module.exports = async user => {
    const UserModel = await db.getModel(USER);

    return UserModel.create(user)
};
