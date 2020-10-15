const {DB_TABLE_NAME: {OAUTH_TOKEN, USER}} = require('../../constants');
const db = require('../../dataBase').getInstance();

module.exports = async params => {

    const OAuthModel = db.getModel(OAUTH_TOKEN);
    const UserModel = db.getModel(USER);

    const searchObj = await OAuthModel.findOne({
        where: params,
        include: [{
            model: UserModel,
            attributes : ['role_id']
        }]
    });

    return searchObj && searchObj.dataValues
}
