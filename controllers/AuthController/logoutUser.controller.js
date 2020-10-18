const chalk = require('chalk');

const {transactionInstance} = require('../../dataBase').getInstance();
const {ErrorHandler} = require("../../error");
const {
    requestHeadersEnum: {AUTHORIZATION},
    transactionEnum: {TRANSACTION_COMMIT, TRANSACTION_ROLLBACK}
} = require('../../constants');
const {oauthService: {deleteTokenByParamsService}} = require('../../service');


module.exports = async (req, res, next) => {
    const transaction = await transactionInstance();
    try {
        const access_token = req.get(AUTHORIZATION);

        await deleteTokenByParamsService({access_token}, transaction);

        await transaction.commit();
        console.log(chalk.bgYellow.bold.cyan(TRANSACTION_COMMIT));

        res.end();
    } catch (e) {
        console.log(chalk.bgGreen.bold.red(e.status, e.message, e.customCode));
        console.log(chalk.red(TRANSACTION_ROLLBACK));
        await transaction.rollback();
        next(new ErrorHandler(e.status, e.message, e.code));
    }
};
