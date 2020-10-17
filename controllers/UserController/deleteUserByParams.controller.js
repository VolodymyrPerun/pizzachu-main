const chalk = require('chalk');

const {transactionInstance} = require('../../dataBase').getInstance();
const {
    emailActionEnum: {USER_DELETE},
    responseStatusCodesEnum: {NO_CONTENT},
    transactionEnum: {TRANSACTION_COMMIT, TRANSACTION_ROLLBACK}
} = require('../../constants');
const {ErrorHandler} = require("../../error");
const {
    emailService,
    userService: {deleteUserByParamsService, getUserByIdService},
    oauthService: {deleteTokenByParamsService}
} = require("../../service");


module.exports = async (req, res, next) => {
    const transaction = await transactionInstance();
    try {
        const {userId} = req.params;

        const user = await getUserByIdService(userId, transaction);

        await deleteUserByParamsService({userId}, transaction);
        await deleteTokenByParamsService({userId}, transaction);
        await emailService.sendMail(user.email, USER_DELETE, {
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
