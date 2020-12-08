const chalk = require('chalk');
const {transactionInstance} = require('../../dataBase').getInstance();

const {
    historyActionEnum: {addPurchaseHistory},
    responseStatusCodesEnum: {BAD_REQUEST},
    transactionEnum: {TRANSACTION_COMMIT, TRANSACTION_ROLLBACK},
    PURCHASE_STATUS: {IN_PROGRESS}
} = require('../../constants');
const {
    ErrorHandler,
    CustomErrorData: {BAD_REQUEST_PURCHASE_IS_ALREADY_PRESENT}
} = require("../../error");
const {
    cartService: {getCartService},
    purchaseService: {addPurchaseService, findUserProceedPurchaseService}
} = require("../../service");

const winston = require('../../logger/winston');
const {calculateCartPriceHelper} = require("../../helpers");
const logger = winston(addPurchaseHistory);

module.exports = async (req, res, next) => {
    const transaction = await transactionInstance();
    try {
        const {
            purchaseData: purchaseData,
            query: {tempId}
        } = req;

        const unauthorizedUserProceedPurchase = await findUserProceedPurchaseService({tempId, status_id: IN_PROGRESS});

        if (unauthorizedUserProceedPurchase) {
            return next(new ErrorHandler(
                BAD_REQUEST,
                BAD_REQUEST_PURCHASE_IS_ALREADY_PRESENT.message,
                BAD_REQUEST_PURCHASE_IS_ALREADY_PRESENT.customCode
            ));
        }

        if (!unauthorizedUserProceedPurchase) {

            const unauthorizedCart = await getCartService({tempId});

            const total = await calculateCartPriceHelper(unauthorizedCart);

            await Promise.all(unauthorizedCart.map(async product => {

                await addPurchaseService({
                    tempId,
                    purchaseId: tempId + Date.now().toString().slice(8, 13),
                    productId: product.productId,
                    email: purchaseData.email,
                    phone: purchaseData.phone,
                    name: purchaseData.name,
                    surname: purchaseData.surname,
                    city: purchaseData.city,
                    street: purchaseData.street,
                    house: purchaseData.house,
                    apartment: purchaseData.apartment,
                    entrance: purchaseData.entrance,
                    floor: purchaseData.floor,
                    status_id: IN_PROGRESS,
                    price: product.price,
                    count: product.count,
                    sum: product.sum,
                    total,
                    created_at: Date.now()
                }, transaction);
            }));
        }

        logger.info({
            info: addPurchaseHistory,
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString(),
            name: purchaseData.name,
            phone: purchaseData.phone
        });

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
