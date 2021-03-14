const chalk = require('chalk');
const {transactionInstance} = require('../../dataBase').getInstance();
const { v4: uuidv4 } = require('uuid');


const {
    historyActionEnum: {addPurchaseHistory},
    responseStatusCodesEnum: {BAD_REQUEST},
    transactionEnum: {TRANSACTION_COMMIT, TRANSACTION_ROLLBACK},
    PURCHASE_STATUS: {IN_PROGRESS},
    USER_STATUS: {ACTIVE}
} = require('../../constants');
const {
    ErrorHandler,
    CustomErrorData: {BAD_REQUEST_USER_NOT_ACTIVE}
} = require("../../error");
const {
    cartService: {getCartService},
    historyService: {addEventService},
    purchaseService: {addPurchaseService},
    userService: {getUserByIdService},
} = require("../../service");

const winston = require('../../logger/winston');
const {calculateCartPriceHelper} = require("../../helpers");
const logger = winston(addPurchaseHistory);

module.exports = async (req, res, next) => {
   const transaction = await transactionInstance();
    try {
        const {
            purchaseData: {
                email,
                phone,
                name,
                city,
                street,
                house,
                apartment,
                entrance,
                floor
            },
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

            const cart = await getCartService({userId});

            const total = await calculateCartPriceHelper(cart);

            await Promise.all(cart.map(async product => {

                const created_at = new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString() + 'Z';
                const updated_at = new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString() + 'Z';

                await addPurchaseService({
                    purchaseId: uuidv4(),
                    userId,
                    productId: product.productId,
                    product_photo: product['Product.product_photo'],
                    productName: product['Product.name'],
                    email,
                    phone,
                    name,
                    city,
                    street,
                    house,
                    apartment,
                    entrance,
                    floor,
                    status_id: IN_PROGRESS,
                    price: product.price,
                    count: product.count,
                    sum: product.sum,
                    total,
                    created_at,
                    updated_at
                }, transaction);
            }));


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
