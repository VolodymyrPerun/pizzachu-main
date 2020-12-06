const chalk = require('chalk');

const {transactionInstance} = require('../../dataBase').getInstance();
const {
    historyActionEnum: {deleteUserCartHistory},
    responseStatusCodesEnum: {BAD_REQUEST},
    transactionEnum: {TRANSACTION_COMMIT, TRANSACTION_ROLLBACK}
} = require('../../constants');
const {
    ErrorHandler,
    CustomErrorData: {BAD_REQUEST_USER_CART_NOT_PRESENT}
} = require("../../error");
const {
    cartService: {deleteProductFromCartByParamsService, findUserProceedCartService}
} = require("../../service");
const winston = require('../../logger/winston');
const logger = winston(deleteUserCartHistory);

module.exports = async (req, res, next) => {
    const transaction = await transactionInstance();
    try {
        const {
            query: {tempId},
        } = req;

        const userCart = await findUserProceedCartService({tempId});
        if (!userCart) {
            logger.error({
                message: BAD_REQUEST_USER_CART_NOT_PRESENT.message,
                date: new Date().toLocaleDateString(),
                time: new Date().toLocaleTimeString()
            });
            return next(new ErrorHandler(
                BAD_REQUEST,
                BAD_REQUEST_USER_CART_NOT_PRESENT.message,
                BAD_REQUEST_USER_CART_NOT_PRESENT.customCode));
        }

        await deleteProductFromCartByParamsService({tempId}, transaction);

        logger.info({
            info: deleteUserCartHistory,
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString(),
            userId: tempId,
        });

        await transaction.commit();
        console.log(chalk.bgYellow.bold.cyan(TRANSACTION_COMMIT));

        res.end();
    } catch (e) {
        console.log(chalk.bgGreen.bold.red(e.status, e.message, e.customCode));
        console.log(chalk.red(TRANSACTION_ROLLBACK));
        await transaction.rollback();
        next(new ErrorHandler(e.status, e.message, e.customCode));
    }
};
