const {ErrorHandler, CustomErrorData: {BAD_REQUEST_YOU_ARE_NOT_ADMIN, UNAUTHORIZED_BAD_REFRESH_TOKEN}} = require('../../error');
const {refreshTokenVeryficatorHelper} = require('../../helpers');
const {
    requestHeadersEnum: {AUTHORIZATION},
    USER_ROLE: {ADMIN},
} = require('../../constants');

module.exports = async (req, res, next) => {
    const authorizationToken = req.get(AUTHORIZATION);

    if (!authorizationToken) {
        return next(new ErrorHandler(
            BAD_REQUEST_YOU_ARE_NOT_ADMIN.message,
            UNAUTHORIZED_BAD_REFRESH_TOKEN,
            BAD_REQUEST_YOU_ARE_NOT_ADMIN.customCode
        ));
    }

    refreshTokenVeryficatorHelper(authorizationToken, ADMIN);

    next();
};