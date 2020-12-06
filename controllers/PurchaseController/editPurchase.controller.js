const chalk = require('chalk');
const {transactionInstance} = require('../../dataBase').getInstance();

const {
    historyActionEnum: {editPurchaseHistory},
    responseStatusCodesEnum: {BAD_REQUEST},
    transactionEnum: {TRANSACTION_COMMIT, TRANSACTION_ROLLBACK},
    PURCHASE_STATUS: {ACCEPTED}
} = require('../../constants');
const {
    ErrorHandler,
    CustomErrorData: {BAD_REQUEST_PURCHASE_IS_ALREADY_PRESENT, BAD_REQUEST_PURCHASE_IS_ALREADY_ACCEPTED}
} = require("../../error");
const {
    historyService: {addEventService},
    purchaseService: {
        findUserProceedPurchaseService,
        getPurchaseService,
        updateUserProceedPurchaseService,
        updatePurchaseService
    },
} = require("../../service");

const winston = require('../../logger/winston');
const {calculateCartPriceHelper} = require("../../helpers");
const logger = winston(editPurchaseHistory);

module.exports = async (req, res, next) => {
    const transaction = await transactionInstance();
    try {
        const {
            purchase: purchase,
            purchaseData: purchaseData,
            query: {productId}
        } = req;

        const purchaseId = purchase[0].purchaseId;
        const status_id = purchase[0].status_id;
        const userId = purchase[0].userId;

        if (status_id === ACCEPTED) {
            return next(new ErrorHandler(
                BAD_REQUEST,
                BAD_REQUEST_PURCHASE_IS_ALREADY_ACCEPTED.message,
                BAD_REQUEST_PURCHASE_IS_ALREADY_ACCEPTED.customCode
            ));
        } else {

            const userProceedPurchase = await findUserProceedPurchaseService(
                {purchaseId, productId}
            );

            if (!userProceedPurchase) {
                return next(new ErrorHandler(
                    BAD_REQUEST,
                    BAD_REQUEST_PURCHASE_IS_ALREADY_PRESENT.message,
                    BAD_REQUEST_PURCHASE_IS_ALREADY_PRESENT.customCode
                ));
            }

            const sum = userProceedPurchase.price * purchaseData.count;

            await updateUserProceedPurchaseService({
                    count: purchaseData.count,
                    sum,
                    updated_at: Date.now()
                },
                {
                    purchaseId: userProceedPurchase.purchaseId,
                    productId
                },
                transaction);

            let purchases = await getPurchaseService(
                {purchaseId},
            );

            const total = await calculateCartPriceHelper(purchases);

            await Promise.all(purchases.map(async product => {

                const purchaseId = product.purchaseId;
                const userId = product.userId;

                await updatePurchaseService({
                        name: purchaseData.name,
                        surname: purchaseData.surname,
                        city: purchaseData.city,
                        street: purchaseData.street,
                        house: purchaseData.house,
                        apartment: purchaseData.apartment,
                        entrance: purchaseData.entrance,
                        floor: purchaseData.floor,
                        total,
                        updated_at: Date.now()
                    },
                    {purchaseId},
                    {userId},
                    transaction);

            }));

            logger.info({
                info: editPurchaseHistory,
                date: new Date().toLocaleDateString(),
                time: new Date().toLocaleTimeString(),
                userId
            });
        }

        await addEventService({event: editPurchaseHistory, userId}, transaction);
        await transaction.commit();
        console.log(chalk.bgYellow.bold.cyan(TRANSACTION_COMMIT));

        res.end();

    } catch
        (e) {
        console.log(chalk.bgGreen.bold.red(e.status, e.message, e.customCode));
        console.log(chalk.red(TRANSACTION_ROLLBACK));
        await transaction.rollback();
        next(new ErrorHandler(e.status, e.message, e.customCode));
    }
};
