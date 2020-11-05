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

module.exports = async (req, res, next) => {
    const transaction = await transactionInstance();
    try {
        const {
            body: productSection,
            user: {userId}
        } = req;

        const userFromDB = await getUserByIdService(userId);

        const isProductTypeCreated = await createProductSectionService(productSection, transaction);

        if (!isProductTypeCreated) return next(new ErrorHandler(NOT_FOUND_CODE, NOT_CREATED.message, NOT_CREATED.customCode));

        await addEventService({event: createProductSectionHistory, userId: userId}, transaction);
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
