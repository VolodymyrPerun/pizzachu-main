const jwt = require('jsonwebtoken');

const {
    ErrorHandler,
    CustomErrorData: {
        BAD_REQUEST_YOU_ARE_NOT_ADMIN,
        BAD_REQUEST_YOU_ARE_NOT_SELLER
    }
} = require("../../error");
const {
    JWT_METHOD: {ADMIN, CLIENT, SELLER},
    responseStatusCodesEnum: {BAD_REQUEST, UNAUTHORIZED},
    requestHeadersEnum: {AUTHORIZATION}
} = require('../../constants');
const {
    ADMIN_REFRESH,
    JWT_REFRESH_SECRET,
    SELLER_REFRESH
} = require('../../config');

module.exports = jwtMethod => async (req, res, next) => {
    let keyMethod = '';
    let keyMethodErrorData = '';
    let secretWord = '';

    const authorizationToken = req.get(AUTHORIZATION);

    console.log(authorizationToken);

    switch (jwtMethod) {
        case ADMIN:
            keyMethod = ADMIN;
            secretWord = ADMIN_REFRESH;
            keyMethodErrorData = BAD_REQUEST_YOU_ARE_NOT_ADMIN;
            break;
        case CLIENT:
            keyMethod = CLIENT;
            secretWord = JWT_REFRESH_SECRET;
            keyMethodErrorData = UNAUTHORIZED;
            break;
        case SELLER:
            keyMethod = SELLER;
            secretWord = SELLER_REFRESH;
            keyMethodErrorData = BAD_REQUEST_YOU_ARE_NOT_SELLER;
            break;
        default:
            return next(new ErrorHandler(
                BAD_REQUEST,
                UNAUTHORIZED.message,
                UNAUTHORIZED.customCode));
    }

    if (!authorizationToken) {
        return next(new ErrorHandler(
            keyMethodErrorData,
            keyMethodErrorData.message,
            keyMethodErrorData.customCode));
    }

    jwt.verify(authorizationToken, secretWord, err => {
        if (err) {
            return next(new ErrorHandler(
                keyMethodErrorData,
                [keyMethodErrorData].message,
                [keyMethodErrorData].customCode));
        }
    });

    next();
};
