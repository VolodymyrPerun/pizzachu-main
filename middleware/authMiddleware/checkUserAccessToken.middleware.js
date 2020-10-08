const {ErrorHandler, CustomErrorData: {UNAUTHORIZED_BAD_ACCESS_TOKEN}} = require('../../error');
const {tokenVerifierHelper} = require('../../helpers');
const {
    requestHeadersEnum: {AUTHORIZATION},
    USER_ROLE: {CLIENT},
} = require('../../constants');

module.exports = async (req, res, next) => {
    const authorizationToken = req.get(AUTHORIZATION);

    if (!authorizationToken) {
        return next(new ErrorHandler(
            UNAUTHORIZED_BAD_ACCESS_TOKEN.message,
            UNAUTHORIZED_BAD_ACCESS_TOKEN,
            UNAUTHORIZED_BAD_ACCESS_TOKEN.customCode));
    }

    tokenVerifierHelper(authorizationToken, CLIENT);

    next();
};
