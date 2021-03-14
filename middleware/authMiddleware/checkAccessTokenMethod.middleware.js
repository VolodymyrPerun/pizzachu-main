const jwt = require('jsonwebtoken');

const {
    ErrorHandler,
    CustomErrorData: {
        BAD_REQUEST_YOU_ARE_NOT_ADMIN,
        BAD_REQUEST_YOU_ARE_NOT_SELLER,
        BAD_REQUEST_USER_NOT_PRESENT
    }
} = require("../../error");
const {
    JWT_METHOD: {ADMIN, CLIENT, SELLER},
    responseCustomErrorEnum: {NOT_VALID_TOKEN},
    responseStatusCodesEnum: {BAD_REQUEST},
    requestHeadersEnum: {AUTHORIZATION}
} = require('../../constants');
const {
    ADMIN_ACCESS,
    JWT_SECRET,
    SELLER_ACCESS
} = require('../../config');
const winston = require('../../logger/winston');
const logger = winston(NOT_VALID_TOKEN.message);

module.exports = jwtMethod => async (req, res, next) => {
    let keyMethod = '';
    let keyMethodErrorData = '';
    let secretWord = '';
    try {
    const authorizationToken = req.get(AUTHORIZATION);

        switch (jwtMethod) {
        case ADMIN:
            keyMethod = ADMIN;
            secretWord = ADMIN_ACCESS;
            keyMethodErrorData = BAD_REQUEST_YOU_ARE_NOT_ADMIN;
            break;
        case CLIENT:
            keyMethod = CLIENT;
            secretWord = JWT_SECRET;
            keyMethodErrorData = BAD_REQUEST_USER_NOT_PRESENT;
            break;
        case SELLER:
            keyMethod = SELLER;
            secretWord = SELLER_ACCESS;
            keyMethodErrorData = BAD_REQUEST_YOU_ARE_NOT_SELLER;
            break;
        default:
            return next(new ErrorHandler(
                BAD_REQUEST,
                BAD_REQUEST_USER_NOT_PRESENT.message,
                BAD_REQUEST_USER_NOT_PRESENT.customCode));
    }


        if (!authorizationToken) {
            logger.error({
                message: keyMethodErrorData.message,
                date: new Date().toLocaleDateString(),
                time: new Date().toLocaleTimeString()
            });
            return next(new ErrorHandler(
                BAD_REQUEST,
                keyMethodErrorData.message,
                keyMethodErrorData.customCode));
        }

        jwt.verify(authorizationToken, secretWord, err => {
        if (err) {
            return next(new ErrorHandler(
                BAD_REQUEST,
                BAD_REQUEST_USER_NOT_PRESENT.message,
                BAD_REQUEST_USER_NOT_PRESENT.customCode));
        }
    });

        next();
    } catch (e) {
        next(new ErrorHandler(e.status, e.message, e.customCode));
    }
};
