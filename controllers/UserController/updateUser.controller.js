const chalk = require('chalk');

const {transactionInstance} = require('../../dataBase').getInstance();
const {getUserByIdService} = require("../../service/userService");
const {
    responseStatusCodesEnum: {NOT_FOUND: NOT_FOUND_CODE},
    responseCustomErrorEnum: {NOT_UPDATE},
    emailActionEnum: {USER_UPDATE}
} = require('../../constants');
const {ErrorHandler} = require("../../error");
const {
    emailService: {sendMail},
    userService: {updateUserService}
} = require("../../service");


module.exports = async (req, res, next) => {
    const transaction = await transactionInstance();
    try {
        const user = req.body;

        const {userId} = req.user;

        const userFromDB = await getUserByIdService(userId);

        const isUpdated = await updateUserService(userId, user, transaction);

        if (!isUpdated) return next(new ErrorHandler(NOT_FOUND_CODE, NOT_UPDATE.message, NOT_UPDATE.customCode));

        await sendMail(userFromDB.email, USER_UPDATE, {user});
        await transaction.commit();
        console.log(chalk.bgRedBright.bold.greenBright('TRANSACTION COMMIT'));

        res.end();
    } catch (e) {
        console.log(chalk.bgGreen.bold.red(e.status, e.message, e.customCode));
        console.log(chalk.red('TRANSACTION ROLLBACK'));
        await transaction.rollback();
        next(new ErrorHandler(e.status, e.message, e.customCode));
    }
};
