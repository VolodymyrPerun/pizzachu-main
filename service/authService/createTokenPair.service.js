const db = require('../../dataBase').getInstance();
const {modelNamesEnum: {AUTH_TOKEN}} = require('../../constants');

module.exports = async token => {
    const TokenModel = db.getModel(AUTH_TOKEN);

    return TokenModel.create(token)
}
