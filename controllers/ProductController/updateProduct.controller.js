const chalk = require('chalk');

const {transactionInstance} = require('../../dataBase').getInstance();
const {productService: {getProductByIdService, updateProductService}} = require('../../service');
const {
    responseStatusCodesEnum: {NOT_FOUND: NOT_FOUND_CODE},
    responseCustomErrorEnum: {NOT_UPDATE},
    transactionEnum: {TRANSACTION_COMMIT, TRANSACTION_ROLLBACK},
    USER_ROLE: {ADMIN},
    USER_STATUS: {ACTIVE}
} = require('../../constants');
const {ErrorHandler} = require("../../error");


module.exports = async (req, res, next) => {
    const transaction = await transactionInstance();
    try {

        const user = req.user;

        user.role_id = ADMIN;
        user.status_id = ACTIVE;

        const product = req.body;

        const {productId} = req.params;

        await getProductByIdService(productId, transaction);

        const isUpdated = await updateProductService(productId, product, transaction);

        if (!isUpdated) return next(new ErrorHandler(NOT_FOUND_CODE, NOT_UPDATE.message, NOT_UPDATE.customCode));

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
