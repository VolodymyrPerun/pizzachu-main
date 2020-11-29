const chalk = require('chalk');

const {transactionInstance} = require('../../dataBase').getInstance();
const {
    historyActionEnum: {unlockUserHistory},
    responseStatusCodesEnum: {CREATED, BAD_REQUEST},
    transactionEnum: {TRANSACTION_COMMIT, TRANSACTION_ROLLBACK},
    USER_STATUS:{ACTIVE}
} = require('../../constants');
const {
    ErrorHandler,
    CustomErrorData: {BAD_REQUEST_UNLOCK_USER}
} = require("../../error");
const {
    adminService: {unlockUserService},
    oauthService: {deleteTokenByParamsService},
    historyService: {addEventService}
} = require('../../service');
const winston = require('../../logger/winston');
const logger = winston(unlockUserHistory);

module.exports = async (req, res, next) => {
    const transaction = await transactionInstance();
    try {
        const {userId, status_id} = req.user;

        if (status_id === ACTIVE) {
            logger.error({
                message: BAD_REQUEST_UNLOCK_USER.message,
                date: new Date().toLocaleDateString(),
                time: new Date().toLocaleTimeString()
            });
            return next (new ErrorHandler(
                BAD_REQUEST,
                BAD_REQUEST_UNLOCK_USER.message,
                BAD_REQUEST_UNLOCK_USER.customCode
            ));
        }

        await unlockUserService(userId, transaction);
        await deleteTokenByParamsService({userId}, transaction);

        logger.info({
            info: unlockUserHistory,
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString(),
            userId: userId
        });

        await addEventService({event: unlockUserHistory, userId}, transaction);
        await transaction.commit();
        console.log(chalk.bgYellow.bold.cyan(TRANSACTION_COMMIT));

        res.status(CREATED).end();
    } catch (e) {
        console.log(chalk.bgGreen.bold.red(e.status, e.message, e.customCode));
        console.log(chalk.red(TRANSACTION_ROLLBACK));
        await transaction.rollback();
        next(new ErrorHandler(e.status, e.message, e.customCode));
    }
};
