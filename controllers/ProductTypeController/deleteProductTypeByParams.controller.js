const chalk = require('chalk');

const {transactionInstance} = require('../../dataBase').getInstance();
const {
    emailActionEnum: {DELETE_PRODUCT_TYPE},
    historyActionEnum: {deleteProductTypeHistory},
    responseStatusCodesEnum: {BAD_REQUEST},
    transactionEnum: {TRANSACTION_COMMIT, TRANSACTION_ROLLBACK}
} = require('../../constants');
const {ErrorHandler, CustomErrorData: {BAD_REQUEST_PRODUCT_TYPE_NOT_PRESENT}} = require("../../error");
const {
    emailService: {sendMail},
    historyService: {addEventService},
    productTypeService: {deleteProductTypeByParamsService, getProductTypeByIdService},
    userService: {getUserByIdService}
} = require("../../service");

module.exports = async (req, res, next) => {
    const transaction = await transactionInstance();
    try {
        const {userId} = req.user;

        const {id} = req.params;

        const userFromDB = await getUserByIdService(userId);
        const productType = await getProductTypeByIdService(id, transaction);

        if (!productType) {
            return next(new ErrorHandler(
                BAD_REQUEST,
                BAD_REQUEST_PRODUCT_TYPE_NOT_PRESENT.message,
                BAD_REQUEST_PRODUCT_TYPE_NOT_PRESENT.customCode));
        }

        await deleteProductTypeByParamsService({id}, transaction);
        await addEventService({event: deleteProductTypeHistory, userId: userId}, transaction);
        await sendMail(userFromDB.email, DELETE_PRODUCT_TYPE, {userFromDB, productType});
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
