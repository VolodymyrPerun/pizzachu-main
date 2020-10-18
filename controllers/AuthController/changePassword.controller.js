const Joi = require('joi');
const chalk = require('chalk');

const {transactionInstance} = require('../../dataBase').getInstance();
const {
    CustomErrorData: {
        BAD_REQUEST,
        FORBIDDEN_USER_IS_BLOCKED,
        BAD_REQUEST_USER_NOT_PRESENT,
        FORBIDDEN_PASSWORDS_NOT_MATCH
    }
} = require("../../error");
const {USER_STATUS: {BLOCKED, DELETED}, responseStatusCodesEnum: {CREATED}} = require("../../constants");
const {authValidator: {changePasswordValidationSchema}} = require("../../validators");
const {
    emailActionEnum: {PASSWORD_UPDATE},
    responseStatusCodesEnum: {FORBIDDEN},
    responseCustomErrorEnum: {NOT_VALID},
    transactionEnum: {TRANSACTION_COMMIT, TRANSACTION_ROLLBACK}
} = require('../../constants');
const {HashPasswordHelper, HashPasswordCheckHelper} = require('../../helpers');
const {ErrorHandler} = require('../../error');
const {
    emailService: {sendMail},
    userService: {getUserByIdService, updateUserService}
} = require('../../service');


module.exports = async (req, res, next) => {
    const transaction = await transactionInstance();
    try {
        const {password, newPassword, repeatNewPassword, email} = req.body;

        const {userId} = req.user;

        const user = await getUserByIdService(userId, transaction);

        if (!user) {
            return next(new ErrorHandler(BAD_REQUEST,
                BAD_REQUEST_USER_NOT_PRESENT.message,
                BAD_REQUEST_USER_NOT_PRESENT.code,));
        }

        if (user.status_id === BLOCKED || user.status_id === DELETED) {
            return next(new ErrorHandler(FORBIDDEN,
                FORBIDDEN_USER_IS_BLOCKED.message,
                FORBIDDEN_USER_IS_BLOCKED.code,));
        }

        await HashPasswordCheckHelper(user.password, password);

        const {error} = Joi.validate({password, newPassword, repeatNewPassword}, changePasswordValidationSchema);

        if (error) return next(new ErrorHandler(FORBIDDEN, error.details[0].message, NOT_VALID.customCode));

        if (newPassword !== repeatNewPassword) {
            return next(new ErrorHandler(FORBIDDEN_PASSWORDS_NOT_MATCH, error.details[0].message, FORBIDDEN.customCode));
        }

        const hashPassword = await HashPasswordHelper(newPassword);

        await updateUserService(userId, {password: hashPassword}, transaction);
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
