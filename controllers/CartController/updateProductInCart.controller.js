const chalk = require('chalk');
const {transactionInstance} = require('../../dataBase').getInstance();

const {
    historyActionEnum: {updateProductInCartHistory},
    responseStatusCodesEnum: {BAD_REQUEST},
    transactionEnum: {TRANSACTION_COMMIT, TRANSACTION_ROLLBACK},
    USER_STATUS: {ACTIVE}
} = require('../../constants');
const {ErrorHandler, CustomErrorData: {BAD_REQUEST_USER_NOT_ACTIVE}} = require("../../error");
const {
    cartService: {updateCartService},
    historyService: {addEventService},
    productService: {getProductByIdService},
    userService: {getUserByIdService},
} = require("../../service");
const winston = require('../../logger/winston');
const logger = winston(updateProductInCartHistory);

module.exports = async (req, res, next) => {
    const transaction = await transactionInstance();
    try {
        const {
            product: {productId},
            user: {userId},
            body: {count}
        } = req;

        const userFromDB = await getUserByIdService(userId);

        if (userFromDB.status_id !== ACTIVE) {
            logger.error({
                message: BAD_REQUEST_USER_NOT_ACTIVE.message,
                date: new Date().toLocaleDateString(),
                time: new Date().toLocaleTimeString()
            });
            return next(new ErrorHandler(
                BAD_REQUEST,
                BAD_REQUEST_USER_NOT_ACTIVE.message,
                BAD_REQUEST_USER_NOT_ACTIVE.customCode
            ));
        }
        const product = await getProductByIdService(productId);

        const price = product.price;

        let sum;

        if (!count || count < 0) {
            sum = price * 1;
        } else {
            sum = price * count;
        }

        await updateCartService({count, sum, updated_at: Date.now()}, {userId, productId}, transaction);

        logger.info({
            info: updateProductInCartHistory,
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString(),
            userId: userId,
            productId: product.productId,
            count
        });
        await addEventService({event: updateProductInCartHistory, userId: userId}, transaction);
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
