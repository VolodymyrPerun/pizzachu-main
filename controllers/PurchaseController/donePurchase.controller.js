const chalk = require('chalk');

const {transactionInstance} = require('../../dataBase').getInstance();
const {
    historyActionEnum: {donePurchaseHistory},
    responseStatusCodesEnum: {BAD_REQUEST},
    transactionEnum: {TRANSACTION_COMMIT, TRANSACTION_ROLLBACK},
    PURCHASE_STATUS: {DONE}
} = require('../../constants');
const {
    ErrorHandler,
    CustomErrorData: {BAD_REQUEST_PURCHASE_IS_ALREADY_DONE}
} = require("../../error");
const {
    historyService: {addEventService},
    purchaseService: {donePurchaseService},
} = require("../../service");
const winston = require('../../logger/winston');
const logger = winston(donePurchaseHistory);

module.exports = async (req, res, next) => {
    const transaction = await transactionInstance();
    try {
        const {
            purchase: purchase,
            user: {userId},
        } = req;

        const purchaseData = purchase[0];

        if (purchaseData.status_id === DONE) {
            return next(new ErrorHandler(
                BAD_REQUEST,
                BAD_REQUEST_PURCHASE_IS_ALREADY_DONE.message,
                BAD_REQUEST_PURCHASE_IS_ALREADY_DONE.customCode
            ));
        } else {
            await Promise.all(purchase.map(async purchase => {

                const purchaseId = purchase.purchaseId;
                const userId = purchase.userId;

                await donePurchaseService(
                    {purchaseId},
                    {userId},
                    transaction);
            }));

            logger.info({
                info: donePurchaseHistory,
                date: new Date().toLocaleDateString(),
                time: new Date().toLocaleTimeString(),
                sellerId: userId,
                userId: purchaseData.userId,
                purchaseId: purchaseData.purchaseId
            });

            await addEventService({event: donePurchaseHistory, userId: purchaseData.userId}, transaction);
            await transaction.commit();
            console.log(chalk.bgYellow.bold.cyan(TRANSACTION_COMMIT));
        }

        res.end();
    } catch (e) {
        console.log(chalk.bgGreen.bold.red(e.status, e.message, e.customCode));
        console.log(chalk.red(TRANSACTION_ROLLBACK));
        await transaction.rollback();
        next(new ErrorHandler(e.status, e.message, e.customCode));
    }
};
