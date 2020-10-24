const db = require('../../dataBase').getInstance();
const {DB_TABLE_NAME: {OAUTH_TOKEN, USER}} = require('../../constants');

module.exports = async (token) => {
    const OauthModel = db.getModel(OAUTH_TOKEN);
    const UserModel = db.getModel(USER);

    const user = await OauthModel.findOne({
        where: token,
        attributes: ['userId'],
        nest: true,
        raw: true,
        include: [{
            model: UserModel,
            attributes: ['role_id']
        }]
    });

    return user;
};
