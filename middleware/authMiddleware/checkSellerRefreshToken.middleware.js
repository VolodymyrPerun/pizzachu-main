const {ErrorHandler, CustomErrorData: {BAD_REQUEST_YOU_ARE_NOT_SELLER, UNAUTHORIZED_BAD_REFRESH_TOKEN}} = require('../../error');
const {refreshTokenVerifierHelper} = require('../../helpers');
const {
    requestHeadersEnum: {AUTHORIZATION},
    USER_ROLE: {SELLER},
} = require('../../constants');

module.exports = async (req, res, next) => {
    const authorizationToken = req.get(AUTHORIZATION);

    if (!authorizationToken) {
        return next(new ErrorHandler(
            BAD_REQUEST_YOU_ARE_NOT_SELLER.message,
            BAD_REQUEST_YOU_ARE_NOT_SELLER.customCode,
            UNAUTHORIZED_BAD_REFRESH_TOKEN
        ));
    }

    refreshTokenVerifierHelper(authorizationToken, SELLER);

    next();
};
