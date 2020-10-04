const ErrorHandler = require('../../error/ErrorHandler');
const {oauthService: {getTokensByParamsService}} = require('../../service');

const {
    requestHeadersEnum: {AUTHORIZATION},
    responseStatusCodesEnum: {UNAUTHORIZED, BAD_REQUEST},
    responseCustomErrorEnum: {NOT_VALID, NOT_VALID_TOKEN}

} = require('../../constants');

module.exports = async (req, res, next) => {
    const authorizationToken = req.get(AUTHORIZATION);

    if (!authorizationToken) {
        return next(new ErrorHandler(NOT_VALID.message, BAD_REQUEST, NOT_VALID.customCode));
    }

    const userFromAccessToken = await getTokensByParamsService({access_token: authorizationToken});

    if (!userFromAccessToken) {
        return next(new ErrorHandler(
            NOT_VALID_TOKEN.message,
            UNAUTHORIZED,
            NOT_VALID_TOKEN.code))
    }

    req.user = userFromAccessToken;

    next();
};
