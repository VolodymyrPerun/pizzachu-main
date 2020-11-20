const chalk = require('chalk');

const {transactionInstance} = require('../../dataBase').getInstance();
const {productSectionService: {getProductSectionByIdService, updateProductSectionService}} = require('../../service');
const {
    emailActionEnum: {UPDATE_PRODUCT_SECTION},
    historyActionEnum: {updateProductSectionHistory},
    responseStatusCodesEnum: {NOT_FOUND: NOT_FOUND_CODE},
    responseCustomErrorEnum: {NOT_UPDATE},
    transactionEnum: {TRANSACTION_COMMIT, TRANSACTION_ROLLBACK}
} = require('../../constants');
const {
    emailService: {sendMail},
    historyService: {addEventService},
    userService: {getUserByIdService}
} = require('../../service');
const {ErrorHandler} = require("../../error");
const winston = require('../../logger/winston');
const logger = winston(updateProductSectionHistory);

module.exports = async (req, res, next) => {
    const transaction = await transactionInstance();
    try {
        const {
            productSection: productSection,
            params: {id},
            user: {userId}
        } = req;

        const userFromDB = await getUserByIdService(userId);
        const updatedProductSection = await getProductSectionByIdService(id);
        if (!updatedProductSection) {
            logger.error({
                message: NOT_UPDATE.message,
                date: new Date().toLocaleDateString(),
                time: new Date().toLocaleTimeString()
            });
            return next(new ErrorHandler(
                NOT_FOUND_CODE,
                NOT_UPDATE.message,
                NOT_UPDATE.customCode));
        }

        const isUpdated = await updateProductSectionService(productSection, {id}, transaction);

        if (!isUpdated) {
            logger.error({
                message: NOT_UPDATE.message,
                date: new Date().toLocaleDateString(),
                time: new Date().toLocaleTimeString()
            });
            return next(new ErrorHandler(
                NOT_FOUND_CODE,
                NOT_UPDATE.message,
                NOT_UPDATE.customCode));
        }

        logger.info({
            info: updateProductSectionHistory,
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString(),
            userId: userId,
            productSectionId: id
        });

        await addEventService({event: updateProductSectionHistory, userId: userId}, transaction);
        await sendMail(userFromDB.email, UPDATE_PRODUCT_SECTION, {userFromDB, updatedProductSection, productSection});
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
