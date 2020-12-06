const chalk = require('chalk');
const {transactionInstance} = require('../../dataBase').getInstance();

const {
    historyActionEnum: {addProductToCartHistory},
    responseStatusCodesEnum: {BAD_REQUEST},
    transactionEnum: {TRANSACTION_COMMIT, TRANSACTION_ROLLBACK}
} = require('../../constants');
const {
    ErrorHandler,
    CustomErrorData: {BAD_REQUEST_PRODUCT_IS_ALREADY_PRESENT}
} = require('../../error');
const {
    cartService: {addProductToCart, findUserProceedCartService},
    productService: {getProductByIdService},
} = require('../../service');

const winston = require('../../logger/winston');
const logger = winston(addProductToCartHistory);

module.exports = async (req, res, next) => {
    const transaction = await transactionInstance();
    try {
        const {
            product: {productId},
            count: {count},
            query: {tempId},
        } = req;

        const product = await getProductByIdService(productId);

        const userProceedCart = await findUserProceedCartService({tempId, productId});

        if (userProceedCart) {
            return next(new ErrorHandler(
                BAD_REQUEST,
                BAD_REQUEST_PRODUCT_IS_ALREADY_PRESENT.message,
                BAD_REQUEST_PRODUCT_IS_ALREADY_PRESENT.customCode
            ));
        }

        const price = product.price;

        const sum = price * count;

        if (!userProceedCart) {
            await addProductToCart({
                tempId,
                productId,
                price,
                count,
                sum,
                created_at: Date.now()
            }, transaction);
        }

        logger.info({
            info: addProductToCartHistory,
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString(),
            userId: tempId,
            productId: product.productId,
            count
        });

        await transaction.commit();
        console.log(chalk.bgYellow.bold.cyan(TRANSACTION_COMMIT));

        res.end();
    } catch
        (e) {
        console.log(chalk.bgGreen.bold.red(e.status, e.message, e.customCode));
        console.log(chalk.red(TRANSACTION_ROLLBACK));
        await transaction.rollback();
        next(new ErrorHandler(e.status, e.message, e.customCode));
    }
};
