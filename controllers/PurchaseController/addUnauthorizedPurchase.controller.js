const chalk = require('chalk');
const {transactionInstance} = require('../../dataBase').getInstance();
const { v4: uuidv4 } = require('uuid');

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
            query: {tempId}
        } = req;

            const unauthorizedCart = await getCartService({tempId});

            const total = await calculateCartPriceHelper(unauthorizedCart);

            await Promise.all(unauthorizedCart.map(async product => {

                await addPurchaseService({
                    tempId,
                    purchaseId: uuidv4(),
                    productId: 231,
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
                    created_at: Date.now()
                }, transaction);
            }));

        logger.info({
            info: addPurchaseHistory,
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString(),
            name,
            phone
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
