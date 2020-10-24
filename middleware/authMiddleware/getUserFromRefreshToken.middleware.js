const ErrorHandler = require('../../error/ErrorHandler');
const {oauthService: {getTokensByParamsService}} = require('../../service');

const {
    requestHeadersEnum: {AUTHORIZATION},
    responseStatusCodesEnum: {UNAUTHORIZED, BAD_REQUEST},
    responseCustomErrorEnum: {NOT_VALID, NOT_VALID_TOKEN}

} = require('../../constants');

module.exports = async (req, res, next) => {
    const refresh_token = req.get(AUTHORIZATION);

    if (!refresh_token) {
        return next(new ErrorHandler(
            BAD_REQUEST,
            NOT_VALID.message,
            NOT_VALID.customCode));
    }

    const userFromRefreshToken = await getTokensByParamsService({refresh_token});

    if (!userFromRefreshToken) {
        return next(new ErrorHandler(
            NOT_VALID_TOKEN.message,
            UNAUTHORIZED,
            NOT_VALID_TOKEN.customCode));
    }

    req.user = userFromRefreshToken;

    next();
};
