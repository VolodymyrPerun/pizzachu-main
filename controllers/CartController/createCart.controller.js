const chalk = require('chalk');

const {transactionInstance} = require('../../dataBase').getInstance();
const {
    CART_STATUS: {IN_PROGRESS},
    emailActionEnum: {CREATE_PRODUCT_TYPE},
    historyActionEnum: {createProductTypeHistory},
    responseStatusCodesEnum: {BAD_REQUEST, CREATED, NOT_FOUND: NOT_FOUND_CODE},
    responseCustomErrorEnum: {NOT_CREATED},
    transactionEnum: {TRANSACTION_COMMIT, TRANSACTION_ROLLBACK},
    USER_STATUS: {ACTIVE}
} = require('../../constants');
const {ErrorHandler, CustomErrorData: {BAD_REQUEST_USER_NOT_ACTIVE}} = require("../../error");
const {
    cartService: {createCartService, findUserProceedCartService, addProductToCartService},
    emailService: {sendMail},
    historyService: {addEventService},
    productService: {getProductByIdService, updateProductService},
    productTypeService: {createProductTypeService},
    userService: {getUserByIdService},
} = require("../../service");
const winston = require('../../logger/winston');
const logger = winston(createProductTypeHistory);

module.exports = async (req, res, next) => {
    // const transaction = await transactionInstance();
    try {
        const {
            params: {productId},
            user: {userId, status_id},
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

        let userCart = await findUserProceedCartService(userId);

        if (!userCart) {

         userCart = await createCartService({userId, status_id});
            console.log('22222222222222222222');
            console.log(userCart);
        }

        console.log('3333333333333333333');
        console.log(userCart);
        console.log('3333333333333333333');

        //todo create confirmed(active) user middleware

        const CartFromDB = await addProductToCartService(userCart, product, count);

        await updateProductService(product.productId, {stockCount: product.stockCount});


        // logger.info({
        //     info: createProductTypeHistory,
        //     date: new Date().toLocaleDateString(),
        //     time: new Date().toLocaleTimeString(),
        //     userId: userId,
        //     productId: product.productId
        // });
        // await addEventService({event: createProductTypeHistory, userId: userId}, transaction);
        // await sendMail(userFromDB.email, CREATE_PRODUCT_TYPE, {userFromDB, productType});
        // await transaction.commit();
        // console.log(chalk.bgYellow.bold.cyan(TRANSACTION_COMMIT));

        res.status(CREATED).json(CartFromDB);
    } catch (e) {
        // console.log(chalk.bgGreen.bold.red(e.status, e.message, e.customCode));
        // console.log(chalk.red(TRANSACTION_ROLLBACK));
        // await transaction.rollback();
        next(new ErrorHandler(e.status, e.message, e.customCode));
    }
};
