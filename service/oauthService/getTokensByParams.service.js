const db = require('../../dataBase').getInstance();
const {DB_TABLE_NAME: {OAUTH_TOKEN, USER}} = require('../../constants');

module.exports = async (token, transaction) => {
    const OauthModel = db.getModel(OAUTH_TOKEN);
    const User = db.getModel(USER);

    const user = await OauthModel.findOne({
        where: token,
        attributes: ['userId'],
        nest: true,
        raw: true,
        transaction,
        include: [User]
    });

    return user;
}
