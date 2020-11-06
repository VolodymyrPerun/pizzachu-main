const chalk = require('chalk');

const {transactionInstance} = require('../../dataBase').getInstance();
const {
    responseStatusCodesEnum: {NOT_FOUND: NOT_FOUND_CODE},
    responseCustomErrorEnum: {NOT_UPDATE},
    emailActionEnum: {USER_UPDATE},
    historyActionEnum: {updateUserHistory},
    transactionEnum: {TRANSACTION_COMMIT, TRANSACTION_ROLLBACK}
} = require('../../constants');
const {ErrorHandler} = require("../../error");
const {
    emailService: {sendMail},
    historyService: {addEventService},
    userService: {getUserByIdService, updateUserService}
} = require("../../service");
const winston = require('../../logger/winston');
const logger = winston(updateUserHistory);


module.exports = async (req, res, next) => {
    const transaction = await transactionInstance();
    try {
        const {
            body: user,
            user: {userId}
        } = req;

        const userFromDB = await getUserByIdService(userId);

        const isUpdated = await updateUserService(userId, user, transaction);

        if (!isUpdated) {
            logger.error({
                message: NOT_UPDATE.message,
                date: new Date().toLocaleDateString(),
                time: new Date().toLocaleTimeString()
            });
            return next(new ErrorHandler(
                NOT_FOUND_CODE,
                NOT_UPDATE.message,
                NOT_UPDATE.customCode));
        }

        logger.info({
            info: updateUserHistory,
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString(),
            userId: userFromDB.userId
        });

        await addEventService({event: updateUserHistory, userId: userFromDB.userId}, transaction);
        await sendMail(userFromDB.email, USER_UPDATE, {user});
        await transaction.commit();
        console.log(chalk.bgYellow.bold.cyan(TRANSACTION_COMMIT));

        res.end();
    } catch (e) {
        console.log(chalk.bgGreen.bold.red(e.status, e.message, e.customCode));
        console.log(chalk.red(TRANSACTION_ROLLBACK));
        await transaction.rollback();
        next(new ErrorHandler(e.status, e.message, e.customCode));
    }
};
