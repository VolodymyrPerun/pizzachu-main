const chalk = require('chalk');

const {transactionInstance} = require('../../dataBase').getInstance();
const {
    emailActionEnum: {DELETE_PRODUCT},
    historyActionEnum: {deleteProductHistory},
    responseStatusCodesEnum: {BAD_REQUEST},
    PRODUCT_STATUS: {DELETED},
    transactionEnum: {TRANSACTION_COMMIT, TRANSACTION_ROLLBACK}
} = require('../../constants');
const {ErrorHandler, CustomErrorData: {BAD_REQUEST_PRODUCT_NOT_PRESENT}} = require("../../error");
const {
    emailService: {sendMail},
    historyService: {addEventService},
    productService: {deleteProductByParamsService, getProductByIdService},
    userService: {getUserByIdService}
} = require("../../service");

module.exports = async (req, res, next) => {
    const transaction = await transactionInstance();
    try {
        const {
            params: {productId},
            user: {userId}
        } = req;

        const userFromDB = await getUserByIdService(userId, transaction);
        const product = await getProductByIdService(productId, transaction);

        if (!product || product.status === DELETED) {
            return next(new ErrorHandler(
                BAD_REQUEST,
                BAD_REQUEST_PRODUCT_NOT_PRESENT.message,
                BAD_REQUEST_PRODUCT_NOT_PRESENT.customCode));
        }

        await deleteProductByParamsService({productId}, transaction);
        await addEventService({event: deleteProductHistory, userId: userId}, transaction);
        await sendMail(userFromDB.email, DELETE_PRODUCT, {userFromDB, isProductCreated: product});
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
