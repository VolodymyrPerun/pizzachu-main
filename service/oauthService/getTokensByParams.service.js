const db = require('../../dataBase').getInstance();
const {DB_TABLE_NAME: {OAUTH_TOKEN}} = require('../../constants');

module.exports = async token => {
    const OauthModel = db.getModel(OAUTH_TOKEN);

    const user = await OauthModel.findOne({
        where: token,
        attributes: ['userId']
    });

    return user && user.dataValues;
}
