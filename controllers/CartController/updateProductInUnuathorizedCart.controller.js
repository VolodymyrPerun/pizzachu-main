const chalk = require('chalk');
const {transactionInstance} = require('../../dataBase').getInstance();

const {
    historyActionEnum: {updateProductInCartHistory},
    responseStatusCodesEnum: {BAD_REQUEST},
    transactionEnum: {TRANSACTION_COMMIT, TRANSACTION_ROLLBACK}
} = require('../../constants');
const {
    ErrorHandler,
    CustomErrorData: {BAD_REQUEST_PRODUCT_NOT_PRESENT}
} = require("../../error");
const {
    cartService: {findUserProceedCartService, updateCartService},
    productService: {getProductByIdService},
} = require("../../service");
const winston = require('../../logger/winston');
const logger = winston(updateProductInCartHistory);

module.exports = async (req, res, next) => {
    const transaction = await transactionInstance();
    try {
        const {
            product: {productId},
            query: {tempId},
            count: {count}
        } = req;

        const product = await getProductByIdService(productId);

        const userProceedCart = await findUserProceedCartService({tempId, productId});

        if (!userProceedCart) {
            return next(new ErrorHandler(
                BAD_REQUEST,
                BAD_REQUEST_PRODUCT_NOT_PRESENT.message,
                BAD_REQUEST_PRODUCT_NOT_PRESENT.customCode
            ));
        }

        const price = product.price;

        const sum = price * count;

        await updateCartService({count, sum, updated_at: Date.now()}, {tempId, productId}, transaction);

        logger.info({
            info: updateProductInCartHistory,
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString(),
            userId: tempId,
            productId: product.productId,
            count
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
