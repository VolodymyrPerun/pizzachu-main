const chalk = require('chalk');

const {transactionInstance} = require('../../dataBase').getInstance();
const {
    emailActionEnum: {CREATE_PRODUCT_SECTION},
    historyActionEnum: {createProductSectionHistory},
    responseStatusCodesEnum: {CREATED, NOT_FOUND: NOT_FOUND_CODE},
    responseCustomErrorEnum: {NOT_CREATED},
    transactionEnum: {TRANSACTION_COMMIT, TRANSACTION_ROLLBACK},
} = require('../../constants');
const ErrorHandler = require("../../error/ErrorHandler");
const {
    emailService: {sendMail},
    historyService: {addEventService},
    productSectionService: {createProductSectionService},
    userService: {getUserByIdService}
} = require("../../service");
const winston = require('../../logger/winston');
const logger = winston(createProductSectionHistory);

module.exports = async (req, res, next) => {
    const transaction = await transactionInstance();
    try {
        const {
            productSection: productSection,
            body: {id},
            user: {userId}
        } = req;

        const userFromDB = await getUserByIdService(userId);

        const isProductSectionCreated = await createProductSectionService(productSection, transaction);

        if (!isProductSectionCreated) {
            logger.error({
                message: NOT_CREATED.message,
                date: new Date().toLocaleDateString(),
                time: new Date().toLocaleTimeString()
            });
            return next(new ErrorHandler(
                NOT_FOUND_CODE,
                NOT_CREATED.message,
                NOT_CREATED.customCode));
        }

        logger.info({
            info: createProductSectionHistory,
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString(),
            userId: userId,
            productSectionId: id
        });

        await addEventService({event: createProductSectionHistory, userId}, transaction);
        await sendMail(userFromDB.email, CREATE_PRODUCT_SECTION, {userFromDB, productSection});
        await transaction.commit();
        console.log(chalk.bgYellow.bold.cyan(TRANSACTION_COMMIT));

        res.status(CREATED).end();
    } catch (e) {
        console.log(chalk.bgGreen.bold.red(e.status, e.message, e.customCode));
        console.log(chalk.red(TRANSACTION_ROLLBACK));
        await transaction.rollback();
        next(new ErrorHandler(e.status, e.message, e.customCode));
    }
};
