const chalk = require('chalk');

const {transactionInstance} = require('../../dataBase').getInstance();
const {
    responseStatusCodesEnum: {NOT_FOUND: NOT_FOUND_CODE},
    responseCustomErrorEnum: {NOT_GET},
    transactionEnum: {TRANSACTION_COMMIT, TRANSACTION_ROLLBACK},
    USER_STATUS: {ACTIVE, BLOCKED}
} = require('../../constants');
const {ErrorHandler} = require("../../error");
const {userService: {getUsersService}} = require("../../service");


module.exports = (userStatus) => async (req, res, next) => {
    const transaction = await transactionInstance();
    let keyStatus = '';
    let users = [];
    try {

        switch (userStatus) {
            case ACTIVE:
                keyStatus = ACTIVE
                break;
            case BLOCKED:
                keyStatus = BLOCKED
                break;
            default:
                return next(new ErrorHandler(NOT_FOUND_CODE, NOT_GET.message, NOT_GET.customCode));
        }

        users = await getUsersService([keyStatus]);

        if (!users) return next(new ErrorHandler(NOT_FOUND_CODE, NOT_GET.message, NOT_GET.customCode));

        await transaction.commit();
        console.log(chalk.bgYellow.bold.cyan(TRANSACTION_COMMIT));

        res.json(users).end();
    } catch (e) {
        console.log(chalk.bgGreen.bold.red(e.status, e.message, e.customCode));
        console.log(chalk.red(TRANSACTION_ROLLBACK));
        await transaction.rollback();
        next(new ErrorHandler(e.status, e.message, e.code));
    }
};
