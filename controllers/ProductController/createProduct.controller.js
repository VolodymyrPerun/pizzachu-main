const path = require('path');
const uuid = require('uuid').v1();
const fsep = require('fs-extra').promises;
const chalk = require('chalk')

const {transactionInstance} = require('../../dataBase').getInstance();
const {
    responseStatusCodesEnum: {CREATED, NOT_FOUND: NOT_FOUND_CODE},
    responseCustomErrorEnum: {NOT_CREATED},
    emailActionEnum: {PRODUCT_CREATE},
    PRODUCT_STATUS: {IN_STOCK},
    USER_ROLE: {ADMIN},
    USER_STATUS: {ACTIVE},
} = require('../../constants');
const ErrorHandler = require("../../error/ErrorHandler");
const {emailService, productService: {createProductService, updateProductService}} = require("../../service");


module.exports = async (req, res, next) => {
    const transaction = await transactionInstance();
    try {
        const admin = req.user;
        const product = req.body;

        admin.role_id = ADMIN;
        admin.status_id = ACTIVE;
        product.status_id = IN_STOCK;

        const [productImage] = req.photos;

        const isProductCreated = await createProductService(product);

        if (!isProductCreated) return next(new ErrorHandler(NOT_CREATED.message, NOT_FOUND_CODE, NOT_CREATED.customCode));

        if (productImage) {
            const photoDir = `products/${isProductCreated.productId}/photos/`;
            const fileExtension = path.extname(profileImage.name);
            const photoName = uuid + fileExtension;

            await fsep.mkdir(path.resolve(process.cwd(), 'public', photoDir), {recursive: true});
            await productImage.mv(path.resolve(process.cwd(), 'public', photoDir, photoName));
            await updateProductService(isProductCreated.productId, {product_photo: photoDir + photoName});
        }

        await emailService.sendMail(admin.email, PRODUCT_CREATE, {admin, product});

        await transaction.commit();
        console.log(chalk.bgRedBright.bold.greenBright('TRANSACTION COMMIT'))

        res.status(CREATED).end();
    } catch (e) {
        console.log(chalk.bgGreen.bold.red(e.status, e.message, e.customCode));
        console.log(chalk.red('TRANSACTION ROLLBACK'));
        await transaction.rollback();
        next(new ErrorHandler(e.status, e.message, e.customCode));
    }
};
