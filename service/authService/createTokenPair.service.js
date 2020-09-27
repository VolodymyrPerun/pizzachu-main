const db = require('../../dataBase').getInstance();
const {DB_TABLE_NAME: {AUTH_TOKEN}} = require('../../constants');

module.exports = async token => {
    const TokenModel = db.getModel(AUTH_TOKEN);

    return TokenModel.create(token)
}
