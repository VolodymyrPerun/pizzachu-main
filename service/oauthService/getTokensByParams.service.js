const db = require('../../dataBase').getInstance();
const {DB_TABLE_NAME: {OAUTH_TOKEN}} = require('../../constants');

module.exports = async findObject => {
    const OauthModel = db.getModel(OAUTH_TOKEN);

    const user = await OauthModel.findOne({
        where: findObject,
        attributes: ['userId']
    });

    return user && user.dataValues;
}
