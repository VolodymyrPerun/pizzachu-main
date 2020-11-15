const Joi = require('joi');

const {cartValidator: {addProductToCartValidationSchema}} = require("../../validators");
const {
    responseStatusCodesEnum: {BAD_REQUEST},
    responseCustomErrorEnum: {NOT_VALID},
} = require('../../constants');
const {ErrorHandler, CustomErrorData: {BAD_REQUEST_WRONG_COUNT}} = require('../../error');

module.exports = (req, res, next) => {
    try {
        const {body: count} = req;

        if (!count) {
            return next(new ErrorHandler(
                BAD_REQUEST,
                BAD_REQUEST_WRONG_COUNT.message,
                BAD_REQUEST_WRONG_COUNT.customCode
            ));
        }

        const {error} = Joi.validate(count, addProductToCartValidationSchema);

        if (error) {
            return next(new ErrorHandler(
                BAD_REQUEST,
                error.details[0].message,
                NOT_VALID.customCode));
        }

        req.count = count;

        next();

    } catch (e) {
        next(new ErrorHandler(e.status, e.message, e.customCode));
    }
}
