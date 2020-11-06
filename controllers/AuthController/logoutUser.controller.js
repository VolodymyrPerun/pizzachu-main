const chalk = require('chalk');

const {transactionInstance} = require('../../dataBase').getInstance();
const {ErrorHandler, CustomErrorData: {BAD_REQUEST_USER_NOT_PRESENT}} = require("../../error");
const {
    historyActionEnum: {logoutUserHistory},
    requestHeadersEnum: {AUTHORIZATION},
    responseStatusCodesEnum: {BAD_REQUEST},
    responseCustomErrorEnum: {NOT_VALID},
    transactionEnum: {TRANSACTION_COMMIT, TRANSACTION_ROLLBACK}
} = require('../../constants');
const {
    authService: {getUserFromAccessTokenService},
    historyService: {addEventService},
    oauthService: {deleteTokenByParamsService}
} = require('../../service');
const winston = require('../../logger/winston');
const logger = winston(logoutUserHistory);


module.exports = async (req, res, next) => {
    const transaction = await transactionInstance();
    try {
        const access_token = req.get(AUTHORIZATION);

        if (!access_token) {
            logger.error({
                message: NOT_VALID.message,
                date: new Date().toLocaleDateString(),
                time: new Date().toLocaleTimeString()
            });
            return next(new ErrorHandler(
                BAD_REQUEST,
                NOT_VALID.message,
                NOT_VALID.customCode));
        }

        const user = await getUserFromAccessTokenService(access_token);

        if (!user) {
            logger.error({
                message: BAD_REQUEST_USER_NOT_PRESENT.message,
                date: new Date().toLocaleDateString(),
                time: new Date().toLocaleTimeString()
            });
            return next(new ErrorHandler(
                BAD_REQUEST,
                BAD_REQUEST_USER_NOT_PRESENT.message,
                BAD_REQUEST_USER_NOT_PRESENT.customCode));
        }

        await deleteTokenByParamsService({access_token}, transaction);

        logger.info({
            info: logoutUserHistory,
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString(),
            userId: user.userId
        });

        await addEventService({event: logoutUserHistory, userId: user.userId}, transaction);
        await transaction.commit();
        console.log(chalk.bgYellow.bold.cyan(TRANSACTION_COMMIT));

        res.end();
    } catch (e) {
        console.log(chalk.bgGreen.bold.red(e.status, e.message, e.customCode));
        console.log(chalk.red(TRANSACTION_ROLLBACK));
        await transaction.rollback();
        next(new ErrorHandler(e.status, e.message, e.code));
    }
};
