const chalk = require('chalk');

const {transactionInstance} = require('../../dataBase').getInstance();
const {
    emailActionEnum: {ACCEPT_PURCHASE},
    historyActionEnum: {acceptPurchaseHistory},
    responseStatusCodesEnum: {BAD_REQUEST},
    transactionEnum: {TRANSACTION_COMMIT, TRANSACTION_ROLLBACK},
    PURCHASE_STATUS: {ACCEPTED}
} = require('../../constants');
const {
    ErrorHandler,
    CustomErrorData: {BAD_REQUEST_PURCHASE_IS_ALREADY_ACCEPTED}
} = require("../../error");
const {
    emailService: {sendMail},
    historyService: {addEventService},
    purchaseService: {acceptPurchaseService},
} = require("../../service");
const winston = require('../../logger/winston');
const logger = winston(acceptPurchaseHistory);

module.exports = async (req, res, next) => {
    const transaction = await transactionInstance();
    try {
        const {
            purchase: purchase,
            user: {userId},
        } = req;

        const purchaseData = purchase[0];

        if (purchaseData.status_id === ACCEPTED) {
            return next(new ErrorHandler(
                BAD_REQUEST,
                BAD_REQUEST_PURCHASE_IS_ALREADY_ACCEPTED.message,
                BAD_REQUEST_PURCHASE_IS_ALREADY_ACCEPTED.customCode
            ));
        } else {
            await Promise.all(purchase.map(async purchase => {

                const purchaseId = purchase.purchaseId;
                const userId = purchase.userId;

                await acceptPurchaseService(
                    {purchaseId},
                    {userId},//todo only purchaseId and router fix
                    transaction);
            }));

            if (purchaseData.userId !== null) {
                logger.info({
                    info: acceptPurchaseHistory,
                    date: new Date().toLocaleDateString(),
                    time: new Date().toLocaleTimeString(),
                    sellerId: userId,
                    userId: purchaseData.userId,
                    purchaseId: purchaseData.purchaseId
                });

                await addEventService({event: acceptPurchaseHistory, userId: purchaseData.userId}, transaction);
                await sendMail(purchaseData.email, ACCEPT_PURCHASE, {purchaseData, purchase});
            } else {
                logger.info({
                    info: acceptPurchaseHistory,
                    date: new Date().toLocaleDateString(),
                    time: new Date().toLocaleTimeString(),
                    sellerId: userId,
                    phoneNumber: purchaseData.number,
                    purchaseId: purchaseData.purchaseId
                });

                await sendMail(purchaseData.email, ACCEPT_PURCHASE, {purchaseData, purchase});
            }


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
