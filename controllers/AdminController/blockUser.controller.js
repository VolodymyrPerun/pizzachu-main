const chalk = require('chalk');

const {transactionInstance} = require('../../dataBase').getInstance();
const {
    historyActionEnum: {blockUserHistory},
    responseStatusCodesEnum: {CREATED, BAD_REQUEST},
    transactionEnum: {TRANSACTION_COMMIT, TRANSACTION_ROLLBACK},
    USER_STATUS:{BLOCKED}
} = require('../../constants');
const {
    ErrorHandler,
    CustomErrorData: {BAD_REQUEST_BLOCK_USER}
} = require("../../error");
const {
    adminService: {blockUserService},
    oauthService: {deleteTokenByParamsService},
    historyService: {addEventService}
} = require('../../service');

module.exports = async (req, res, next) => {
    const transaction = await transactionInstance();
    try {
        const {userId, status_id} = req.user;

        if (status_id === BLOCKED) {

            return next (new ErrorHandler(
                BAD_REQUEST,
                BAD_REQUEST_BLOCK_USER.message,
                BAD_REQUEST_BLOCK_USER.customCode
            ));
        }

        await blockUserService(userId, transaction);
        await deleteTokenByParamsService({userId}, transaction);
        await addEventService({event: blockUserHistory, userId: userId}, transaction);
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
