const chalk = require('chalk');
const {transactionInstance} = require('../../dataBase').getInstance();

const {
    historyActionEnum: {addPurchaseHistory},
    responseStatusCodesEnum: {BAD_REQUEST},
    transactionEnum: {TRANSACTION_COMMIT, TRANSACTION_ROLLBACK},
    PURCHASE_STATUS: {IN_PROGRESS},
    USER_STATUS: {ACTIVE}
} = require('../../constants');
const {
    ErrorHandler,
    CustomErrorData: {BAD_REQUEST_PURCHASE_IS_ALREADY_PRESENT, BAD_REQUEST_USER_NOT_ACTIVE}
} = require("../../error");
const {
    cartService: {getCartService},
    historyService: {addEventService},
    purchaseService: {addPurchaseService, findUserProceedPurchaseService},
    userService: {getUserByIdService},
} = require("../../service");

const winston = require('../../logger/winston');
const {calculateCartPriceHelper} = require("../../helpers");
const logger = winston(addPurchaseHistory);

module.exports = async (req, res, next) => {
    const transaction = await transactionInstance();
    try {
        const {
            user: {userId}
        } = req;

        const userFromDB = await getUserByIdService(userId);

        if (userFromDB.status_id !== ACTIVE) {
            logger.error({
                message: BAD_REQUEST_USER_NOT_ACTIVE.message,
                date: new Date().toLocaleDateString(),
                time: new Date().toLocaleTimeString()
            });
            return next(new ErrorHandler(
                BAD_REQUEST,
                BAD_REQUEST_USER_NOT_ACTIVE.message,
                BAD_REQUEST_USER_NOT_ACTIVE.customCode
            ));
        }

        const userProceedPurchase = await findUserProceedPurchaseService({userId});

        if (userProceedPurchase) {
            return next(new ErrorHandler(
                BAD_REQUEST,
                BAD_REQUEST_PURCHASE_IS_ALREADY_PRESENT.message,
                BAD_REQUEST_PURCHASE_IS_ALREADY_PRESENT.customCode
            ));
        }

        if (!userProceedPurchase) {

            const cart = await getCartService({userId});

            const total = await calculateCartPriceHelper(cart);

            await Promise.all(cart.map(async (product) => {

                await addPurchaseService({
                    purchaseId: userId + Date.now().toString().slice(8, 13),
                    userId,
                    productId: product.productId,
                    email: userFromDB.email,
                    phone: userFromDB.phone,
                    name: userFromDB.name,
                    surname: userFromDB.surname,
                    city: userFromDB.city,
                    street: userFromDB.street,
                    house: userFromDB.house,
                    apartment: userFromDB.apartment,
                    entrance: userFromDB.entrance,
                    floor: userFromDB.floor,
                    status_id: IN_PROGRESS,
                    price: product.price,
                    count: product.count,
                    sum: product.sum,
                    total: total,
                    created_at: Date.now()
                }, transaction);
            }));
        }

        logger.info({
            info: addPurchaseHistory,
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString(),
            userId
        });

        await addEventService({event: addPurchaseHistory, userId}, transaction);
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
