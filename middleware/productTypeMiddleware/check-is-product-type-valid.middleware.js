const Joi = require('joi');

const {productTypeValidator: {productTypeValidationSchema}} = require("../../validators");
const {
    responseStatusCodesEnum: {BAD_REQUEST},
    responseCustomErrorEnum: {NOT_VALID},
} = require('../../constants');
const ErrorHandler = require('../../error/ErrorHandler');

module.exports = (req, res, next) => {
    try {
        const productType = req.body;

        const {error} = Joi.validate(productType, productTypeValidationSchema);

        if (error) {
            return next(new ErrorHandler(
                BAD_REQUEST,
                error.details[0].message,
                NOT_VALID.customCode));
        }

        req.productType = productType;

        next();

    } catch (e) {
        next(new ErrorHandler(e.status, e.message, e.customCode));
    }
}
