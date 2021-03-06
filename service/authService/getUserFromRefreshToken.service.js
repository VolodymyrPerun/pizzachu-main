const db = require('../../dataBase').getInstance();
const {DB_TABLE_NAME: {OAUTH_TOKEN, USER}} = require('../../constants');

module.exports = async refresh_token => {
    const TokenModel = await db.getModel(OAUTH_TOKEN);
    const UserModel = await db.getModel(USER);

    return TokenModel.findOne({
        where: {
            refresh_token
        },
        include: [{
            model: UserModel,
            attributes: ['id', 'email', 'role_id', 'status_id']
        }],
        attributes: [],
        raw: true
    });
};
