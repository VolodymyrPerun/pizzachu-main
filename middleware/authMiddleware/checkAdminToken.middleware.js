const {
    ErrorHandler,
    CustomErrorData: {BAD_REQUEST_YOU_ARE_NOT_ADMIN, UNAUTHORIZED_BAD_ACCESS_TOKEN}
} = require("../../error");
const {tokenVerifierHelper} = require('../../helpers');
const {
    USER_ROLE: {ADMIN},
    requestHeadersEnum: {AUTHORIZATION},
} = require('../../constants');

module.exports = async (req, res, next) => {
    const authorizationToken = req.get(AUTHORIZATION);

    if (!authorizationToken) {
        return next(new ErrorHandler(
            BAD_REQUEST_YOU_ARE_NOT_ADMIN.message,
            BAD_REQUEST_YOU_ARE_NOT_ADMIN.customCode,
            UNAUTHORIZED_BAD_ACCESS_TOKEN))
    }

    tokenVerifierHelper(authorizationToken, ADMIN);

    next();
};
