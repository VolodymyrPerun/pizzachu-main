const chalk = require('chalk');

const {transactionInstance} = require('../../dataBase').getInstance();
const {
    responseStatusCodesEnum: {NO_CONTENT},
    emailActionEnum: {USER_DELETE}
} = require('../../constants');
const {ErrorHandler} = require("../../error")
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
        console.log(chalk.bgRedBright.bold.greenBright('TRANSACTION COMMIT'));

        res.sendStatus(NO_CONTENT);
    } catch (e) {
        console.log(chalk.bgGreen.bold.red(e.status, e.message, e.customCode));
        console.log(chalk.red('TRANSACTION ROLLBACK'));
        await transaction.rollback();
        next(new ErrorHandler(e.status, e.message, e.customCode));
    }
};
