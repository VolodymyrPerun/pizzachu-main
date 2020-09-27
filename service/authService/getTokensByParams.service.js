const db = require('../../dataBase').getInstance();
const {modelNamesEnum: {AUTH_TOKEN}} = require('../../constants');

module.exports = async params => {
    const TokenModel = db.getModel(AUTH_TOKEN);

    return TokenModel.findOne({
        where: params
    })
}
