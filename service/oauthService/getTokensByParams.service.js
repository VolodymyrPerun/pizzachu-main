const db = require('../../dataBase').getInstance();
const {DB_TABLE_NAME: {OAUTH_TOKEN, USER}} = require('../../constants');

module.exports = async token => {
    const OauthModel = db.getModel(OAUTH_TOKEN);
    const UserModel = db.getModel(USER);

    return OauthModel.findOne({
        where: token,
        nest: true,
        raw: true,
        include: [{
            model: UserModel,
            attributes: ['userId', 'name', 'surname', 'role_id']
        }]
    });
}
