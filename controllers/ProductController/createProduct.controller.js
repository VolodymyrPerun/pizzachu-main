const path = require('path');
const uuid = require('uuid').v1();
const fsep = require('fs-extra').promises;
const chalk = require('chalk');

const {transactionInstance} = require('../../dataBase').getInstance();
const {
    emailActionEnum: {CREATE_PRODUCT},
    historyActionEnum: {createProductHistory},
    responseStatusCodesEnum: {CREATED, NOT_FOUND: NOT_FOUND_CODE},
    responseCustomErrorEnum: {NOT_CREATED},
    PRODUCT_STATUS: {IN_STOCK},
    transactionEnum: {TRANSACTION_COMMIT, TRANSACTION_ROLLBACK},
} = require('../../constants');
const {ErrorHandler} = require("../../error");
const {
    emailService: {sendMail},
    historyService: {addEventService},
    productService: {createProductService, updateProductService},
    userService: {getUserByIdService}
} = require("../../service");
const winston = require('../../logger/winston');
const logger = winston(createProductHistory);


module.exports = async (req, res, next) => {
    const transaction = await transactionInstance();
    try {
        const {
            product: product, photos,
            user: {userId}
        } = req;

        product.status_id = IN_STOCK;

        const userFromDB = await getUserByIdService(userId);

        const [productImage] = photos;

        const isProductCreated = await createProductService(product, transaction);

        if (!isProductCreated) {
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

        if (productImage) {
            const photoDir = `products/${isProductCreated.productId}/photos/`;
            const fileExtension = path.extname(productImage.name);
            const photoName = uuid + fileExtension;

            await fsep.mkdir(path.resolve(process.cwd(), 'public', photoDir), {recursive: true});
            await productImage.mv(path.resolve(process.cwd(), 'public', photoDir, photoName));
            await updateProductService(isProductCreated.productId, {product_photo: photoDir + photoName});
        }

        logger.info({
            info: createProductHistory,
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString(),
            userId,
            productId: isProductCreated.productId
        });

        await addEventService({event: createProductHistory, userId}, transaction);
        await sendMail(userFromDB.email, CREATE_PRODUCT, {userFromDB, isProductCreated});
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
