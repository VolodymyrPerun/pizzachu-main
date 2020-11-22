const Joi = require('joi');
const chalk = require('chalk');

const {transactionInstance} = require('../../dataBase').getInstance();
const {
    CustomErrorData: {
        BAD_REQUEST_ADMIN_NOT_PRESENT,
        BAD_REQUEST_SELLER_NOT_PRESENT,
        BAD_REQUEST_USER_NOT_PRESENT,
        FORBIDDEN_USER_IS_BLOCKED
    }
} = require("../../error");

const {
    JWT_METHOD,
    historyActionEnum: {registerUserHistory},
    responseStatusCodesEnum: {BAD_REQUEST, FORBIDDEN},
    responseCustomErrorEnum: {NOT_VALID},
    transactionEnum: {TRANSACTION_COMMIT, TRANSACTION_ROLLBACK},
    USER_ROLE: {ADMIN, CLIENT, SELLER},
    USER_STATUS: {BLOCKED}
} = require("../../constants");

const {authValidator: {authValidationSchema}} = require("../../validators");

const {tokenGeneratorHelper, HashPasswordCheckHelper} = require('../../helpers');
const {ErrorHandler} = require('../../error');
const {
    historyService: {addEventService},
    oauthService: {createTokenPairService},
    userService: {getUserByParamsService}
} = require('../../service');
const winston = require('../../logger/winston');
const logger = winston(registerUserHistory);


module.exports = userRole => async (req, res, next) => {
    const transaction = await transactionInstance();
    let keyRole = '';
    let keyMethod = '';
    let keyErrorData = '';
    try {

        switch (userRole) {
            case ADMIN:
                keyRole = ADMIN;
                keyMethod = JWT_METHOD.ADMIN;
                keyErrorData = BAD_REQUEST_ADMIN_NOT_PRESENT;
                break;
            case CLIENT:
                keyRole = CLIENT;
                keyMethod = JWT_METHOD.CLIENT;
                keyErrorData = BAD_REQUEST_USER_NOT_PRESENT;
                break;
            case SELLER:
                keyRole = SELLER;
                keyMethod = JWT_METHOD.SELLER;
                keyErrorData = BAD_REQUEST_SELLER_NOT_PRESENT;
                break;
            default:
                return next(new ErrorHandler(BAD_REQUEST,
                    BAD_REQUEST_USER_NOT_PRESENT.message,
                    BAD_REQUEST_USER_NOT_PRESENT.customCode));
        }

        const {email, password} = req.body;

        const {error} = Joi.validate({email, password}, authValidationSchema);

        if (error) {
            logger.error({
                message: error.details[0].message,
                date: new Date().toLocaleDateString(),
                time: new Date().toLocaleTimeString()
            });
            return next(new ErrorHandler(
                BAD_REQUEST,
                error.details[0].message,
                NOT_VALID.customCode));
        }

        const user = await getUserByParamsService({email, role_id: [keyRole]}, transaction);

        if (!user) {
            logger.error({
                message: keyErrorData.message,
                date: new Date().toLocaleDateString(),
                time: new Date().toLocaleTimeString()
            });
            return next(new ErrorHandler(
                BAD_REQUEST,
                keyErrorData.message,
                keyErrorData.customCode));
        }

        if (user.status_id === BLOCKED) {
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

        const tokens = tokenGeneratorHelper(keyMethod);

        await createTokenPairService({userId: user.userId, ...tokens}, transaction);

        logger.info({
            info: registerUserHistory,
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString(),
            userId: user.userId
        });

        await addEventService({event: registerUserHistory, userId: user.userId}, transaction);
        await transaction.commit();
        console.log(chalk.bgYellow.bold.cyan(TRANSACTION_COMMIT));

        res.json(tokens).end();
    } catch (e) {
        console.log(chalk.bgGreen.bold.red(e.status, e.message, e.customCode));
        console.log(chalk.red(TRANSACTION_ROLLBACK));
        await transaction.rollback();
        next(new ErrorHandler(e.status, e.message, e.customCode));
    }
};
