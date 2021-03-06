const Joi = require('joi');
const chalk = require('chalk');

const {transactionInstance} = require('../../dataBase').getInstance();
const {
    ErrorHandler,
    CustomErrorData: {
        FORBIDDEN_USER_IS_BLOCKED,
        BAD_REQUEST_USER_NOT_PRESENT,
        FORBIDDEN_PASSWORDS_NOT_MATCH
    }
} = require("../../error");
const {authValidator: {changePasswordValidationSchema}} = require("../../validators");
const {
    emailActionEnum: {PASSWORD_UPDATE},
    historyActionEnum: {changePasswordHistory},
    responseStatusCodesEnum: {BAD_REQUEST, CREATED, FORBIDDEN},
    responseCustomErrorEnum: {NOT_VALID},
    transactionEnum: {TRANSACTION_COMMIT, TRANSACTION_ROLLBACK},
    USER_STATUS: {BLOCKED, DELETED}
} = require('../../constants');
const {HashPasswordHelper, HashPasswordCheckHelper} = require('../../helpers');
const {
    emailService: {sendMail},
    historyService: {addEventService},
    userService: {getUserByIdService, updateUserService}
} = require('../../service');
const winston = require('../../logger/winston');
const logger = winston(changePasswordHistory);


module.exports = async (req, res, next) => {
    const transaction = await transactionInstance();
    try {
        const {
            body: {email, password, newPassword, repeatNewPassword},
            user: {userId}
        } = req;

        const user = await getUserByIdService(userId);

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

        if (user.status_id === BLOCKED || user.status_id === DELETED) {
            logger.error({
                message: FORBIDDEN_USER_IS_BLOCKED.message,
                date: new Date().toLocaleDateString(),
                time: new Date().toLocaleTimeString()
            });
            return next(new ErrorHandler(
                FORBIDDEN,
                FORBIDDEN_USER_IS_BLOCKED.message,
                FORBIDDEN_USER_IS_BLOCKED.customCode));
        }

        await HashPasswordCheckHelper(user.password, password);

        const {error} = Joi.validate({password, newPassword, repeatNewPassword}, changePasswordValidationSchema);

        if (error) {
            logger.error({
                message: error.details[0].message,
                date: new Date().toLocaleDateString(),
                time: new Date().toLocaleTimeString()
            });
            return next(new ErrorHandler(
                FORBIDDEN,
                error.details[0].message,
                NOT_VALID.customCode));
        }

        if (newPassword !== repeatNewPassword) {
            logger.error({
                message: FORBIDDEN_PASSWORDS_NOT_MATCH.message,
                date: new Date().toLocaleDateString(),
                time: new Date().toLocaleTimeString()
            });
            return next(new ErrorHandler(
                FORBIDDEN_PASSWORDS_NOT_MATCH,
                FORBIDDEN_PASSWORDS_NOT_MATCH.message,
                FORBIDDEN.customCode));
        }

        const hashPassword = await HashPasswordHelper(newPassword);

        await updateUserService({password: hashPassword}, userId, transaction);

        logger.info({
            info: changePasswordHistory,
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString(),
            userId: user.userId
        });

        await addEventService({event: changePasswordHistory, userId: user.userId}, transaction);
        await sendMail(email, PASSWORD_UPDATE, {user, newPassword});
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
