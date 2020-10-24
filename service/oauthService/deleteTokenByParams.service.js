const db = require('../../dataBase').getInstance();
const {DB_TABLE_NAME: {OAUTH_TOKEN}} = require('../../constants');

module.exports = async (userId, transaction) => {
    const TokenModel = db.getModel(OAUTH_TOKEN);

    return TokenModel.destroy({
        where: userId,
        transaction
    });
};
