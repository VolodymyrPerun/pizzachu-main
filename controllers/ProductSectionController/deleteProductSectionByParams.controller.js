const chalk = require('chalk');

const {transactionInstance} = require('../../dataBase').getInstance();
const {
    emailActionEnum: {DELETE_PRODUCT_SECTION},
    historyActionEnum: {deleteProductSectionHistory},
    responseStatusCodesEnum: {BAD_REQUEST},
    transactionEnum: {TRANSACTION_COMMIT, TRANSACTION_ROLLBACK}
} = require('../../constants');
const {ErrorHandler, CustomErrorData: {BAD_REQUEST_PRODUCT_SECTION_NOT_PRESENT}} = require("../../error");
const {
    emailService: {sendMail},
    historyService: {addEventService},
    productSectionService: {deleteProductSectionByParamsService, getProductSectionByIdService},
    userService: {getUserByIdService}
} = require("../../service");
const winston = require('../../logger/winston');
const logger = winston(deleteProductSectionHistory);

module.exports = async (req, res, next) => {
    const transaction = await transactionInstance();
    try {
        const {
            params: {id},
            user: {userId}
        } = req;

        const userFromDB = await getUserByIdService(userId);
        const productSection = await getProductSectionByIdService(id, transaction);

        if (!productSection) {
            logger.error({
                message: BAD_REQUEST_PRODUCT_SECTION_NOT_PRESENT.message,
                date: new Date().toLocaleDateString(),
                time: new Date().toLocaleTimeString()
            });
            return next(new ErrorHandler(
                BAD_REQUEST,
                BAD_REQUEST_PRODUCT_SECTION_NOT_PRESENT.message,
                BAD_REQUEST_PRODUCT_SECTION_NOT_PRESENT.customCode));
        }

        logger.info({
            info: deleteProductSectionHistory,
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString(),
            userId: userId,
            productSectionId: id
        });

        await deleteProductSectionByParamsService({id}, transaction);
        await addEventService({event: deleteProductSectionHistory, userId: userId}, transaction);
        await sendMail(userFromDB.email, DELETE_PRODUCT_SECTION, {userFromDB, productSection});
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
