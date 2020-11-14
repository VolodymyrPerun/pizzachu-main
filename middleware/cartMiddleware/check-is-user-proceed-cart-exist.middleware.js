const chalk = require('chalk');
const {transactionInstance} = require('../../dataBase').getInstance();

const {ErrorHandler, CustomErrorData: {BAD_REQUEST_USER_CART_ALREADY_PRESENT}} = require('../../error');
const {cartService: {findUserProceedCartService}, historyService: {addEventService},} = require("../../service");
const {
    historyActionEnum: {addProductToCartHistory},
    transactionEnum: {TRANSACTION_COMMIT, TRANSACTION_ROLLBACK},
    responseStatusCodesEnum: {BAD_REQUEST}
} = require("../../constants");

const winston = require('../../logger/winston');
const logger = winston(addProductToCartHistory);

module.exports = async (req, res, next) => {
    const transaction = await transactionInstance();
    try {
        const {
            product: {productId},
            user: {userId}
        } = req;

        const userProceedCart = await findUserProceedCartService({userId, productId});

        console.log(userProceedCart);

        if (userProceedCart) {
            logger.error({
                message: BAD_REQUEST_USER_CART_ALREADY_PRESENT.message,
                date: new Date().toLocaleDateString(),
                time: new Date().toLocaleTimeString()
            });
            return next(new ErrorHandler(
                BAD_REQUEST,
                BAD_REQUEST_USER_CART_ALREADY_PRESENT.message,
                BAD_REQUEST_USER_CART_ALREADY_PRESENT.customCode
            ));
        }

        await addEventService({event: addProductToCartHistory, userId: userId}, transaction);
        await transaction.commit();
        console.log(chalk.bgYellow.bold.cyan(TRANSACTION_COMMIT));

        req.userProceedCart = userProceedCart;

        next();
    } catch (e) {
        console.log(chalk.bgGreen.bold.red(e.status, e.message, e.customCode));
        console.log(chalk.red(TRANSACTION_ROLLBACK));
        await transaction.rollback();
        next(new ErrorHandler(e.status, e.message, e.customCode));
    }
};
