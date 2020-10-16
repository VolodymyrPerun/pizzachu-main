const chalk = require('chalk');
const {transactionInstance} = require('../../dataBase').getInstance();

const ErrorHandler = require('../../error/ErrorHandler');
const {oauthService: {getTokensByParamsService}} = require('../../service');
const {
    requestHeadersEnum: {AUTHORIZATION},
    responseStatusCodesEnum: {UNAUTHORIZED, BAD_REQUEST},
    responseCustomErrorEnum: {NOT_VALID, NOT_VALID_TOKEN}

} = require('../../constants');

module.exports = async (req, res, next) => {
    const transaction = await transactionInstance();
    try {
        const authorizationToken = req.get(AUTHORIZATION);

        if (!authorizationToken) {
            return next(new ErrorHandler(NOT_VALID.message, BAD_REQUEST, NOT_VALID.customCode));
        }

        const userFromAccessToken = await getTokensByParamsService({access_token: authorizationToken}, transaction);

        if (!userFromAccessToken) {
            return next(new ErrorHandler(
                UNAUTHORIZED,
                NOT_VALID_TOKEN.message,
                NOT_VALID_TOKEN.code))
        }

        req.user = userFromAccessToken;

        await transaction.commit();
        console.log(chalk.bgRedBright.bold.greenBright('TRANSACTION COMMIT'));

        next();
    } catch (e) {
        console.log(chalk.bgGreen.bold.red(e.status, e.message, e.customCode));
        console.log(chalk.red('TRANSACTION ROLLBACK'));
        await transaction.rollback();
        next(new ErrorHandler(e.status, e.message, e.customCode));
    }
};
