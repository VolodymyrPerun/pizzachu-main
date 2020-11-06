const chalk = require('chalk');

const {transactionInstance} = require('../../dataBase').getInstance();
const {
    emailActionEnum: {USER_DELETE},
    historyActionEnum: {deleteUserHistory},
    responseStatusCodesEnum: {BAD_REQUEST, NO_CONTENT},
    transactionEnum: {TRANSACTION_COMMIT, TRANSACTION_ROLLBACK},
    USER_STATUS: {DELETED}
} = require('../../constants');
const {ErrorHandler, CustomErrorData: {BAD_REQUEST_USER_NOT_PRESENT}} = require("../../error");
const {
    emailService: {sendMail},
    historyService: {addEventService},
    oauthService: {deleteTokenByParamsService},
    userService: {deleteUserByParamsService, getUserByIdService}
} = require("../../service");
const winston = require('../../logger/winston');
const logger = winston(deleteUserHistory);

module.exports = async (req, res, next) => {
    const transaction = await transactionInstance();
    try {
        const {userId} = req.params;

        const user = await getUserByIdService(userId, transaction);

        if (!user || user.status_id === DELETED) {
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

        await deleteUserByParamsService({userId}, transaction);
        await deleteTokenByParamsService({userId}, transaction);

        logger.info({
            info: deleteUserHistory,
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString(),
            userId: userId
        });

        await addEventService({event: deleteUserHistory, userId: user.userId}, transaction);
        await sendMail(user.email, USER_DELETE, {
            userName: user.name,
            userSurname: user.surname
        });
        await transaction.commit();
        console.log(chalk.bgYellow.bold.cyan(TRANSACTION_COMMIT));

        res.sendStatus(NO_CONTENT).end();
    } catch (e) {
        console.log(chalk.bgGreen.bold.red(e.status, e.message, e.customCode));
        console.log(chalk.red(TRANSACTION_ROLLBACK));
        await transaction.rollback();
        next(new ErrorHandler(e.status, e.message, e.customCode));
    }
};
