const {ErrorHandler, CustomErrorData: {UNAUTHORIZED_BAD_REFRESH_TOKEN}} = require('../../error');
const {refreshTokenVerifierHelper} = require('../../helpers');
const {
    requestHeadersEnum: {AUTHORIZATION},
    USER_ROLE: {CLIENT},
} = require('../../constants');

module.exports = async (req, res, next) => {
    const authorizationToken = req.get(AUTHORIZATION);

    if (!authorizationToken) {
        return next(new ErrorHandler(
            UNAUTHORIZED_BAD_REFRESH_TOKEN.message,
            UNAUTHORIZED_BAD_REFRESH_TOKEN,
            UNAUTHORIZED_BAD_REFRESH_TOKEN.customCode));
    }

    refreshTokenVerifierHelper(authorizationToken, CLIENT);

    next();
};
