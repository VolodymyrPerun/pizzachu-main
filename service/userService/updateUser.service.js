const db = require('../../dataBase').getInstance();
const {modelNamesEnum: {USER}} = require('../../constants')

module.exports = async (userId, user) => {
    const UserModel = await db.getModel(USER);

    return UserModel.update(user, {
        where: {userId}
    })
};
