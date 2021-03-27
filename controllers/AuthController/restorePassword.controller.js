const Joi = require('joi');
const chalk = require('chalk');

const {transactionInstance} = require('../../dataBase').getInstance();
const {
    ErrorHandler,
    CustomErrorData: {
        BAD_REQUEST_WRONG_EMAIL,
        BAD_REQUEST_USER_NOT_PRESENT
    }
} = require("../../error");
const {authValidator: {restorePasswordValidationSchema}} = require("../../validators");
const {
    emailActionEnum: {PASSWORD_RESTORE},
    historyActionEnum: {restorePasswordHistory},
    responseStatusCodesEnum: {BAD_REQUEST, CREATED, FORBIDDEN},
    responseCustomErrorEnum: {NOT_VALID},
    transactionEnum: {TRANSACTION_COMMIT, TRANSACTION_ROLLBACK}
} = require('../../constants');
const {HashPasswordHelper, GetRandomPasswordHelper} = require('../../helpers');
const {
    authService: {restorePasswordService},
    emailService: {sendMail},
    historyService: {addEventService},
    userService: {getUserByParamsService}
} = require('../../service');
const winston = require('../../logger/winston');
const logger = winston(restorePasswordHistory);


module.exports = async (req, res, next) => {
    const transaction = await transactionInstance();
    try {
        const {
            body: {email}
        } = req;

        if (!email) {
            logger.error({
                message: BAD_REQUEST_WRONG_EMAIL.message,
                date: new Date().toLocaleDateString(),
                time: new Date().toLocaleTimeString()
            });
            return next(new ErrorHandler(
                BAD_REQUEST,
                BAD_REQUEST_WRONG_EMAIL.message,
                BAD_REQUEST_WRONG_EMAIL.customCode));
        }

        const user = await getUserByParamsService({email});

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

        const {error} = Joi.validate({email}, restorePasswordValidationSchema);

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

        const password = GetRandomPasswordHelper();

        const hashedPassword = await HashPasswordHelper(password);

        await restorePasswordService(email, hashedPassword);

        logger.info({
            info: restorePasswordHistory,
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString(),
            userId: user.userId,
            email
        });

        await addEventService({event: restorePasswordHistory, userId: user.userId}, transaction);
        await sendMail(email, PASSWORD_RESTORE, {password, user});
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
