const {
    ErrorHandler,
    CustomErrorData: {BAD_REQUEST_YOU_ARE_NOT_SELLER, UNAUTHORIZED_BAD_ACCESS_TOKEN}
} = require("../../error");
const {tokenVerifierHelper} = require('../../helpers');
const {
    JWT_METHOD: {SELLER},
    requestHeadersEnum: {AUTHORIZATION},
} = require('../../constants');

module.exports = async (req, res, next) => {
    const authorizationToken = req.get(AUTHORIZATION);

    if (!authorizationToken) {
        return next(new ErrorHandler(
            BAD_REQUEST_YOU_ARE_NOT_SELLER.message,
            BAD_REQUEST_YOU_ARE_NOT_SELLER.customCode,
            UNAUTHORIZED_BAD_ACCESS_TOKEN))
    }

    tokenVerifierHelper(authorizationToken, SELLER);

    next();
};
