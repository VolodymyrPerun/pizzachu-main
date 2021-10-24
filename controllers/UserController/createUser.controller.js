const chalk = require('chalk');

const {transactionInstance} = require('../../dataBase').getInstance();
const {ErrorHandler} = require("../../error");
const {
    responseStatusCodesEnum: {CREATED, NOT_FOUND: NOT_FOUND_CODE},
    responseCustomErrorEnum: {NOT_CREATED},
    emailActionEnum: {ADMIN_REGISTER, SELLER_REGISTER, USER_REGISTER},
    historyActionEnum: {createUserHistory},
    transactionEnum: {TRANSACTION_COMMIT, TRANSACTION_ROLLBACK},
    USER_ROLE: {ADMIN, CLIENT, SELLER},
    USER_STATUS: {ACTIVE},
} = require('../../constants');
const {HashPasswordHelper} = require('../../helpers');
const {
    emailService: {sendMail},
    historyService: {addEventService},
    userService: {createUserService}
} = require("../../service");
const winston = require('../../logger/winston');
const logger = winston(createUserHistory);


module.exports = userRole => async (req, res, next) => {
    const transaction = await transactionInstance();
    let keyRole = '';
    let emailAction = '';
    try {
        switch (userRole) {
            case ADMIN:
                keyRole = ADMIN;
                emailAction = ADMIN_REGISTER;
                break;
            case CLIENT:
                keyRole = CLIENT;
                emailAction = USER_REGISTER;
                break;
            case SELLER:
                keyRole = SELLER;
                emailAction = SELLER_REGISTER;
                break;
            default:
                return next(new ErrorHandler(
                    NOT_FOUND_CODE,
                    NOT_CREATED.message,
                    NOT_CREATED.customCode));
        }

        let {
            user: {
                user_photo, email, phone, name, surname, age,
                password: noHashPassword, gender_id, city, street, house,
                apartment, entrance, floor, status_id, role_id
            }
        } = req;

        role_id = keyRole;
        status_id = ACTIVE;

        const password = await HashPasswordHelper(noHashPassword);

        const isUserCreated = await createUserService({
            user_photo, email, phone, name, surname, age,
            password, gender_id, city, street, house, apartment,
            entrance, floor, status_id, role_id
        }, transaction);

        if (!isUserCreated) {
            logger.error({
                message: NOT_CREATED.message,
                date: new Date().toLocaleDateString(),
                time: new Date().toLocaleTimeString()
            });
            return next(new ErrorHandler(
                NOT_FOUND_CODE,
                NOT_CREATED.message,
                NOT_CREATED.customCode));
        }

        logger.info({
            info: createUserHistory,
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString(),
            userId: isUserCreated.userId
        });

        await addEventService({event: createUserHistory, userId: isUserCreated.userId}, transaction);
        await sendMail(email, [emailAction], {name, surname, email, noHashPassword});
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
