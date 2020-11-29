const chalk = require('chalk');

const {transactionInstance} = require('../../dataBase').getInstance();
const {
    emailActionEnum: {CANCEL_PURCHASE},
    historyActionEnum: {cancelPurchaseHistory},
    responseStatusCodesEnum: {BAD_REQUEST},
    transactionEnum: {TRANSACTION_COMMIT, TRANSACTION_ROLLBACK},
    PURCHASE_STATUS: {CANCELLED}
} = require('../../constants');
const {
    ErrorHandler,
    CustomErrorData: {BAD_REQUEST_PURCHASE_IS_ALREADY_CANCELLED}
} = require("../../error");
const {
    emailService: {sendMail},
    historyService: {addEventService},
    purchaseService: {cancelPurchaseService},
} = require("../../service");
const winston = require('../../logger/winston');
const logger = winston(cancelPurchaseHistory);

module.exports = async (req, res, next) => {
    const transaction = await transactionInstance();
    try {
        const {
            purchase: purchase,
            user: {userId},
        } = req;

        const purchaseData = purchase[0];

        if (purchaseData.status_id === CANCELLED) {
            return next(new ErrorHandler(
                BAD_REQUEST,
                BAD_REQUEST_PURCHASE_IS_ALREADY_CANCELLED.message,
                BAD_REQUEST_PURCHASE_IS_ALREADY_CANCELLED.customCode
            ));
        } else {
            await Promise.all(purchase.map(async purchase => {

                const purchaseId = purchase.purchaseId;
                const userId = purchase.userId;

                await cancelPurchaseService(
                    {purchaseId},
                    {userId},
                    transaction);
            }));

            logger.info({
                info: cancelPurchaseHistory,
                date: new Date().toLocaleDateString(),
                time: new Date().toLocaleTimeString(),
                sellerId: userId,
                userId: purchaseData.userId,
                purchaseId: purchaseData.purchaseId
            });

            await addEventService({event: cancelPurchaseHistory, userId: purchaseData.userId}, transaction);
            await sendMail(purchaseData.email, CANCEL_PURCHASE, {purchaseData});
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
