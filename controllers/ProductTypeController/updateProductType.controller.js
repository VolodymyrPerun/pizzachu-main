const chalk = require('chalk');

const {transactionInstance} = require('../../dataBase').getInstance();
const {productTypeService: {getProductTypeByIdService, updateProductTypeService}} = require('../../service');
const {
    emailActionEnum: {UPDATE_PRODUCT_TYPE},
    responseStatusCodesEnum: {NOT_FOUND: NOT_FOUND_CODE},
    responseCustomErrorEnum: {NOT_UPDATE},
    transactionEnum: {TRANSACTION_COMMIT, TRANSACTION_ROLLBACK}
} = require('../../constants');
const {emailService: {sendMail}, userService: {getUserByIdService}} = require('../../service');
const {ErrorHandler} = require("../../error");

module.exports = async (req, res, next) => {
    const transaction = await transactionInstance();
    try {
        const {userId} = req.user;

        const productType = req.body;

        const {id} = req.params;

        const userFromDB = await getUserByIdService(userId);
        const updatedProductType = await getProductTypeByIdService(id);
        const isUpdated = await updateProductTypeService(productType, {id}, transaction);

        if (!isUpdated) return next(new ErrorHandler(NOT_FOUND_CODE, NOT_UPDATE.message, NOT_UPDATE.customCode));

        await sendMail(userFromDB.email, UPDATE_PRODUCT_TYPE, {userFromDB, updatedProductType, productType});
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
