const {ErrorHandler} = require('../../error');
const {
    oauthService: {getTokensByParamsService},
    userService: {getUserByParamsService}
} = require('../../service');

const {
    requestHeadersEnum: {AUTHORIZATION},
    responseStatusCodesEnum: {UNAUTHORIZED},
    responseCustomErrorEnum: {NOT_VALID_TOKEN}
} = require('../../constants');
const winston = require('../../logger/winston');
const logger = winston(NOT_VALID_TOKEN.message);

module.exports = async (req, res, next) => {
    try {
        const authorizationToken = req.get(AUTHORIZATION);

        if (!authorizationToken) {

            req.user = await getUserByParamsService({userId: 2, status_id: 1});

        } else if (authorizationToken) {
            const userFromAccessToken = await getTokensByParamsService({access_token: authorizationToken});

            if (!userFromAccessToken) {
                logger.error({
                    message: userFromAccessToken.details[0].message,
                    date: new Date().toLocaleDateString(),
                    time: new Date().toLocaleTimeString()
                });
                return next(new ErrorHandler(
                    UNAUTHORIZED,
                    NOT_VALID_TOKEN.message,
                    NOT_VALID_TOKEN.customCode));
            }

            req.user = userFromAccessToken;
        }

        next();
    } catch (e) {
        next(new ErrorHandler(e.status, e.message, e.customCode));
    }
};
