const Joi = require('joi');
const chalk = require('chalk')

const {transactionInstance} = require('../../dataBase').getInstance();
const {productService:{getProductByIdService}} = require('../../service');
const {
    userValidator: {updateUserValidationSchema}
} = require("../../validators");
const {
    responseStatusCodesEnum: {BAD_REQUEST, NOT_FOUND: NOT_FOUND_CODE},
    responseCustomErrorEnum: {NOT_VALID, NOT_UPDATE},
    emailActionEnum: {USER_UPDATE},
    USER_ROLE: {ADMIN},
    USER_STATUS: {ACTIVE},
    PRODUCT_STATUS: {DELETED}
} = require('../../constants');
const {ErrorHandler} = require("../../error");
const {
    emailService: {sendMail},
    userService: {updateUserService}
} = require("../../service");


module.exports = async (req, res, next) => {
    const transaction = await transactionInstance();
    // ! Sequalize method
    // const user = req.body;
    // user.password = await hashUserPassword(user.password);
    // const isUpdated = await userService.update(req.user, user);
    // if (!isUpdated) return next(new ErrorHandler('Cannot update user', 400, 4001));
    // res.sendStatus(200);

    try {

        const user = req.user;

        user.role_id = ADMIN;
        user.status_id = ACTIVE;

        const product = req.body;

        const {productId} = req.product;

        await getProductByIdService(productId, transaction);

        // const {error} = Joi.validate(updatedUser, updateUserValidatorSchema);
        // if (error) return next(new ErrorHandler(BAD_REQUEST, error.details[0].message, NOT_VALID.customCode));

        const isUpdated = await updateUserService({
            product
        }, productId, transaction);

        if (!isUpdated) return next(new ErrorHandler(NOT_FOUND_CODE, NOT_UPDATE.message, NOT_UPDATE.customCode));

        // await sendMail(userFromDB.email, USER_UPDATE, {user: updatedUser});

        await transaction.commit();
        console.log(chalk.bgRedBright.bold.greenBright('TRANSACTION COMMIT'))

        res.end();
    } catch (e) {
        console.log(chalk.bgGray.bold.red(e.status, e.message, e.customCode));
        console.log(chalk.red('TRANSACTION ROLLBACK'));
        await transaction.rollback();
        next(new ErrorHandler(e.status, e.message, e.customCode));
    }
};
