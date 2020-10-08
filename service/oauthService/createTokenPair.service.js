const db = require('../../dataBase').getInstance();
const {DB_TABLE_NAME: {OAUTH_TOKEN}} = require('../../constants');

module.exports = async tokens => {
    const TokenModel = await db.getModel(OAUTH_TOKEN);
    console.log(tokens);

    return TokenModel.create(tokens);

}
