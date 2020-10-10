const db = require('../../dataBase').getInstance();
const {DB_TABLE_NAME: {OAUTH_TOKEN}} = require('../../constants');

module.exports = tokens => {
    const TokenModel = db.getModel(OAUTH_TOKEN);

    TokenModel.create(tokens);
};
